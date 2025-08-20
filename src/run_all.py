import subprocess

clusters = ["raindrops", "bob", "leap", "pangram"]

for cluster in clusters:
    print(f"\n\n>>> Running BASE tests for {cluster}\n")
    subprocess.run([
        "python3", "run_tests.py",
        "--base-only",
        "--cluster-name", f"cluster_{cluster}",
        "--output-file", f"{cluster}_results",
        "--webhook", "--silent",
        "--run_quantity", "5",
        "--prompt-version", "1"
    ])

    print(f"\n\n>>> Running LLM prompts for {cluster}\n")
    for v in range(1, 5):
        subprocess.run([
            "python3", "run_tests.py",
            "--llm-only",
            "--cluster-name", f"cluster_{cluster}",
            "--output-file", f"{cluster}_results_v{v}",
            "--webhook", "--silent",
            "--run_quantity", "5",
            "--prompt-version", str(v)
        ])




#runs following :


# ---- RAINDROPS ------

# raindrops base (x5) => raindrops_results_1 to raindrops_results_5
# python3 run_tests.py --base-only --cluster-name cluster_raindrops --output-file raindrops_results --webhook --silent --run_quantity 5 --prompt-version 1

# raindrops LLM prompt V1 to V4 (x5) => raindrops_results_v1_1 to raindrops_results_v4_5
# python3 run_tests.py --llm-only --cluster-name cluster_raindrops --output-file raindrops_results_v1 --webhook --silent --run_quantity 5 --prompt-version 1
# python3 run_tests.py --llm-only --cluster-name cluster_raindrops --output-file raindrops_results_v2 --webhook --silent --run_quantity 5 --prompt-version 2
# python3 run_tests.py --llm-only --cluster-name cluster_raindrops --output-file raindrops_results_v3 --webhook --silent --run_quantity 5 --prompt-version 3
# python3 run_tests.py --llm-only --cluster-name cluster_raindrops --output-file raindrops_results_v4 --webhook --silent --run_quantity 5 --prompt-version 4


# ---- BOB ------

# bob base (x5) => bob_results_1 to bob_results_5
# python3 run_tests.py --base-only --cluster-name cluster_bob --output-file bob_results --webhook --silent --run_quantity 5 --prompt-version 1

# bob LLM prompt V1 to V4 (x5) => bob_results_v1_1 to bob_results_v4_5
#  python3 run_tests.py --llm-only --cluster-name cluster_bob --output-file bob_results_v1 --webhook --silent --run_quantity 5 --prompt-version 1
#  python3 run_tests.py --llm-only --cluster-name cluster_bob --output-file bob_results_v2 --webhook --silent --run_quantity 5 --prompt-version 2
#  python3 run_tests.py --llm-only --cluster-name cluster_bob --output-file bob_results_v3 --webhook --silent --run_quantity 5 --prompt-version 3
#  python3 run_tests.py --llm-only --cluster-name cluster_bob --output-file bob_results_v4 --webhook --silent --run_quantity 5 --prompt-version 4


# ---- LEAP ------

# leap base (x5) => leap_results_1 to leap_results_5
# python3 run_tests.py --base-only --cluster-name cluster_leap --output-file leap_results --webhook --silent --run_quantity 5 --prompt-version 1

# leap LLM prompt V1 to v4 (x5) => leap_results_v1_1 to leap_results_v4_5
# python3 run_tests.py --llm-only --cluster-name cluster_leap --output-file leap_results_v1 --webhook --silent --run_quantity 5 --prompt-version 1
# python3 run_tests.py --llm-only --cluster-name cluster_leap --output-file leap_results_v2 --webhook --silent --run_quantity 5 --prompt-version 2
# python3 run_tests.py --llm-only --cluster-name cluster_leap --output-file leap_results_v3 --webhook --silent --run_quantity 5 --prompt-version 3
# python3 run_tests.py --llm-only --cluster-name cluster_leap --output-file leap_results_v4 --webhook --silent --run_quantity 5 --prompt-version 4



# ---- PANGRAM ------

# pangram base (x5) => pangram_results_1 to pangram_results_5
# python3 run_tests.py --base-only --cluster-name cluster_pangram --output-file pangram_results --webhook --silent --run_quantity 5 --prompt-version 1

# pangram LLM prompt V1 to v4 (x5) => pangram_results_v1_1 to pangram_results_v4_5
# python3 run_tests.py --llm-only --cluster-name cluster_pangram --output-file pangram_results_v1 --webhook --silent --run_quantity 5 --prompt-version 1
# python3 run_tests.py --llm-only --cluster-name cluster_pangram --output-file pangram_results_v2 --webhook --silent --run_quantity 5 --prompt-version 2
# python3 run_tests.py --llm-only --cluster-name cluster_pangram --output-file pangram_results_v3 --webhook --silent --run_quantity 5 --prompt-version 3
# python3 run_tests.py --llm-only --cluster-name cluster_pangram --output-file pangram_results_v4 --webhook --silent --run_quantity 5 --prompt-version 4


