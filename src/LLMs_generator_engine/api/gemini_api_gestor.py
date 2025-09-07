#!/usr/bin/env python3
import os
import re
import sys
import json
#import time
import requests
from pathlib import Path
from typing import Union
from dotenv import load_dotenv

import google.generativeai as genai

# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from utility_dir import utility_paths
from utility_dir import prompt_generator


class GeminiAIApiGestor:
    def __init__(self):
        self.llm_config_json_file_path = (
            utility_paths.SRC_DIR / "LLMs_generator_engine" / "llm_configs.json"
        )

        load_dotenv()
        api_keys_raw = os.getenv("GEMINI_API_KEYS")
        if not api_keys_raw:
            raise ValueError("❌ GEMINI_API_KEYS non trovato nel file .env")

        try:
            self.api_keys = json.loads(api_keys_raw)
            if not isinstance(self.api_keys, list):
                raise ValueError("GEMINI_API_KEYS deve essere un array JSON.")
        except Exception as e:
            raise ValueError(f"❌ Errore parsing GEMINI_API_KEYS: {e}")

        self.webhook_url = os.getenv("DISCORD_WEBHOOK")  # opzionale
        self.current_index = 0
        self.api_key = None
        self.model = None

        # Config generazione
        try:
            with open(self.llm_config_json_file_path, "r", encoding="utf-8") as f:
                content = json.load(f)
                if "gemini" not in content:
                    raise Exception(f"'gemini' non trovato in config file:\n{content}")
                self.gemini_config = content["gemini"]
        except Exception as e:
            print(f"⚠️ Errore caricamento configurazione Gemini:\n{e}")
            self.gemini_config = {"temperature": 0.3, "max_output_tokens": 8000}

        # Imposta la prima key valida
        if not self._set_next_key():
            msg = "❌ Nessuna API key valida disponibile."
            print(msg)
            self._send_webhook(msg)
            raise RuntimeError(msg)

    def _send_webhook(self, message: str):
        if not self.webhook_url:
            return
        try:
            requests.post(self.webhook_url, json={"text": message}, timeout=5)
            print("📡 Webhook inviato.")
        except Exception as e:
            print(f"❌ Errore invio webhook: {e}")

    def _set_next_key(self) -> bool:
        """Passa alla prossima API key, ritorna False se finite"""
        if self.current_index >= len(self.api_keys):
            return False

        self.api_key = self.api_keys[self.current_index]
        self.current_index += 1

        try:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel("gemini-2.0-flash")
            print(f"✅ Impostata API key {self.api_key[:8]}...")
            return True
        except Exception as e:
            print(f"❌ Key non valida {self.api_key[:8]}... -> {e}")
            return self._set_next_key()

    def _rotate_key(self) -> bool:
        """Cambia API key dopo un errore"""
        print("🔄 Cambio API key...")
        if not self._set_next_key():
            msg = "❌ Finite tutte le API key!"
            print(msg)
            self._send_webhook(msg)
            return False
        return True

    def _clean_markdown(self, generated_code: str) -> str:
        if "```" in generated_code:
            lines = generated_code.split("\n")
            clean_lines = []
            in_code_block = False
            for line in lines:
                if line.strip().startswith("```"):
                    in_code_block = not in_code_block
                    continue
                if in_code_block or not line.strip().startswith("```"):
                    clean_lines.append(line)
            return "\n".join(clean_lines).strip()
        return generated_code

    def make_api_call(self, prompt: str) -> Union[str, None]:
        """Prova chiamata, se fallisce cambia chiave e riprova"""
        retries = len(self.api_keys)
        for attempt in range(retries):
            try:
                response = self.model.generate_content(
                    prompt, generation_config=self.gemini_config
                )
                return self._clean_markdown(response.text.strip())
            except Exception as e:
                print(f"❌ Errore API con key {self.api_key[:8]}... -> {e}")
                if not self._rotate_key():
                    return None
        return None
    

    def generate_and_save_LLM_code_by_files(
        self,
        prompt_file_path: Path,
        base_snippet_code_file_path: Path,
        exercise_dir_file_path: Path,
        prompt_version_number: int,
        exercise_name: str,
    ) -> bool:
        try:
            file_ext = os.path.splitext(base_snippet_code_file_path)[1].lstrip(".")
        except IndexError:
            print("❌ Errore: impossibile determinare estensione file.")
            return False

        e_name = (exercise_name.split("."))[0]
        file_name = f"GeminiFlash_{e_name}_v{prompt_version_number}.{file_ext}"
        gemini_dir = exercise_dir_file_path / "gemini"
        output_file_path = gemini_dir / file_name

        if os.path.exists(str(output_file_path)):
            print(f"-> file {output_file_path} già esistente, skip generation")
            return True

        final_prompt = prompt_generator.create_api_prompt_from_files(
            prompt_file_path, base_snippet_code_file_path
        )
        if not final_prompt:
            print("❌ Errore generazione prompt.")
            return False

        generated_code = self.make_api_call(final_prompt)
        if generated_code is None:
            print("❌ Nessun codice generato.")
            return False

        # Estrai blocco di codice da markdown se presente
        code_match = re.search(r"```(?:\w+)?\n(.*?)```", generated_code, re.DOTALL)
        extracted_code = (
            code_match.group(1).strip() if code_match else generated_code.strip()
        )

        try:
            os.makedirs(gemini_dir, exist_ok=True)
            with open(output_file_path, "w", encoding="utf-8") as f:
                f.write(extracted_code)

            print(f"✅ (gemini) Codice salvato in: {output_file_path}")
            return True
        except Exception as e:
            print(f"❌ Errore salvataggio file: {e}")
            return False




if __name__ == "__main__":
    gestor = GeminiAIApiGestor()
    print(gestor.make_api_call("Hi Gemini, quick dynamic key rotation test :)"))
