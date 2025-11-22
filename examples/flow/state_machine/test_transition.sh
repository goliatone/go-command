#!/bin/bash
# Create an order
ORDER_ID=$(curl -s -X POST http://127.0.0.1:8080/api/orders -H "Content-Type: application/json" -d '{}' | jq -r '.order.id')
echo "Created order: $ORDER_ID"

# Get the order
echo "Initial state:"
curl -s http://127.0.0.1:8080/api/orders/$ORDER_ID | jq

# Approve it (with admin)
echo -e "\nApproving order..."
curl -s -X POST http://127.0.0.1:8080/api/orders/$ORDER_ID/transition -H "Content-Type: application/json" -d '{"event":"approve","admin":true}' | jq

# Get the order again
echo -e "\nState after approve:"
curl -s http://127.0.0.1:8080/api/orders/$ORDER_ID | jq

# Try to fulfill
echo -e "\nFulfilling order..."
curl -s -X POST http://127.0.0.1:8080/api/orders/$ORDER_ID/transition -H "Content-Type: application/json" -d '{"event":"fulfill","admin":true}' | jq

# Get the order again
echo -e "\nFinal state:"
curl -s http://127.0.0.1:8080/api/orders/$ORDER_ID | jq
