#!/bin/bash
#
# run_new_c_cpp_entries.sh
#
# Orchestrates the complete test execution and metrics analysis workflow
# for newly ingested C/C++ entries from GitHub.
#
# Workflow:
#   1. Identify clusters containing new C/C++ entries with completed LLM generation
#   2. Run tests (base + all LLM variants) with 5 executions each
#   3. Validate results using unified analyzer
#   4. Regenerate complete metrics analysis
#
# Usage:
#   ./run_new_c_cpp_entries.sh [--dry-run] [--max-clusters N]
#
# Options:
#   --dry-run         Show what would be executed without running
#   --max-clusters N  Limit to first N clusters (for testing)
#   --help            Show this help message
#

set -e  # Exit on any error
set -u  # Exit on undefined variable
set -o pipefail  # Exit on pipe failure

# ============================================================================
# CONFIGURATION
# ============================================================================

# Project root directory
CURRENT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$CURRENT_ROOT")")"

SRC_DIR="${PROJECT_ROOT}/src"

# Script paths
FIND_CLUSTERS_SCRIPT="${SRC_DIR}/run_tests_on_clusters/find_new_c_cpp_clusters.py"
RUN_TESTS_SCRIPT="${SRC_DIR}/run_tests_on_clusters/run_tests_on_cluster.py"
METRICS_SCRIPT="${SRC_DIR}/metrics/main_exec_metrics_analysis.py"

# Output directories
EXECUTION_OUTPUTS="${SRC_DIR}/execution_outputs"
EXECUTION_REPORTS="${SRC_DIR}/execution_reports"
METRICS_DIR="${SRC_DIR}/metrics"

# Execution parameters
NUM_EXECUTIONS=5
MIN_LLM_VARIANTS=12

# Parse command-line arguments
DRY_RUN=false
MAX_CLUSTERS=""
SHOW_HELP=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --max-clusters)
            MAX_CLUSTERS="$2"
            shift 2
            ;;
        --help)
            SHOW_HELP=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

if [ "$SHOW_HELP" = true ]; then
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Orchestrates test execution and metrics analysis for new C/C++ entries."
    echo ""
    echo "Options:"
    echo "  --dry-run         Show what would be executed without running"
    echo "  --max-clusters N  Limit processing to first N clusters"
    echo "  --help            Show this help message"
    echo ""
    echo "Workflow:"
    echo "  1. Identify new C/C++ clusters (source='exercism-*', LLMs>=12)"
    echo "  2. Run tests for each cluster (${NUM_EXECUTIONS} executions, base + all LLM variants)"
    echo "  3. Validate results with unified analyzer"
    echo "  4. Regenerate complete metrics analysis"
    exit 0
fi

# ============================================================================
# LOGGING SETUP
# ============================================================================

LOG_FILE="${PROJECT_ROOT}/run_new_entries_$(date +%Y%m%d_%H%M%S).log"

log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    # Output to both stderr and log file (to avoid interfering with stdout captures)
    echo "[${timestamp}] [${level}] ${message}" | tee -a "${LOG_FILE}" >&2
}

log_info() {
    log "INFO" "$@"
}

log_error() {
    log "ERROR" "$@"
}

log_success() {
    log "SUCCESS" "$@"
}

log_warning() {
    log "WARNING" "$@"
}

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

check_prerequisites() {
    log_info "Checking prerequisites..."

    # Check Python
    if ! command -v python3 &> /dev/null; then
        log_error "Python 3 is not installed or not in PATH"
        exit 1
    fi

    # Check required scripts
    local required_scripts=(
        "$FIND_CLUSTERS_SCRIPT"
        "$RUN_TESTS_SCRIPT"
        "$METRICS_SCRIPT"
    )

    for script in "${required_scripts[@]}"; do
        if [ ! -f "$script" ]; then
            log_error "Required script not found: $script"
            exit 1
        fi
    done

    # Check required directories
    if [ ! -d "$SRC_DIR" ]; then
        log_error "Source directory not found: $SRC_DIR"
        exit 1
    fi

    log_success "All prerequisites met"
}

