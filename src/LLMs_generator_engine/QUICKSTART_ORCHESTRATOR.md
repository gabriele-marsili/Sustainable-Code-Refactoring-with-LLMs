# LLM Orchestrator - Quick Start Guide

Get started with the LLM Orchestrator in 5 minutes!

## Prerequisites

1. **Completed GitHub Ingestion** (Task 1)
   ```bash
   cd src/dataset_handling
   python github_ingestor.py --max-entries 10
   ```

2. **Environment Variables**
   Create `.env` in `src/` with:
   ```env
   OPENAI_API_KEY=sk-...
   ANTHROPIC_API_KEY=sk-ant-...
   GEMINI_API_KEY=...
   DISCORD_WEBHOOK=https://discord.com/api/webhooks/...
   ```

3. **Dependencies**
   ```bash
   pip install openai anthropic google-generativeai scikit-learn rapidfuzz
   ```

## Step 1: Check for Orphan Entries

First, see if there are entries needing LLM variants:

```bash
cd src/LLMs_generator_engine
python run_llm_and_similarity.py --dry-run
```

Expected output:
```
============================================================
LLM Variant Generator & Similarity Calculator
============================================================

[Step 1/4] Discovering orphan entries...
INFO - Scanning clusters directory: src/clusters
INFO - Found 150 cluster files
INFO - Found 10 orphan entries total

Found 10 orphan entries:
  - c_hamming_exercism-user1 (c) in hamming: 0/12 LLMs
  - c_two_sum_exercism-user2 (c) in two_sum: 0/12 LLMs
  ...
```

## Step 2: Test with Single Entry

Process just one entry to verify everything works:

```bash
python run_llm_and_similarity.py --max-entries 1
```

This will:
1. Find the first orphan entry
2. Generate 12 LLM variants (takes ~3-5 minutes)
3. Calculate similarities
4. Update cluster JSON

Expected output:
```
============================================================
Processing 1/1: c_hamming_exercism-user1
Cluster: hamming | Language: c
Current LLMs: 0/12
============================================================

[Step 2/4] Generating LLM variants...
INFO -   Prompt v1
INFO -     ✅ openAI success
INFO -     ✅ claude success
INFO -     ✅ gemini success
  Prompt v2
...

[Step 3/4] Updating cluster JSON...
INFO - Updated c_hamming_exercism-user1 with 12 LLM variants

[Step 4/4] Calculating similarity metrics...
INFO - ✅ Similarity calculation complete

✅ Successfully completed c_hamming_exercism-user1

============================================================
ORCHESTRATION SUMMARY
============================================================
Orphan entries found: 1
Entries processed: 1
  - Successful: 1
  - Failed: 0
Variants generated: 12
Success rate: 100.0%
============================================================
```

## Step 3: Verify Results

Check that files were created:

```bash
# View generated LLM files
ls src/dataset/c/hamming_exercism-user1/openAI/
ls src/dataset/c/hamming_exercism-user1/claude/
ls src/dataset/c/hamming_exercism-user1/gemini/

# Check updated cluster JSON
cat src/clusters/cluster_hamming.json | grep -A 10 '"LLMs"'
```

You should see 12 LLM files (4 per model) and the cluster JSON updated with metadata.

## Step 4: Process Batch

Now process a small batch:

```bash
python run_llm_and_similarity.py --max-entries 5
```

Time: ~15-30 minutes
Cost: ~$1.20

## Step 5: Continue Pipeline

After processing, continue with the rest of the pipeline:

```bash
# Run tests on the entries
cd ../run_tests_on_clusters
python run_tests_on_cluster.py --cluster-name hamming

# Analyze metrics
cd ../metrics
python main_exec_metrics_analysis.py
```

## Common Use Cases

### Use Case 1: "I just ingested 20 C entries"

```bash
# Process only C entries
python run_llm_and_similarity.py --languages c
```

### Use Case 2: "I want to process 10 entries per day"

```bash
# Process 10 entries (takes ~30-60 min, costs ~$2.40)
python run_llm_and_similarity.py --max-entries 10
```

### Use Case 3: "How much will it cost?"

