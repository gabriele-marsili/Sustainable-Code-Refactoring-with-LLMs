"""
LLM Variant Generator & Similarity Calculator

This script orchestrates the complete workflow for newly ingested C/C++ entries:
1. Identifies orphan base entries (entries without LLM variants)
2. Generates all 12 LLM variants (3 models × 4 prompt versions)
3. Calculates similarity metrics between base and LLM variants
4. Updates cluster JSON files with complete metadata

Author: AI Engineer for Sustainable Code Refactoring with LLMs
"""

import os
import sys
import json
import time
import logging
from pathlib import Path
from typing import List, Dict, Tuple, Optional
from dataclasses import dataclass
from datetime import datetime

# Add parent directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from utility_dir import utility_paths
from utility_dir.general_utils import read_json, write_json
from api import gemini_api_gestor, claude_api_gestor, openai_api_gestor
from metrics.similarity.similarity_calculator import SimilarityCalculator
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@dataclass
class OrphanEntry:
    """Represents a base entry without complete LLM variants"""
    entry_id: str
    language: str
    filename: str
    code_snippet_path: str
    test_unit_path: str
    cluster_name: str
    current_llm_count: int
    entry_data: Dict  # Full entry from cluster JSON


class OrphanEntryDiscovery:
    """Discovers entries that need LLM generation"""

    def __init__(self, target_languages: List[str] = ['c', 'cpp']):
        self.target_languages = target_languages
        self.clusters_dir = utility_paths.CLUSTERS_DIR_FILEPATH

    def scan_clusters(self) -> List[OrphanEntry]:
        """
        Scan all cluster files to find orphan entries

        Returns:
            List of OrphanEntry objects that need processing
        """
        logger.info(f"Scanning clusters directory: {self.clusters_dir}")
        orphan_entries = []

        cluster_files = list(self.clusters_dir.glob("cluster_*.json"))
        logger.info(f"Found {len(cluster_files)} cluster files")

        for cluster_file in cluster_files:
            # Skip special cluster files
            if any(skip in cluster_file.name for skip in [
                "debug", "test", "bad_entries", "focused_", "with_metrics"
            ]):
                continue

            cluster_name = cluster_file.stem.replace("cluster_", "")

            try:
                cluster_data = read_json(cluster_file)
                orphans = self._find_orphans_in_cluster(cluster_data, cluster_name)
                orphan_entries.extend(orphans)
            except Exception as e:
                logger.error(f"Error processing cluster {cluster_name}: {e}")
                continue

        logger.info(f"Found {len(orphan_entries)} orphan entries total")
        return orphan_entries

    def _find_orphans_in_cluster(
        self,
        cluster_data: Dict,
        cluster_name: str
    ) -> List[OrphanEntry]:
        """Find orphan entries within a specific cluster"""
        orphans = []

        for language, entries in cluster_data.items():
            # Only process target languages
            if language not in self.target_languages:
                continue

            for entry in entries:
                llm_count = len(entry.get("LLMs", []))

                # An entry is orphan if it has < 12 LLM variants
                if llm_count < 12:
                    orphan = OrphanEntry(
                        entry_id=entry.get("id", "unknown"),
                        language=language,
                        filename=entry.get("filename", ""),
                        code_snippet_path=entry.get("codeSnippetFilePath", ""),
                        test_unit_path=entry.get("testUnitFilePath", ""),
                        cluster_name=cluster_name,
                        current_llm_count=llm_count,
                        entry_data=entry
                    )
                    orphans.append(orphan)
                    logger.debug(
                        f"Found orphan: {orphan.entry_id} in {cluster_name} "
                        f"({llm_count}/12 LLMs)"
                    )

        return orphans


