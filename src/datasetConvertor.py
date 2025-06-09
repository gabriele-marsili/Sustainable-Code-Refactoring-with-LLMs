import csv
import json
import argparse
from collections import defaultdict

# Percorsi di input/output
CSV_PATH = './dataset/dataset.csv'
JSON_PATH = './dataset/dataset.json'

def csv_to_json(csv_path, json_path):
    data = defaultdict(list)
    with open(csv_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        i = 0
        for row in reader:
            entry = {
                "id": row['nome_file_codice'].split(".")[0]+"_"+str(i),
                "filename": row['nome_file_codice'],
                "language": row['linguaggio'],
                "source": row['source'],
                "codeSnippetFilePath": row['path_file_codice'],
                "testUnitFilePath": row['path_file_test']
            }
            data[row['linguaggio']].append(entry)
            i+=1

    with open(json_path, 'w', encoding='utf-8') as jsonfile:
        json.dump(data, jsonfile, indent=4, ensure_ascii=False)

if __name__ == '__main__':

    csv_to_json(CSV_PATH, JSON_PATH)
