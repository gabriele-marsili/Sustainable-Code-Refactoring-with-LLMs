"""
Energy and Carbon Footprint Analyzer for Sustainable Code Refactoring

This module calculates absolute energy consumption (Joules) and carbon emissions (gCO2eq)
from execution metrics (CPU%, RAM KB, execution time ms) using Green Computing methodologies.

Author: Senior AI Engineer & Data Scientist
Date: 2025-11-01
Version: 1.0
"""

import json
import numpy as np
from pathlib import Path
from typing import Dict, List, Tuple, Optional
import sys
from collections import defaultdict
import logging

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))
from utility_dir.utility_paths import OUTPUT_DIR_FILEPATH, METRICS_DIR_FILEPATH, CLUSTERS_DIR_FILEPATH
from utility_dir.general_utils import read_json, write_json, get_cluster_names


class EnergyConfig:
    """
    Configuration manager for energy and carbon calculations.

    Loads hardware constants and carbon intensity factors from energy_config.json.
    """

    def __init__(self, config_path: Optional[Path] = None):
        """
        Initialize configuration from JSON file.

        Args:
            config_path: Path to energy_config.json. If None, uses default location.
        """
        if config_path is None:
            config_path = Path(__file__).parent / "energy_config.json"

        self.config_path = config_path
        self.config_data = read_json(str(config_path))

        # Extract configuration sections
        self.hardware = self.config_data.get("hardware_constants", {})
        self.carbon = self.config_data.get("carbon_intensity", {})
        self.conversions = self.config_data.get("conversion_factors", {})

    def get_tdp_cpu(self) -> float:
        """Get CPU Thermal Design Power in Watts."""
        return self.hardware.get("TDP_CPU_WATT", 95.0)

    def get_power_per_gb_ram(self) -> float:
        """Get power consumption per GB of RAM in Watts."""
        return self.hardware.get("POWER_PER_GB_RAM_WATT", 0.375)

    def get_pue(self) -> float:
        """Get Power Usage Effectiveness (data center efficiency multiplier)."""
        return self.hardware.get("PUE_FACTOR", 1.5)

    def get_carbon_intensity(self) -> float:
        """Get carbon intensity in gCO2eq per kWh."""
        return self.carbon.get("CARBON_INTENSITY_GCO2_PER_KWH", 400.0)

    def get_carbon_region(self) -> str:
        """Get carbon intensity region description."""
        return self.carbon.get("region", "EU-average")

    def get_joules_to_kwh(self) -> float:
        """Get Joules to kWh conversion factor."""
        return self.conversions.get("JOULES_TO_KWH", 3600000.0)

    def get_kb_to_gb(self) -> float:
        """Get KB to GB conversion factor."""
        return self.conversions.get("KB_TO_GB", 1048576.0)

    def get_ms_to_sec(self) -> float:
        """Get milliseconds to seconds conversion factor."""
        return self.conversions.get("MS_TO_SEC", 1000.0)

    def __str__(self) -> str:
        """String representation of configuration."""
        return (
            f"EnergyConfig(\n"
            f"  TDP_CPU: {self.get_tdp_cpu()}W\n"
            f"  RAM_Power: {self.get_power_per_gb_ram()}W/GB\n"
            f"  PUE: {self.get_pue()}\n"
            f"  Carbon Intensity: {self.get_carbon_intensity()} gCO2eq/kWh ({self.get_carbon_region()})\n"
            f")"
        )


