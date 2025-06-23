from pathlib import Path
from datetime import datetime

class Metadata:
    def __init__(self, path: str, filename_snippet: str):
        self.file = self._resolve_file(Path(path), filename_snippet)
        if not self.file.is_file():
            raise FileNotFoundError(f"Il file con snippet '{filename_snippet}' non è stato trovato in '{path}'.")

        self._content = None  # Lazy loading del contenuto

    def _resolve_file(self, path: Path, snippet: str) -> Path:
        """
        Determina il file corretto in base al path e allo snippet.
        """
        if path.is_file():
            if snippet in path.name:
                return path
            else:
                raise FileNotFoundError(f"Il file '{path.name}' non contiene lo snippet '{snippet}'.")
        elif path.is_dir():
            for file in path.iterdir():
                if file.is_file() and snippet in file.name:
                    return file
            raise FileNotFoundError(f"Nessun file contenente '{snippet}' trovato nella directory '{path}'.")
        else:
            raise FileNotFoundError(f"Il percorso '{path}' non esiste.")

    def download_date(self) -> str:
        """
        Ritorna la data di creazione del file (download) in formato leggibile.
        """
        timestamp = self.file.stat().st_ctime
        return datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')

    def character_count(self) -> int:
        """
        Conta il numero di caratteri nel file.
        """
        return len(self._get_content())

    def word_count(self) -> int:
        """
        Conta il numero di parole nel file.
        """
        content = self._get_content()
        words = content.split()
        return len(words)

    def _get_content(self) -> str:
        """
        Carica e ritorna il contenuto del file, mantenendolo in cache.
        """
        if self._content is None:
            with open(self.file, 'r', encoding='utf-8') as f:
                self._content = f.read()
        return self._content

    def file_name(self) -> str:
        """
        Ritorna il nome del file analizzato.
        """
        return self.file.name
