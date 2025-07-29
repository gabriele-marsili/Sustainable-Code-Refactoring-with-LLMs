import json
import pathlib
from typing import Dict, List, Set, Any
import logging
import os
import sys
# Aggiungi la directory parent (src) al path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))


from utility_dir import utility_paths
# Configurazione logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class BadClusterGestor:
    """
    Gestisce la creazione di cluster di bad entries dal dataset principale.
    """
    
    def __init__(self, base_dir: pathlib.Path = None):
        """
        Inizializza il gestore con i percorsi dei file.
        
        Args:
            base_dir: Directory base del progetto. Se None, usa il parent del file corrente.
        """
        if base_dir is None:
            base_dir = pathlib.Path(__file__).resolve().parent.parent.parent
        
        self.base_dir = base_dir
        self.bad_entries_json_path = utility_paths.BAD_ENTRIES_FILEPATH
        self.dataset_path = utility_paths.DATASET_JSON_FILEPATH
        self.bad_entries_cluster_json_path = utility_paths.BAD_ENTRIES_CLUSTER_FILEPATH
        
        # Verifica che i file esistano
        self._validate_file_paths()
    
    def _validate_file_paths(self) -> None:
        """Verifica che i file necessari esistano."""
        if not self.dataset_path.exists():
            raise FileNotFoundError(f"Dataset non trovato: {self.dataset_path}")
        
        if not self.bad_entries_json_path.exists():
            raise FileNotFoundError(f"File bad entries non trovato: {self.bad_entries_json_path}")
        
        # Crea la directory per il file di output se non esiste
        self.bad_entries_cluster_json_path.parent.mkdir(parents=True, exist_ok=True)
    
    def _load_json_file(self, file_path: pathlib.Path) -> Dict[str, Any]:
        """
        Carica un file JSON in modo sicuro.
        
        Args:
            file_path: Percorso del file JSON
            
        Returns:
            Dizionario con i dati del file JSON
            
        Raises:
            json.JSONDecodeError: Se il file non è un JSON valido
            FileNotFoundError: Se il file non esiste
        """
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError as e:
            logger.error(f"Errore nel parsing JSON di {file_path}: {e}")
            raise
        except FileNotFoundError:
            logger.error(f"File non trovato: {file_path}")
            raise
    
    def _extract_bad_entries_ids(self, bad_entries_data: Dict[str, Any]) -> Set[str]:
        """
        Estrae gli ID delle bad entries dal file JSON.
        
        Args:
            bad_entries_data: Dati delle bad entries
            
        Returns:
            Set degli ID delle bad entries
        """
        if 'entries' not in bad_entries_data:
            logger.warning("Chiave 'entries' non trovata nel file bad entries")
            return set()
        
        bad_entries = bad_entries_data['entries']
        
        if not isinstance(bad_entries, list):
            logger.warning("Il campo 'entries' non è una lista")
            return set()
        
        # Usa set comprehension per migliori performance
        bad_entries_ids = {
            entry['id'] for entry in bad_entries 
            if isinstance(entry, dict) and 'id' in entry
        }
        
        logger.info(f"Trovati {len(bad_entries_ids)} ID di bad entries")
        return bad_entries_ids
    
    def _filter_bad_entries(self, dataset: Dict[str, List[Dict]], bad_entries_ids: Set[str]) -> Dict[str, List[Dict]]:
        """
        Filtra le bad entries dal dataset.
        
        Args:
            dataset: Dataset principale
            bad_entries_ids: Set degli ID delle bad entries
            
        Returns:
            Dizionario con le bad entries filtrate per lingua
        """
        filtered_content = {}
        total_bad_entries = 0
        
        for lang, entries in dataset.items():
            if not isinstance(entries, list):
                logger.warning(f"Entries per lingua '{lang}' non è una lista, saltando...")
                continue
            
            # Filtra le entries che hanno ID nelle bad entries
            bad_entries_for_lang = [
                entry for entry in entries 
                if isinstance(entry, dict) and 
                   'id' in entry and 
                   entry['id'] in bad_entries_ids
            ]
            
            if bad_entries_for_lang:
                filtered_content[lang] = bad_entries_for_lang
                total_bad_entries += len(bad_entries_for_lang)
                logger.info(f"Lingua '{lang}': {len(bad_entries_for_lang)} bad entries trovate")
        
        logger.info(f"Totale bad entries nel cluster: {total_bad_entries}")
        return filtered_content
    
    def _save_cluster_file(self, filtered_content: Dict[str, List[Dict]]) -> None:
        """
        Salva il file cluster delle bad entries.
        
        Args:
            filtered_content: Contenuto filtrato da salvare
        """
        try:
            with open(self.bad_entries_cluster_json_path, "w", encoding="utf-8") as f:
                json.dump(filtered_content, f, indent=4, ensure_ascii=False)
            
            logger.info(f"✅ Cluster salvato con successo: {self.bad_entries_cluster_json_path}")
            
        except Exception as e:
            logger.error(f"Errore nel salvare il cluster: {e}")
            raise
    
    def create_bad_entries_cluster(self) -> bool:
        """
        Crea il cluster delle bad entries.
        
        Returns:
            True se l'operazione è andata a buon fine, False altrimenti
        """
        try:
            logger.info("🚀 Inizio creazione cluster bad entries")
            
            # 1. Carica i dati del dataset
            logger.info("📖 Caricamento dataset...")
            dataset = self._load_json_file(self.dataset_path)
            
            # 2. Carica i dati delle bad entries
            logger.info("📖 Caricamento bad entries...")
            bad_entries_data = self._load_json_file(self.bad_entries_json_path)
            
            # 3. Estrae gli ID delle bad entries
            logger.info("🔍 Estrazione ID bad entries...")
            bad_entries_ids = self._extract_bad_entries_ids(bad_entries_data)
            
            if not bad_entries_ids:
                logger.warning("⚠️ Nessuna bad entry trovata")
                return False
            
            # 4. Filtra le bad entries dal dataset
            logger.info("🔧 Filtraggio bad entries dal dataset...")
            filtered_content = self._filter_bad_entries(dataset, bad_entries_ids)
            
            if not filtered_content:
                logger.warning("⚠️ Nessuna bad entry trovata nel dataset")
                return False
            
            # 5. Salva il cluster
            logger.info("💾 Salvataggio cluster...")
            self._save_cluster_file(filtered_content)
            
            logger.info("✅ Cluster bad entries creato con successo!")
            return True
            
        except Exception as e:
            logger.error(f"❌ Errore nella creazione del cluster bad entries: {e}")
            return False
    
    def get_cluster_stats(self) -> Dict[str, Any]:
        """
        Ottiene statistiche sul cluster creato.
        
        Returns:
            Dizionario con statistiche del cluster
        """
        try:
            if not self.bad_entries_cluster_json_path.exists():
                return {"error": "Cluster non trovato"}
            
            cluster_data = self._load_json_file(self.bad_entries_cluster_json_path)
            
            stats = {
                "total_languages": len(cluster_data),
                "languages": list(cluster_data.keys()),
                "entries_per_language": {
                    lang: len(entries) for lang, entries in cluster_data.items()
                },
                "total_entries": sum(len(entries) for entries in cluster_data.values())
            }
            
            return stats
            
        except Exception as e:
            logger.error(f"Errore nel calcolo delle statistiche: {e}")
            return {"error": str(e)}


def main():
    """Funzione principale per testare la classe."""
    try:
        gestor = BadClusterGestor()
        
        # Crea il cluster
        success = gestor.create_bad_entries_cluster()
        
        if success:
            # Mostra statistiche
            stats = gestor.get_cluster_stats()
            print("\n📊 Statistiche del cluster:")
            print(f"- Lingue totali: {stats.get('total_languages', 0)}")
            print(f"- Entries totali: {stats.get('total_entries', 0)}")
            
            for lang, count in stats.get('entries_per_language', {}).items():
                print(f"  • {lang}: {count} entries")
        
    except Exception as e:
        logger.error(f"Errore nell'esecuzione: {e}")


if __name__ == "__main__":
    main()