def calculate_energy_joules(
    mean_cpu_percent: float,
    mean_ram_kb: float,
    mean_exec_time_ms: float,
    config: EnergyConfig
) -> float:
    """
    Calculate energy consumption in Joules.

    Formula:
        1. Convert execution time to seconds
        2. Calculate CPU power: TDP * (CPU% / 100)
        3. Calculate RAM power: RAM_GB * Power_per_GB
        4. Total power = (CPU_power + RAM_power) * PUE
        5. Energy = Total_power * time_seconds

    Args:
        mean_cpu_percent: Average CPU usage percentage (0-100)
        mean_ram_kb: Average RAM usage in kilobytes
        mean_exec_time_ms: Average execution time in milliseconds
        config: EnergyConfig instance with hardware constants

    Returns:
        Energy consumption in Joules

    Example:
        >>> config = EnergyConfig()
        >>> energy = calculate_energy_joules(50.0, 1048576, 1000.0, config)
        >>> print(f"{energy:.2f} Joules")
        75.60 Joules
    """
    # Convert time to seconds
    mean_exec_time_sec = mean_exec_time_ms / config.get_ms_to_sec()

    # Calculate CPU power consumption
    mean_cpu_power_watt = config.get_tdp_cpu() * (mean_cpu_percent / 100.0)

    # Calculate RAM power consumption
    mean_ram_gb = mean_ram_kb / config.get_kb_to_gb()
    mean_ram_power_watt = mean_ram_gb * config.get_power_per_gb_ram()

    # Total power with PUE factor (accounts for data center efficiency)
    total_power_watt = (mean_cpu_power_watt + mean_ram_power_watt) * config.get_pue()

    # Energy = Power * Time
    energy_joules = total_power_watt * mean_exec_time_sec

    return energy_joules


def calculate_carbon_gco2eq(energy_joules: float, config: EnergyConfig) -> float:
    """
    Calculate carbon footprint in grams of CO2 equivalent.

    Formula:
        1. Convert Joules to kWh
        2. Carbon = kWh * Carbon_Intensity

    Args:
        energy_joules: Energy consumption in Joules
        config: EnergyConfig instance with carbon intensity factor

    Returns:
        Carbon emissions in gCO2eq (grams of CO2 equivalent)

    Example:
        >>> config = EnergyConfig()
        >>> carbon = calculate_carbon_gco2eq(75.6, config)
        >>> print(f"{carbon:.4f} gCO2eq")
        0.0084 gCO2eq
    """
    # Convert Joules to kWh
    energy_kwh = energy_joules / config.get_joules_to_kwh()

    # Calculate carbon emissions
    carbon_gco2eq = energy_kwh * config.get_carbon_intensity()

    return carbon_gco2eq


def is_valid_metric_value(value) -> bool:
    """
    Check if a metric value is valid (not None, not zero, not negative).

    Args:
        value: Metric value to validate

    Returns:
        True if valid, False otherwise
    """
    if value is None:
        return False
    try:
        num_value = float(value)
        return num_value > 0
    except (ValueError, TypeError):
        return False


