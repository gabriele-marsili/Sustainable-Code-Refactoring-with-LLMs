#!/bin/bash

# Script to re-execute all problematic C/C++ entries
# This script will re-run 75 clusters with 338 unique problematic entries

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "================================================================================"
echo "SELECTIVE RE-EXECUTION OF PROBLEMATIC C/C++ ENTRIES"
echo "================================================================================"
echo ""
echo "This script will re-execute all clusters with problematic C/C++ entries."
echo ""
echo "Statistics:"
echo "  - Total clusters to re-run: 75"
echo "  - Unique problematic entries: 338"
echo "  - Languages: C, C++"
echo "  - Executions per entry: 5 (base) + 20 (LLM: 4 versions × 5 runs)"
echo ""
echo "Estimated time: 2-4 hours (depending on hardware)"
echo ""

# Ask for confirmation
read -p "Do you want to proceed? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "Starting re-execution at $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Create log directory if it doesn't exist
LOG_DIR="$SCRIPT_DIR/logs"
mkdir -p "$LOG_DIR"

# Generate log filename with timestamp
TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
LOG_FILE="$LOG_DIR/rerun_all_${TIMESTAMP}.log"

echo "Logging to: $LOG_FILE"
echo ""

# Run the Python script and tee output to both console and log file
python3 rerun_problematic_entries.py --num-executions 5 2>&1 | tee "$LOG_FILE"

EXIT_CODE=${PIPESTATUS[0]}

echo ""
echo "================================================================================"
echo "EXECUTION COMPLETED"
echo "================================================================================"
echo "Completed at $(date '+%Y-%m-%d %H:%M:%S')"
echo "Log saved to: $LOG_FILE"
echo ""

if [ $EXIT_CODE -eq 0 ]; then
    echo "✓ All clusters processed successfully!"
    echo ""
    echo "Next steps:"
    echo "  1. Verify results: python3 identify_problematic_entries.py"
    echo "  2. Re-run metrics analysis: cd ../metrics && python3 main_exec_metrics_analysis.py"
    echo "  3. Update energy improvements: cd ../metrics/energy_improvements && python3 analyze_energy_improvements.py"
else
    echo "✗ Some clusters failed. Check the log file for details."
    exit $EXIT_CODE
fi
