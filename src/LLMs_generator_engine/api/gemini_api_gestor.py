#!/usr/bin/env python3
from pathlib import Path
import os
import re
import sys
import json
import time
from typing import List, Union
from dotenv import load_dotenv

from google import genai

# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../..'))

from utility_dir import utility_paths
from utility_dir import prompt_generator


class GeminiAIApiGestor:
    def __init__(self):
        self.llm_config_json_file_path = utility_paths.SRC_DIR / "LLMs_generator_engine" / "llm_configs.json"

        load_dotenv()
        self.api_key = os.getenv('GEMINI_API_KEY')
        self.client = genai.Client()


        # Load config and budget
        try:
            with open(self.llm_config_json_file_path, "r", encoding="utf-8") as f:
                content = json.load(f)
                if 'gemini' not in content:
                    raise Exception(f"'gemini' not found in config file content:\n{content}")
                self.gemini_config = content['gemini']
                #print(f"✅ Configurazione Gemini:\n{self.gemini_config}")
        except Exception as e:
            print(f"❌ Errore caricamento configurazione Gemini:\n{e}")
            self.gemini_config = {
                "temperature": 0.3,
                "max_tokens": 2048
            }


    def _clean_markdown(self, generated_code: str) -> str:
        """Rimuove i markdown code blocks"""
        if '```' in generated_code:
            lines = generated_code.split('\n')
            clean_lines = []
            in_code_block = False

            for line in lines:
                if line.strip().startswith('```'):
                    in_code_block = not in_code_block
                    continue
                if in_code_block or not line.strip().startswith('```'):
                    clean_lines.append(line)
            return '\n'.join(clean_lines).strip()
        return generated_code


    def make_api_call(self, prompt: str) -> Union[str, None]:
        retries = 3
        delay = 1
        for attempt in range(retries):
            try:
                #print(f"➡️  Tentativo chiamata API Gemini ({attempt + 1}/{retries})...")
                response = self.client.models.generate_content(
                   model="gemini-2.5-flash", contents=prompt
                )
                generated_code = response.text.strip()
                return self._clean_markdown(generated_code)

            except Exception as e:
                print(f"❌ Errore durante chiamata Gemini:\n{e}")
                time.sleep(delay)
                delay *= 2

        print("❌ Chiamata Gemini fallita dopo 3 tentativi.")
        return None

    def generate_and_save_LLM_code_by_files(self, prompt_file_path: Path, base_snippet_code_file_path: Path,
                                             exercise_dir_file_path: Path, prompt_version_number: int,
                                             exercise_name: str) -> bool:
        #print(f"🧠 Generazione codice per l'esercizio '{exercise_name}' con Gemini...")

        try:
            file_ext = os.path.splitext(base_snippet_code_file_path)[1].lstrip('.')
        except IndexError:
            print("❌ Errore: impossibile determinare estensione file.")
            return False
        
        e_name = (exercise_name.split("."))[0]
        file_name = f"GeminiFlash_{e_name}_v{prompt_version_number}.{file_ext}"
        gemini_dir = exercise_dir_file_path / "gemini"
        output_file_path = gemini_dir / file_name
        
        if os.path.exists(str(output_file_path)):
            print(f"-> file {output_file_path} already exists, skip generation")
            return True

        final_prompt = prompt_generator.create_api_prompt_from_files(prompt_file_path, base_snippet_code_file_path)
        if not final_prompt:
            print("❌ Errore generazione prompt.")
            return False

        generated_code = self.make_api_call(final_prompt)
        if generated_code is None:
            print("❌ Nessun codice generato.")
            return False

        #print(f"✅ Codice generato (prima della regex):\n{generated_code}")

        # Estrai blocco di codice da markdown se presente
        code_match = re.search(r'```(?:\w+)?\n(.*?)```', generated_code, re.DOTALL)
        extracted_code = code_match.group(1).strip() if code_match else generated_code.strip()

        try:
            

            os.makedirs(gemini_dir, exist_ok=True)
            with open(output_file_path, 'w', encoding='utf-8') as f:
                f.write(extracted_code)

            print(f"✅ (gemini) Codice salvato in: {output_file_path}")
            return True
        except Exception as e:
            print(f"❌ Errore salvataggio file: {e}")
            return False


if __name__ == "__main__":
    gestor = GeminiAIApiGestor()
    prompt_f_path = utility_paths.PROMPTS_DIR_FILEPATH / "promptV1.txt"
    base_code_f_p = utility_paths.DATASET_DIR / "python/bob/bob.py"
    ex_dir_f_p = utility_paths.DATASET_DIR / "python/bob"
    gestor.generate_and_save_LLM_code_by_files(prompt_f_path, base_code_f_p, ex_dir_f_p, 1, "bob")
