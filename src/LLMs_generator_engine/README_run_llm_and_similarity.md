# LLM Variant Generator & Similarity Calculator

## Overview

The `run_llm_and_similarity.py` script automates the complete workflow for processing newly ingested C/C++ entries that lack LLM-generated variants. It orchestrates four critical phases:

1. **Discovery**: Identifies "orphan" entries (entries with < 12 LLM variants)
2. **Generation**: Creates all missing LLM variants using OpenAI, Claude, and Gemini
3. **Similarity**: Calculates fuzzy and cosine similarity metrics
4. **Integration**: Updates cluster JSON files with complete metadata

## Key Features

### 1. **Automatic Orphan Discovery**
- Scans all cluster files in `src/clusters/`
- Identifies entries with incomplete LLM variants (< 12)
- Focuses on C and C++ languages by default
- Skips already-complete entries

### 2. **Multi-Model LLM Generation**
- Generates variants using 3 LLM providers:
  - **OpenAI** (GPT-4)
  - **Claude** (Sonnet 4)
  - **Gemini** (Flash 1.5)
- Applies 4 different prompt versions (v1-v4)
- **Total**: 12 variants per entry (3 models × 4 prompts)

### 3. **Similarity Metrics**
- **Fuzzy similarity**: Character-level string matching
- **Cosine similarity**: TF-IDF vector comparison
- **Combined index**: Weighted average (45% fuzzy + 55% cosine)

### 4. **Atomic Cluster Updates**
- Updates cluster JSON files with LLM metadata
- Includes file paths, word/char counts, similarity scores
- Safe read-modify-write operations

## Architecture

### Core Classes

#### `OrphanEntryDiscovery`
Discovers entries needing LLM generation.

**Methods:**
- `scan_clusters()`: Scans all clusters, returns list of orphan entries
- `_find_orphans_in_cluster()`: Finds orphans within a specific cluster

#### `LLMVariantGenerator`
Generates LLM code variants.

**Methods:**
- `generate_variants_for_entry(orphan)`: Generates all 12 variants for an entry
- Returns: (metadata_list, successful_count, failed_count)

#### `SimilarityMetricsCalculator`
Calculates similarity scores.

**Methods:**
- `calculate_for_entry(orphan, cluster_name)`: Calculates metrics for all variants
- Uses existing `SimilarityCalculator` from `src/metrics/similarity/`

#### `ClusterJSONUpdater`
Updates cluster files with LLM metadata.

**Methods:**
- `update_entry_llms(cluster_name, entry_id, language)`: Updates cluster JSON
- `_discover_llm_files(entry, cluster_name)`: Scans dataset for generated files

#### `LLMOrchestrator`
Main coordinator.

**Methods:**
- `run(max_entries)`: Executes complete workflow
- Returns: Statistics dictionary

## Usage

### Basic Usage

```bash
cd src/LLMs_generator_engine
python run_llm_and_similarity.py
```

This will:
- Discover all orphan C/C++ entries
- Generate missing LLM variants
- Calculate similarities
- Update cluster JSONs

### Dry Run (Discovery Only)

```bash
python run_llm_and_similarity.py --dry-run
```

Shows orphan entries without generating anything.

### Process Limited Number

```bash
python run_llm_and_similarity.py --max-entries 5
```

Processes only the first 5 orphan entries.

### Specific Languages

```bash
python run_llm_and_similarity.py --languages c
```

Processes only C entries (not C++).

### All Options

```bash
python run_llm_and_similarity.py \
    --languages c cpp \
    --max-entries 10
```

## Prerequisites

### 1. Environment Variables

Create `.env` file in `src/` with:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=...
DISCORD_WEBHOOK=https://discord.com/api/webhooks/...
```

The Discord webhook is used for progress notifications (required by LLMGenerator).

### 2. Dependencies

```bash
pip install openai anthropic google-generativeai python-dotenv scikit-learn rapidfuzz
```

### 3. Existing Structure

Ensure you have:
- Cluster files in `src/clusters/`
- Base code in `src/dataset/{language}/`
- Prompt files in `src/prompts/` (promptV1.txt - promptV4.txt)

## Workflow Details

### Step 1: Discovery

Scans `src/clusters/cluster_*.json` files:

```python
for cluster in clusters:
    for language in ['c', 'cpp']:
        for entry in cluster[language]:
            if len(entry['LLMs']) < 12:
                # This is an orphan!
                orphans.append(entry)
