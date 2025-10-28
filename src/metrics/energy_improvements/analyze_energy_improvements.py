#!/usr/bin/env python3
"""
Energy Improvements Analysis Script
====================================

This script analyzes energy improvement data from LLM-generated code optimizations.

Main Analyses:
1. Improvements per language (CPU, RAM, execution time)
2. Improvements per model (openAI, gemini, claude)
3. Improvements per prompt version (v1, v2, v3, v4)
4. Improvements per model + prompt version combination
5. Invalid improvements analysis (by model, language, prompt)
6. Outliers analysis (by model, language, prompt)
7. Success rate analysis (valid executions percentage)

Data Processing:
- Valid improvements: label='reduction' or 'degradation', is_outlier=False, label!='invalid'
- Invalid improvements: label='invalid'
- Outliers: is_outlier=True
- Negative improvement % = reduction (better)
- Positive improvement % = degradation (worse)

Output:
- Statistics JSON files in current directory
- PNG charts in current directory
- Console summary statistics
"""

import json
import os
from pathlib import Path
from typing import Dict, List, Tuple
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from collections import defaultdict
from dataclasses import dataclass, asdict
import pandas as pd

# Set style for professional charts
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (12, 8)
plt.rcParams['font.size'] = 10
plt.rcParams['axes.titlesize'] = 14
plt.rcParams['axes.labelsize'] = 12

@dataclass
class ImprovementStats:
    """Statistics for a set of improvements"""
    count: int
    mean: float
    median: float
    std: float
    min: float
    max: float
    q25: float
    q75: float

    @staticmethod
    def from_values(values: List[float]) -> 'ImprovementStats':
        """Create stats from a list of values"""
        if not values:
            return ImprovementStats(0, 0, 0, 0, 0, 0, 0, 0)
        arr = np.array(values)
        return ImprovementStats(
            count=len(values),
            mean=float(np.mean(arr)),
            median=float(np.median(arr)),
            std=float(np.std(arr)),
            min=float(np.min(arr)),
            max=float(np.max(arr)),
            q25=float(np.percentile(arr, 25)),
            q75=float(np.percentile(arr, 75))
        )