```bash
# Estimate costs first
python example_usage_orchestrator.py
# Select option 6: "Estimate API costs"
```

### Use Case 4: "I want to check a specific cluster"

```bash
python example_usage_orchestrator.py
# Select option 5: "Check specific cluster"
# Enter cluster name (e.g., "hamming")
```

### Use Case 5: "Process everything overnight"

```bash
# Full batch processing (no limits)
nohup python run_llm_and_similarity.py > orchestrator.log 2>&1 &

# Check progress
tail -f orchestrator.log
```

## Troubleshooting

### Issue: "No orphan entries found"

**Cause:** All entries already have 12 LLM variants
**Solution:** This is good! Your dataset is complete. Run GitHub ingestor to add more entries.

### Issue: "Missing DISCORD_WEBHOOK"

**Solution:** Add to `.env`:
```env
DISCORD_WEBHOOK=https://discord.com/api/webhooks/YOUR_WEBHOOK
```

### Issue: "API rate limit reached"

**Solution:** The script has built-in delays. If this persists:
1. Check your API quotas
2. Wait a few minutes
3. Restart with `--max-entries` to limit load

### Issue: "Generation successful but similarity failed"

**Solution:** Run similarity manually:
```python
from metrics.similarity.similarity_calculator import SimilarityCalculator
calc = SimilarityCalculator()
calc.calculate_similarities_for_cluster("cluster_hamming.json")
```

### Issue: "Module not found"

**Solution:** Run from correct directory:
```bash
cd src/LLMs_generator_engine
python run_llm_and_similarity.py
```

## Performance Tips

### Small Batches (Recommended)
```bash
# Process 5-10 entries at a time
python run_llm_and_similarity.py --max-entries 10
```
- Time: ~30-60 minutes
- Cost: ~$2.40
- Less prone to interruption

### Large Batches
```bash
# Process 50+ entries (overnight job)
python run_llm_and_similarity.py
```
- Time: Several hours
- Cost: Can be $10-30+
- More efficient but riskier

### Monitor Progress

Save logs for later review:
```bash
python run_llm_and_similarity.py 2>&1 | tee orchestrator_$(date +%Y%m%d_%H%M%S).log
```

## Complete Workflow Example

From ingestion to metrics analysis:

```bash
# Step 1: Ingest new C/C++ entries
cd src/dataset_handling
python github_ingestor.py --max-entries 10
echo "✅ Ingested 10 new entries"

# Step 2: Generate LLM variants
cd ../LLMs_generator_engine
python run_llm_and_similarity.py
echo "✅ Generated LLM variants and calculated similarities"

# Step 3: Run tests
cd ../run_tests_on_clusters
python run_all_tests.py
echo "✅ Executed tests on all entries"

# Step 4: Analyze metrics
cd ../metrics
python main_exec_metrics_analysis.py
echo "✅ Generated metrics analysis"

echo "🎉 Complete pipeline executed successfully!"
```

## Next Steps

After successful orchestration:

1. **View Cluster JSON**
   ```bash
   cat src/clusters/cluster_hamming.json | jq '.c[0].LLMs'
   ```

2. **Check Generated Files**
   ```bash
   find src/dataset/c -name "*v1.c" | head -5
   ```

3. **Run Tests**
   ```bash
   cd src/run_tests_on_clusters
   python run_tests_on_cluster.py --cluster-name hamming
   ```

4. **Analyze Results**
   ```bash
   cd src/metrics
   python main_exec_metrics_analysis.py
   ```

## Summary

```bash
# Quick start (recommended)
cd src/LLMs_generator_engine

# 1. Check what needs processing
python run_llm_and_similarity.py --dry-run

# 2. Test with 1 entry
python run_llm_and_similarity.py --max-entries 1

# 3. Process batch
python run_llm_and_similarity.py --max-entries 10

# 4. Continue pipeline
cd ../run_tests_on_clusters && python run_all_tests.py
cd ../metrics && python main_exec_metrics_analysis.py
```

That's it! You're now ready to automate LLM variant generation for your C/C++ dataset.

---

**Need more help?** See `README_run_llm_and_similarity.md` for detailed documentation.
