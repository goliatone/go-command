package router

import "strings"

// MakeRouteMatcherOptions configures the route matching behavior
type MakeRouteMatcherOptions struct {
	Separator        string // separator for splitting pattern/topic (default: "/")
	OnlyFinalSegment bool   // if true, multi-level wildcard (#) must be final segment (default: false)

}

// MakeRouteMatcher creates a configurable pattern matching function
// The returned function has the signature func(pattern, topic string) bool.
// When used with the Mux, "pattern" is the registered route pattern (eg. "users.*.profile")
// and "topic" is the actual topic being matched (eg. "users.123.profile")
func MakeRouteMatcher(opts ...MakeRouteMatcherOptions) func(pattern, topic string) bool {
	separator := "/"
	onlyFinalSegment := false

	if len(opts) > 0 {
		if opts[0].Separator != "" {
			separator = opts[0].Separator
		}
		onlyFinalSegment = opts[0].OnlyFinalSegment
	}

	return func(pattern, topic string) bool {
		if pattern == topic {
			return true
		}

		patternParts := strings.Split(pattern, separator)
		topicParts := strings.Split(topic, separator)

		if onlyFinalSegment {
			return matchWithFinalSegmentRestriction(patternParts, topicParts)
		}
		return matchWithoutRestriction(patternParts, topicParts)
	}
}

// matchWithFinalSegmentRestriction implements MQTT-style matching
// where # must be the final segment
func matchWithFinalSegmentRestriction(patternParts, topicParts []string) bool {
	pLen, tLen := len(patternParts), len(topicParts)
	pi, ti := 0, 0

	for pi < pLen && ti < tLen {
		pPart := patternParts[pi]
		if pPart == "#" {
			return pi == pLen-1
		}
		if pPart != topicParts[ti] && pPart != "+" && pPart != "*" {
			return false
		}
		pi++
		ti++
	}
	// we match if we consumed the entire topic and pattern
	if pi == pLen && ti == tLen {
		return true
	}
	// the pattern has one part left and its "#" AND consumed topic
	// eg. handle pattern "a/b/#" to match "a/b".
	if pi == pLen-1 && patternParts[pi] == "#" {
		return ti == tLen
	}

	return false
}

// matchWithoutRestriction implements RabbitMQ-style matching
// where # can appear anywhere in the pattern
func matchWithoutRestriction(patternParts, topicParts []string) bool {
	pLen, tLen := len(patternParts), len(topicParts)

	dp := make([]bool, tLen+1)
	prev := make([]bool, tLen+1)

	prev[0] = true

	for i := 1; i <= pLen; i++ {
		pPart := patternParts[i-1]
		// dp[0] true -> pattern up to now can match empty topic
		// only possible if the pattern consists of "#"s
		if pPart == "#" {
			dp[0] = prev[0]
		} else {
			dp[0] = false
		}

		for j := 1; j <= tLen; j++ {
			tPart := topicParts[j-1]

			switch pPart {
			case "#":
				dp[j] = prev[j] || dp[j-1]
			case "+", "*":
				dp[j] = prev[j-1]
			default:
				dp[j] = prev[j-1] && pPart == tPart
			}
		}
		copy(prev, dp)
	}

	return prev[tLen]
}