class LLMVariantGenerator:
    """Generates LLM code variants for base entries"""

    def __init__(self):
        load_dotenv()
        self.openai_generator = openai_api_gestor.OpenAIApiGestor()
        self.claude_generator = claude_api_gestor.ClaudeApiGestor()
        self.gemini_generator = gemini_api_gestor.GeminiAIApiGestor()

        self.prompt_paths = [
            utility_paths.PROMPTS_DIR_FILEPATH / "promptV1.txt",
            utility_paths.PROMPTS_DIR_FILEPATH / "promptV2.txt",
            utility_paths.PROMPTS_DIR_FILEPATH / "promptV3.txt",
            utility_paths.PROMPTS_DIR_FILEPATH / "promptV4.txt",
        ]

        self.generators = {
            "openAI": self.openai_generator,
            "claude": self.claude_generator,
            "gemini": self.gemini_generator,
        }

    def generate_variants_for_entry(
        self,
        orphan: OrphanEntry
    ) -> Tuple[List[Dict], int, int]:
        """
        Generate all LLM variants for an orphan entry

        Returns:
            (list_of_llm_metadata, successful_count, failed_count)
        """
        logger.info(
            f"Generating variants for {orphan.entry_id} "
            f"(currently {orphan.current_llm_count}/12)"
        )

        generated_metadata = []
        successful = 0
        failed = 0

        # Determine code file path
        code_file_path = utility_paths.DATASET_DIR / orphan.code_snippet_path

        # For C/C++, the path should be a directory (src/), not a file
        # If it's already a file path, we need to append the filename
        if orphan.language in ['c', 'cpp']:
            if not code_file_path.name.endswith(('.c', '.cpp')):
                # Path is a directory, append filename
                code_file_path = code_file_path / orphan.filename
            # else: path already includes the filename (incorrect format, but handle it)

        # Verify the file exists and is not empty
        if not code_file_path.exists():
            raise FileNotFoundError(f"Code file not found: {code_file_path}")

        if code_file_path.stat().st_size == 0:
            raise ValueError(f"Code file is empty: {code_file_path}. This indicates an ingestion error.")

        # Determine exercise directory
        parts = orphan.code_snippet_path.split("/")
        dir_name = f"{parts[0]}/{parts[1]}"
        exercise_dir = utility_paths.DATASET_DIR / dir_name

        # Generate for each prompt version and model
        for prompt_version, prompt_path in enumerate(self.prompt_paths, start=1):
            logger.info(f"  Prompt v{prompt_version}")

            for model_name, generator in self.generators.items():
                try:
                    # Generate LLM code
                    success = generator.generate_and_save_LLM_code_by_files(
                        prompt_path,
                        code_file_path,
                        exercise_dir,
                        prompt_version,
                        orphan.filename
                    )

                    if success:
                        successful += 1
                        logger.info(f"    ✅ {model_name} success")

                        # Create metadata for this variant
                        # Note: actual metadata will be added during similarity calculation
                        generated_metadata.append({
                            "model": model_name,
                            "prompt_version": prompt_version,
                            "success": True
                        })
                    else:
                        failed += 1
                        logger.warning(f"    ❌ {model_name} failed")

                    time.sleep(0.5)  # Rate limiting

                except Exception as e:
                    failed += 1
                    logger.error(f"    ❌ {model_name} error: {e}")

        logger.info(
            f"Completed {orphan.entry_id}: {successful} success, {failed} failed"
        )

        return generated_metadata, successful, failed


class SimilarityMetricsCalculator:
    """Calculates similarity metrics for LLM variants"""

    def __init__(self):
        self.calculator = SimilarityCalculator()

    def calculate_for_entry(
        self,
        orphan: OrphanEntry,
        cluster_name: str
    ) -> bool:
        """
        Calculate similarity metrics for all LLM variants of an entry

        This uses the existing SimilarityCalculator which reads the cluster
        JSON and calculates metrics for all LLMs in the entry

        Returns:
            True if successful, False otherwise
        """
        try:
            logger.info(f"Calculating similarities for {orphan.entry_id}")

            # The SimilarityCalculator expects cluster name with .json extension
            cluster_file = f"cluster_{cluster_name}.json"
            self.calculator.calculate_similarities_for_cluster(cluster_file)

            logger.info(f"  ✅ Similarity calculation complete")
            return True

        except Exception as e:
            logger.error(f"  ❌ Similarity calculation failed: {e}")
            return False


