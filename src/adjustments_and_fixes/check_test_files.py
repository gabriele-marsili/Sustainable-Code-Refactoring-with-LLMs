import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


from utility_dir import utility_paths
from utility_dir import general_utils


class Checker:
    def __init__(self):
        pass

    def sanity_java_test_file_paths(self, cluster_name):
        cluster_path = (
            utility_paths.CLUSTERS_DIR_FILEPATH / f"cluster_{cluster_name}.json"
        )
        content = general_utils.read_json(cluster_path)
        #print(f"\n\ncluster_path = {cluster_path}")


        for lang, entries in content.items():
            if lang == "Java" or lang == "java":
                for raw_entry in entries:
                    
                    entry: general_utils.CodeEntry = general_utils.CodeEntry.from_dict(
                        raw_entry
                    )
                    
                    str_test_file_path = entry.testUnitFilePath                    
                    test_file_path = utility_paths.DATASET_DIR / str_test_file_path
                    if not os.path.exists(test_file_path):
                        code_str_filepath = entry.codeSnippetFilePath
                        filename = code_str_filepath.split("/").pop()

                        parts = str_test_file_path.split("/")
                        parsedTestFileName = f"{filename.replace(".java","Test.java")}"
                        parts[-1] = parsedTestFileName
                        parsed_test_path = ""
                        for (i,p) in enumerate(parts) : 
                            if i == 0 : 
                                parsed_test_path = p
                            else :                                 
                                parsed_test_path += ("/"+p)
                        
                        raw_entry['testUnitFilePath'] = parsed_test_path

                        general_utils.write_json(cluster_path,content)

                        print(F"Changed {str_test_file_path} -> {parsed_test_path} in cluster {cluster_name}")
                        
    def sanity_all_java_test_file_paths(self) : 
        """Discover all available cluster files"""
        if not utility_paths.CLUSTERS_DIR_FILEPATH:
            return []

        for file_path in utility_paths.CLUSTERS_DIR_FILEPATH.glob("cluster_*.json"):
            if not any(
                skip in file_path.name
                for skip in ["debug", "test", "bad_entries", "focused_", "with_metrics"]
            ):
                file_name = file_path.name.replace("cluster_", "").replace(".json", "")
                self.sanity_java_test_file_paths(file_name)
                       



    def is_test_file_empty(self, file_path: str) -> bool:
        """
        Controlla se un file di test .js o .ts è vuoto o contiene solo commenti/spazi.

        Args:
            file_path (str): percorso del file .js o .ts da controllare

        Returns:
            bool: True se il file è vuoto o privo di codice utile, False altrimenti.
        """
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File non trovato: {file_path}")

        # 1️⃣ Controllo file fisicamente vuoto
        if os.path.getsize(file_path) == 0:
            return True

        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read().strip()

        # 2️⃣ Se non ci sono caratteri (solo spazi o newline)
        if not content:
            return True

        # 3️⃣ Rimuove commenti JS/TS (sia // che /* ... */)
        content_no_comments = re.sub(
            r"//.*?$|/\*.*?\*/", "", content, flags=re.DOTALL | re.MULTILINE
        )

        # 4️⃣ Se dopo aver rimosso i commenti non rimane nulla di significativo
        return not bool(content_no_comments.strip())

    def check_cluster(self, cluster_name=str):
        report = {"cluster_name": cluster_name, "empty_tests": []}

        cluster_path = (
            utility_paths.CLUSTERS_DIR_FILEPATH / f"cluster_{cluster_name}.json"
        )
        content = general_utils.read_json(cluster_path)
        #print(f"\n\ncluster_path = {cluster_path}")
        for _lang, entries in content.items():
            for raw_entry in entries:
                
                entry: general_utils.CodeEntry = general_utils.CodeEntry.from_dict(
                    raw_entry
                )
                str_test_file_path = entry.testUnitFilePath
                if entry.language == "c" or entry.language == "cpp":
                    str_test_file_path = str_test_file_path + f"/test_{entry.filename}"

                test_file_path = utility_paths.DATASET_DIR / str_test_file_path

                try:
                    if self.is_test_file_empty(test_file_path):
                        report["empty_tests"].append(
                            {"id": entry.id, "testUnitFilePath": test_file_path}
                        )
                except Exception as e:
                    if entry.language == "c" or entry.language == "cpp":
                        ext = ".c" if entry.language == "c" else ".cpp"
                        str_test_file_path = (
                            entry.testUnitFilePath
                            + f"/{entry.filename.replace(ext, '')}_test{ext}"
                        )

                        test_file_path = utility_paths.DATASET_DIR / str_test_file_path

                        if self.is_test_file_empty(test_file_path):
                            report["empty_tests"].append(
                                {"id": entry.id, "testUnitFilePath": test_file_path}
                            )

                    else:
                        raise e

        return report

    def check_all(self):
        """Discover all available cluster files"""
        if not utility_paths.CLUSTERS_DIR_FILEPATH:
            return []

        for file_path in utility_paths.CLUSTERS_DIR_FILEPATH.glob("cluster_*.json"):
            if not any(
                skip in file_path.name
                for skip in ["debug", "test", "bad_entries", "focused_", "with_metrics"]
            ):
                file_name = file_path.name.replace("cluster_", "").replace(".json", "")

                res = self.check_cluster(file_name)
                if len(res["empty_tests"]) > 0 :
                    print(
                        f"\n\nCluster {file_name} empty test report\n{res}"
                    )


if __name__ == "__main__":
    checker = Checker()
    checker.check_all()
    #checker.sanity_all_java_test_file_paths()