class EnergyImprovementsAnalyzer:
    """Analyzer for energy improvements data"""

    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.output_dir = Path(__file__).parent
        self.metrics = ['CPU_usage', 'RAM_usage', 'execution_time_ms']
        self.models = ['openAI', 'gemini', 'claude']
        self.prompts = ['prompt_v1', 'prompt_v2', 'prompt_v3', 'prompt_v4']

        # Data containers
        self.all_data = []
        self.valid_improvements = defaultdict(list)
        self.invalid_improvements = defaultdict(list)
        self.outliers = defaultdict(list)

    def load_all_data(self):
        """Load all improvement data from JSON files"""
        print("Loading data from JSON files...")

        json_files = list(self.data_dir.glob("improvements_cluster_*.json"))
        print(f"Found {len(json_files)} cluster files")

        for json_file in json_files:
            with open(json_file, 'r') as f:
                data = json.load(f)

            # Each file can have multiple entries
            for entry_id, entry_data in data.items():
                if 'improvements_data' not in entry_data:
                    continue

                improvements = entry_data['improvements_data']
                base_language = entry_data.get('base_5_exec_data', {}).get('language', 'unknown')

                for model in self.models:
                    if model not in improvements:
                        continue

                    for prompt in self.prompts:
                        if prompt not in improvements[model]:
                            continue

                        prompt_data = improvements[model][prompt]
                        language = prompt_data.get('language', base_language)

                        for metric in self.metrics:
                            if metric not in prompt_data:
                                continue

                            metric_data = prompt_data[metric]

                            record = {
                                'entry_id': entry_id,
                                'cluster_file': json_file.stem,
                                'model': model,
                                'prompt': prompt,
                                'language': language,
                                'metric': metric,
                                'improvement_percentage': metric_data['improvement_percentage'],
                                'label': metric_data['label'],
                                'is_outlier': metric_data['is_outlier'],
                                'base_value': metric_data['base_value'],
                                'llm_value': metric_data['llm_value'],
                                'successfully_exec': prompt_data.get('LLM_successfully_exec_quantity', 0)
                            }

                            self.all_data.append(record)

                            # Categorize the record
                            key = (model, prompt, language, metric)

                            if metric_data['label'] == 'invalid':
                                self.invalid_improvements[key].append(record)
                            elif metric_data['is_outlier']:
                                self.outliers[key].append(record)
                            else:
                                # Valid improvement (reduction or degradation)
                                self.valid_improvements[key].append(record)

        print(f"Loaded {len(self.all_data)} total records")
        print(f"Valid improvements: {sum(len(v) for v in self.valid_improvements.values())}")
        print(f"Invalid improvements: {sum(len(v) for v in self.invalid_improvements.values())}")
        print(f"Outliers: {sum(len(v) for v in self.outliers.values())}")

    def analyze_by_language(self) -> Dict:
        """Analyze improvements grouped by programming language"""
        print("\n=== Analyzing by Language ===")

        results = {}

        for metric in self.metrics:
            results[metric] = {}

            # Collect data by language
            lang_data = defaultdict(list)

            for key, records in self.valid_improvements.items():
                model, prompt, language, rec_metric = key
                if rec_metric != metric or not language or language == 'unknown':
                    continue

                for record in records:
                    lang_data[language].append(record['improvement_percentage'])

            # Calculate statistics
            for language, values in lang_data.items():
                stats = ImprovementStats.from_values(values)
                results[metric][language] = asdict(stats)
                print(f"{metric} - {language}: {stats.count} samples, mean={stats.mean:.2f}%")

        # Save results
        output_file = self.output_dir / 'stats_by_language.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nSaved statistics to {output_file}")

        return results

    def analyze_by_model(self) -> Dict:
        """Analyze improvements grouped by model"""
        print("\n=== Analyzing by Model ===")

        results = {}

        for metric in self.metrics:
            results[metric] = {}

            # Collect data by model
            model_data = defaultdict(list)

            for key, records in self.valid_improvements.items():
                model, prompt, language, rec_metric = key
                if rec_metric != metric:
                    continue

                for record in records:
                    model_data[model].append(record['improvement_percentage'])

            # Calculate statistics
            for model, values in model_data.items():
                stats = ImprovementStats.from_values(values)
                results[metric][model] = asdict(stats)
                print(f"{metric} - {model}: {stats.count} samples, mean={stats.mean:.2f}%")

        # Save results
        output_file = self.output_dir / 'stats_by_model.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nSaved statistics to {output_file}")

        return results

    def analyze_by_prompt(self) -> Dict:
        """Analyze improvements grouped by prompt version"""
        print("\n=== Analyzing by Prompt Version ===")

        results = {}

        for metric in self.metrics:
            results[metric] = {}

            # Collect data by prompt
            prompt_data = defaultdict(list)

            for key, records in self.valid_improvements.items():
                model, prompt, language, rec_metric = key
                if rec_metric != metric:
                    continue

                for record in records:
                    prompt_data[prompt].append(record['improvement_percentage'])

            # Calculate statistics
            for prompt, values in prompt_data.items():
                stats = ImprovementStats.from_values(values)
                results[metric][prompt] = asdict(stats)
                print(f"{metric} - {prompt}: {stats.count} samples, mean={stats.mean:.2f}%")

        # Save results
        output_file = self.output_dir / 'stats_by_prompt.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nSaved statistics to {output_file}")

        return results

    def analyze_by_model_and_prompt(self) -> Dict:
        """Analyze improvements grouped by model + prompt version"""
        print("\n=== Analyzing by Model + Prompt Version ===")

        results = {}

        for metric in self.metrics:
            results[metric] = {}

            # Collect data by model+prompt
            combo_data = defaultdict(list)

            for key, records in self.valid_improvements.items():
                model, prompt, language, rec_metric = key
                if rec_metric != metric:
                    continue

                combo_key = f"{model}_{prompt}"
                for record in records:
                    combo_data[combo_key].append(record['improvement_percentage'])

            # Calculate statistics
            for combo, values in combo_data.items():
                stats = ImprovementStats.from_values(values)
                results[metric][combo] = asdict(stats)
                print(f"{metric} - {combo}: {stats.count} samples, mean={stats.mean:.2f}%")

        # Save results
        output_file = self.output_dir / 'stats_by_model_and_prompt.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nSaved statistics to {output_file}")

        return results

    def analyze_invalid_improvements(self) -> Dict:
        """Analyze invalid improvements by model, language, and prompt"""
        print("\n=== Analyzing Invalid Improvements ===")

        results = {
            'by_model': defaultdict(int),
            'by_language': defaultdict(int),
            'by_prompt': defaultdict(int),
            'by_model_prompt': defaultdict(int),
            'total': sum(len(v) for v in self.invalid_improvements.values())
        }

        for key, records in self.invalid_improvements.items():
            model, prompt, language, metric = key
            count = len(records)

            results['by_model'][model] += count
            results['by_language'][language] += count
            results['by_prompt'][prompt] += count
            results['by_model_prompt'][f"{model}_{prompt}"] += count

        print(f"Total invalid improvements: {results['total']}")
        print(f"\nBy model: {dict(results['by_model'])}")
        print(f"By language: {dict(results['by_language'])}")
        print(f"By prompt: {dict(results['by_prompt'])}")

        # Convert defaultdicts to regular dicts for JSON serialization
        results['by_model'] = dict(results['by_model'])
        results['by_language'] = dict(results['by_language'])
        results['by_prompt'] = dict(results['by_prompt'])
        results['by_model_prompt'] = dict(results['by_model_prompt'])

        # Save results
        output_file = self.output_dir / 'stats_invalid_improvements.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nSaved statistics to {output_file}")

        return results

    def analyze_outliers(self) -> Dict:
        """Analyze outliers by model, language, and prompt"""
        print("\n=== Analyzing Outliers ===")

        results = {
            'by_model': defaultdict(int),
            'by_language': defaultdict(int),
            'by_prompt': defaultdict(int),
            'by_model_prompt': defaultdict(int),
            'total': sum(len(v) for v in self.outliers.values())
        }

        for key, records in self.outliers.items():
            model, prompt, language, metric = key
            count = len(records)

            results['by_model'][model] += count
            results['by_language'][language] += count
            results['by_prompt'][prompt] += count
            results['by_model_prompt'][f"{model}_{prompt}"] += count

        print(f"Total outliers: {results['total']}")
        print(f"\nBy model: {dict(results['by_model'])}")
        print(f"By language: {dict(results['by_language'])}")
        print(f"By prompt: {dict(results['by_prompt'])}")

        # Convert defaultdicts to regular dicts
        results['by_model'] = dict(results['by_model'])
        results['by_language'] = dict(results['by_language'])
        results['by_prompt'] = dict(results['by_prompt'])
        results['by_model_prompt'] = dict(results['by_model_prompt'])

        # Save results
        output_file = self.output_dir / 'stats_outliers.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nSaved statistics to {output_file}")

        return results

    def analyze_success_rate(self) -> Dict:
        """Analyze success rate (valid executions) by model and prompt"""
        print("\n=== Analyzing Success Rate ===")

        # Count total attempts vs valid executions
        total_attempts = defaultdict(int)
        valid_executions = defaultdict(int)

        for record in self.all_data:
            key = (record['model'], record['prompt'])
            total_attempts[key] += 1

            if record['label'] != 'invalid':
                valid_executions[key] += 1

        results = {}
        for key in total_attempts:
            model, prompt = key
            total = total_attempts[key]
            valid = valid_executions[key]
            rate = (valid / total * 100) if total > 0 else 0

            combo_name = f"{model}_{prompt}"
            results[combo_name] = {
                'total_attempts': total,
                'valid_executions': valid,
                'success_rate_percentage': rate
            }
            print(f"{combo_name}: {valid}/{total} = {rate:.2f}%")

        # Save results
        output_file = self.output_dir / 'stats_success_rate.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nSaved statistics to {output_file}")

        return results

    def create_visualizations(self):
        """Create all visualization charts"""
        print("\n=== Creating Visualizations ===")

        self._plot_improvements_by_language()
        self._plot_improvements_by_model()
        self._plot_improvements_by_prompt()
        self._plot_improvements_by_model_prompt()
        self._plot_improvements_by_model_prompt_boxplots()
        self._plot_invalid_and_outliers()
        self._plot_success_rate()
        self._plot_distribution_by_metric()

        print("All visualizations created successfully")

    def _plot_improvements_by_language(self):
        """Create box plots for improvements by language"""
        fig, axes = plt.subplots(1, 3, figsize=(18, 6))

        for idx, metric in enumerate(self.metrics):
            ax = axes[idx]

            # Collect data
            data_for_plot = []
            languages = set()

            for key, records in self.valid_improvements.items():
                model, prompt, language, rec_metric = key
                if rec_metric != metric or not language or language == 'unknown':
                    continue

                languages.add(language)
                for record in records:
                    data_for_plot.append({
                        'Language': language,
                        'Improvement %': record['improvement_percentage']
                    })

            if data_for_plot:
                df = pd.DataFrame(data_for_plot)

                # Sort by median improvement
                lang_order = df.groupby('Language')['Improvement %'].median().sort_values().index

                sns.boxplot(data=df, x='Language', y='Improvement %', order=lang_order, ax=ax)
                ax.axhline(y=0, color='red', linestyle='--', linewidth=1, alpha=0.7)
                ax.set_title(f'{metric.replace("_", " ").title()}')
                ax.set_xlabel('Programming Language')
                ax.set_ylabel('Improvement %\n(negative = better)')
                ax.tick_params(axis='x', rotation=45)
                ax.grid(True, alpha=0.3)

        plt.tight_layout()
        output_file = self.output_dir / 'fig_improvements_by_language.png'
        plt.savefig(output_file, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"Saved {output_file}")

    def _plot_improvements_by_model(self):
        """Create box plots for improvements by model"""
        fig, axes = plt.subplots(1, 3, figsize=(15, 5))

        for idx, metric in enumerate(self.metrics):
            ax = axes[idx]

            # Collect data
            data_for_plot = []

            for key, records in self.valid_improvements.items():
                model, prompt, language, rec_metric = key
                if rec_metric != metric:
                    continue

                for record in records:
                    data_for_plot.append({
                        'Model': model,
                        'Improvement %': record['improvement_percentage']
                    })

            if data_for_plot:
                df = pd.DataFrame(data_for_plot)

                sns.boxplot(data=df, x='Model', y='Improvement %', ax=ax)
                ax.axhline(y=0, color='red', linestyle='--', linewidth=1, alpha=0.7)
                ax.set_title(f'{metric.replace("_", " ").title()}')
                ax.set_xlabel('LLM Model')
                ax.set_ylabel('Improvement %\n(negative = better)')
                ax.grid(True, alpha=0.3)

        plt.tight_layout()
        output_file = self.output_dir / 'fig_improvements_by_model.png'
        plt.savefig(output_file, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"Saved {output_file}")

    def _plot_improvements_by_prompt(self):
        """Create box plots for improvements by prompt version"""
        fig, axes = plt.subplots(1, 3, figsize=(15, 5))

        for idx, metric in enumerate(self.metrics):
            ax = axes[idx]

            # Collect data
            data_for_plot = []

            for key, records in self.valid_improvements.items():
                model, prompt, language, rec_metric = key
                if rec_metric != metric:
                    continue

                for record in records:
                    data_for_plot.append({
                        'Prompt': prompt,
                        'Improvement %': record['improvement_percentage']
                    })

            if data_for_plot:
                df = pd.DataFrame(data_for_plot)

                # Order prompts
                prompt_order = ['prompt_v1', 'prompt_v2', 'prompt_v3', 'prompt_v4']

                sns.boxplot(data=df, x='Prompt', y='Improvement %', order=prompt_order, ax=ax)
                ax.axhline(y=0, color='red', linestyle='--', linewidth=1, alpha=0.7)
                ax.set_title(f'{metric.replace("_", " ").title()}')
                ax.set_xlabel('Prompt Version')
                ax.set_ylabel('Improvement %\n(negative = better)')
                ax.grid(True, alpha=0.3)

        plt.tight_layout()
        output_file = self.output_dir / 'fig_improvements_by_prompt.png'
        plt.savefig(output_file, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"Saved {output_file}")

    def _plot_improvements_by_model_prompt(self):
        """Create heatmap for improvements by model + prompt version"""
        fig, axes = plt.subplots(1, 3, figsize=(18, 6))

        for idx, metric in enumerate(self.metrics):
            ax = axes[idx]

            # Collect data
            combo_data = defaultdict(list)

            for key, records in self.valid_improvements.items():
                model, prompt, language, rec_metric = key
                if rec_metric != metric:
                    continue

                for record in records:
                    combo_data[(model, prompt)].append(record['improvement_percentage'])

            # Create matrix for heatmap
            models_list = ['openAI', 'gemini', 'claude']
            prompts_list = ['prompt_v1', 'prompt_v2', 'prompt_v3', 'prompt_v4']

            matrix = np.zeros((len(models_list), len(prompts_list)))

            for i, model in enumerate(models_list):
                for j, prompt in enumerate(prompts_list):
                    key = (model, prompt)
                    if key in combo_data:
                        matrix[i, j] = np.mean(combo_data[key])
                    else:
                        matrix[i, j] = np.nan

            # Create heatmap
            sns.heatmap(matrix, annot=True, fmt='.2f', cmap='RdYlGn_r',
                       xticklabels=[p.replace('prompt_', 'v') for p in prompts_list],
                       yticklabels=models_list, ax=ax, center=0,
                       cbar_kws={'label': 'Mean Improvement %'})
            ax.set_title(f'{metric.replace("_", " ").title()}')
            ax.set_xlabel('Prompt Version')
            ax.set_ylabel('LLM Model')

        plt.tight_layout()
        output_file = self.output_dir / 'fig_heatmap_model_prompt.png'
        plt.savefig(output_file, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"Saved {output_file}")

    def _plot_improvements_by_model_prompt_boxplots(self):
        """Create box plots for all model + prompt combinations (3 subplots, one per metric)"""
        fig, axes = plt.subplots(1, 3, figsize=(20, 6))

        for idx, metric in enumerate(self.metrics):
            ax = axes[idx]

            # Collect data for all model+prompt combinations
            data_for_plot = []

            for key, records in self.valid_improvements.items():
                model, prompt, language, rec_metric = key
                if rec_metric != metric:
                    continue

                # Create combination label like "openAI_v1", "claude_v2", etc.
                prompt_short = prompt.replace('prompt_', '')
                combo_label = f"{model}_{prompt_short}"

                for record in records:
                    data_for_plot.append({
                        'Model_Prompt': combo_label,
                        'Model': model,
                        'Prompt': prompt,
                        'Improvement %': record['improvement_percentage']
                    })

            if data_for_plot:
                df = pd.DataFrame(data_for_plot)

                # Create ordered list of combinations: openAI_v1-v4, gemini_v1-v4, claude_v1-v4
                combo_order = []
                for model in ['openAI', 'gemini', 'claude']:
                    for v in ['v1', 'v2', 'v3', 'v4']:
                        combo_order.append(f"{model}_{v}")

                # Filter to only existing combinations
                existing_combos = [c for c in combo_order if c in df['Model_Prompt'].unique()]

                # Create box plot
                sns.boxplot(data=df, x='Model_Prompt', y='Improvement %',
                           order=existing_combos, ax=ax, hue='Model_Prompt',
                           palette='Set2', legend=False)

                # Add horizontal line at y=0
                ax.axhline(y=0, color='red', linestyle='--', linewidth=1.5, alpha=0.7)

                # Styling
                ax.set_title(f'{metric.replace("_", " ").title()}', fontsize=14, fontweight='bold')
                ax.set_xlabel('Model + Prompt Version', fontsize=12)
                ax.set_ylabel('Improvement %\n(negative = better)', fontsize=12)

                # Rotate x-axis labels
                ax.tick_params(axis='x', rotation=45)

                # Add vertical lines to separate models
                ax.axvline(x=3.5, color='gray', linestyle=':', linewidth=1, alpha=0.5)
                ax.axvline(x=7.5, color='gray', linestyle=':', linewidth=1, alpha=0.5)

                # Add model labels at the top
                ax.text(1.5, ax.get_ylim()[1] * 0.95, 'OpenAI',
                       ha='center', fontsize=10, fontweight='bold', color='darkblue')
                ax.text(5.5, ax.get_ylim()[1] * 0.95, 'Gemini',
                       ha='center', fontsize=10, fontweight='bold', color='darkgreen')
                ax.text(9.5, ax.get_ylim()[1] * 0.95, 'Claude',
                       ha='center', fontsize=10, fontweight='bold', color='darkred')

                ax.grid(True, alpha=0.3, axis='y')

        plt.tight_layout()
        output_file = self.output_dir / 'fig_model_prompt_combinations_boxplots.png'
        plt.savefig(output_file, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"Saved {output_file}")

    def _plot_invalid_and_outliers(self):
        """Create bar plots for invalid improvements and outliers"""
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))

        # Invalid by model
        invalid_by_model = defaultdict(int)
        for key, records in self.invalid_improvements.items():
            model, prompt, language, metric = key
            invalid_by_model[model] += len(records)

        ax = axes[0, 0]
        models = list(invalid_by_model.keys())
        counts = list(invalid_by_model.values())
        ax.bar(models, counts, color='coral')
        ax.set_title('Invalid Improvements by Model')
        ax.set_xlabel('Model')
        ax.set_ylabel('Count')
        ax.grid(True, alpha=0.3)

        # Invalid by prompt
        invalid_by_prompt = defaultdict(int)
        for key, records in self.invalid_improvements.items():
            model, prompt, language, metric = key
            invalid_by_prompt[prompt] += len(records)

        ax = axes[0, 1]
        prompts = sorted(invalid_by_prompt.keys())
        counts = [invalid_by_prompt[p] for p in prompts]
        ax.bar([p.replace('prompt_', 'v') for p in prompts], counts, color='coral')
        ax.set_title('Invalid Improvements by Prompt Version')
        ax.set_xlabel('Prompt Version')
        ax.set_ylabel('Count')
        ax.grid(True, alpha=0.3)

        # Outliers by model
        outliers_by_model = defaultdict(int)
        for key, records in self.outliers.items():
            model, prompt, language, metric = key
            outliers_by_model[model] += len(records)

        ax = axes[1, 0]
        models = list(outliers_by_model.keys())
        counts = list(outliers_by_model.values())
        ax.bar(models, counts, color='steelblue')
        ax.set_title('Outliers by Model')
        ax.set_xlabel('Model')
        ax.set_ylabel('Count')
        ax.grid(True, alpha=0.3)

        # Outliers by prompt
        outliers_by_prompt = defaultdict(int)
        for key, records in self.outliers.items():
            model, prompt, language, metric = key
            outliers_by_prompt[prompt] += len(records)

        ax = axes[1, 1]
        prompts = sorted(outliers_by_prompt.keys())
        counts = [outliers_by_prompt[p] for p in prompts]
        ax.bar([p.replace('prompt_', 'v') for p in prompts], counts, color='steelblue')
        ax.set_title('Outliers by Prompt Version')
        ax.set_xlabel('Prompt Version')
        ax.set_ylabel('Count')
        ax.grid(True, alpha=0.3)

        plt.tight_layout()
        output_file = self.output_dir / 'fig_invalid_and_outliers.png'
        plt.savefig(output_file, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"Saved {output_file}")

    def _plot_success_rate(self):
        """Create bar plot for success rates"""
        # Count total attempts vs valid executions
        total_attempts = defaultdict(int)
        valid_executions = defaultdict(int)

        for record in self.all_data:
            key = (record['model'], record['prompt'])
            total_attempts[key] += 1

            if record['label'] != 'invalid':
                valid_executions[key] += 1

        # Prepare data
        data_for_plot = []
        for key in total_attempts:
            model, prompt = key
            total = total_attempts[key]
            valid = valid_executions[key]
            rate = (valid / total * 100) if total > 0 else 0

            data_for_plot.append({
                'Model': model,
                'Prompt': prompt.replace('prompt_', 'v'),
                'Success Rate %': rate
            })

        df = pd.DataFrame(data_for_plot)

        # Create grouped bar plot
        fig, ax = plt.subplots(figsize=(12, 6))

        # Pivot for grouped bars
        pivot_df = df.pivot(index='Prompt', columns='Model', values='Success Rate %')
        pivot_df.plot(kind='bar', ax=ax, width=0.8)

        ax.set_title('Success Rate by Model and Prompt Version')
        ax.set_xlabel('Prompt Version')
        ax.set_ylabel('Success Rate (%)')
        ax.set_ylim([0, 105])
        ax.legend(title='Model')
        ax.grid(True, alpha=0.3)
        plt.xticks(rotation=0)

        plt.tight_layout()
        output_file = self.output_dir / 'fig_success_rate.png'
        plt.savefig(output_file, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"Saved {output_file}")

    def _plot_distribution_by_metric(self):
        """Create distribution plots for each metric"""
        fig, axes = plt.subplots(1, 3, figsize=(18, 5))

        for idx, metric in enumerate(self.metrics):
            ax = axes[idx]

            # Collect all valid improvements for this metric
            values = []
            for key, records in self.valid_improvements.items():
                model, prompt, language, rec_metric = key
                if rec_metric != metric:
                    continue

                for record in records:
                    values.append(record['improvement_percentage'])

            if values:
                # Create histogram with KDE
                ax.hist(values, bins=50, alpha=0.6, color='skyblue', edgecolor='black')
                ax.axvline(x=0, color='red', linestyle='--', linewidth=2, label='No change')
                ax.axvline(x=np.median(values), color='green', linestyle='-', linewidth=2, label=f'Median: {np.median(values):.2f}%')

                ax.set_title(f'{metric.replace("_", " ").title()} Distribution')
                ax.set_xlabel('Improvement % (negative = better)')
                ax.set_ylabel('Frequency')
                ax.legend()
                ax.grid(True, alpha=0.3)

        plt.tight_layout()
        output_file = self.output_dir / 'fig_improvement_distributions.png'
        plt.savefig(output_file, dpi=300, bbox_inches='tight')
        plt.close()
        print(f"Saved {output_file}")

    def run_full_analysis(self):
        """Run complete analysis pipeline"""
        print("="*80)
        print("ENERGY IMPROVEMENTS ANALYSIS")
        print("="*80)

        # Load data
        self.load_all_data()

        # Run all analyses
        self.analyze_by_language()
        self.analyze_by_model()
        self.analyze_by_prompt()
        self.analyze_by_model_and_prompt()
        self.analyze_invalid_improvements()
        self.analyze_outliers()
        self.analyze_success_rate()

        # Create visualizations
        self.create_visualizations()

        print("\n" + "="*80)
        print("ANALYSIS COMPLETE")
        print("="*80)
        print(f"\nOutput directory: {self.output_dir}")
        print("\nGenerated files:")
        print("  Statistics JSON files:")
        print("    - stats_by_language.json")
        print("    - stats_by_model.json")
        print("    - stats_by_prompt.json")
        print("    - stats_by_model_and_prompt.json")
        print("    - stats_invalid_improvements.json")
        print("    - stats_outliers.json")
        print("    - stats_success_rate.json")
        print("\n  Visualization PNG files:")
        print("    - fig_improvements_by_language.png")
        print("    - fig_improvements_by_model.png")
        print("    - fig_improvements_by_prompt.png")
        print("    - fig_heatmap_model_prompt.png")
        print("    - fig_model_prompt_combinations_boxplots.png")
        print("    - fig_invalid_and_outliers.png")
        print("    - fig_success_rate.png")
        print("    - fig_improvement_distributions.png")


def main():
    """Main entry point"""
    # Data directory
    data_dir = Path(__file__).parent / 'clusters_improvements_data'

    if not data_dir.exists():
        print(f"ERROR: Data directory not found: {data_dir}")
        return

    # Create analyzer and run
    analyzer = EnergyImprovementsAnalyzer(data_dir)
    analyzer.run_full_analysis()


if __name__ == '__main__':
    main()
