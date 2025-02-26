package command

import (
	"fmt"
	"log"
	"runtime"
	"sort"
	"strconv"
	"strings"
)

type PanicLogger func(funcName string, err any, stack []byte, fields ...map[string]any)

func MakePanicHandler(logger PanicLogger) func(funcName string, fields ...map[string]any) {
	return func(funcName string, fields ...map[string]any) {
		if err := recover(); err != nil {
			fullStack := make([]byte, 8096)
			n := runtime.Stack(fullStack, false)
			fullStack = fullStack[:n]

			cleanedStack := cleanStackTrace(fullStack)

			logger(funcName, err, cleanedStack, fields...)
		}
	}
}

func DefaultPanicLogger(funcName string, err any, stack []byte, fields ...map[string]any) {
	var sb strings.Builder

	sb.WriteString(fmt.Sprintf("[FATAL] recovered from panic in %s\n", funcName))

	sb.WriteString(fmt.Sprintf("Error: %v\n", err))

	if errTyped, ok := err.(error); ok {
		sb.WriteString(fmt.Sprintf("Error Type: %T\n", errTyped))
	} else {
		sb.WriteString(fmt.Sprintf("Error Type: %T\n", err))
	}

	if len(fields) > 0 && fields[0] != nil {
		sb.WriteString("Context:\n")

		// sort keys for consistent output
		keys := make([]string, 0, len(fields[0]))
		for k := range fields[0] {
			keys = append(keys, k)
		}
		sort.Strings(keys)

		for _, k := range keys {
			sb.WriteString(fmt.Sprintf("  %s: %v\n", k, fields[0][k]))
		}
	}

	sb.WriteString("Stack Trace:\n")
	sb.Write(stack)

	log.Print(sb.String())
}

func cleanStackTrace(stack []byte) []byte {
	lines := strings.Split(string(stack), "\n")

	// we find the index after the panic line
	panicLineIndex := -1
	for i, line := range lines {
		if strings.Contains(line, "panic(") {
			panicLineIndex = i
			break
		}
	}

	// then remove everything before it
	if panicLineIndex >= 0 && panicLineIndex+2 < len(lines) {
		// remove the panic() call line & file reference line
		// panic({0x101fc1100?, 0x14000817248?})
		//         ./go/src/runtime/panic.go:785 +0x124
		lines = lines[panicLineIndex+2:]
	}

	return []byte(strings.Join(lines, "\n"))
}

func GetGoroutineID() uint64 {
	buf := make([]byte, 64)
	buf = buf[:runtime.Stack(buf, false)]
	idField := strings.Fields(strings.TrimPrefix(string(buf), "goroutine "))[0]
	id, _ := strconv.ParseUint(idField, 10, 64)
	return id
}