# ============================================================================
# PHASE 1: CLUSTER IDENTIFICATION
# ============================================================================

identify_target_clusters() {
    log_info "============================================================"
    log_info "PHASE 1: Identifying target clusters"
    log_info "============================================================"

    log_info "Finding clusters with new C/C++ entries (exercism-*, LLMs>=${MIN_LLM_VARIANTS})..."

    # Get count first for logging
    local count
    count=$(python3 "$FIND_CLUSTERS_SCRIPT" --min-llms "$MIN_LLM_VARIANTS" --format count)
    log_info "Found $count clusters with new C/C++ entries"

    # Get actual cluster list (without verbose to avoid mixing output)
    local all_clusters
    all_clusters=$(python3 "$FIND_CLUSTERS_SCRIPT" --min-llms "$MIN_LLM_VARIANTS" --format space)

    if [ -z "$all_clusters" ]; then
        log_warning "No clusters found with new C/C++ entries"
        log_info "This might mean:"
        log_info "  - All entries have already been processed"
        log_info "  - LLM generation is not complete (need ${MIN_LLM_VARIANTS} variants)"
        log_info "  - No entries match the criteria (source='exercism-*')"
        exit 0
    fi

    # Convert to array
    read -ra CLUSTER_ARRAY <<< "$all_clusters"

    # Apply max-clusters limit if specified
    if [ -n "$MAX_CLUSTERS" ]; then
        log_info "Limiting to first $MAX_CLUSTERS clusters (--max-clusters flag)"
        CLUSTER_ARRAY=("${CLUSTER_ARRAY[@]:0:$MAX_CLUSTERS}")
    fi

    log_success "Found ${#CLUSTER_ARRAY[@]} clusters to process"

    echo "${CLUSTER_ARRAY[@]}"
}

# ============================================================================
# PHASE 2: TEST EXECUTION
# ============================================================================

