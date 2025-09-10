import sys
import os
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rapidfuzz import fuzz

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))
from utility_dir import utility_paths  # noqa: E402


class SimilarityCalculator:
    def __init__(self):
        pass

    def read_json_file(self, path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    def read_file(self, path):
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()

    def write_json_file(self, path, content_to_write):
        with open(path, "w", encoding="utf-8") as f:
            json.dump(content_to_write, f, indent=4)

    def calculate_similarities_for_cluster(self, cluster_name: str):
        """Calculate fuzzy similarity, cosine similarity, and combined similarity index for each LLM file of a cluster"""
        if not cluster_name.endswith(".json"):
            cluster_name += ".json"

        cluster_path = utility_paths.CLUSTERS_DIR_FILEPATH / cluster_name
        cluster_content = self.read_json_file(cluster_path)

        for _lang, entries in cluster_content.items():
            for entry in entries:
                # codice originale
                final_code_path :str = entry["codeSnippetFilePath"]
                if "_codewars_solutions" in final_code_path: #debug
                    final_code_path = final_code_path.replace("_codewars_solutions","")
                    entry['codeSnippetFilePath'] = final_code_path

                if final_code_path.endswith("/src") : 
                    match entry['language'] : 
                        case "c" : 
                            final_code_path += "/"+entry['filename']
                        case "cpp" : 
                            final_code_path += "/"+entry['filename']
                        case _ : 
                            pass

                base_code_snippet_file_path = utility_paths.DATASET_DIR / final_code_path
                try :
                    base_code = self.read_file(base_code_snippet_file_path)
                except Exception as e :
                    print(f"\n\nread file exception for cluster {cluster_name} - base_code_snippet_file_path : {base_code_snippet_file_path}\nfinal_code_path = {final_code_path}\n")
                    raise e

                for llm in entry["LLMs"]:
                    llm_filepath = utility_paths.DATASET_DIR / llm["path"]
                    
                    try :
                        llm_code = self.read_file(llm_filepath)
                    except Exception as e :
                        print(f"\n\nread file exception for cluster {cluster_name} - llm_filepath : {llm_filepath}\n")
                        raise e
                        

                    #default -1 values for empty codes 
                    if not llm_code or not base_code or len(llm_code) == 0 or len(base_code) == 0:
                        llm["fuzzy_score"] = -1
                        llm["cosine_similarity_score"] = -1
                        llm["similarity_index"] = -1
                        continue

                    try:
                        # --- Fuzzy similarity (già 0–100)
                        fuzzy_score = fuzz.ratio(base_code, llm_code)

                        # --- Cosine similarity (0–1 -> %)
                        vectorizer = TfidfVectorizer(token_pattern=r"(?u)\b\w+\b")
                        tfidf = vectorizer.fit_transform([base_code, llm_code])
                        cosine_score = cosine_similarity(tfidf[0], tfidf[1])[0][0] * 100

                        # --- Similarity index (media dei due)
                        similarity_index = (0.45 * fuzzy_score) + (0.55 * cosine_score)


                        # --- Salvataggio risultati
                        llm["fuzzy_score"] = round(fuzzy_score, 2)
                        llm["cosine_similarity_score"] = round(cosine_score, 2)
                        llm["similarity_index"] = round(similarity_index, 2)
                    except Exception as e:
                        print(f"\nException for cluster {cluster_name}\n\nLLM code ({llm_filepath}):\n{llm_code}\n\nBase code ({base_code_snippet_file_path})\n{base_code}\n\n")
                        raise e


        # Salvataggio file JSON aggiornato
        self.write_json_file(cluster_path, cluster_content)


    def calculate_similarity_for_all_clusters(self) : 
        clusters = list(os.scandir(utility_paths.CLUSTERS_DIR_FILEPATH))
        total = len(clusters)
        for (i,cluster_name) in enumerate(clusters) :            
            cluster_name = cluster_name.name
            if (".test" in cluster_name or "with_metrics" in cluster_name or "debug_" in cluster_name or "focused_" in cluster_name or "bad_entries" in cluster_name):
                    continue
            else:
                self.calculate_similarities_for_cluster(cluster_name)
                print(f"\ncalculated similarity for cluster {cluster_name} | {i+1}/{total} | progress = {(i+1)/total * 100:.2f}%")




if __name__ == "__main__":
    calculator = SimilarityCalculator()
    calculator.calculate_similarity_for_all_clusters()

    #test
    #calculator.calculate_similarities_for_cluster("cluster_bob")