def load_and_filter_execution_data(logger) -> Dict:
    """
    Load all execution data from src/execution_outputs/ and filter invalid entries.

    Filtering criteria:
        - Discard executions with None or <= 0 values for: execution_time_ms, CPU_usage, RAM_usage
        - For LLM entries: discard if regressionTestPassed != True

    Aggregation:
        - Group the 5 executions per entry_id (base) or entry_id+LLM_type+prompt_v (LLM)
        - Calculate mean of CPU_usage, RAM_usage, execution_time_ms

    Args:
        logger: Logger instance for progress tracking

    Returns:
        Dictionary with structure:
        {
            "base_entries": [
                {
                    "id": str,
                    "cluster": str,
                    "language": str,
                    "mean_cpu": float,
                    "mean_ram_kb": float,
                    "mean_exec_time_ms": float,
                    "num_valid_executions": int
                }
            ],
            "llm_entries": [
                {
                    "id": str,
                    "cluster": str,
                    "language": str,
                    "llm_type": str,
                    "prompt_version": str,
                    "mean_cpu": float,
                    "mean_ram_kb": float,
                    "mean_exec_time_ms": float,
                    "num_valid_executions": int,
                    "base_entry_id": str
                }
            ]
        }
    """
    logger.info("Loading execution data from src/execution_outputs/...")

    # Get all cluster names
    cluster_names = get_cluster_names(CLUSTERS_DIR_FILEPATH)
    logger.info(f"Found {len(cluster_names)} clusters to process")

    # Storage for raw execution data (before aggregation)
    base_executions = defaultdict(list)  # key: entry_id, value: list of execution dicts
    llm_executions = defaultdict(list)   # key: (entry_id, llm_type, prompt_v), value: list of execution dicts

    # Process each cluster
    for cluster_name in cluster_names:
        # Load base code results (5 files: cluster_results_1.json to cluster_results_5.json)
        for run_num in range(1, 6):
            base_file = OUTPUT_DIR_FILEPATH / f"{cluster_name}_results_{run_num}.json"
            if not base_file.exists():
                logger.warning(f"Base file not found: {base_file}")
                continue

            base_data = read_json(str(base_file))
            if not base_data or "results" not in base_data:
                continue

            # Process each language in results
            for lang, entries in base_data["results"].items():
                if not isinstance(entries, list):
                    continue

                for entry in entries:
                    # Filter out invalid entries
                    if not is_valid_metric_value(entry.get("execution_time_ms")):
                        continue
                    if not is_valid_metric_value(entry.get("CPU_usage")):
                        continue
                    if not is_valid_metric_value(entry.get("RAM_usage")):
                        continue

                    entry_id = entry.get("id")
                    if not entry_id:
                        continue

                    # Store execution data
                    base_executions[entry_id].append({
                        "cluster": cluster_name,
                        "language": entry.get("language", lang),
                        "cpu": float(entry["CPU_usage"]),
                        "ram_kb": float(entry["RAM_usage"]),
                        "exec_time_ms": float(entry["execution_time_ms"])
                    })

        # Load LLM code results (4 prompt versions x 5 runs)
        for prompt_v in ["v1", "v2", "v3", "v4"]:
            for run_num in range(1, 6):
                llm_file = OUTPUT_DIR_FILEPATH / f"{cluster_name}_results_{prompt_v}_{run_num}.json"
                if not llm_file.exists():
                    continue

                llm_data = read_json(str(llm_file))
                if not llm_data or "results" not in llm_data:
                    continue

                # Process each language in results
                for lang, entries in llm_data["results"].items():
                    if not isinstance(entries, list):
                        continue

                    for entry in entries:
                        entry_id = entry.get("id")
                        if not entry_id:
                            continue

                        # Process LLM_results array
                        llm_results = entry.get("LLM_results", [])
                        if not isinstance(llm_results, list):
                            continue

                        for llm_result in llm_results:
                            # Filter: must pass regression test
                            if not llm_result.get("regressionTestPassed", False):
                                continue

                            # Filter: valid metrics
                            if not is_valid_metric_value(llm_result.get("execution_time_ms")):
                                continue
                            if not is_valid_metric_value(llm_result.get("CPU_usage")):
                                continue
                            if not is_valid_metric_value(llm_result.get("RAM_usage")):
                                continue

                            llm_type = llm_result.get("LLM_type")
                            if not llm_type:
                                continue

                            # Create composite key: (entry_id, llm_type, prompt_v)
                            key = (entry_id, llm_type, prompt_v)

                            # Store execution data
                            llm_executions[key].append({
                                "cluster": cluster_name,
                                "language": entry.get("language", lang),
                                "cpu": float(llm_result["CPU_usage"]),
                                "ram_kb": float(llm_result["RAM_usage"]),
                                "exec_time_ms": float(llm_result["execution_time_ms"]),
                                "base_entry_id": entry_id
                            })

    logger.info(f"Loaded raw executions: {len(base_executions)} base entries, {len(llm_executions)} LLM entries")

    # Aggregate: calculate means across the 5 executions
    base_entries = []
    for entry_id, executions in base_executions.items():
        if not executions:
            continue

        # Calculate means
        mean_cpu = np.mean([e["cpu"] for e in executions])
        mean_ram_kb = np.mean([e["ram_kb"] for e in executions])
        mean_exec_time_ms = np.mean([e["exec_time_ms"] for e in executions])

        base_entries.append({
            "id": entry_id,
            "cluster": executions[0]["cluster"],
            "language": executions[0]["language"],
            "mean_cpu": mean_cpu,
            "mean_ram_kb": mean_ram_kb,
            "mean_exec_time_ms": mean_exec_time_ms,
            "num_valid_executions": len(executions)
        })

    llm_entries = []
    for (entry_id, llm_type, prompt_v), executions in llm_executions.items():
        if not executions:
            continue

        # Calculate means
        mean_cpu = np.mean([e["cpu"] for e in executions])
        mean_ram_kb = np.mean([e["ram_kb"] for e in executions])
        mean_exec_time_ms = np.mean([e["exec_time_ms"] for e in executions])

        llm_entries.append({
            "id": entry_id,
            "cluster": executions[0]["cluster"],
            "language": executions[0]["language"],
            "llm_type": llm_type,
            "prompt_version": prompt_v,
            "mean_cpu": mean_cpu,
            "mean_ram_kb": mean_ram_kb,
            "mean_exec_time_ms": mean_exec_time_ms,
            "num_valid_executions": len(executions),
            "base_entry_id": executions[0]["base_entry_id"]
        })

    logger.info(f"Aggregated entries: {len(base_entries)} base, {len(llm_entries)} LLM")

    return {
        "base_entries": base_entries,
        "llm_entries": llm_entries
    }


