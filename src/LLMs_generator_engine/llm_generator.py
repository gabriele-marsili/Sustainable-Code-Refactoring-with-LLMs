import os
import json
import time
import asyncio
from pathlib import Path
from typing import Dict, List, Optional, Any
import concurrent.futures
from threading import Lock
import logging
from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import Enum
import sys

# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from utility_dir import utility_paths
from api import gemini_api_gestor,claude_api_gestor,openai_api_gestor
import time
from discordInteraction import DiscordWebhookReporter
from dotenv import load_dotenv
from datetime import datetime

clusters = [
    "bob",
    "leap",
    "pangram",    
]

prompt_file_paths = [
    utility_paths.PROMPTS_DIR_FILEPATH / "promptV1.txt",
    utility_paths.PROMPTS_DIR_FILEPATH / "promptV2.txt",
    utility_paths.PROMPTS_DIR_FILEPATH / "promptV3.txt",
    utility_paths.PROMPTS_DIR_FILEPATH / "promptV4.txt",
]

class LLMGenerator :
    def __init__(self):
        load_dotenv()
        WEBHOOK_URL = os.getenv('DISCORD_WEBHOOK')
        print(f"WEBHOOK_URL = {WEBHOOK_URL}")
        if not WEBHOOK_URL : raise Exception("missing WEBHOOK_URL")
        self.reporter = DiscordWebhookReporter(WEBHOOK_URL, "LLM Generation Bot")
    
    
    def generate_llms_files_for_chosen_clusters(self):
        gemini_api_g = gemini_api_gestor.GeminiAIApiGestor()
        claude_api_g = claude_api_gestor.ClaudeApiGestor()
        openai_api_g = openai_api_gestor.OpenAIApiGestor()
        
        try:
            for cluster_name in clusters: #itera i clusters 
                print(f"\n- Generating LLMs files for cluster {cluster_name}\n")
                
                file_name = f"cluster_{cluster_name}.json" 
                cluster_path = utility_paths.CLUSTERS_DIR_FILEPATH / file_name
                
                json_file_content = None
                with open(cluster_path,"r",encoding="utf-8") as f:
                    json_file_content = json.load(f)
                    
                if not json_file_content: raise Exception(f"json file content is none for file path : {cluster_path}")
                                
                total_expected_files = 0
                total_generated_files = 0
                start_time = time.time()
                
                for language, entries in json_file_content.items():  
                    time.sleep(2)
                    for entry in entries : #itera le entries
                        for prompt_v, prompt_path in enumerate(prompt_file_paths, start=1):
                            code_file_path = utility_paths.DATASET_DIR / entry['codeSnippetFilePath']
                            dir_name = entry['codeSnippetFilePath'].split("/")[0]
                            exercise_dir_filepath = utility_paths.DATASET_DIR / dir_name
                            filename = entry['filename']
                            if language == "c" or language == "cpp" :
                                code_file_path = code_file_path / filename

                            # Ogni modello dovrebbe generare 1 file
                            total_expected_files += 3

                            print(f"📄 [{cluster_name}] Generating for `{filename}` | Prompt v{prompt_v}")


                            for model_name, generator in {
                                "OpenAI": openai_api_g,
                                "Claude": claude_api_g,
                                "Gemini": gemini_api_g
                            }.items():
                                success = generator.generate_and_save_LLM_code_by_files(
                                    prompt_path, code_file_path, exercise_dir_filepath, prompt_v, filename
                                )

                                if success:
                                    total_generated_files += 1
                                    print(f"   ✅ {model_name} generation successful")
                                else:
                                    print(f"   ❌ {model_name} generation failed")

                            time.sleep(0.5)
                            
                
                duration = time.time() - start_time
                percent = (total_generated_files / total_expected_files * 100) if total_expected_files else 0
                
                
                print(f"\n📊 Cluster {cluster_name} complete: {total_generated_files}/{total_expected_files} files ({percent:.1f}%)\n")

                # Invia webhook Discord
                self.reporter.send_file_generation_report(
                    cluster_name=cluster_name,
                    generated_files=total_generated_files,
                    expected_files=total_expected_files,
                    additional_info={
                        "Duration": f"{duration:.1f}s",
                        "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    },
                    custom_message=f"📦 Generazione file per cluster `{cluster_name}` completata!"
                )

                
                
        except Exception as e:
            print(f"❌ Exception in generate_llms_files_for_chosen_clusters:\n{e}")
            self.reporter.send_simple_message(f"❌ Errore durante la generazione dei file: {e}")
            

if __name__ == "__main__":
    generator = LLMGenerator()    
    generator.generate_llms_files_for_chosen_clusters()
    
