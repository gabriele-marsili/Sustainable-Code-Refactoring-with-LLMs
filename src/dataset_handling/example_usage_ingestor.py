"""
Example usage of GitHub Ingestor

This file demonstrates how to use the github_ingestor module programmatically
for different use cases.
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from dataset_handling.github_ingestor import GitHubIngestor
from utility_dir.utility_paths import DATASET_DIR, CLUSTERS_DIR_FILEPATH
from utility_dir.general_utils import load_github_token


def example_1_basic_usage():
    """
    Example 1: Basic usage with default settings
    """
    print("=" * 60)
    print("Example 1: Basic Usage")
    print("=" * 60)

    # Load GitHub token (optional but recommended)
    token = load_github_token()

    # Initialize ingestor
    ingestor = GitHubIngestor(
        dataset_dir=DATASET_DIR,
        clusters_dir=CLUSTERS_DIR_FILEPATH,
        github_token=token
    )

    # Run with default settings (10 repos, 20 entries per language)
    ingestor.run(
        languages=['c', 'cpp'],
        max_repos=10,
        max_entries=20
    )


def example_2_c_only():
    """
    Example 2: Ingest only C language entries
    """
    print("=" * 60)
    print("Example 2: C Language Only")
    print("=" * 60)

    token = load_github_token()

    ingestor = GitHubIngestor(
        dataset_dir=DATASET_DIR,
        clusters_dir=CLUSTERS_DIR_FILEPATH,
        github_token=token
    )

    # Only process C language
    ingestor.run(
        languages=['c'],
        max_repos=15,
        max_entries=30
    )


def example_3_high_volume():
    """
    Example 3: High volume ingestion
    """
    print("=" * 60)
    print("Example 3: High Volume Ingestion")
    print("=" * 60)

    token = load_github_token()

    if not token:
        print("WARNING: High volume ingestion requires GitHub token!")
        print("Run: python src/main.py --setup-token")
        return

    ingestor = GitHubIngestor(
        dataset_dir=DATASET_DIR,
        clusters_dir=CLUSTERS_DIR_FILEPATH,
        github_token=token
    )

    # Process many repositories and entries
    ingestor.run(
        languages=['c', 'cpp'],
        max_repos=50,
        max_entries=100
    )


def example_4_custom_search():
    """
    Example 4: Custom search and selective processing
    """
    print("=" * 60)
    print("Example 4: Custom Search and Selective Processing")
    print("=" * 60)

    token = load_github_token()

    ingestor = GitHubIngestor(
        dataset_dir=DATASET_DIR,
        clusters_dir=CLUSTERS_DIR_FILEPATH,
        github_token=token
    )

    # Search for C repositories
    c_repos = ingestor.search_exercism_repos('c', max_repos=20)

    print(f"\nFound {len(c_repos)} C repositories")
    print("\nTop 5 repositories by stars:")

    for i, repo in enumerate(c_repos[:5], 1):
        print(f"  {i}. {repo['full_name']} - {repo['stargazers_count']} ⭐")

    # Process only specific exercises
    print("\nProcessing selected repositories...")

    for repo in c_repos[:5]:  # Process only top 5
        entries = ingestor.explore_repo_for_exercises(repo, 'c')
        print(f"\n{repo['name']}: Found {len(entries)} valid entries")

        for entry in entries[:3]:  # Process max 3 entries per repo
            print(f"  - {entry.exercise_name}")
            source_clean = entry.repo_owner.replace(" ", "_")
            entry_dir_name = f"{entry.exercise_name}_exercism-{source_clean}"

            if ingestor.download_and_save_entry(entry):
                ingestor.update_cluster_json(entry, entry_dir_name)
                print(f"    ✓ Ingested successfully")


def example_5_validation_only():
    """
    Example 5: Search and validate without ingesting (dry run)
    """
    print("=" * 60)
    print("Example 5: Validation Only (Dry Run)")
    print("=" * 60)

    token = load_github_token()

    ingestor = GitHubIngestor(
        dataset_dir=DATASET_DIR,
        clusters_dir=CLUSTERS_DIR_FILEPATH,
        github_token=token
    )

    # Statistics
    stats = {
        'repos_searched': 0,
        'exercises_found': 0,
        'valid_entries': 0,
        'duplicates': 0
    }

    for language in ['c', 'cpp']:
        print(f"\n{'='*40}")
        print(f"Scanning {language.upper()} repositories...")
        print(f"{'='*40}")

        repos = ingestor.search_exercism_repos(language, max_repos=10)
        stats['repos_searched'] += len(repos)

        for repo in repos:
            entries = ingestor.explore_repo_for_exercises(repo, language)
            stats['exercises_found'] += len(entries)

            for entry in entries:
                if ingestor.duplicate_checker.is_duplicate(entry):
                    stats['duplicates'] += 1
                else:
                    stats['valid_entries'] += 1
                    print(f"  ✓ {entry.exercise_name} ({entry.repo_owner})")

    # Print summary
    print(f"\n{'='*60}")
    print("VALIDATION SUMMARY (NO FILES DOWNLOADED)")
    print(f"{'='*60}")
    print(f"Repositories searched: {stats['repos_searched']}")
    print(f"Exercises found: {stats['exercises_found']}")
    print(f"Valid new entries: {stats['valid_entries']}")
    print(f"Duplicates skipped: {stats['duplicates']}")
    print(f"{'='*60}")


def main():
    """
    Run examples based on user choice
    """
    print("\n" + "="*60)
    print("GitHub Ingestor - Usage Examples")
    print("="*60)
    print("\nAvailable examples:")
    print("1. Basic usage (default settings)")
    print("2. C language only")
    print("3. High volume ingestion")
    print("4. Custom search and selective processing")
    print("5. Validation only (dry run)")
    print("0. Exit")

    choice = input("\nSelect example (0-5): ").strip()

    if choice == '1':
        example_1_basic_usage()
    elif choice == '2':
        example_2_c_only()
    elif choice == '3':
        example_3_high_volume()
    elif choice == '4':
        example_4_custom_search()
    elif choice == '5':
        example_5_validation_only()
    elif choice == '0':
        print("Exiting...")
    else:
        print("Invalid choice!")


if __name__ == "__main__":
    main()