def calculate_energy_carbon_for_entries(filtered_data: Dict, config: EnergyConfig, logger) -> Dict:
    """
    Calculate energy (Joules) and carbon (gCO2eq) for all entries.

    For LLM entries, also calculate improvement % compared to corresponding base entry.

    Args:
        filtered_data: Output from load_and_filter_execution_data()
        config: EnergyConfig instance
        logger: Logger instance

    Returns:
        Enriched data with energy_joules, carbon_gco2eq, and improvement % fields added
    """
    logger.info("Calculating energy and carbon for all entries...")

    # Create lookup dictionary for base entries (for fast matching)
    base_lookup = {entry["id"]: entry for entry in filtered_data["base_entries"]}

    # Calculate for base entries
    for entry in filtered_data["base_entries"]:
        energy = calculate_energy_joules(
            entry["mean_cpu"],
            entry["mean_ram_kb"],
            entry["mean_exec_time_ms"],
            config
        )
        carbon = calculate_carbon_gco2eq(energy, config)

        entry["energy_joules"] = energy
        entry["carbon_gco2eq"] = carbon

    logger.info(f"Calculated energy/carbon for {len(filtered_data['base_entries'])} base entries")

    # Calculate for LLM entries and compute improvements
    skipped_count = 0
    for entry in filtered_data["llm_entries"]:
        # Calculate energy/carbon for LLM entry
        energy_llm = calculate_energy_joules(
            entry["mean_cpu"],
            entry["mean_ram_kb"],
            entry["mean_exec_time_ms"],
            config
        )
        carbon_llm = calculate_carbon_gco2eq(energy_llm, config)

        entry["energy_joules"] = energy_llm
        entry["carbon_gco2eq"] = carbon_llm

        # Find corresponding base entry
        base_entry = base_lookup.get(entry["base_entry_id"])

        if base_entry and "energy_joules" in base_entry:
            # Calculate improvement %
            energy_base = base_entry["energy_joules"]
            carbon_base = base_entry["carbon_gco2eq"]

            energy_improvement_pct = ((energy_llm - energy_base) / energy_base) * 100.0
            carbon_improvement_pct = ((carbon_llm - carbon_base) / carbon_base) * 100.0

            entry["energy_improvement_pct"] = energy_improvement_pct
            entry["carbon_improvement_pct"] = carbon_improvement_pct
        else:
            # No matching base entry found
            entry["energy_improvement_pct"] = None
            entry["carbon_improvement_pct"] = None
            skipped_count += 1

    logger.info(f"Calculated energy/carbon for {len(filtered_data['llm_entries'])} LLM entries")
    if skipped_count > 0:
        logger.warning(f"Skipped improvement calculation for {skipped_count} LLM entries (no matching base)")

    return filtered_data