```

### Step 2: Generation

For each orphan entry:

```
For each prompt version (v1-v4):
    For each model (OpenAI, Claude, Gemini):
        Generate code variant
        Save to: dataset/{language}/{exercise}_{source}/{model}/
```

Example paths:
```
src/dataset/c/hamming_exercism-user/
├── src/hamming.c (base code)
├── openAI/
│   ├── ChatGPT4_hamming_v1.c
│   ├── ChatGPT4_hamming_v2.c
│   ├── ChatGPT4_hamming_v3.c
│   └── ChatGPT4_hamming_v4.c
├── claude/
│   ├── ClaudeSonnet4_hamming_v1.c
│   └── ...
└── gemini/
    ├── GeminiFlash_hamming_v1.c
    └── ...
```

### Step 3: Similarity Calculation

Uses `SimilarityCalculator` to compute:

```python
fuzzy_score = fuzz.ratio(base_code, llm_code)  # 0-100
cosine_score = cosine_similarity(tfidf_base, tfidf_llm) * 100  # 0-100
similarity_index = (0.45 * fuzzy) + (0.55 * cosine)  # weighted avg
```

### Step 4: Cluster Update

Updates `cluster_{name}.json`:

```json
{
  "c": [
    {
      "id": "c_hamming_user1",
      "filename": "hamming.c",
      "...": "...",
      "LLMs": [
        {
          "type": "openAI",
          "path": "c/hamming_exercism-user/openAI/ChatGPT4_hamming_v1.c",
          "word_quantity": 150,
          "char_quantity": 1234,
          "filename": "ChatGPT4_hamming_v1.c",
          "fuzzy_score": 85.5,
          "cosine_similarity_score": 82.3,
          "similarity_index": 83.7
        },
        // ... 11 more variants
      ]
    }
  ]
}
```

## Output Example

```
============================================================
LLM Variant Generator & Similarity Calculator
============================================================

[Step 1/4] Discovering orphan entries...
2025-10-30 16:00:00 - INFO - Scanning clusters directory: src/clusters
2025-10-30 16:00:01 - INFO - Found 150 cluster files
2025-10-30 16:00:05 - INFO - Found 15 orphan entries total

============================================================
Processing 1/15: c_hamming_user1
Cluster: hamming | Language: c
Current LLMs: 0/12
============================================================

[Step 2/4] Generating LLM variants...
2025-10-30 16:00:10 - INFO -   Prompt v1
2025-10-30 16:00:15 - INFO -     ✅ openAI success
2025-10-30 16:00:20 - INFO -     ✅ claude success
2025-10-30 16:00:25 - INFO -     ✅ gemini success
...

[Step 3/4] Updating cluster JSON...
2025-10-30 16:05:00 - INFO - Updated c_hamming_user1 with 12 LLM variants

[Step 4/4] Calculating similarity metrics...
2025-10-30 16:05:10 - INFO - ✅ Similarity calculation complete

✅ Successfully completed c_hamming_user1

============================================================
ORCHESTRATION SUMMARY
============================================================
Orphan entries found: 15
Entries processed: 15
  - Successful: 14
  - Failed: 1