run_tests_for_clusters() {
    local clusters=("$@")
    local total=${#clusters[@]}
    local current=0
    local failed_clusters=()

    log_info "============================================================"
    log_info "PHASE 2: Running tests for all clusters"
    log_info "============================================================"
    log_info "Total clusters: $total"
    log_info "Executions per cluster: $NUM_EXECUTIONS (base + all LLM variants)"
    log_info ""

    for cluster in "${clusters[@]}"; do
        ((current++))

        log_info "------------------------------------------------------------"
        log_info "Processing cluster $current/$total: $cluster"
        log_info "------------------------------------------------------------"

        local cmd="python3 \"$RUN_TESTS_SCRIPT\" \
            --cluster-name \"$cluster\" \
            --full \
            --run-quantity $NUM_EXECUTIONS \
            --languages c,cpp \
            --not-check-pending"

        if [ "$DRY_RUN" = true ]; then
            log_info "[DRY-RUN] Would execute: $cmd"
            continue
        fi

        log_info "Executing: $cmd"

        if eval "$cmd" 2>&1 | tee -a "${LOG_FILE}"; then
            log_success "✅ Cluster '$cluster' completed successfully"
        else
            log_error "❌ Cluster '$cluster' failed"
            failed_clusters+=("$cluster")
        fi

        log_info ""
    done

    # Report failures
    if [ ${#failed_clusters[@]} -gt 0 ]; then
        log_warning "============================================================"
        log_warning "PHASE 2 SUMMARY: Some clusters failed"
        log_warning "============================================================"
        log_warning "Failed clusters (${#failed_clusters[@]}):"
        for cluster in "${failed_clusters[@]}"; do
            log_warning "  - $cluster"
        done
        log_warning ""
        log_warning "Continuing with validation and metrics analysis..."
    else
        log_success "============================================================"
        log_success "PHASE 2 COMPLETE: All clusters tested successfully"
        log_success "============================================================"
    fi
}

# ============================================================================
# PHASE 3: RESULT VALIDATION
# ============================================================================

validate_results() {
    local clusters=("$@")

    log_info "============================================================"
    log_info "PHASE 3: Validating test results"
    log_info "============================================================"

    # Check if unified_analyzer exists
    if [ ! -f "${SRC_DIR}/unified_analyzer.py" ]; then
        log_warning "Unified analyzer not found, skipping validation phase"
        return
    fi

    # Build cluster list for analyzer
    local cluster_args=""
    for cluster in "${clusters[@]}"; do
        cluster_args="$cluster_args $cluster"
    done

    local cmd="python3 -m src.unified_analyzer analyze \
        --clusters $cluster_args \
        --modes all \
        --root-cause"

    if [ "$DRY_RUN" = true ]; then
        log_info "[DRY-RUN] Would execute: $cmd"
        return
    fi

    log_info "Running unified analyzer for root cause analysis..."
    log_info "Executing: $cmd"

    if cd "$PROJECT_ROOT" && eval "$cmd" 2>&1 | tee -a "${LOG_FILE}"; then
        log_success "✅ Validation complete"
    else
        log_warning "⚠️  Validation completed with warnings/errors"
        log_info "Check the logs for details: ${LOG_FILE}"
    fi

    log_info ""
}

# ============================================================================
# PHASE 4: METRICS REGENERATION
# ============================================================================

regenerate_metrics() {
    log_info "============================================================"
    log_info "PHASE 4: Regenerating complete metrics analysis"
    log_info "============================================================"

    log_info "This will regenerate ALL statistics including:"
    log_info "  - Execution statistics (execution_stats/)"
    log_info "  - Visualization plots (execution_stats_plots/)"
    log_info "  - Statistical reports (execution_reports/)"
    log_info ""

    local cmd="python3 \"$METRICS_SCRIPT\""

    if [ "$DRY_RUN" = true ]; then
        log_info "[DRY-RUN] Would execute: $cmd"
        return
    fi

    log_info "Executing: $cmd"

    if eval "$cmd" 2>&1 | tee -a "${LOG_FILE}"; then
        log_success "✅ Metrics analysis complete"
    else
        log_error "❌ Metrics analysis failed"
        log_error "Check the logs for details: ${LOG_FILE}"
        return 1
    fi

    log_info ""
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================

main() {
    local start_time=$(date +%s)

    log_info "============================================================"
    log_info "NEW C/C++ ENTRIES - TEST & ANALYSIS WORKFLOW"
    log_info "============================================================"
    log_info "Started at: $(date)"
    log_info "Log file: ${LOG_FILE}"
    log_info ""

    if [ "$DRY_RUN" = true ]; then
        log_warning "DRY-RUN MODE: No actual execution will occur"
        log_info ""
    fi

    # Check prerequisites
    check_prerequisites

    # Phase 1: Identify clusters
    local clusters
    clusters=$(identify_target_clusters)
    read -ra cluster_array <<< "$clusters"

    if [ ${#cluster_array[@]} -eq 0 ]; then
        log_info "No clusters to process. Exiting."
        exit 0
    fi

    # Phase 2: Run tests
    run_tests_for_clusters "${cluster_array[@]}"

    # Phase 3: Validate results
    validate_results "${cluster_array[@]}"

    # Phase 4: Regenerate metrics
    regenerate_metrics

    # Final summary
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    local hours=$((duration / 3600))
    local minutes=$(( (duration % 3600) / 60 ))
    local seconds=$((duration % 60))

    log_info "============================================================"
    log_success "WORKFLOW COMPLETE"
    log_info "============================================================"
    log_info "Processed clusters: ${#cluster_array[@]}"
    log_info "Total duration: ${hours}h ${minutes}m ${seconds}s"
    log_info "Log file: ${LOG_FILE}"
    log_info "Finished at: $(date)"
    log_info "============================================================"
}

# Run main function
main
