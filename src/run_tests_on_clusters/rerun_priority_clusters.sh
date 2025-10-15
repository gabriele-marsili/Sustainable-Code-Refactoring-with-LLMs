#!/bin/bash
# Script to re-run tests on priority clusters (C/C++/Java) with fixed configurations
# Generated: 2025-10-12

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=========================================="
echo "RE-RUNNING PRIORITY CLUSTERS"
echo "=========================================="
echo ""
echo "This will re-run tests on clusters with C/C++/Java issues"
echo "Fixes applied:"
echo "  - C: Force clean + recompile, separate metrics capture"
echo "  - C++: Separate metrics capture with temp files"
echo ""

# Check if clusters_to_rerun.txt exists
if [ ! -f "clusters_to_rerun.txt" ]; then
    echo "❌ clusters_to_rerun.txt not found!"
    echo "Please run analyze_invalid_outputs.py first"
    exit 1
fi

# Count priority clusters
PRIORITY_COUNT=$(grep -v "^#" clusters_to_rerun.txt | head -82 | wc -l | tr -d ' ')
echo "Found $PRIORITY_COUNT priority clusters to re-run"
echo ""

# Ask for confirmation
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "=========================================="
echo "STARTING EXECUTION"
echo "=========================================="
echo ""

# Track progress
TOTAL=0
SUCCESS=0
FAILED=0

# Process priority clusters (first 82 lines, excluding comments)
grep -v "^#" clusters_to_rerun.txt | head -82 | while read cluster; do
    TOTAL=$((TOTAL + 1))

    echo ""
    echo "[$TOTAL/$PRIORITY_COUNT] Testing cluster: $cluster"
    echo "----------------------------------------"

    if python3 run_tests_on_cluster.py \
        --cluster-name "$cluster" \
        --base-only \
        --run-quantity 5 \
        --max-workers 2 \
        --not-check-pending 2>&1 | tee "/tmp/${cluster}_rerun.log"; then

        SUCCESS=$((SUCCESS + 1))
        echo "✅ $cluster completed successfully"
    else
        FAILED=$((FAILED + 1))
        echo "❌ $cluster failed"
        echo "   Log saved to: /tmp/${cluster}_rerun.log"
    fi
done

echo ""
echo "=========================================="
echo "EXECUTION COMPLETE"
echo "=========================================="
echo ""
echo "Total processed: $TOTAL"
echo "Success: $SUCCESS"
echo "Failed: $FAILED"
echo ""
echo "Next steps:"
echo "1. Run: python3 analyze_invalid_outputs.py"
echo "2. Check for improvements in invalid metrics rate"
echo ""