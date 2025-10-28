#!/bin/bash
# Script per ricostruire le immagini Docker C e C++ con i fix applicati

set -e

echo "=================================================="
echo "Rebuilding Docker Images for C and C++"
echo "=================================================="

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo "${YELLOW}Phase 1: Rebuilding C Docker Image${NC}"
echo "--------------------------------------------------"

cd "${SCRIPT_DIR}/c"

echo "Building test-runner-c image..."
if docker build -t test-runner-c --no-cache . ; then
    echo "${GREEN}✅ C Docker image built successfully${NC}"
else
    echo "${RED}❌ Failed to build C Docker image${NC}"
    exit 1
fi

echo ""
echo "${YELLOW}Phase 2: Rebuilding C++ Docker Image${NC}"
echo "--------------------------------------------------"

cd "${SCRIPT_DIR}/cpp"

echo "Building test-runner-cpp image..."
if docker build -t test-runner-cpp --no-cache . ; then
    echo "${GREEN}✅ C++ Docker image built successfully${NC}"
else
    echo "${RED}❌ Failed to build C++ Docker image${NC}"
    exit 1
fi

echo ""
echo "${GREEN}=================================================="
echo "All Docker images rebuilt successfully!"
echo "==================================================${NC}"

echo ""
echo "Next steps:"
echo "1. Run tests on a sample cluster to verify fixes:"
echo "   cd ${SCRIPT_DIR}/../run_tests_on_clusters"
echo "   python run_tests_on_cluster.py --cluster-name collatz_conjecture --num-executions 1"
echo ""
echo "2. If tests pass, run full test suite:"
echo "   python run_all_tests.py"
echo ""
echo "3. Re-analyze base code to verify improvements:"
echo "   cd ${SCRIPT_DIR}/../auto_fixer"
echo "   python analyze_base_code.py --export-csv --export-json"
echo ""
