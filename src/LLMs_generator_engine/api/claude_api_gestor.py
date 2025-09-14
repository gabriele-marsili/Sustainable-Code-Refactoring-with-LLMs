#!/usr/bin/env python3
from pathlib import Path
import re

from anthropic.types import TextBlock
import sys
import os

# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../..'))
from utility_dir import utility_paths

from utility_dir import prompt_generator
import anthropic
import json
import time
from dotenv import load_dotenv

# Definisci una classe di errore personalizzata per la gestione del budget
class BudgetExceededError(Exception):
    pass

class ClaudeApiGestor:
    def __init__(self):
        self.llm_config_json_file_path = utility_paths.SRC_DIR / "LLMs_generator_engine" / "llm_configs.json"
        
        load_dotenv()
        self.api_key = os.getenv('ANTHROPIC_API_KEY')
        self.client = anthropic.Anthropic(api_key=self.api_key)
        
            
        # Load config and budget                 
        try:
            with open(self.llm_config_json_file_path, "r", encoding="utf-8") as f:
                content = json.load(f)
                if 'claude_sonnet4' not in content:
                    raise Exception(f"claude_sonnet4 not found in config file content:\n{content}.")
                self.claude_config = content['claude_sonnet4']
                self.budget_usd = self.claude_config.get("budget_usd", 5.0)
                self.input_cost_per_m_tokens_usd = self.claude_config.get("input_cost_per_m_tokens_usd", 3.0)
                self.output_cost_per_m_tokens_usd = self.claude_config.get("output_cost_per_m_tokens_usd", 15.0)
                self.total_spent_usd = self.claude_config.get("total_spent_usd",0.0)
                #print(f"\n\nself.total_spent_usd = {self.total_spent_usd}\n")
                
        except Exception as e:
            print(f"❌ Errore loading LLM config by file:\n{e}")
            self.claude_config = {}
            self.budget_usd = 5.0
            self.input_cost_per_m_tokens_usd = 3.0
            self.output_cost_per_m_tokens_usd = 15.0


    def _save_budget(self):
        """Update budget in LLMs config file for claude model"""
        try:
            
            content = {
                "claude_sonnet4" : {
                    "total_spent_usd" : self.total_spent_usd
                }
            }
            with open(self.llm_config_json_file_path, "r", encoding="utf-8") as f:
                content = json.load(f)
            
            content['claude_sonnet4']['total_spent_usd'] = self.total_spent_usd
            with open(self.llm_config_json_file_path, "w", encoding="utf-8") as f:
                json.dump(content, f, indent=2)
        
        except Exception as e:
            print(f"❌ Errore saving claude budget:\n{e}")

    def _calculate_cost(self, input_tokens, output_tokens):
        """Calcola il costo di una singola chiamata API."""
        cost = (input_tokens / 1_000_000) * self.input_cost_per_m_tokens_usd + \
               (output_tokens / 1_000_000) * self.output_cost_per_m_tokens_usd
        return cost

    def make_api_call(self, prompt: str):
        # 1. Stima dei token e controllo del budget
        remaining_budget = self.budget_usd - self.total_spent_usd
        if remaining_budget <= 0:
            raise BudgetExceededError(f"Budget of ${self.budget_usd} reached. Total spent: ${self.total_spent_usd:.4f}.")
            
        try:           
            input_tokens = len(prompt) // 4
            estimated_output_tokens = self.claude_config.get("max_tokens", 4000) // 2
            estimated_cost = self._calculate_cost(input_tokens, estimated_output_tokens)
            
            if self.total_spent_usd + estimated_cost > self.budget_usd:
                raise BudgetExceededError(
                    f"API call estimated cost ${estimated_cost:.4f} > ramaining budget of "
                    f"${remaining_budget:.4f}. API call cancelled."
                )
            
        except BudgetExceededError as e:
            print(f"❌ Error budget: {e}")
            return None
        
        # 2. retry logic:
        retries = 3
        delay = 1
        for _ in range(retries):
            try:
                #print(f"Attempt {i + 1}/{retries}...")
                message = self.client.messages.create(
                    model=self.claude_config.get("model", "claude-sonnet-4-20250514"),
                    max_tokens=self.claude_config.get("max_tokens", 4000),
                    temperature=self.claude_config.get("temperature", 0.1),
                    system="You are an experienced software engineer.Respond only with updated code, without further explanation.",
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": prompt
                                }
                            ]
                        }
                    ]
                )
                
                #print(f"\nclaude api response:\n\n{message}\n")
                
                # 3. cost update
                actual_cost = self._calculate_cost(message.usage.input_tokens, message.usage.output_tokens)
                self.total_spent_usd += actual_cost
                self._save_budget() 
                
                print(f"✅ API call done, cost: ${actual_cost:.4f}. Total cost: ${self.total_spent_usd:.4f}")
                
                return message.content
            
            except anthropic.RateLimitError as e:
                print(f"⚠️ Error -> rate limit: {e}. Retry in {delay} s.")
                time.sleep(delay)
                delay *= 2
            
            except Exception as e:
                print(f"❌ Errore in API call:\n{e}")
                break
        
        print(f"❌ API call failed after {retries} attempts")
        return None
    
    def generate_and_save_LLM_code_by_files(self, prompt_file_path : Path, base_snippet_code_file_path:Path, exercise_dir_file_path:Path, prompt_version_number:int, exercise_name:str) -> bool:
        """Generate LLM code with APIs, then save it in dataset"""        
        #print(f"Generazione codice per l'esercizio '{exercise_name}'...")
        
        # 1. Preparazione della richiesta API
        # Estrai l'estensione del file per il nome del nuovo file
        try:
            file_ext = os.path.splitext(base_snippet_code_file_path)[1].lstrip('.')
        except IndexError:
            print("❌ Errore: L'estensione del file non può essere determinata.")
            return False

        # Prepara il percorso e il nome del file
        e_name = (exercise_name.split("."))[0]
        file_name = f"ClaudeSonnet4_{e_name}_v{prompt_version_number}.{file_ext}"
        claude_dir = exercise_dir_file_path / "claude"
        output_file_path = os.path.join(claude_dir, file_name)

        if os.path.exists(str(output_file_path)):
            print(f"-> file {output_file_path} already exists, skip generation")
            return True

        # Genera il prompt finale
        final_prompt = prompt_generator.create_api_prompt_from_files(prompt_file_path, base_snippet_code_file_path)
        
        if not final_prompt:
            print("❌ Errore: Impossibile generare il prompt finale. Operazione annullata.")
            return False

        # 2. Chiamata API
        api_res = self.make_api_call(final_prompt)
        
        # 3. Estrazione e salvataggio del codice
        if api_res is not None:
            # L'output dell'API Anthropic è una lista di TextBlock.
            # Unisci il testo di tutti i blocchi.
            full_text_output = "".join([block.text for block in api_res if isinstance(block, TextBlock)])
            
            # Estrai il codice dai backticks (```)
            # Questo è un passo cruciale se l'LLM restituisce del testo aggiuntivo
            # Il pattern regex cerca qualsiasi cosa tra triple backticks.
            code_match = re.search(r'```(?:\w+)?\n(.*?)```', full_text_output, re.DOTALL)

            if code_match:
                extracted_code = code_match.group(1).strip()
                
                
                # Crea la directory di destinazione se non esiste
                os.makedirs(claude_dir, exist_ok=True)
                
                # Scrivi il codice estratto nel nuovo file
                try:
                    with open(output_file_path, 'w', encoding='utf-8') as f:
                        f.write(extracted_code)
                    print(f"✅ (claude) Codice salvato in: {output_file_path}")
                    return True
                except Exception as e:
                    print(f"❌ Errore durante il salvataggio del file: {e}")
                    return False
            else:
                print("⚠️ Attenzione: Nessun blocco di codice trovato nell'output dell'API.")
                print(f"Output completo dell'API:\n{full_text_output}")
                return False
        else:
            print("❌ La chiamata API non ha prodotto un risultato valido.")
            return False
        
if __name__ == "__main__":
    #test
    gestor = ClaudeApiGestor()
    prompt_f_path = utility_paths.PROMPTS_DIR_FILEPATH / "promptV1.txt"
    base_code_f_p = utility_paths.DATASET_DIR / "python/bob/bob.py"
    ex_dir_f_p = utility_paths.DATASET_DIR / "python/bob"
    gestor.generate_and_save_LLM_code_by_files(prompt_f_path,base_code_f_p,ex_dir_f_p,1,"bob")