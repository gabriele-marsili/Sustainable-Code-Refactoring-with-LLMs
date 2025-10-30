# GitHub Ingestor for C/C++ Exercism Solutions

## Overview

The `github_ingestor.py` script automates the process of discovering, validating, and ingesting C and C++ code-test pairs from GitHub repositories containing Exercism solutions. It ensures completeness, avoids duplicates, and seamlessly integrates new entries into the project's dataset and cluster structure.

## Key Features

### 1. **Automatic GitHub Search**
- Searches GitHub API for repositories containing Exercism C/C++ solutions
- Filters results by relevance (star count, repository description)
- Supports authenticated and unauthenticated API access

### 2. **Comprehensive Validation**
Before accepting any entry, the script validates that ALL required files are present:
- ✅ Source code files (`.c` or `.cpp`)
- ✅ Test files (`test_*.c`, `*_test.cpp`)
- ✅ Header files (`.h` or `.hpp`)
- ✅ Build configuration (`Makefile` or `CMakeLists.txt`)

**If even one file is missing, the entry is rejected.**

### 3. **Duplicate Detection**
- Scans all existing cluster JSON files in `src/clusters/`
- Maintains a set of existing entry IDs
- Skips exercises that are already in the dataset

### 4. **Proper Directory Structure**
Saves files in the exact structure required by the pipeline:

```
src/dataset/{language}/{exercise}_exercism-{user}/
├── Makefile (or CMakeLists.txt)
├── src/
│   ├── exercise.c (or .cpp)
│   └── exercise.h
└── test/
    ├── test_exercise.c (or .cpp)
    ├── unity.h (if present)
    └── unity_internals.h (if present)
```

### 5. **Cluster JSON Updates**
- Automatically creates or updates cluster files in `src/clusters/cluster_{exercise_name}.json`
- Adds complete metadata for the new entry:
  - Unique ID
  - File paths
  - Character/word counts
  - License type
  - Source attribution
  - Download timestamp

### 6. **Rate Limiting & Error Handling**
- Built-in rate limiter to respect GitHub API limits
- Exponential backoff on errors
- Comprehensive logging at all stages
- Automatic cleanup on failure

## Installation

Ensure you have the required dependencies:

```bash
cd src
pip install requests python-dotenv
```

## Usage

### Basic Usage

```bash
cd src/dataset_handling
python github_ingestor.py
```

This will:
- Search for C and C++ Exercism repositories
- Validate and ingest up to 20 entries per language
- Use default settings (10 repos, no auth token)

### With GitHub Token (Recommended)

Using a GitHub token increases API rate limits from 60 to 5000 requests/hour:

```bash
# Set up token (one-time)
cd src
python main.py --setup-token

# Run ingestor
cd dataset_handling
python github_ingestor.py
```

The script will automatically load the token from `.github_token`.

### Advanced Options

```bash
python github_ingestor.py \
    --languages c cpp \
    --max-repos 20 \
    --max-entries 50 \
    --token YOUR_GITHUB_TOKEN
```

**Arguments:**
- `--languages`: Languages to process (choices: `c`, `cpp`)
- `--max-repos`: Maximum repositories to search per language (default: 10)
- `--max-entries`: Maximum entries to ingest per language (default: 20)
- `--token`: GitHub API token (optional)

### Example: Only C Language

```bash
python github_ingestor.py --languages c --max-entries 30
```

### Example: High Volume Ingestion

```bash
python github_ingestor.py --languages c cpp --max-repos 50 --max-entries 100 --token ghp_xxxxx
```

## How It Works

### Step-by-Step Process

1. **Search Phase**
   - Query GitHub API for Exercism repositories
   - Filter by language (C or C++)
   - Sort by stars/popularity

2. **Exploration Phase**
   - For each repository, explore common directory structures:
     - `c/`, `cpp/`
     - `exercism/c/`, `exercism/cpp/`
     - `c/exercises/`, etc.
   - Identify exercise directories

3. **Validation Phase**
   - For each exercise directory:
     - Check for source files
     - Check for test files
     - Check for header files
     - Check for build files (Makefile/CMakeLists.txt)
   - **Only complete exercises proceed**

4. **Duplicate Check**
   - Compare exercise ID against existing clusters
   - Skip if already present

5. **Download Phase**
   - Download all validated files via GitHub API
   - Save to proper directory structure:
     - Source + headers → `src/`
     - Tests + test headers → `test/`
     - Build files → root

