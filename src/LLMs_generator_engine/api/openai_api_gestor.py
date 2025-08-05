#!/usr/bin/env python3
import re
from typing import List, Union
from anthropic.types import TextBlock
import sys
import os

# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../..'))
from utility_dir import utility_paths

from utility_dir import prompt_generator
import json
import time
from dotenv import load_dotenv
import openai

class OpenAIApiGestor:
    
    def __init__(self):
        self.llm_config_json_file_path = utility_paths.SRC_DIR / "LLMs_generator_engine" / "llm_configs.json"
        
        load_dotenv()
        self.api_key = os.getenv('OPENAI_API_KEY')
        self.client = openai.OpenAI(api_key=self.api_key)
        
            
        # Load config and budget                 
        try:
            with open(self.llm_config_json_file_path, "r", encoding="utf-8") as f:
                content = json.load(f)
                if 'gpt4o' not in content:
                    raise Exception(f"gpt4o not found in config file content:\n{content}.")
                self.openai_config = content['gpt4o']
                print(f"self.openai_config:\n{self.openai_config}")
                
                
        except Exception as e:
            print(f"❌ Errore loading LLM config by file:\n{e}")
            self.openai_config = {
                "temperature": 0.1,
                "max_tokens": 4000,
                "timeout": 90
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

            generated_code = '\n'.join(clean_lines).strip()
        
        return generated_code

    def make_api_call(self, prompt: str):                  
        retries = 3
        delay = 1
        for i in range(retries):
            try:
                #print(f"Attempt {i + 1}/{retries}...")
                t = self.openai_config.get("temperature",0.1)
                print(f"temperature = {t}")
                
                response = self.client.chat.completions.create(
                    model="chatgpt-4o-latest",
                    messages=[
                        {"role": "system", "content": "You are an experienced software engineer.Respond only with updated code, without further explanation."},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=t,                    
                    max_tokens=self.openai_config["max_tokens"],
                    timeout=self.openai_config["timeout"]
                )
                
                generated_code = response.choices[0].message.content.strip()
                return self._clean_markdown(generated_code)

            except openai.RateLimitError as e:
                print(f"⚠️ Error -> rate limit: {e}. Retry in {delay} s.")                
                time.sleep(delay)
                delay *= 2

            except Exception as e:
                print(f"❌ Errore in API call:\n{e}")
                break
        
        print(f"❌ API call failed after {retries} attempts")
        return None
    
    def generate_and_save_LLM_code_by_files(self, prompt_file_path : str, base_snippet_code_file_path:str, exercise_dir_file_path:str, prompt_version_number:int, exercise_name:str):
        """Generate LLM code with APIs, then save it in dataset"""        
        print(f"Generazione codice per l'esercizio '{exercise_name}'...")
        
        # 1. Preparazione della richiesta API
        # Estrai l'estensione del file per il nome del nuovo file
        try:
            file_ext = os.path.splitext(base_snippet_code_file_path)[1].lstrip('.')
        except IndexError:
            print("❌ Errore: L'estensione del file non può essere determinata.")
            return

        # Genera il prompt finale
        final_prompt = prompt_generator.create_api_prompt_from_files(prompt_file_path, base_snippet_code_file_path)
        
        if not final_prompt:
            print("❌ Errore: Impossibile generare il prompt finale. Operazione annullata.")
            return

        # 3. Chiamata API
        generated_code = self.make_api_call(final_prompt)
        print(f"🧠 Output API (prima della regex):\n{generated_code}")

        if generated_code is None:
            print("❌ La chiamata API non ha prodotto un risultato valido.")
            return

        # 4. Prova a estrarre codice da blocco markdown (```) se esiste
        code_match = re.search(r'```(?:\w+)?\n(.*?)```', generated_code, re.DOTALL)
        if code_match:
            extracted_code = code_match.group(1).strip()
        else:
            extracted_code = generated_code.strip()

        # 5. Costruisci path e salva
        try:
            file_name = f"ChatGPT4_{exercise_name}_v{prompt_version_number}.{file_ext}"
            openai_dir = exercise_dir_file_path / "openAI"
            output_file_path = openai_dir / file_name

            os.makedirs(openai_dir, exist_ok=True)

            with open(output_file_path, 'w', encoding='utf-8') as f:
                f.write(extracted_code)

            print(f"✅ Codice generato e salvato in: {output_file_path}")
        except Exception as e:
            print(f"❌ Errore durante il salvataggio del file: {e}")
                
if __name__ == "__main__":
    #test
    gestor = OpenAIApiGestor()
    prompt_f_path = utility_paths.PROMPTS_DIR_FILEPATH / "promptV1.txt"
    base_code_f_p = utility_paths.DATASET_DIR / "javascript/bob_exercism-javascript-ffflorian/bob.js"
    ex_dir_f_p = utility_paths.DATASET_DIR / "javascript/bob_exercism-javascript-ffflorian"
    gestor.generate_and_save_LLM_code_by_files(prompt_f_path,base_code_f_p,ex_dir_f_p,1,"bob")