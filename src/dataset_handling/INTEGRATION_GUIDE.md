# Integration Guide: Adding GitHub Ingestor to main.py

This guide shows how to integrate the GitHub Ingestor into the main project CLI (`src/main.py`) to provide a seamless user experience.

## Option 1: Add as a New Command-Line Argument

Add a new argument to `main.py` for running the ingestor:

### Step 1: Import the Ingestor

Add to imports section in `main.py`:
```python
from dataset_handling.github_ingestor import GitHubIngestor
```

### Step 2: Add Command-Line Argument

In the argument parser section:
```python
parser.add_argument(
    '--ingest-github',
    action='store_true',
    help='Ingest new C/C++ entries from GitHub Exercism repositories'
)

parser.add_argument(
    '--ingest-languages',
    nargs='+',
    choices=['c', 'cpp'],
    default=['c', 'cpp'],
    help='Languages to ingest (default: c cpp)'
)

parser.add_argument(
    '--ingest-max-repos',
    type=int,
    default=10,
    help='Maximum repositories to search per language (default: 10)'
)

parser.add_argument(
    '--ingest-max-entries',
    type=int,
    default=20,
    help='Maximum entries to ingest per language (default: 20)'
)
```

### Step 3: Add Handler Function

Add this function to handle the ingestor:
```python
def run_github_ingestor(args):
    """Run the GitHub ingestor to add new C/C++ entries"""
    from utility_dir.utility_paths import DATASET_DIR, CLUSTERS_DIR_FILEPATH
    from utility_dir.general_utils import load_github_token

    print("="*60)
    print("GitHub Ingestor - Automated Entry Collection")
    print("="*60)

    # Load GitHub token
    token = load_github_token()
    if not token:
        print("\nWARNING: No GitHub token found.")
        print("Without a token, API rate limits are strict (60 requests/hour).")
        print("To setup a token, run: python main.py --setup-token")
        response = input("\nContinue without token? (y/n): ")
        if response.lower() != 'y':
            print("Exiting...")
            return

    # Initialize ingestor
    ingestor = GitHubIngestor(
        dataset_dir=DATASET_DIR,
        clusters_dir=CLUSTERS_DIR_FILEPATH,
        github_token=token
    )

    # Run ingestion
    ingestor.run(
        languages=args.ingest_languages,
        max_repos=args.ingest_max_repos,
        max_entries=args.ingest_max_entries
    )

    print("\n✅ Ingestion complete!")
    print("\nNext steps:")
    print("  1. Run: python main.py --create-focused-cluster")
    print("  2. Run: python main.py --generate-llm-improvements")
    print("  3. Run: python main.py --run-tests")
```

### Step 4: Add to Main Logic

In the main execution logic of `main.py`:
```python
if args.ingest_github:
    run_github_ingestor(args)
    return
```

### Usage Example

After integration, users can run:
```bash
# Basic ingestion
python main.py --ingest-github

# C only with custom limits
python main.py --ingest-github --ingest-languages c --ingest-max-entries 50

# Both languages, high volume
python main.py --ingest-github --ingest-languages c cpp --ingest-max-repos 30 --ingest-max-entries 100
```

## Option 2: Add to Interactive Menu

If `main.py` has an interactive menu, add a new option:

```python
def show_menu():
    print("\n" + "="*60)
    print("Sustainable Code Refactoring with LLMs - Main Menu")
    print("="*60)
    print("\nDataset Management:")
    print("  1. Add sources manually")
    print("  2. Ingest from GitHub (C/C++ Exercism) [NEW]")
    print("  3. View dataset statistics")
    print("  4. Create focused clusters")
    # ... rest of menu

def handle_menu_option(choice):
    if choice == '2':
        run_github_ingestor_interactive()
    # ... rest of handlers

def run_github_ingestor_interactive():
    """Interactive GitHub ingestion"""
    print("\n" + "="*60)
    print("GitHub Ingestor - Interactive Mode")
    print("="*60)

    # Get user preferences
    print("\nSelect languages to ingest:")
    print("  1. C only")
    print("  2. C++ only")
    print("  3. Both C and C++")
    lang_choice = input("Choice (1-3): ").strip()

    languages = []
    if lang_choice == '1':
        languages = ['c']
    elif lang_choice == '2':
        languages = ['cpp']
    else:
        languages = ['c', 'cpp']

    max_entries = input("\nMaximum entries per language (default 20): ").strip()
    max_entries = int(max_entries) if max_entries else 20

    max_repos = input("Maximum repositories to search (default 10): ").strip()
    max_repos = int(max_repos) if max_repos else 10

    # Confirm
    print("\n" + "-"*60)
    print(f"Languages: {', '.join(languages)}")
    print(f"Max entries per language: {max_entries}")
    print(f"Max repositories: {max_repos}")
    print("-"*60)
    confirm = input("\nProceed with ingestion? (y/n): ")

    if confirm.lower() != 'y':
        print("Cancelled.")
        return

    # Run ingestor
    from utility_dir.utility_paths import DATASET_DIR, CLUSTERS_DIR_FILEPATH
    from utility_dir.general_utils import load_github_token
    from dataset_handling.github_ingestor import GitHubIngestor

    token = load_github_token()

    ingestor = GitHubIngestor(
        dataset_dir=DATASET_DIR,
        clusters_dir=CLUSTERS_DIR_FILEPATH,
        github_token=token
    )

    ingestor.run(languages=languages, max_repos=max_repos, max_entries=max_entries)
```

