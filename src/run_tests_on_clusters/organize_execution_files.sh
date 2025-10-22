#!/bin/bash

################################################################################
# Script: organize_execution_files.sh
# Purpose: Organize backup and selective execution report files
#
# This script:
# 1. Moves all *_backup_*.json files to src/backup_executions/
# 2. Moves all *_selective_execution_*.json files to src/execution_reports/
#
# Usage:
#   chmod +x organize_execution_files.sh
#   ./organize_execution_files.sh
#
# 
# Date: 2025-10-15
################################################################################

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/../execution_outputs"
BACKUP_DIR="$SCRIPT_DIR/../backup_executions"
REPORTS_DIR="$SCRIPT_DIR/../execution_reports"

# Statistics
backup_moved=0
reports_moved=0
backup_skipped=0
reports_skipped=0
errors=0

################################################################################
# Functions
################################################################################

print_header() {
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║   Execution Files Organizer                                  ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

create_directories() {
    echo -e "${CYAN}Creating target directories...${NC}"

    mkdir -p "$BACKUP_DIR"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Backup directory ready: ${BACKUP_DIR}${NC}"
    else
        echo -e "${RED}✗ Failed to create backup directory${NC}"
        return 1
    fi

    mkdir -p "$REPORTS_DIR"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Reports directory ready: ${REPORTS_DIR}${NC}"
    else
        echo -e "${RED}✗ Failed to create reports directory${NC}"
        return 1
    fi

    echo ""
    return 0
}

count_files() {
    local backup_count=$(find "$SOURCE_DIR" -maxdepth 1 -name "*_backup_*.json" 2>/dev/null | wc -l)
    local reports_count=$(find "$SOURCE_DIR" -maxdepth 1 -name "*_selective_execution_*.json" 2>/dev/null | wc -l)

    echo -e "${CYAN}Files found in ${SOURCE_DIR}:${NC}"
    echo -e "  Backup files (*_backup_*.json):                    ${YELLOW}${backup_count}${NC}"
    echo -e "  Selective execution reports (*_selective_*.json):  ${YELLOW}${reports_count}${NC}"
    echo ""

    if [ "$backup_count" -eq 0 ] && [ "$reports_count" -eq 0 ]; then
        echo -e "${GREEN}✓ No files to organize. Everything is clean!${NC}"
        return 1
    fi

    return 0
}

move_backup_files() {
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}MOVING BACKUP FILES${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""

    local count=0
    local total=$(find "$SOURCE_DIR" -maxdepth 1 -name "*_backup_*.json" 2>/dev/null | wc -l)

    if [ "$total" -eq 0 ]; then
        echo -e "${YELLOW}No backup files to move${NC}"
        echo ""
        return 0
    fi

    while IFS= read -r -d '' file; do
        count=$((count + 1))
        local filename=$(basename "$file")
        local destination="$BACKUP_DIR/$filename"

        echo -e "[${count}/${total}] Moving ${CYAN}${filename}${NC}..."

        # Check if destination exists
        if [ -f "$destination" ]; then
            echo -e "  ${YELLOW}⚠ Skipped: already exists in destination${NC}"
            backup_skipped=$((backup_skipped + 1))
        else
            # Move the file
            mv "$file" "$destination" 2>/dev/null

            if [ $? -eq 0 ]; then
                echo -e "  ${GREEN}✓ Moved to backup_executions/${NC}"
                backup_moved=$((backup_moved + 1))
            else
                echo -e "  ${RED}✗ Error moving file${NC}"
                errors=$((errors + 1))
            fi
        fi
    done < <(find "$SOURCE_DIR" -maxdepth 1 -name "*_backup_*.json" -print0 2>/dev/null)

    echo ""
}

move_report_files() {
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}MOVING SELECTIVE EXECUTION REPORTS${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""

    local count=0
    local total=$(find "$SOURCE_DIR" -maxdepth 1 -name "*_selective_execution_*.json" 2>/dev/null | wc -l)

    if [ "$total" -eq 0 ]; then
        echo -e "${YELLOW}No report files to move${NC}"
        echo ""
        return 0
    fi

    while IFS= read -r -d '' file; do
        count=$((count + 1))
        local filename=$(basename "$file")
        local destination="$REPORTS_DIR/$filename"

        echo -e "[${count}/${total}] Moving ${CYAN}${filename}${NC}..."

        # Check if destination exists
        if [ -f "$destination" ]; then
            echo -e "  ${YELLOW}⚠ Skipped: already exists in destination${NC}"
            reports_skipped=$((reports_skipped + 1))
        else
            # Move the file
            mv "$file" "$destination" 2>/dev/null

            if [ $? -eq 0 ]; then
                echo -e "  ${GREEN}✓ Moved to execution_reports/${NC}"
                reports_moved=$((reports_moved + 1))
            else
                echo -e "  ${RED}✗ Error moving file${NC}"
                errors=$((errors + 1))
            fi
        fi
    done < <(find "$SOURCE_DIR" -maxdepth 1 -name "*_selective_execution_*.json" -print0 2>/dev/null)

    echo ""
}

print_summary() {
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║   Organization Summary                                        ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    echo -e "${GREEN}Backup files moved:${NC}            $backup_moved"
    echo -e "${GREEN}Report files moved:${NC}            $reports_moved"

    local total_moved=$((backup_moved + reports_moved))
    local total_skipped=$((backup_skipped + reports_skipped))

    if [ "$total_skipped" -gt 0 ]; then
        echo -e "${YELLOW}Files skipped (already exist):${NC} $total_skipped"
    fi

    if [ "$errors" -gt 0 ]; then
        echo -e "${RED}Errors encountered:${NC}            $errors"
    fi

    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""

    if [ "$total_moved" -gt 0 ]; then
        echo -e "${GREEN}Files organized into:${NC}"
        echo -e "  ${CYAN}Backups:${NC}  $BACKUP_DIR"
        echo -e "  ${CYAN}Reports:${NC}  $REPORTS_DIR"
        echo ""
    fi
}

################################################################################
# Main
################################################################################

main() {
    print_header

    # Verify source directory exists
    if [ ! -d "$SOURCE_DIR" ]; then
        echo -e "${RED}✗ Error: Source directory does not exist: ${SOURCE_DIR}${NC}"
        exit 1
    fi

    echo -e "${CYAN}Source directory: ${SOURCE_DIR}${NC}"
    echo ""

    # Create target directories
    create_directories
    if [ $? -ne 0 ]; then
        exit 1
    fi

    # Count files
    count_files
    if [ $? -ne 0 ]; then
        exit 0
    fi

    # Ask for confirmation
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}Ready to organize files.${NC}"
    read -p "Proceed? [Y/n]: " -n 1 -r
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo ""

    if [[ ! $REPLY =~ ^[Yy]$ ]] && [[ -n $REPLY ]]; then
        echo -e "${YELLOW}Operation cancelled by user.${NC}"
        exit 0
    fi

    # Move files
    move_backup_files
    move_report_files

    # Print summary
    print_summary

    # Exit with appropriate code
    if [ "$errors" -gt 0 ]; then
        exit 1
    else
        exit 0
    fi
}

# Run main function
main