def generate_aggregate_statistics(enriched_data: Dict, logger) -> Dict:
    """
    Generate comprehensive aggregate statistics for energy and carbon metrics.

    Calculates:
        - Global statistics (base vs LLM)
        - Statistics by prompt version
        - Statistics by model
        - Statistics by language (LLM only)
        - Statistics by model + prompt version
        - Plot data (raw values grouped by category)

    Args:
        enriched_data: Output from calculate_energy_carbon_for_entries()
        logger: Logger instance

    Returns:
        Dictionary with aggregate statistics ready for visualization
    """
    logger.info("Generating aggregate statistics...")

    def calc_stats(values: List[float]) -> Dict:
        """Helper function to calculate descriptive statistics."""
        if not values:
            return {
                "mean": None, "median": None, "std": None,
                "min": None, "max": None, "count": 0
            }

        arr = np.array(values)
        return {
            "mean": float(np.mean(arr)),
            "median": float(np.median(arr)),
            "std": float(np.std(arr)),
            "min": float(np.min(arr)),
            "max": float(np.max(arr)),
            "count": len(values)
        }

    # Extract values
    base_energy = [e["energy_joules"] for e in enriched_data["base_entries"]]
    base_carbon = [e["carbon_gco2eq"] for e in enriched_data["base_entries"]]

    llm_energy = [e["energy_joules"] for e in enriched_data["llm_entries"]]
    llm_carbon = [e["carbon_gco2eq"] for e in enriched_data["llm_entries"]]

    energy_improvements = [e["energy_improvement_pct"] for e in enriched_data["llm_entries"]
                          if e["energy_improvement_pct"] is not None]
    carbon_improvements = [e["carbon_improvement_pct"] for e in enriched_data["llm_entries"]
                          if e["carbon_improvement_pct"] is not None]

    # Global statistics
    stats = {
        "global_stats": {
            "base": {
                "energy_joules": calc_stats(base_energy),
                "carbon_gco2eq": calc_stats(base_carbon)
            },
            "llm": {
                "energy_joules": calc_stats(llm_energy),
                "carbon_gco2eq": calc_stats(llm_carbon)
            },
            "improvements": {
                "energy_improvement_pct": calc_stats(energy_improvements),
                "carbon_improvement_pct": calc_stats(carbon_improvements)
            }
        }
    }

    # Statistics by prompt version
    stats["by_prompt_version"] = {}
    for prompt_v in ["v1", "v2", "v3", "v4"]:
        entries = [e for e in enriched_data["llm_entries"] if e["prompt_version"] == prompt_v]

        energy_vals = [e["energy_joules"] for e in entries]
        carbon_vals = [e["carbon_gco2eq"] for e in entries]
        energy_impr = [e["energy_improvement_pct"] for e in entries if e["energy_improvement_pct"] is not None]
        carbon_impr = [e["carbon_improvement_pct"] for e in entries if e["carbon_improvement_pct"] is not None]

        stats["by_prompt_version"][prompt_v] = {
            "energy_joules": calc_stats(energy_vals),
            "carbon_gco2eq": calc_stats(carbon_vals),
            "energy_improvement_pct": calc_stats(energy_impr),
            "carbon_improvement_pct": calc_stats(carbon_impr)
        }

    # Statistics by model
    stats["by_model"] = {}
    for model in ["openAI", "claude", "gemini"]:
        entries = [e for e in enriched_data["llm_entries"] if e["llm_type"] == model]

        energy_vals = [e["energy_joules"] for e in entries]
        carbon_vals = [e["carbon_gco2eq"] for e in entries]
        energy_impr = [e["energy_improvement_pct"] for e in entries if e["energy_improvement_pct"] is not None]
        carbon_impr = [e["carbon_improvement_pct"] for e in entries if e["carbon_improvement_pct"] is not None]

        stats["by_model"][model] = {
            "energy_joules": calc_stats(energy_vals),
            "carbon_gco2eq": calc_stats(carbon_vals),
            "energy_improvement_pct": calc_stats(energy_impr),
            "carbon_improvement_pct": calc_stats(carbon_impr)
        }

    # Statistics by language (LLM only)
    languages = set(e["language"] for e in enriched_data["llm_entries"])
    stats["by_language"] = {}
    for lang in languages:
        entries = [e for e in enriched_data["llm_entries"] if e["language"] == lang]

        energy_vals = [e["energy_joules"] for e in entries]
        carbon_vals = [e["carbon_gco2eq"] for e in entries]

        stats["by_language"][lang] = {
            "energy_joules": calc_stats(energy_vals),
            "carbon_gco2eq": calc_stats(carbon_vals)
        }

    # Statistics by model + prompt version
    stats["by_model_prompt"] = {}
    for model in ["openAI", "claude", "gemini"]:
        for prompt_v in ["v1", "v2", "v3", "v4"]:
            entries = [e for e in enriched_data["llm_entries"]
                      if e["llm_type"] == model and e["prompt_version"] == prompt_v]

            key = f"{model}_{prompt_v}"

            energy_vals = [e["energy_joules"] for e in entries]
            carbon_vals = [e["carbon_gco2eq"] for e in entries]
            energy_impr = [e["energy_improvement_pct"] for e in entries if e["energy_improvement_pct"] is not None]
            carbon_impr = [e["carbon_improvement_pct"] for e in entries if e["carbon_improvement_pct"] is not None]

            stats["by_model_prompt"][key] = {
                "energy_joules": calc_stats(energy_vals),
                "carbon_gco2eq": calc_stats(carbon_vals),
                "energy_improvement_pct": calc_stats(energy_impr),
                "carbon_improvement_pct": calc_stats(carbon_impr)
            }

    # Plot data (raw values for visualization)
    stats["plot_data"] = {
        "energy_by_category": [
            {"category": "Base Code (Avg)", "values": base_energy},
            {"category": "LLM (Avg)", "values": llm_energy}
        ],
        "carbon_by_category": [
            {"category": "Base Code (Avg)", "values": base_carbon},
            {"category": "LLM (Avg)", "values": llm_carbon}
        ]
    }

    # Add model+prompt categories for box plots
    for model in ["openAI", "claude", "gemini"]:
        for prompt_v in ["v1", "v2", "v3", "v4"]:
            entries = [e for e in enriched_data["llm_entries"]
                      if e["llm_type"] == model and e["prompt_version"] == prompt_v]

            category_name = f"{model.capitalize()} {prompt_v}"

            stats["plot_data"]["energy_by_category"].append({
                "category": category_name,
                "values": [e["energy_joules"] for e in entries]
            })
            stats["plot_data"]["carbon_by_category"].append({
                "category": category_name,
                "values": [e["carbon_gco2eq"] for e in entries]
            })

    # Add prompt version aggregations
    stats["plot_data"]["energy_by_prompt"] = [{"category": "Base", "values": base_energy}]
    stats["plot_data"]["carbon_by_prompt"] = [{"category": "Base", "values": base_carbon}]

    for prompt_v in ["v1", "v2", "v3", "v4"]:
        entries = [e for e in enriched_data["llm_entries"] if e["prompt_version"] == prompt_v]
        stats["plot_data"]["energy_by_prompt"].append({
            "category": prompt_v,
            "values": [e["energy_joules"] for e in entries]
        })
        stats["plot_data"]["carbon_by_prompt"].append({
            "category": prompt_v,
            "values": [e["carbon_gco2eq"] for e in entries]
        })

    # Add model aggregations
    stats["plot_data"]["energy_by_model"] = [{"category": "Base", "values": base_energy}]
    stats["plot_data"]["carbon_by_model"] = [{"category": "Base", "values": base_carbon}]

    for model in ["openAI", "claude", "gemini"]:
        entries = [e for e in enriched_data["llm_entries"] if e["llm_type"] == model]
        stats["plot_data"]["energy_by_model"].append({
            "category": model.capitalize(),
            "values": [e["energy_joules"] for e in entries]
        })
        stats["plot_data"]["carbon_by_model"].append({
            "category": model.capitalize(),
            "values": [e["carbon_gco2eq"] for e in entries]
        })

    # Add language aggregations (LLM only)
    stats["plot_data"]["energy_by_language"] = []
    stats["plot_data"]["carbon_by_language"] = []

    for lang in sorted(languages):
        entries = [e for e in enriched_data["llm_entries"] if e["language"] == lang]
        stats["plot_data"]["energy_by_language"].append({
            "category": lang,
            "values": [e["energy_joules"] for e in entries]
        })
        stats["plot_data"]["carbon_by_language"].append({
            "category": lang,
            "values": [e["carbon_gco2eq"] for e in entries]
        })

    logger.info("Aggregate statistics generation completed")

    return stats


