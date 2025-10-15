#!/bin/bash

################################################################################
# Script: fix_c_cpp_clusters.sh
# Purpose: Re-execute tests for C/C++ languages in problematic clusters
# Based on validation reports in src/validation_reports/
#
# Usage:
#   chmod +x fix_c_cpp_clusters.sh
#   ./fix_c_cpp_clusters.sh
#
# Note: This script processes the top 10 most problematic clusters identified
#       in the validation report. Modify the 'clusters' array to add more.
################################################################################

# Top 10 problematic clusters from validation report
# Source: src/validation_reports/PROBLEMATIC_CLUSTERS.md
clusters=(
    "raindrops"           # 600 invalid C/C++ entries
    "leap"                # 540 invalid C/C++ entries
    "pangram"             # 421 invalid C/C++ entries
    "anagram"             # 210 invalid C++ entries
    "all_your_base"       # 139 invalid C++ entries
    "allergies"           # 130 invalid C++ entries
    "clock"               # 98 invalid C++ entries
    "word_count"          # 98 invalid C++ entries
    "grains"              # 90 invalid C++ entries
    "meetup"              # 83 invalid C++ entries
)

# Configuration
LANGUAGES="c,cpp"        # Languages to re-execute
RUN_QUANTITY=5           # Number of runs per cluster
PROMPT_VERSION=-1        # -1 = all prompt versions (v1-v4)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   C/C++ Cluster Re-execution Script                          ║${NC}"
echo -e "${BLUE}║   Based on validation reports                                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

total_clusters=${#clusters[@]}
current=0

# Start timestamp
start_time=$(date +%s)

echo -e "${YELLOW}Configuration:${NC}"
echo "  Languages: $LANGUAGES"
echo "  Runs per cluster: $RUN_QUANTITY"
echo "  Prompt versions: all (v1-v4)"
echo "  Total clusters: $total_clusters"
echo ""

# Process each cluster
for cluster in "${clusters[@]}"; do
    current=$((current + 1))

    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}Processing cluster [$current/$total_clusters]: ${GREEN}$cluster${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"

    # Base code re-execution
    echo -e "${YELLOW}→ Re-executing base code...${NC}"
    python run_tests_on_cluster.py \
        --cluster-name "$cluster" \
        --selective-rerun \
        --languages "$LANGUAGES" \
        --base-only \
        --run-quantity "$RUN_QUANTITY"

    base_status=$?
    if [ $base_status -eq 0 ]; then
        echo -e "${GREEN}✓ Base code completed successfully${NC}"
    else
        echo -e "${RED}✗ Base code failed with status $base_status${NC}"
    fi

    # LLM code re-execution (all prompt versions)
    echo ""
    echo -e "${YELLOW}→ Re-executing LLM code (all prompt versions)...${NC}"
    python run_tests_on_cluster.py \
        --cluster-name "$cluster" \
        --selective-rerun \
        --languages "$LANGUAGES" \
        --llm-only \
        --prompt-version "$PROMPT_VERSION" \
        --run-quantity "$RUN_QUANTITY"

    llm_status=$?
    if [ $llm_status -eq 0 ]; then
        echo -e "${GREEN}✓ LLM code completed successfully${NC}"
    else
        echo -e "${RED}✗ LLM code failed with status $llm_status${NC}"
    fi

    # Progress indicator
    progress=$((current * 100 / total_clusters))
    echo ""
    echo -e "${BLUE}Overall progress: $progress% ($current/$total_clusters clusters)${NC}"
done

# End timestamp and duration
end_time=$(date +%s)
duration=$((end_time - start_time))
hours=$((duration / 3600))
minutes=$(((duration % 3600) / 60))
seconds=$((duration % 60))

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Re-execution Complete                                       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✓ All $total_clusters clusters processed${NC}"
echo -e "${YELLOW}Total duration: ${hours}h ${minutes}m ${seconds}s${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Review execution reports in: src/execution_outputs/"
echo "  2. Re-run validation: python validate_execution_outputs.py"
echo "  3. Compare with previous validation reports"
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"