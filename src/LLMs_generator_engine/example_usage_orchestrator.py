"""
Example usage of LLM Orchestrator

This file demonstrates how to use the run_llm_and_similarity module
for different scenarios.
"""

import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from LLMs_generator_engine.run_llm_and_similarity import (
    LLMOrchestrator,
    OrphanEntryDiscovery
)


def example_1_discover_orphans():
    """
    Example 1: Discover orphan entries without generating
    """
    print("="*60)
    print("Example 1: Discover Orphan Entries")
    print("="*60)

    discovery = OrphanEntryDiscovery(target_languages=['c', 'cpp'])
    orphans = discovery.scan_clusters()

    print(f"\nFound {len(orphans)} orphan entries:")

    for orphan in orphans:
        print(f"\n  ID: {orphan.entry_id}")
        print(f"  Language: {orphan.language}")
        print(f"  Cluster: {orphan.cluster_name}")
        print(f"  LLMs: {orphan.current_llm_count}/12")
        print(f"  File: {orphan.filename}")


def example_2_process_single_entry():
    """
    Example 2: Process only one orphan entry
    """
    print("="*60)
    print("Example 2: Process Single Entry")
    print("="*60)

    orchestrator = LLMOrchestrator(target_languages=['c', 'cpp'])

    # Process only 1 entry
    stats = orchestrator.run(max_entries=1)

    print(f"\nProcessing complete!")
    print(f"Entries processed: {stats['entries_processed']}")
    print(f"Variants generated: {stats['variants_generated']}")


def example_3_process_c_only():
    """
    Example 3: Process only C language entries
    """
    print("="*60)
    print("Example 3: Process C Language Only")
    print("="*60)

    orchestrator = LLMOrchestrator(target_languages=['c'])

    stats = orchestrator.run(max_entries=5)

    print(f"\nProcessing complete!")
    print(f"Success rate: {(stats['entries_successful'] / stats['entries_processed'] * 100) if stats['entries_processed'] > 0 else 0:.1f}%")


def example_4_full_batch():
    """
    Example 4: Process all orphan entries (full batch)
    """
    print("="*60)
    print("Example 4: Full Batch Processing")
    print("="*60)

    print("\nWARNING: This will process ALL orphan entries!")
    print("This may take a long time and consume API credits.")

    response = input("\nProceed? (yes/no): ")
    if response.lower() != 'yes':
        print("Cancelled.")
        return

    orchestrator = LLMOrchestrator(target_languages=['c', 'cpp'])

    # No max_entries = process all
    stats = orchestrator.run()

    print(f"\nBatch processing complete!")
    print(f"Total orphans found: {stats['orphans_found']}")
    print(f"Entries processed: {stats['entries_processed']}")
    print(f"Variants generated: {stats['variants_generated']}")
    print(f"Success rate: {(stats['entries_successful'] / stats['entries_processed'] * 100) if stats['entries_processed'] > 0 else 0:.1f}%")


def example_5_check_specific_cluster():
    """
    Example 5: Check if a specific cluster has orphans
    """
    print("="*60)
    print("Example 5: Check Specific Cluster")
    print("="*60)

    cluster_name = input("Enter cluster name (e.g., 'hamming'): ").strip()

    discovery = OrphanEntryDiscovery(target_languages=['c', 'cpp'])
    all_orphans = discovery.scan_clusters()

    # Filter by cluster name
    cluster_orphans = [o for o in all_orphans if o.cluster_name == cluster_name]

    if not cluster_orphans:
        print(f"\n✅ No orphans found in cluster '{cluster_name}'")
        print("All entries are complete!")
    else:
        print(f"\nFound {len(cluster_orphans)} orphans in cluster '{cluster_name}':")
        for orphan in cluster_orphans:
            print(f"  - {orphan.entry_id}: {orphan.current_llm_count}/12 LLMs")

        response = input(f"\nProcess these {len(cluster_orphans)} orphans? (yes/no): ")
        if response.lower() == 'yes':
            # Note: This would require filtering in the orchestrator
            # For now, we'll just process up to the count
            orchestrator = LLMOrchestrator(target_languages=['c', 'cpp'])
            stats = orchestrator.run(max_entries=len(cluster_orphans))

            print(f"\nProcessed {stats['entries_processed']} entries")


def example_6_estimate_costs():
    """
    Example 6: Estimate API costs before processing
    """
    print("="*60)
    print("Example 6: Estimate API Costs")
    print("="*60)

    discovery = OrphanEntryDiscovery(target_languages=['c', 'cpp'])
    orphans = discovery.scan_clusters()

    print(f"\nFound {len(orphans)} orphan entries")

    # Calculate missing variants
    total_missing_variants = 0
    for orphan in orphans:
        missing = 12 - orphan.current_llm_count
        total_missing_variants += missing

    print(f"Missing variants: {total_missing_variants}")

    # Cost estimates (approximate)
    cost_per_variant = 0.02  # Average ~$0.02 per variant
    estimated_cost = total_missing_variants * cost_per_variant

    print(f"\nEstimated API costs:")
    print(f"  - Per variant: ${cost_per_variant:.3f}")
    print(f"  - Total: ${estimated_cost:.2f}")

    # Time estimate
    time_per_variant = 10  # seconds (approximate)
    total_time_seconds = total_missing_variants * time_per_variant
    total_time_minutes = total_time_seconds / 60

    print(f"\nEstimated processing time:")
    print(f"  - Per variant: ~{time_per_variant} seconds")
    print(f"  - Total: ~{total_time_minutes:.1f} minutes")


def example_7_dry_run_with_details():
    """
    Example 7: Dry run with detailed information
    """
    print("="*60)
    print("Example 7: Dry Run with Details")
    print("="*60)

    discovery = OrphanEntryDiscovery(target_languages=['c', 'cpp'])
    orphans = discovery.scan_clusters()

    print(f"\nFound {len(orphans)} orphan entries\n")

    # Group by cluster
    clusters = {}
    for orphan in orphans:
        if orphan.cluster_name not in clusters:
            clusters[orphan.cluster_name] = []
        clusters[orphan.cluster_name].append(orphan)

    print(f"Clusters with orphans: {len(clusters)}\n")

    for cluster_name, cluster_orphans in sorted(clusters.items()):
        print(f"📦 Cluster: {cluster_name}")
        print(f"   Orphans: {len(cluster_orphans)}")

        for orphan in cluster_orphans:
            missing = 12 - orphan.current_llm_count
            print(f"     - {orphan.entry_id} ({orphan.language}): {missing} variants needed")

        print()


def main():
    """
    Run examples based on user choice
    """
    print("\n" + "="*60)
    print("LLM Orchestrator - Usage Examples")
    print("="*60)
    print("\nAvailable examples:")
    print("1. Discover orphan entries (no generation)")
    print("2. Process single entry (test mode)")
    print("3. Process C language only")
    print("4. Full batch processing (all orphans)")
    print("5. Check specific cluster")
    print("6. Estimate API costs")
    print("7. Dry run with detailed information")
    print("0. Exit")

    choice = input("\nSelect example (0-7): ").strip()

    if choice == '1':
        example_1_discover_orphans()
    elif choice == '2':
        example_2_process_single_entry()
    elif choice == '3':
        example_3_process_c_only()
    elif choice == '4':
        example_4_full_batch()
    elif choice == '5':
        example_5_check_specific_cluster()
    elif choice == '6':
        example_6_estimate_costs()
    elif choice == '7':
        example_7_dry_run_with_details()
    elif choice == '0':
        print("Exiting...")
    else:
        print("Invalid choice!")


if __name__ == "__main__":
    main()
