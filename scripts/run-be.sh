#!/usr/bin/env bash
set -euo pipefail

# Run the backend API on its own (http://localhost:5077)
# Usage:
#   ./scripts/run-be.sh           # dotnet run
#   ./scripts/run-be.sh --watch   # dotnet watch (hot reload)

cd "$(dirname "$0")/../be-dotnet"

if [[ "${1:-}" == "--watch" ]]; then
  exec dotnet watch run --launch-profile http
fi

exec dotnet run --launch-profile http