Variants generated: 168
Variants failed: 12
Success rate: 93.3%
============================================================
```

## Error Handling

### Generation Failures

If LLM generation fails for a variant:
- Logs the error
- Continues with next variant
- Entry is still updated with successful variants

### API Rate Limits

- Built-in 0.5s delay between API calls
- Uses existing rate limiting from API gestors
- Retries handled by API clients

### File System Errors

- All file operations wrapped in try-catch
- Failures logged but don't stop the process
- Atomic JSON updates (read-modify-write)

## Integration with Pipeline

After running this script, entries are ready for:

1. **Test Execution** (`src/run_tests_on_clusters/`)
   ```bash
   python run_tests_on_cluster.py --cluster-name hamming
   ```

2. **Metrics Analysis** (`src/metrics/`)
   ```bash
   python main_exec_metrics_analysis.py
   ```

## Performance

### Timing Estimates

Per entry (12 variants):
- Generation: ~2-5 minutes (depends on API speed)
- Similarity: ~5-10 seconds
- JSON update: <1 second

**Total per entry: ~3-6 minutes**

For 10 entries: ~30-60 minutes

### Cost Estimates

API costs (approximate):
- OpenAI GPT-4: $0.01-0.03 per variant
- Claude Sonnet: $0.01-0.03 per variant
- Gemini Flash: Free tier or $0.001 per variant

**Total per entry: ~$0.25-0.75**

For 10 entries: ~$2.50-7.50

## Common Issues

### Issue: "Missing DISCORD_WEBHOOK"

**Solution:**
Add to `.env`:
```env
DISCORD_WEBHOOK=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL
```

Or disable Discord reporting by modifying `LLMGenerator.__init__()`.

### Issue: "No orphan entries found" but entries exist

**Possible causes:**
1. Entries have `LLMs` array with exactly 12 items already
2. Language is not 'c' or 'cpp' (check cluster JSON)
3. Cluster file is in skip list (debug_, test_, etc.)

**Solution:**
Check cluster JSON manually:
```bash
cd src/clusters
cat cluster_hamming.json | jq '.c[0].LLMs | length'
```

### Issue: Generation succeeds but similarity fails

**Solution:**
Run similarity calculation manually:
```python
from metrics.similarity.similarity_calculator import SimilarityCalculator
calc = SimilarityCalculator()
calc.calculate_similarities_for_cluster("cluster_hamming.json")
```

### Issue: "Module not found" errors

**Solution:**
Ensure you're running from the correct directory:
```bash
cd src/LLMs_generator_engine
python run_llm_and_similarity.py
```

Or adjust Python path:
```bash
export PYTHONPATH=/path/to/project/src:$PYTHONPATH
```

## Advanced Usage

### Process Specific Cluster

Modify the script to filter by cluster name:

```python
# In OrphanEntryDiscovery.scan_clusters()
for cluster_file in cluster_files:
    cluster_name = cluster_file.stem.replace("cluster_", "")

    # Add this filter
    if cluster_name != "hamming":
        continue

    # ... rest of code
```

### Custom Prompt Versions

To use different prompts, modify `prompt_paths` in `LLMVariantGenerator.__init__()`:

```python
self.prompt_paths = [
    Path("custom_prompt_1.txt"),
    Path("custom_prompt_2.txt"),
    # ...
]
```

### Parallel Processing

For faster processing (advanced):
```python
from concurrent.futures import ThreadPoolExecutor

# In LLMOrchestrator.run()
with ThreadPoolExecutor(max_workers=3) as executor:
    futures = [executor.submit(self.process_entry, orphan) for orphan in orphans]
    results = [f.result() for f in futures]
```

**Warning:** Be mindful of API rate limits!

## Logging

Logs are written to console with the format:
```
YYYY-MM-DD HH:MM:SS - module_name - LEVEL - message
```

To save logs to file:
```bash
python run_llm_and_similarity.py 2>&1 | tee llm_generation.log
```

To increase verbosity:
```python
# In script
logging.basicConfig(level=logging.DEBUG)  # More verbose
```

## Testing

### Test Discovery Only

```bash
python run_llm_and_similarity.py --dry-run
```

### Test Single Entry

```bash
python run_llm_and_similarity.py --max-entries 1
```

### Test Without API Calls

Modify the script to use mock generators for testing.

## Maintenance

### Adding New Languages

1. Update `target_languages` parameter:
   ```python
   orchestrator = LLMOrchestrator(target_languages=['c', 'cpp', 'rust'])
   ```

2. Ensure API gestors support the new language

3. Update file path logic in `_discover_llm_files()`

### Adding New Models

1. Import new API gestor
2. Add to `generators` dict in `LLMVariantGenerator.__init__()`
3. Update expected variant count (currently 12 = 3 models × 4 prompts)

## Troubleshooting Checklist

- [ ] `.env` file configured with all API keys
- [ ] Running from correct directory (`src/LLMs_generator_engine/`)
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] Cluster files exist in `src/clusters/`
- [ ] Base code files exist in `src/dataset/`
- [ ] Prompt files exist in `src/prompts/`
- [ ] API keys are valid and have sufficient quota
- [ ] Discord webhook URL is valid (or disabled)

## Summary

This script provides **complete automation** for processing newly ingested C/C++ entries:

✅ **Discovery** - Finds entries needing LLM variants
✅ **Generation** - Creates all 12 variants per entry
✅ **Similarity** - Calculates comprehensive metrics
✅ **Integration** - Updates cluster JSONs atomically

**Result:** Entries are fully prepared for test execution and metrics analysis.

---

**For questions or issues, refer to the main project README or check the logs for detailed error messages.**