6. **Integration Phase**
   - Create or update cluster JSON file
   - Add entry metadata
   - Update entry counter

## Architecture

### Main Classes

#### `GitHubAPIClient`
Handles all GitHub API interactions with:
- Authentication
- Rate limiting
- Error handling
- File content retrieval

#### `ExercismValidator`
Validates C/C++ entries by checking:
- File type detection (source, test, header, build)
- Completeness requirements
- Language-specific rules

#### `DuplicateChecker`
Prevents duplicate ingestion by:
- Loading existing cluster files
- Building entry ID sets
- Checking new entries against existing

#### `GitHubIngestor`
Orchestrates the entire process:
- Search → Explore → Validate → Download → Integrate
- Progress logging
- Summary statistics

## Configuration

The script uses project paths from `utility_dir/utility_paths.py`:
- `DATASET_DIR`: Where files are saved
- `CLUSTERS_DIR_FILEPATH`: Where cluster JSONs are updated

## Logging

The script provides detailed logging at multiple levels:

```
INFO:  High-level progress (repositories found, entries ingested)
DEBUG: Detailed operations (file downloads, validation steps)
ERROR: Failures and exceptions
```

Example output:
```
2025-10-30 10:15:00 - INFO - Searching for Exercism C repositories...
2025-10-30 10:15:05 - INFO - Found 15 relevant Exercism repositories
2025-10-30 10:15:10 - INFO - Exploring user/repo for C exercises...
2025-10-30 10:15:15 - INFO -     ✓ Valid entry found: hamming
2025-10-30 10:15:20 - INFO - ✅ Successfully ingested: hamming (1/20)
```

## Error Handling

### Common Issues

**1. Missing Build Files**
```
Entry invalid - missing: build files (Makefile/CMakeLists.txt)
```
**Solution:** Entry is skipped automatically. This is expected for incomplete exercises.

**2. Rate Limit Reached**
```
Rate limit raggiunto, attendere 60 secondi...
```
**Solution:** Script automatically waits. Use a GitHub token to avoid this.

**3. Duplicate Entry**
```
✗ Duplicate skipped: two-sum
```
**Solution:** Expected behavior. Entry already exists in clusters.

**4. Download Failure**
```
Failed to download exercise.c
```
**Solution:** Network issue or file deleted. Entry is skipped and cleanup is performed.

## Testing

To test the script without ingesting many entries:

```bash
# Test with just 1 entry per language
python github_ingestor.py --max-entries 1 --max-repos 3
```

## Integration with Pipeline

Once entries are ingested, they automatically integrate with the existing pipeline:

1. **Dataset Creation** ✅ (completed by this script)
2. **Clustering** ✅ (cluster JSON updated by this script)
3. **LLM Generation** → Run `src/LLMs_generator_engine/llm_generator.py`
4. **Test Execution** → Run `src/run_tests_on_clusters/run_tests_on_cluster.py`
5. **Metrics Analysis** → Run `src/metrics/main_exec_metrics_analysis.py`

## Maintenance

### Adding Support for New Languages

To extend support beyond C/C++:

1. Update `ExercismValidator.is_source_file()` with new file extensions
2. Update `ExercismValidator.is_test_file()` with test patterns
3. Add language to `--languages` choices in argument parser

### Customizing Validation Rules

Edit the `ExercismValidator.validate_entry()` method to modify requirements:
- Remove header file requirement (if optional)
- Allow alternative build systems
- Accept different test file patterns

## Troubleshooting

### Issue: No repositories found
**Cause:** Network connectivity or API availability
**Solution:** Check internet connection, verify GitHub API status

### Issue: All entries marked as duplicates
**Cause:** Cluster files already contain these exercises
**Solution:** Increase `--max-repos` to search more repositories

### Issue: Many validation failures
**Cause:** Repositories don't follow standard Exercism structure
**Solution:** This is normal. Script only accepts complete, valid entries.

## Contributing

When modifying this script:
1. Maintain validation strictness (all files must be present)
2. Preserve directory structure compatibility
3. Update cluster JSON format as per existing schemas
4. Add comprehensive logging for debugging

## License

This script is part of the "Sustainable Code Refactoring with LLMs" research project.

## Contact

For issues or questions, refer to the main project README or open an issue in the project repository.