class ClusterJSONUpdater:
    """Updates cluster JSON files with LLM metadata"""

    def __init__(self):
        self.clusters_dir = utility_paths.CLUSTERS_DIR_FILEPATH

    def update_entry_llms(
        self,
        cluster_name: str,
        entry_id: str,
        language: str
    ) -> bool:
        """
        Update cluster JSON with LLM metadata after generation

        The actual LLM paths and metadata are discovered by scanning
        the generated files in the dataset directory

        Returns:
            True if successful, False otherwise
        """
        try:
            cluster_file = self.clusters_dir / f"cluster_{cluster_name}.json"

            # Read cluster file
            cluster_data = read_json(cluster_file)

            # Find the entry
            entry_found = False
            for lang, entries in cluster_data.items():
                if lang != language:
                    continue

                for entry in entries:
                    if entry.get("id") == entry_id:
                        entry_found = True

                        # Discover and add LLM metadata
                        llm_metadata = self._discover_llm_files(entry, cluster_name)
                        entry["LLMs"] = llm_metadata

                        logger.info(
                            f"Updated {entry_id} with {len(llm_metadata)} LLM variants"
                        )
                        break

                if entry_found:
                    break

            if not entry_found:
                logger.warning(f"Entry {entry_id} not found in cluster {cluster_name}")
                return False

            # Write back to file (atomic operation)
            write_json(cluster_file, cluster_data)

            return True

        except Exception as e:
            logger.error(f"Error updating cluster JSON: {e}")
            return False

    def _discover_llm_files(self, entry: Dict, cluster_name: str) -> List[Dict]:
        """
        Discover generated LLM files for an entry

        This scans the dataset directory to find all generated LLM variants
        """
        llm_metadata = []

        # Get base paths
        code_path = entry.get("codeSnippetFilePath", "")
        parts = code_path.split("/")
        if len(parts) < 2:
            return llm_metadata

        language = parts[0]
        exercise_dir_name = parts[1]
        exercise_dir = utility_paths.DATASET_DIR / language / exercise_dir_name

        # Check for LLM subdirectories
        for model_dir in ["openAI", "claude", "gemini"]:
            model_path = exercise_dir / model_dir
            if not model_path.exists():
                continue

            # Find all generated files for this model
            for generated_file in model_path.glob("*"):
                if not generated_file.is_file():
                    continue

                # Extract prompt version from filename
                # Expected format: ModelName_exercise_v{N}.ext
                prompt_version = self._extract_prompt_version(generated_file.name)

                if prompt_version:
                    # Read file to get metadata
                    try:
                        with open(generated_file, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()

                        char_count = len(content)
                        word_count = len(content.split())

                        # Create relative path
                        relative_path = str(generated_file.relative_to(utility_paths.DATASET_DIR))

                        llm_meta = {
                            "type": model_dir,
                            "path": relative_path,
                            "word_quantity": word_count,
                            "char_quantity": char_count,
                            "filename": generated_file.name,
                            # Similarity scores will be added by SimilarityCalculator
                            "fuzzy_score": 0.0,
                            "cosine_similarity_score": 0.0,
                            "similarity_index": 0.0
                        }

                        llm_metadata.append(llm_meta)

                    except Exception as e:
                        logger.warning(f"Could not read {generated_file}: {e}")
                        continue

        return llm_metadata

    def _extract_prompt_version(self, filename: str) -> Optional[int]:
        """Extract prompt version number from filename"""
        import re
        match = re.search(r'_v(\d+)\.(c|cpp|py|js|ts|java|go|rs)$', filename)
        if match:
            return int(match.group(1))
        return None


class LLMOrchestrator:
    """Main orchestrator for LLM generation and similarity calculation"""

    def __init__(self, target_languages: List[str] = ['c', 'cpp']):
        self.discovery = OrphanEntryDiscovery(target_languages)
        self.generator = LLMVariantGenerator()
        self.similarity_calc = SimilarityMetricsCalculator()
        self.updater = ClusterJSONUpdater()

        self.stats = {
            'orphans_found': 0,
            'entries_processed': 0,
            'entries_successful': 0,
            'entries_failed': 0,
            'variants_generated': 0,
            'variants_failed': 0
        }

    def run(self, max_entries: Optional[int] = None) -> Dict:
        """
        Run the complete orchestration workflow

        Args:
            max_entries: Maximum number of entries to process (None = all)

        Returns:
            Dictionary with statistics
        """
        logger.info("="*60)
        logger.info("LLM Variant Generator & Similarity Calculator")
        logger.info("="*60)

        # Step 1: Discovery
        logger.info("\n[Step 1/4] Discovering orphan entries...")
        orphans = self.discovery.scan_clusters()
        self.stats['orphans_found'] = len(orphans)

        if not orphans:
            logger.info("✅ No orphan entries found. All entries are complete!")
            return self.stats

        logger.info(f"Found {len(orphans)} orphan entries to process")

        # Limit if requested
        if max_entries and len(orphans) > max_entries:
            logger.info(f"Limiting to first {max_entries} entries")
            orphans = orphans[:max_entries]

        # Process each orphan
        for i, orphan in enumerate(orphans, 1):
            logger.info(f"\n{'='*60}")
            logger.info(f"Processing {i}/{len(orphans)}: {orphan.entry_id}")
            logger.info(f"Cluster: {orphan.cluster_name} | Language: {orphan.language}")
            logger.info(f"Current LLMs: {orphan.current_llm_count}/12")
            logger.info(f"{'='*60}")

            try:
                # Step 2: Generate LLM variants
                logger.info(f"\n[Step 2/4] Generating LLM variants...")
                metadata, successful, failed = self.generator.generate_variants_for_entry(orphan)

                self.stats['variants_generated'] += successful
                self.stats['variants_failed'] += failed

                if successful == 0:
                    logger.error(f"❌ No variants generated for {orphan.entry_id}")
                    self.stats['entries_failed'] += 1
                    continue

                # Step 3: Update cluster JSON
                logger.info(f"\n[Step 3/4] Updating cluster JSON...")
                update_success = self.updater.update_entry_llms(
                    orphan.cluster_name,
                    orphan.entry_id,
                    orphan.language
                )

                if not update_success:
                    logger.error(f"❌ Failed to update cluster JSON")
                    self.stats['entries_failed'] += 1
                    continue

                # Step 4: Calculate similarities
                logger.info(f"\n[Step 4/4] Calculating similarity metrics...")
                similarity_success = self.similarity_calc.calculate_for_entry(
                    orphan,
                    orphan.cluster_name
                )

                if similarity_success:
                    self.stats['entries_successful'] += 1
                    self.stats['entries_processed'] += 1
                    logger.info(f"✅ Successfully completed {orphan.entry_id}")
                else:
                    self.stats['entries_failed'] += 1
                    logger.warning(f"⚠️ Completed {orphan.entry_id} but similarity calculation failed")

            except Exception as e:
                logger.error(f"❌ Error processing {orphan.entry_id}: {e}")
                self.stats['entries_failed'] += 1
                continue

        # Final summary
        self._print_summary()

        return self.stats

    def _print_summary(self):
        """Print final statistics"""
        logger.info("\n" + "="*60)
        logger.info("ORCHESTRATION SUMMARY")
        logger.info("="*60)
        logger.info(f"Orphan entries found: {self.stats['orphans_found']}")
        logger.info(f"Entries processed: {self.stats['entries_processed']}")
        logger.info(f"  - Successful: {self.stats['entries_successful']}")
        logger.info(f"  - Failed: {self.stats['entries_failed']}")
        logger.info(f"Variants generated: {self.stats['variants_generated']}")
        logger.info(f"Variants failed: {self.stats['variants_failed']}")

        if self.stats['entries_processed'] > 0:
            success_rate = (self.stats['entries_successful'] / self.stats['entries_processed']) * 100
            logger.info(f"Success rate: {success_rate:.1f}%")

        logger.info("="*60)


def main():
    """Main entry point"""
    import argparse

    parser = argparse.ArgumentParser(
        description='LLM Variant Generator & Similarity Calculator'
    )
    parser.add_argument(
        '--languages',
        nargs='+',
        choices=['c', 'cpp'],
        default=['c', 'cpp'],
        help='Languages to process (default: c cpp)'
    )
    parser.add_argument(
        '--max-entries',
        type=int,
        help='Maximum number of entries to process (default: all)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Only discover orphans, do not generate'
    )

    args = parser.parse_args()

    # Initialize orchestrator
    orchestrator = LLMOrchestrator(target_languages=args.languages)

    # Dry run mode
    if args.dry_run:
        logger.info("DRY RUN MODE - Discovery only")
        orphans = orchestrator.discovery.scan_clusters()
        logger.info(f"\nFound {len(orphans)} orphan entries:")
        for orphan in orphans:
            logger.info(
                f"  - {orphan.entry_id} ({orphan.language}) "
                f"in {orphan.cluster_name}: {orphan.current_llm_count}/12 LLMs"
            )
        return

    # Run full orchestration
    stats = orchestrator.run(max_entries=args.max_entries)

    # Exit with appropriate code
    if stats['entries_failed'] > 0 and stats['entries_successful'] == 0:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
