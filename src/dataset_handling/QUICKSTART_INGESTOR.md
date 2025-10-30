# GitHub Ingestor - Quick Start Guide

Get started with the GitHub Ingestor in 5 minutes!

## Prerequisites

- Python 3.8+
- Internet connection
- GitHub account (optional, but recommended for API token)

## Step 1: Verify Installation

Check that required dependencies are installed:

```bash
cd src/dataset_handling
python3 -c "import requests; import json; print('✅ Dependencies OK')"
```

If you see an error:
```bash
pip install requests python-dotenv
```

## Step 2: Setup GitHub Token (Recommended)

A GitHub token increases API rate limits from 60 to 5000 requests/hour.

### Create Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Exercism Ingestor"
4. Select scope: `public_repo`
5. Click "Generate token"
6. Copy the token (starts with `ghp_`)

### Save Token:
```bash
cd /path/to/project/src
echo "ghp_YOUR_TOKEN_HERE" > .github_token
```

Or use the project's setup tool:
```bash
python main.py --setup-token
```

## Step 3: Run Your First Ingestion

### Option A: Quick Test (1 entry per language)

```bash
python github_ingestor.py --max-entries 1 --max-repos 3
```

Expected output:
```
============================================================
Starting ingestion for C
============================================================

Searching for Exercism C repositories...
Found 15 relevant Exercism repositories
Exploring user/repo for C exercises...
    ✓ Valid entry found: hamming
Downloading files for hamming...
  ✓ hamming.c → src/
  ✓ hamming.h → src/
  ✓ test_hamming.c → test/
  ✓ unity.h → test/
  ✓ Makefile → ./
✓ Successfully saved all files for hamming
✓ Updated cluster file: cluster_hamming.json
✅ Successfully ingested: hamming (1/1)

============================================================
Ingestion complete for C: 1 new entries added
============================================================
```

### Option B: Standard Run (20 entries per language)

```bash
python github_ingestor.py
```

This will ingest up to 20 C and 20 C++ entries.

### Option C: High Volume (with token recommended)

```bash
python github_ingestor.py --max-repos 30 --max-entries 100
```

## Step 4: Verify Results

Check that files were created:

```bash
# List new dataset directories
ls -d ../dataset/c/*GitHub* | head -5
ls -d ../dataset/cpp/*GitHub* | head -5

# Check cluster files were updated
ls -lt ../clusters/cluster_*.json | head -5

# Count total entries
find ../dataset/c -name "*GitHub*" -type d | wc -l
find ../dataset/cpp -name "*GitHub*" -type d | wc -l
```

## Step 5: Integrate with Pipeline

Now that you have new entries, continue with the rest of the pipeline:

```bash
# View dataset statistics
cd ..
python main.py --statistics

# Create focused clusters (if needed)
python main.py --create-focused-cluster

# Generate LLM improvements
python main.py --generate-llm-improvements

# Run tests
python main.py --run-tests
```

## Common Use Cases

### Use Case 1: "I need 50 C entries"

```bash
python github_ingestor.py --languages c --max-entries 50
```

### Use Case 2: "I want to search many repos but take few entries"

```bash
python github_ingestor.py --max-repos 50 --max-entries 10
```

This searches 50 repositories but only takes 10 entries (ensures quality).

### Use Case 3: "I want to see what's available without downloading"

```bash
python example_usage_ingestor.py
# Select option 5: "Validation only (dry run)"
```

### Use Case 4: "I want C++ only"

```bash
python github_ingestor.py --languages cpp --max-entries 30
```

### Use Case 5: "I have a specific search in mind"

Edit `github_ingestor.py` and modify the search query in `search_exercism_repos()`:

```python
# Line ~315
query = f"exercism {search_lang} solutions"  # Add "solutions" to query
```

## Troubleshooting

### Problem: "Rate limit reached"

**Solution:**
- Wait 1 hour if without token
- Setup GitHub token (see Step 2)
- Reduce `--max-repos` parameter

### Problem: "No repositories found"

**Solution:**
- Check internet connection
- Verify GitHub API is accessible: `curl https://api.github.com`
- Try different language: `--languages c` instead of `cpp`

### Problem: "All entries marked as duplicates"

**Solution:**
This is normal! It means your dataset already has these exercises.
- Increase `--max-repos` to search more repositories
- Check different GitHub users (ingestor automatically varies sources)

### Problem: "Many validation failures"

**Solution:**
This is expected. Many Exercism repos are incomplete or have non-standard structures. The ingestor is strict by design - it only accepts complete, compilable entries.

Expected acceptance rate: 10-30% of found exercises.

### Problem: "Download failed"

**Solution:**
- Check network stability
- File might be too large (rare)
- Repository might be private or deleted
- Script automatically skips and continues

### Problem: "Import error"

**Solution:**
```bash
# Ensure you're in the right directory
cd src/dataset_handling

# Check Python path
python3 -c "import sys; print('\n'.join(sys.path))"

# Try absolute import
python3 -c "import sys; sys.path.append('..'); from dataset_handling.github_ingestor import GitHubIngestor; print('✅ OK')"
```

## Performance Tips

### With Token:
- **Small dataset:** `--max-entries 20` takes ~5-10 minutes
- **Medium dataset:** `--max-entries 50` takes ~15-25 minutes
- **Large dataset:** `--max-entries 100` takes ~30-45 minutes

### Without Token:
- **Maximum:** `--max-entries 10` (to avoid rate limits)
- **Time:** ~5-10 minutes for 10 entries

### Optimization:
- Use `--max-repos` to control how many repos to search
- Use `--max-entries` to control total downloads
- Run during off-peak hours for better API response times

## Next Steps

After successful ingestion:

1. **Explore the data:**
   ```bash
   cd ../dataset/c
   ls -la *GitHub*
   cat two-sum_exercism-user123/src/two_sum.c
   ```

2. **Run statistics:**
   ```bash
   cd ../..
   python main.py --statistics --charts
   ```

3. **Generate LLM improvements:**
   ```bash
   python main.py --generate-llm-improvements
   ```

4. **Run tests:**
   ```bash
   cd run_tests_on_clusters
   python run_tests_on_cluster.py --cluster-name hamming
   ```

5. **Analyze metrics:**
   ```bash
   cd ../metrics
   python main_exec_metrics_analysis.py
   ```

## Advanced Usage

For advanced usage, see:
- **Full documentation:** `README_github_ingestor.md`
- **Examples:** `example_usage_ingestor.py`
- **Integration:** `INTEGRATION_GUIDE.md`
- **Implementation:** `GITHUB_INGESTOR_SUMMARY.md`

## Help

Run with `--help` to see all options:
```bash
python github_ingestor.py --help
```

For issues, check:
- Logs in the console output
- Network connectivity
- GitHub API status: https://www.githubstatus.com/

## Summary

```bash
# Quick start (recommended)
cd src/dataset_handling
python github_ingestor.py --max-entries 20

# View results
ls -d ../dataset/c/*GitHub* | head -5
ls ../clusters/cluster_*.json

# Continue with pipeline
cd ..
python main.py --statistics
python main.py --generate-llm-improvements
```

That's it! You're now ready to automatically expand your C/C++ dataset.

---

**Need more help?** See `README_github_ingestor.md` for detailed documentation.
