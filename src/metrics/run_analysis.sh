#!/bin/bash

# ============================================================================
# Execution Metrics Analysis - Main Runner Script
# ============================================================================
# This script provides a convenient interface to run various analysis tasks
# ============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to print usage
print_usage() {
    cat << EOF
Usage: $0 [COMMAND] [OPTIONS]

Commands:
    validate        Validate all input data files
    analyze         Run full cross-cluster analysis and generate visualizations
    test            Run test mode with single cluster
    clean           Clean generated files
    help            Show this help message

Options:
    --cluster NAME  Specify cluster name for test mode
    --debug         Run in debug mode (verbose logging)

Examples:
    $0 validate                    # Validate all data files
    $0 analyze                     # Run full cross-cluster analysis
    $0 test --cluster accumulate   # Test with specific cluster
    $0 clean                       # Clean all generated files

EOF
}

# Function to check Python dependencies
check_dependencies() {
    print_info "Checking Python dependencies..."
    
    python3 -c "import numpy" 2>/dev/null || {
        print_error "numpy not installed. Run: pip install numpy"
        exit 1
    }
    
    python3 -c "import matplotlib" 2>/dev/null || {
        print_error "matplotlib not installed. Run: pip install matplotlib"
        exit 1
    }
    
    python3 -c "import seaborn" 2>/dev/null || {
        print_error "seaborn not installed. Run: pip install seaborn"
        exit 1
    }
    
    print_success "All dependencies installed"
}

# Function to validate data
run_validation() {
    print_info "Running data validation..."
    python3 "$SCRIPT_DIR/data_validator.py"
    
    if [ $? -eq 0 ]; then
        print_success "Validation completed"
    else
        print_error "Validation failed"
        exit 1
    fi
}

# Function to run full analysis
run_analysis() {
    local debug_flag=""

    if [ "$DEBUG_MODE" = true ]; then
        debug_flag="--debug"
    fi

    print_info "Running full cross-cluster analysis..."
    print_info "This will aggregate data from all clusters and generate visualizations..."
    print_info "This may take several minutes depending on the number of clusters..."

    python3 "$SCRIPT_DIR/main_exec_metrics_analysis.py" $debug_flag

    if [ $? -eq 0 ]; then
        print_success "Analysis and visualization completed successfully"
        print_info "Check the output directories for results"
    else
        print_error "Analysis failed"
        exit 1
    fi
}

# Function to run test analysis
run_test() {
    local cluster_name="${CLUSTER_NAME:-accumulate}"
    
    print_info "Running test analysis on cluster: $cluster_name"
    
    python3 "$SCRIPT_DIR/main_exec_metrics_analysis.py" --test --cluster "$cluster_name"
    
    if [ $? -eq 0 ]; then
        print_success "Test completed successfully"
    else
        print_error "Test failed"
        exit 1
    fi
}


# Function to clean generated files
clean_files() {
    print_warning "This will remove all generated statistics and plots"
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Cleaning generated files..."
        
        # Remove stats files
        if [ -d "$SCRIPT_DIR/../../metrics/execution_stats" ]; then
            rm -rf "$SCRIPT_DIR/../../metrics/execution_stats"
            print_success "Removed execution_stats directory"
        fi
        
        # Remove plots
        if [ -d "$SCRIPT_DIR/../../metrics/execution_stats_plots" ]; then
            rm -rf "$SCRIPT_DIR/../../metrics/execution_stats_plots"
            print_success "Removed execution_stats_plots directory"
        fi
        
        # Remove cross-cluster analysis
        if [ -d "$SCRIPT_DIR/../../metrics/cross_cluster_analysis" ]; then
            rm -rf "$SCRIPT_DIR/../../metrics/cross_cluster_analysis"
            print_success "Removed cross_cluster_analysis directory"
        fi
        
        # Remove validation reports
        if [ -d "$SCRIPT_DIR/../../metrics/validation_reports" ]; then
            rm -rf "$SCRIPT_DIR/../../metrics/validation_reports"
            print_success "Removed validation_reports directory"
        fi
        
        # Remove log files
        if [ -f "$SCRIPT_DIR/exec_metrics_analysis.log" ]; then
            rm "$SCRIPT_DIR/exec_metrics_analysis.log"
            print_success "Removed log file"
        fi
        
        print_success "Cleanup completed"
    else
        print_info "Cleanup cancelled"
    fi
}

# Function to show results directory
show_results() {
    print_info "Results directories:"
    echo "  - Statistics: ../../metrics/execution_stats"
    echo "  - Plots: ../../metrics/execution_stats_plots"
    echo "  - Cross-cluster: ../../metrics/cross_cluster_analysis"
    echo "  - Validation: ../../metrics/validation_reports"
}

# Main script logic
main() {
    # Parse arguments
    COMMAND="${1:-help}"
    shift || true
    
    DEBUG_MODE=false
    CLUSTER_NAME=""

    while [[ $# -gt 0 ]]; do
        case $1 in
            --debug)
                DEBUG_MODE=true
                shift
                ;;
            --cluster)
                CLUSTER_NAME="$2"
                shift 2
                ;;
            *)
                print_error "Unknown option: $1"
                print_usage
                exit 1
                ;;
        esac
    done
    
    # Print header
    echo "================================================================================"
    echo "                    Execution Metrics Analysis Tool                           "
    echo "================================================================================"
    echo ""
    
    # Execute command
    case $COMMAND in
        validate)
            check_dependencies
            run_validation
            ;;
        analyze)
            check_dependencies
            run_analysis
            show_results
            ;;
        test)
            check_dependencies
            run_test
            show_results
            ;;
        clean)
            clean_files
            ;;
        help|--help|-h)
            print_usage
            exit 0
            ;;
        *)
            print_error "Unknown command: $COMMAND"
            print_usage
            exit 1
            ;;
    esac
    
    echo ""
    echo "================================================================================"
    print_success "Done!"
    echo "================================================================================"
}

# Run main function
main "$@"