def save_statistics(stats_dict: Dict, logger) -> Path:
    """
    Save aggregate statistics to JSON file.

    Args:
        stats_dict: Statistics dictionary from generate_aggregate_statistics()
        logger: Logger instance

    Returns:
        Path to saved JSON file
    """
    output_path = Path(__file__).parent / "energy_carbon_stats.json"

    write_json(str(output_path), stats_dict)

    logger.info(f"Statistics saved to: {output_path}")

    return output_path


def main():
    """
    Main orchestration function for energy and carbon analysis.

    Steps:
        1. Setup logger and load configuration
        2. Load and filter execution data
        3. Calculate energy and carbon for all entries
        4. Generate aggregate statistics
        5. Save statistics to JSON
        6. Generate visualizations

    Returns:
        Exit code (0 for success, 1 for error)
    """
    # Setup logger
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    logger = logging.getLogger(__name__)

    logger.info("=" * 80)
    logger.info("ENERGY AND CARBON ANALYSIS - START")
    logger.info("=" * 80)

    try:
        # Step 1: Load configuration
        logger.info("\n[STEP 1] Loading configuration...")
        config = EnergyConfig()
        logger.info(f"\n{config}")

        # Step 2: Load and filter execution data
        logger.info("\n[STEP 2] Loading and filtering execution data...")
        filtered_data = load_and_filter_execution_data(logger)
        logger.info(f"Valid entries loaded: {len(filtered_data['base_entries'])} base, "
                   f"{len(filtered_data['llm_entries'])} LLM")

        # Step 3: Calculate energy and carbon
        logger.info("\n[STEP 3] Calculating energy and carbon metrics...")
        enriched_data = calculate_energy_carbon_for_entries(filtered_data, config, logger)

        # Preview some values
        if enriched_data["base_entries"]:
            sample = enriched_data["base_entries"][0]
            logger.info(f"Sample base entry: {sample['energy_joules']:.2f} J, "
                       f"{sample['carbon_gco2eq']:.4f} gCO2eq")

        # Step 4: Generate aggregate statistics
        logger.info("\n[STEP 4] Generating aggregate statistics...")
        stats_dict = generate_aggregate_statistics(enriched_data, logger)

        # Log key statistics
        global_stats = stats_dict["global_stats"]
        logger.info(f"\nGlobal Statistics:")
        logger.info(f"  Base Energy: {global_stats['base']['energy_joules']['mean']:.2f} J (mean)")
        logger.info(f"  LLM Energy: {global_stats['llm']['energy_joules']['mean']:.2f} J (mean)")
        logger.info(f"  Energy Improvement: {global_stats['improvements']['energy_improvement_pct']['mean']:.2f}%")
        logger.info(f"  Carbon Improvement: {global_stats['improvements']['carbon_improvement_pct']['mean']:.2f}%")

        # Step 5: Save statistics
        logger.info("\n[STEP 5] Saving statistics to JSON...")
        output_path = save_statistics(stats_dict, logger)

        # Step 6: Generate visualizations
        logger.info("\n[STEP 6] Generating visualizations...")
        from energy_visualizator import EnergyCarbonStatsVisualizator

        visualizer = EnergyCarbonStatsVisualizator(str(output_path))
        plot_files = visualizer.generate_all_plots()

        logger.info(f"\nGenerated {len(plot_files)} plots:")
        for plot_file in plot_files:
            logger.info(f"  - {plot_file}")

        # Generate summary report
        logger.info("\nGenerating summary report...")
        report_path = visualizer.generate_summary_report()
        logger.info(f"Summary report saved to: {report_path}")

        logger.info("\n" + "=" * 80)
        logger.info("ENERGY AND CARBON ANALYSIS - COMPLETED SUCCESSFULLY")
        logger.info("=" * 80)

        return 0

    except Exception as e:
        logger.error(f"\nFATAL ERROR: {e}", exc_info=True)
        logger.error("\n" + "=" * 80)
        logger.error("ENERGY AND CARBON ANALYSIS - FAILED")
        logger.error("=" * 80)
        return 1


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
