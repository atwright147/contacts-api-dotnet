#!/usr/bin/env bash
set -euo pipefail

# Match Vite dev server processes (vite or node running vite)
PIDS="$(pgrep -f 'vite|node.*vite' || true)"

if [ -z "$PIDS" ]; then
  echo "No vite process found."
  exit 0
fi

echo "Stopping vite PID(s): $PIDS"
kill $PIDS || true

sleep 1

STILL_RUNNING="$(pgrep -f 'vite|node.*vite' || true)"
if [ -n "$STILL_RUNNING" ]; then
  echo "Force killing vite PID(s): $STILL_RUNNING"
  kill -9 $STILL_RUNNING || true
fi

echo "vite stopped."
