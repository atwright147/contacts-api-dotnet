#!/usr/bin/env bash
set -euo pipefail

# Match common ASP.NET dev runs
PIDS="$(pgrep -f 'dotnet.*(run|watch)|contacts-api.csproj' || true)"

if [ -z "$PIDS" ]; then
  echo "No dotnet process found."
  exit 0
fi

echo "Stopping dotnet PID(s): $PIDS"
kill $PIDS || true

sleep 1

STILL_RUNNING="$(pgrep -f 'dotnet.*(run|watch)|contacts-api.csproj' || true)"
if [ -n "$STILL_RUNNING" ]; then
  echo "Force killing dotnet PID(s): $STILL_RUNNING"
  kill -9 $STILL_RUNNING || true
fi

echo "dotnet stopped."
