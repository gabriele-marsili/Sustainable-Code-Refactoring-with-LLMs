#!/usr/bin/env python3
"""
Script to analyze execution outputs and identify clusters with invalid metrics.
Focuses on finding entries with metrics = 0 or missing metrics, especially for C, C++, Java.
"""


import sys
import logging
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Tuple, Set
import re

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

from utility_dir import general_utils


class InvalidOutputAnalyzer:
    """Analyzes execution outputs to find invalid entries"""

    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.logger = logging.getLogger(__name__)

        # Track problematic clusters by language
        self.invalid_base_clusters: Dict[str, Dict[str, List]] = defaultdict(lambda: defaultdict(list))
        self.invalid_llm_clusters: Dict[str, Dict[str, List]] = defaultdict(lambda: defaultdict(list))

        # Track statistics
        self.stats = {
            'total_base_files': 0,
            'total_llm_files': 0,
            'invalid_base_files': 0,
            'invalid_llm_files': 0,
            'by_language': defaultdict(lambda: {'base': 0, 'llm': 0, 'base_invalid': 0, 'llm_invalid': 0})
        }

    def parse_filename(self, filename: str) -> Tuple[str, str, int]:
        """
        Parse filename to extract cluster_name, type (base/llm), and execution number
        Returns: (cluster_name, test_type, exec_num, prompt_version)
        """
        # Remove .json extension
        name = filename.replace('.json', '')

        # Pattern for base: {cluster_name}_results_{exec_num}
        base_pattern = r'^(.+)_results_(\d+)$'
        # Pattern for LLM: {cluster_name}_results_v{version}_{exec_num}
        llm_pattern = r'^(.+)_results_v(\d+)_(\d+)$'

        llm_match = re.match(llm_pattern, name)
        if llm_match:
            cluster_name = llm_match.group(1)
            prompt_version = int(llm_match.group(2))
            exec_num = int(llm_match.group(3))
            return (cluster_name, 'llm', exec_num, prompt_version)

        base_match = re.match(base_pattern, name)
        if base_match:
            cluster_name = base_match.group(1)
            exec_num = int(base_match.group(2))
            return (cluster_name, 'base', exec_num, None)

        return (None, None, None, None)

    def check_entry_validity(self, entry: Dict, test_type: str) -> Tuple[bool, List[str]]:
        """
        Check if an entry has valid metrics
        Returns: (is_valid, list_of_issues)
        """
        issues = []

        if test_type == 'llm':
            # Check LLM entry
            llm_results = entry.get('LLM_results', [])
            if not llm_results:
                issues.append("No LLM_results found")
                return (False, issues)

            for idx, result in enumerate(llm_results):
                exec_time = result.get('execution_time_ms')
                cpu_usage = result.get('CPU_usage')
                ram_usage = result.get('RAM_usage')
                test_passed = result.get('regressionTestPassed')

                if exec_time is None or exec_time == 0:
                    issues.append(f"LLM_result[{idx}]: execution_time_ms is {exec_time}")
                if cpu_usage is None or cpu_usage == 0:
                    issues.append(f"LLM_result[{idx}]: CPU_usage is {cpu_usage}")
                if ram_usage is None or ram_usage == 0:
                    issues.append(f"LLM_result[{idx}]: RAM_usage is {ram_usage}")
                if test_passed is None:
                    issues.append(f"LLM_result[{idx}]: regressionTestPassed is None")
        else:
            # Check base entry
            exec_time = entry.get('execution_time_ms')
            cpu_usage = entry.get('CPU_usage')
            ram_usage = entry.get('RAM_usage')
            test_passed = entry.get('regressionTestPassed')

            if exec_time is None or exec_time == 0:
                issues.append(f"execution_time_ms is {exec_time}")
            if cpu_usage is None or cpu_usage == 0:
                issues.append(f"CPU_usage is {cpu_usage}")
            if ram_usage is None or ram_usage == 0:
                issues.append(f"RAM_usage is {ram_usage}")
            if test_passed is None:
                issues.append("regressionTestPassed is None")

        return (len(issues) == 0, issues)

    def analyze_file(self, file_path: Path) -> Dict:
        """Analyze a single output file"""
        try:
            data = general_utils.read_json(file_path)

            cluster_name, test_type, exec_num, prompt_version = self.parse_filename(file_path.name)

            if not cluster_name:
                self.logger.warning(f"Could not parse filename: {file_path.name}")
                return None

            results = data.get('results', {})
            if not results:
                return {
                    'file': file_path.name,
                    'cluster': cluster_name,
                    'type': test_type,
                    'exec_num': exec_num,
                    'prompt_version': prompt_version,
                    'status': 'empty_results',
                    'invalid_entries': [],
                    'total_entries': 0
                }

            # Update stats
            if test_type == 'base':
                self.stats['total_base_files'] += 1
            else:
                self.stats['total_llm_files'] += 1

            invalid_entries = []
            total_entries = 0

            for language, entries in results.items():
                for entry in entries:
                    total_entries += 1
                    entry_id = entry.get('id', 'unknown')

                    # Update language stats
                    self.stats['by_language'][language][test_type] += 1

                    is_valid, issues = self.check_entry_validity(entry, test_type)

                    if not is_valid:
                        invalid_entries.append({
                            'id': entry_id,
                            'language': language,
                            'filename': entry.get('filename', 'unknown'),
                            'issues': issues
                        })

                        # Update invalid stats
                        self.stats['by_language'][language][f'{test_type}_invalid'] += 1

                        # Track problematic clusters
                        if test_type == 'base':
                            self.invalid_base_clusters[cluster_name][language].append({
                                'exec_num': exec_num,
                                'entry_id': entry_id,
                                'issues': issues
                            })
                        else:
                            self.invalid_llm_clusters[cluster_name][language].append({
                                'exec_num': exec_num,
                                'prompt_version': prompt_version,
                                'entry_id': entry_id,
                                'issues': issues
                            })

            # Mark file as invalid if it has invalid entries
            if invalid_entries:
                if test_type == 'base':
                    self.stats['invalid_base_files'] += 1
                else:
                    self.stats['invalid_llm_files'] += 1

            return {
                'file': file_path.name,
                'cluster': cluster_name,
                'type': test_type,
                'exec_num': exec_num,
                'prompt_version': prompt_version,
                'status': 'invalid' if invalid_entries else 'valid',
                'invalid_entries': invalid_entries,
                'total_entries': total_entries,
                'invalid_count': len(invalid_entries)
            }

        except Exception as e:
            self.logger.error(f"Error analyzing {file_path.name}: {e}")
            return None

    def analyze_all_outputs(self) -> List[Dict]:
        """Analyze all output files"""
        output_files = sorted(self.output_dir.glob('*.json'))

        self.logger.info(f"Found {len(output_files)} output files to analyze")

        results = []
        for file_path in output_files:
            result = self.analyze_file(file_path)
            if result:
                results.append(result)

        return results

    def print_summary(self, results: List[Dict]):
        """Print analysis summary"""
        print("\n" + "="*80)
        print("EXECUTION OUTPUT ANALYSIS SUMMARY")
        print("="*80)

        # Overall stats
        print(f"\nTotal Files Analyzed: {len(results)}")
        print(f"  - Base files: {self.stats['total_base_files']}")
        print(f"  - LLM files: {self.stats['total_llm_files']}")
        print("\nInvalid Files:")
        print(f"  - Base files with issues: {self.stats['invalid_base_files']} ({self.stats['invalid_base_files']/max(1,self.stats['total_base_files'])*100:.1f}%)")
        print(f"  - LLM files with issues: {self.stats['invalid_llm_files']} ({self.stats['invalid_llm_files']/max(1,self.stats['total_llm_files'])*100:.1f}%)")

        # By language
        print("\n" + "-"*80)
        print("ISSUES BY LANGUAGE")
        print("-"*80)

        for language in sorted(self.stats['by_language'].keys()):
            lang_stats = self.stats['by_language'][language]
            print(f"\n{language.upper()}:")
            print(f"  Base: {lang_stats['base_invalid']}/{lang_stats['base']} invalid entries ({lang_stats['base_invalid']/max(1,lang_stats['base'])*100:.1f}%)")
            print(f"  LLM:  {lang_stats['llm_invalid']}/{lang_stats['llm']} invalid entries ({lang_stats['llm_invalid']/max(1,lang_stats['llm'])*100:.1f}%)")

        # Problematic base clusters
        print("\n" + "-"*80)
        print("PROBLEMATIC BASE CLUSTERS (Priority Languages: C, C++, Java)")
        print("-"*80)

        priority_languages = {'c', 'cpp', 'java'}

        # Sort clusters by number of issues, prioritizing C/C++/Java
        sorted_base_clusters = sorted(
            self.invalid_base_clusters.items(),
            key=lambda x: (
                -sum(1 for lang in x[1].keys() if lang.lower() in priority_languages),  # Priority languages first
                -sum(len(entries) for entries in x[1].values())  # Then by total issues
            )
        )

        for cluster_name, languages in sorted_base_clusters[:30]:  # Top 30 problematic clusters
            priority_langs = [lang for lang in languages.keys() if lang.lower() in priority_languages]

            if priority_langs:
                print(f"\n[PRIORITY] {cluster_name}:")
            else:
                print(f"\n{cluster_name}:")

            for language in sorted(languages.keys()):
                issues = languages[language]
                if language.lower() in priority_languages:
                    print(f"  [{language.upper()}] *** {len(issues)} invalid entries ***")
                else:
                    print(f"  [{language}] {len(issues)} invalid entries")

                # Show sample issues
                if issues:
                    sample = issues[0]
                    print(f"    Sample: exec#{sample['exec_num']}, entry={sample['entry_id']}")
                    print(f"    Issues: {', '.join(sample['issues'][:3])}")

        # Problematic LLM clusters
        if self.invalid_llm_clusters:
            print("\n" + "-"*80)
            print("PROBLEMATIC LLM CLUSTERS (Top 10)")
            print("-"*80)

            sorted_llm_clusters = sorted(
                self.invalid_llm_clusters.items(),
                key=lambda x: sum(len(entries) for entries in x[1].values()),
                reverse=True
            )

            for cluster_name, languages in sorted_llm_clusters[:10]:
                print(f"\n{cluster_name}:")
                for language in sorted(languages.keys()):
                    issues = languages[language]
                    print(f"  [{language}] {len(issues)} invalid entries")

    def get_clusters_to_rerun(self, priority_languages: Set[str] = None) -> Dict[str, List[str]]:
        """
        Get list of clusters that need to be re-run, organized by type
        """
        if priority_languages is None:
            priority_languages = {'c', 'cpp', 'java'}

        clusters_to_rerun = {
            'base_priority': [],  # Base clusters with C/C++/Java issues
            'base_other': [],     # Base clusters with other language issues
            'llm': []             # LLM clusters with issues
        }

        # Base clusters
        for cluster_name, languages in self.invalid_base_clusters.items():
            has_priority_lang = any(lang.lower() in priority_languages for lang in languages.keys())

            if has_priority_lang:
                clusters_to_rerun['base_priority'].append(cluster_name)
            else:
                clusters_to_rerun['base_other'].append(cluster_name)

        # LLM clusters
        for cluster_name in self.invalid_llm_clusters.keys():
            clusters_to_rerun['llm'].append(cluster_name)

        return clusters_to_rerun

    def save_report(self, output_path: Path):
        """Save detailed report to JSON"""
        report = {
            'stats': dict(self.stats),
            'invalid_base_clusters': {
                cluster: {
                    lang: [
                        {
                            'exec_num': issue['exec_num'],
                            'entry_id': issue['entry_id'],
                            'issues': issue['issues']
                        }
                        for issue in issues
                    ]
                    for lang, issues in languages.items()
                }
                for cluster, languages in self.invalid_base_clusters.items()
            },
            'invalid_llm_clusters': {
                cluster: {
                    lang: [
                        {
                            'exec_num': issue['exec_num'],
                            'prompt_version': issue['prompt_version'],
                            'entry_id': issue['entry_id'],
                            'issues': issue['issues']
                        }
                        for issue in issues
                    ]
                    for lang, issues in languages.items()
                }
                for cluster, languages in self.invalid_llm_clusters.items()
            },
            'clusters_to_rerun': self.get_clusters_to_rerun()
        }

        general_utils.write_json(output_path, report)
        self.logger.info(f"Detailed report saved to {output_path}")


