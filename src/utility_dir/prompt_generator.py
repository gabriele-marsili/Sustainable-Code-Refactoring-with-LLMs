import os

def create_api_prompt_from_files(prompt_template_path: str, code_file_path: str) -> str:
    """
    Crea un prompt per le API sostituendo i placeholder in un template.

    Args:
        prompt_template_path (str): Il percorso del file di testo che contiene il template del prompt.
        code_file_path (str): Il percorso del file di codice da inserire nel prompt.

    Returns:
        str: Il prompt finale come stringa formattata, pronto per l'uso con le API.
             Restituisce una stringa vuota in caso di errore.
    """
    
    # Mappatura delle estensioni dei file ai linguaggi
    language_map = {
        ".py": "Python",
        ".js": "JavaScript",
        ".ts": "TypeScript",
        ".java": "Java",
        ".cpp": "C++",
        ".cs": "C#",
        ".go": "Go",
        ".rb": "Ruby",
        ".php": "PHP",
        ".rs": "Rust",
        ".swift": "Swift",
        ".kt": "Kotlin",
        ".scala": "Scala",
        ".m": "Objective-C",
        ".html": "HTML",
        ".css": "CSS",
        ".sh": "Bash",
        ".json": "JSON"
    }

    try:
        # 1. Leggi il template del prompt
        with open(prompt_template_path, 'r', encoding='utf-8') as f:
            prompt_template = f.read()

        # 2. Determina il linguaggio del file di codice
        _, file_extension = os.path.splitext(code_file_path)
        language = language_map.get(file_extension.lower(), "non specificato")

        # 3. Leggi il contenuto del file di codice
        with open(code_file_path, 'r', encoding='utf-8') as f:
            code_content = f.read()

        # 4. Sostituisci i placeholder nel template
        # Assicurati che {code} sia all'interno dei triple backticks per una corretta formattazione
        formatted_prompt = prompt_template.replace('{language}', language)
        formatted_prompt = formatted_prompt.replace('{code}', code_content)
        
        if code_content == "" or not code_content:
            return None

        return formatted_prompt

    except FileNotFoundError:
        print("Errore: Uno dei file non è stato trovato. Controlla i percorsi.")
        return ""
    except Exception as e:
        print(f"Si è verificato un errore: {e}")
        return ""

if __name__ == '__main__':
    # Esempio di utilizzo:
    
    import utility_paths
    code_P = utility_paths.DATASET_DIR / "javascript/bob_exercism-javascript-ffflorian/bob.js"
    prompt_path = (utility_paths.PROMPTS_DIR_FILEPATH / "promptV1.txt")
    print(f"code_P = {code_P}\nprompt_path = {prompt_path}")
    res = create_api_prompt_from_files(prompt_path,code_P)

    print(f"res:\n\n{res}")