## Option 3: Standalone Integration (Recommended for Testing)

Keep the ingestor as a standalone tool while testing, then integrate later:

```bash
# Run ingestor directly
cd src/dataset_handling
python github_ingestor.py --languages c cpp --max-entries 30

# Then continue with main pipeline
cd ..
python main.py --create-focused-cluster
python main.py --generate-llm-improvements
```

## Option 4: Add to Existing --add-sources Logic

If `main.py` already has a `--add-sources` command, extend it:

```python
parser.add_argument(
    '--add-sources',
    choices=['manual', 'github', 'all'],
    help='Add new sources to dataset'
)

def handle_add_sources(args):
    if args.add_sources == 'github':
        run_github_ingestor(args)
    elif args.add_sources == 'manual':
        run_manual_source_addition()
    elif args.add_sources == 'all':
        run_manual_source_addition()
        run_github_ingestor(args)
```

Usage:
```bash
python main.py --add-sources github
```

## Complete Integration Example

Here's a complete example of adding to `main.py`:

```python
# At the top of main.py
import argparse
from pathlib import Path
# ... other imports ...
from dataset_handling.github_ingestor import GitHubIngestor
from utility_dir.utility_paths import DATASET_DIR, CLUSTERS_DIR_FILEPATH
from utility_dir.general_utils import load_github_token

def main():
    parser = argparse.ArgumentParser(
        description='Sustainable Code Refactoring with LLMs'
    )

    # ... existing arguments ...

    # GitHub Ingestor arguments
    parser.add_argument(
        '--ingest-github',
        action='store_true',
        help='Ingest C/C++ entries from GitHub Exercism repositories'
    )
    parser.add_argument(
        '--ingest-languages',
        nargs='+',
        choices=['c', 'cpp'],
        default=['c', 'cpp'],
        help='Languages to ingest for --ingest-github (default: c cpp)'
    )
    parser.add_argument(
        '--ingest-max-repos',
        type=int,
        default=10,
        help='Max repositories to search (default: 10)'
    )
    parser.add_argument(
        '--ingest-max-entries',
        type=int,
        default=20,
        help='Max entries per language (default: 20)'
    )

    args = parser.parse_args()

    # GitHub ingestor handler
    if args.ingest_github:
        token = load_github_token()

        if not token:
            print("WARNING: No GitHub token found. Rate limits will be strict.")
            print("Setup token with: python main.py --setup-token")
            response = input("Continue? (y/n): ")
            if response.lower() != 'y':
                return

        print("\nStarting GitHub ingestion...")
        ingestor = GitHubIngestor(
            dataset_dir=DATASET_DIR,
            clusters_dir=CLUSTERS_DIR_FILEPATH,
            github_token=token
        )

        ingestor.run(
            languages=args.ingest_languages,
            max_repos=args.ingest_max_repos,
            max_entries=args.ingest_max_entries
        )

        print("\n✅ Ingestion complete!")
        print("\nRecommended next steps:")
        print("  1. python main.py --statistics (view new dataset stats)")
        print("  2. python main.py --create-focused-cluster")
        return

    # ... rest of existing main.py logic ...

if __name__ == "__main__":
    main()
```

## Testing the Integration

After adding to `main.py`, test with:

```bash
# Test help text
python main.py --help | grep ingest

# Test dry run (low limits)
python main.py --ingest-github --ingest-max-entries 1 --ingest-max-repos 2

# Test full run
python main.py --ingest-github --ingest-languages c --ingest-max-entries 20
```

## Benefits of Integration

1. **Unified Interface**: Users don't need to know about separate scripts
2. **Consistent UX**: Same command-line style as rest of project
3. **Workflow Integration**: Natural progression from ingestion → clustering → generation → testing
4. **Error Handling**: Centralized error handling in main.py
5. **Documentation**: All commands documented in one place (`python main.py --help`)

## Rollback Plan

If integration causes issues, the ingestor can still be used standalone:

```bash
cd src/dataset_handling
python github_ingestor.py
```

All functionality remains independent of main.py.

## Recommended Approach

**For initial deployment:**
1. Keep as standalone tool (`github_ingestor.py`)
2. Document usage in README
3. Test thoroughly with real API calls
4. Monitor for issues

**After validation:**
1. Integrate into main.py (Option 1 or Option 2)
2. Update project README
3. Add to user documentation
4. Include in tutorial/quickstart

## Support for Future Extensions

The integration structure supports easy extension to other languages:

```python
parser.add_argument(
    '--ingest-languages',
    nargs='+',
    choices=['c', 'cpp', 'rust', 'go'],  # Future: add more
    default=['c', 'cpp'],
    help='Languages to ingest'
)
```

The ExercismValidator class can be extended to handle new languages without changing the main ingestion logic.