def main():
    """Main entry point"""
    # Setup logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )

    output_dir = Path(__file__).parent.parent / 'execution_outputs'

    if not output_dir.exists():
        print(f"Error: Output directory not found: {output_dir}")
        sys.exit(1)

    print(f"Analyzing execution outputs in: {output_dir}")

    analyzer = InvalidOutputAnalyzer(output_dir)
    results = analyzer.analyze_all_outputs()

    # Print summary
    analyzer.print_summary(results)

    # Save detailed report
    report_path = Path(__file__).parent / 'invalid_outputs_report.json'
    analyzer.save_report(report_path)

    print(f"\n{'='*80}")
    print(f"Detailed report saved to: {report_path}")
    print(f"{'='*80}\n")

    # Get clusters to rerun
    clusters = analyzer.get_clusters_to_rerun()

    print("\nCLUSTERS TO RE-RUN:")
    print(f"  Priority (C/C++/Java): {len(clusters['base_priority'])} clusters")
    print(f"  Other languages: {len(clusters['base_other'])} clusters")
    print(f"  LLM clusters: {len(clusters['llm'])} clusters")

    # Save list of clusters to re-run
    rerun_list_path = Path(__file__).parent / 'clusters_to_rerun.txt'
    with open(rerun_list_path, 'w') as f:
        f.write("# Priority clusters (C/C++/Java issues)\n")
        for cluster in sorted(clusters['base_priority']):
            f.write(f"{cluster}\n")

        f.write("\n# Other language issues\n")
        for cluster in sorted(clusters['base_other']):
            f.write(f"{cluster}\n")

        if clusters['llm']:
            f.write("\n# LLM clusters\n")
            for cluster in sorted(clusters['llm']):
                f.write(f"{cluster}\n")

    print(f"\nCluster list saved to: {rerun_list_path}")


if __name__ == '__main__':
    main()
