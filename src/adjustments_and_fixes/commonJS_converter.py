#!/usr/bin/env python3
"""
Script per convertire file JavaScript da CommonJS a ES Modules.
Gestisce sia file normali che file di test.
"""

import re
import os
import sys
import argparse
from pathlib import Path
from typing import List, Dict, Tuple

BASE_DIR = Path(__file__).resolve().parent.parent.parent #tesi path

class CommonJSToESMConverter:
    """Convertitore da CommonJS a ES Modules."""
    
    def __init__(self):
        # Pattern per matching dei require
        self.require_patterns = [
            # var/const/let name = require('module')
            (r"^(\s*)(var|const|let)\s+(\w+)\s*=\s*require\s*\(\s*['\"]([^'\"]+)['\"]\s*\)\s*;?\s*$", 
             r"\1import \3 from '\4';"),
            
            # var/const/let { destructured } = require('module')
            (r"^(\s*)(var|const|let)\s+\{\s*([^}]+)\s*\}\s*=\s*require\s*\(\s*['\"]([^'\"]+)['\"]\s*\)\s*;?\s*$", 
             r"\1import { \3 } from '\4';"),
            
            # var/const/let name = require('module').property
            (r"^(\s*)(var|const|let)\s+(\w+)\s*=\s*require\s*\(\s*['\"]([^'\"]+)['\"]\s*\)\.(\w+)\s*;?\s*$", 
             r"\1import { \5 as \3 } from '\4';"),
            
            # const name = require('module')
            (r"^(\s*)const\s+(\w+)\s*=\s*require\s*\(\s*['\"]([^'\"]+)['\"]\s*\)\s*;?\s*$", 
             r"\1import \2 from '\3';"),
        ]
        
        # Pattern per exports
        self.export_patterns = [
            # module.exports = something
            (r"^(\s*)module\.exports\s*=\s*(.+);?\s*$", 
             r"\1export default \2;"),
            
            # exports.property = something
            (r"^(\s*)exports\.(\w+)\s*=\s*(.+);?\s*$", 
             r"\1export const \2 = \3;"),
            
            # module.exports.property = something
            (r"^(\s*)module\.exports\.(\w+)\s*=\s*(.+);?\s*$", 
             r"\1export const \2 = \3;"),
        ]
    
    def convert_requires(self, content: str) -> str:
        """Converte le dichiarazioni require in import."""
        lines = content.split('\n')
        converted_lines = []
        
        for line in lines:
            converted_line = line
            
            # Applica i pattern di conversione per require
            for pattern, replacement in self.require_patterns:
                if re.match(pattern, line):
                    converted_line = re.sub(pattern, replacement, line)
                    break
            
            converted_lines.append(converted_line)
        
        return '\n'.join(converted_lines)
    
    def convert_exports(self, content: str) -> str:
        """Converte le dichiarazioni exports in export."""
        lines = content.split('\n')
        converted_lines = []
        
        for line in lines:
            converted_line = line
            
            # Applica i pattern di conversione per exports
            for pattern, replacement in self.export_patterns:
                if re.match(pattern, line):
                    converted_line = re.sub(pattern, replacement, line)
                    break
            
            converted_lines.append(converted_line)
        
        return '\n'.join(converted_lines)
    
    def convert_file_content(self, content: str) -> str:
        """Converte il contenuto completo del file."""
        # Prima converti i require
        content = self.convert_requires(content)
        
        # Poi converti gli exports
        content = self.convert_exports(content)
        
        return content
    
    def convert_file(self, file_path: str, output_path: str = None) -> bool:
        """
        Converte un singolo file da CommonJS a ES Module.
        
        Args:
            file_path: Percorso del file da convertire
            output_path: Percorso del file di output (opzionale)
            
        Returns:
            True se la conversione è riuscita, False altrimenti
        """
        try:
            # Leggi il file
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Converti il contenuto
            converted_content = self.convert_file_content(content)
            
            # Determina il percorso di output
            if output_path is None:
                output_path = file_path
            
            # Scrivi il file convertito
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(converted_content)
            
            print(f"✓ Convertito: {file_path}")
            return True
            
        except Exception as e:
            print(f"❌ Errore nella conversione di {file_path}: {e}")
            return False
    
    def convert_files(self, file_paths: List[str], backup: bool = True) -> Dict[str, bool]:
        """
        Converte una lista di file da CommonJS a ES Module.
        
        Args:
            file_paths: Lista di percorsi dei file da convertire
            backup: Se True, crea un backup dei file originali
            
        Returns:
            Dizionario con i risultati della conversione
        """
        results = {}
        
        for file_path in file_paths:
            if not os.path.exists(file_path):
                print(f"❌ File non trovato: {file_path}")
                results[file_path] = False
                continue
            
            if not file_path.endswith('.js'):
                print(f"❌ Non è un file JavaScript: {file_path}")
                results[file_path] = False
                continue
            
            # Crea backup se richiesto
            if backup:
                backup_path = file_path + '.bak'
                try:
                    with open(file_path, 'r', encoding='utf-8') as original:
                        with open(backup_path, 'w', encoding='utf-8') as backup_file:
                            backup_file.write(original.read())
                    print(f"📁 Backup creato: {backup_path}")
                except Exception as e:
                    print(f"⚠ Errore nella creazione del backup per {file_path}: {e}")
            
            # Converti il file
            results[file_path] = self.convert_file(file_path)
        
        return results


def main():
    """Funzione principale."""
    parser = argparse.ArgumentParser(
        description='Converte file JavaScript da CommonJS a ES Modules'
    )
   
    parser.add_argument(
        '--no-backup', 
        action='store_true',
        help='Non creare backup dei file originali'
    )
    parser.add_argument(
        '--dry-run', 
        action='store_true',
        help='Mostra solo le modifiche che verrebbero applicate'
    )
    
    args = parser.parse_args()
    
    # Inizializza il convertitore
    converter = CommonJSToESMConverter()
    print(f"BASE_DIR = {BASE_DIR}")
    """
    patterns = [
        "src/dataset/javascript/allergies_exercism-javascript-ThomasZumsteg/allergies_testSuite.js",
        "src/dataset/javascript/alphametics_exercism-javascript-ThomasZumsteg/alphametics_testSuite.js",
        "src/dataset/javascript/anagram_exercism-javascript-bearguns/anagram_testSuite.js",
        "src/dataset/javascript/anagram_exercism-javascript-ThomasZumsteg/anagram_testSuite.js",
        "src/dataset/javascript/armstrong-numbers_exercism-javascript-ThomasZumsteg/armstrong-numbers_testSuite.js",
        "src/dataset/javascript/atbash-cipher_exercism-javascript-ThomasZumsteg/atbash-cipher_testSuite.js",
        "src/dataset/javascript/beer-song_exercism-javascript-bearguns/beer-song_testSuite.js",
        "src/dataset/javascript/beer-song_exercism-javascript-ThomasZumsteg/beer-song_testSuite.js",
        "src/dataset/javascript/beer-song_exercism-javascript-ThomasZumsteg/beer-song.js",
        "src/dataset/javascript/binary-search_exercism-javascript-ThomasZumsteg/binary-search_testSuite.js",
        "src/dataset/javascript/binary_exercism-javascript-bearguns/binary_testSuite.js",
        "src/dataset/javascript/binary_exercism-javascript-ThomasZumsteg/binary_testSuite.js",
        "src/dataset/javascript/bob_exercism-javascript-bearguns/bob_testSuite.js",
        "src/dataset/javascript/bob_exercism-javascript-ThomasZumsteg/bob_testSuite.js",
        "src/dataset/javascript/bracket-push_exercism-javascript-ThomasZumsteg/bracket-push_testSuite.js",
        "src/dataset/javascript/circular-buffer_exercism-javascript-ThomasZumsteg/circular-buffer_testSuite.js",
        "src/dataset/javascript/clock_exercism-javascript-ThomasZumsteg/clock_testSuite.js",
        "src/dataset/javascript/complex-numbers_exercism-javascript-ThomasZumsteg/complex-numbers_testSuite.js",
        "src/dataset/javascript/connect_exercism-javascript-ThomasZumsteg/connect_testSuite.js",
        "src/dataset/javascript/crypto-square_exercism-javascript-ThomasZumsteg/crypto-square_testSuite.js",
        "src/dataset/javascript/custom-set_exercism-javascript-ThomasZumsteg/custom-set_testSuite.js",
        "src/dataset/javascript/diamond_exercism-javascript-ThomasZumsteg/diamond_testSuite.js",
        "src/dataset/javascript/domainName/domainName_testSuite.js",
        "src/dataset/javascript/domainName.test.js/domainName.test.js_testSuite.js",
        "src/dataset/javascript/etl_exercism-javascript-bearguns/etl_testSuite.js",
        "src/dataset/javascript/etl_exercism-javascript-ThomasZumsteg/etl_testSuite.js",
        "src/dataset/javascript/flatten-array_exercism-javascript-ThomasZumsteg/flatten-array_testSuite.js",
        "src/dataset/javascript/food-chain_exercism-javascript-bearguns/food-chain_testSuite.js",
        "src/dataset/javascript/food-chain_exercism-javascript-ThomasZumsteg/food-chain_testSuite.js",
        "src/dataset/javascript/gigasecond_exercism-javascript-bearguns/gigasecond_testSuite.js",
        "src/dataset/javascript/gigasecond_exercism-javascript-ThomasZumsteg/gigasecond_testSuite.js",
        "src/dataset/javascript/grade-school_exercism-javascript-bearguns/grade-school_testSuite.js",
        "src/dataset/javascript/grade-school_exercism-javascript-ThomasZumsteg/grade-school_testSuite.js",
        "src/dataset/javascript/grains_exercism-javascript-bearguns/grains_testSuite.js",
        "src/dataset/javascript/grains_exercism-javascript-bearguns/grains.js",
        "src/dataset/javascript/grains_exercism-javascript-ThomasZumsteg/grains_testSuite.js",
        "src/dataset/javascript/grains_exercism-javascript-ThomasZumsteg/grains.js",
        "src/dataset/javascript/hamming_exercism-javascript-ThomasZumsteg/hamming_testSuite.js",
        "src/dataset/javascript/hashtagGenerator/hashtagGenerator_testSuite.js",
        "src/dataset/javascript/hashtagGenerator.test.js/hashtagGenerator.test.js_testSuite.js",
        "src/dataset/javascript/hello-world_exercism-javascript-bearguns/hello-world_testSuite.js",
        "src/dataset/javascript/hello-world_exercism-javascript-ThomasZumsteg/hello-world_testSuite.js",
        "src/dataset/javascript/hexadecimal_exercism-javascript-ThomasZumsteg/hexadecimal_testSuite.js",
        "src/dataset/javascript/humanReadableNumbers/humanReadableNumbers_testSuite.js",
        "src/dataset/javascript/humanReadableNumbers.test.js/humanReadableNumbers.test.js_testSuite.js",
        "src/dataset/javascript/isogram_exercism-javascript-bearguns/isogram_testSuite.js",
        "src/dataset/javascript/isogram_exercism-javascript-ThomasZumsteg/isogram_testSuite.js",
        "src/dataset/javascript/kindergarten-garden_exercism-javascript-ThomasZumsteg/kindergarten-garden_testSuite.js",
        "src/dataset/javascript/leap_exercism-javascript-bearguns/leap_testSuite.js",
        "src/dataset/javascript/leap_exercism-javascript-ThomasZumsteg/leap_testSuite.js",
        "src/dataset/javascript/linked-list_exercism-javascript-ThomasZumsteg/linked-list_testSuite.js",
        "src/dataset/javascript/list-ops_exercism-javascript-ThomasZumsteg/list-ops_testSuite.js",
        "src/dataset/javascript/luhn_exercism-javascript-ThomasZumsteg/luhn_testSuite.js",
        "src/dataset/javascript/matrix_exercism-javascript-ThomasZumsteg/matrix_testSuite.js",
        "src/dataset/javascript/meanSquareError/meanSquareError_testSuite.js",
        "src/dataset/javascript/meanSquareError.test.js/meanSquareError.test.js_testSuite.js",
        "src/dataset/javascript/meetup_exercism-javascript-ThomasZumsteg/meetup_testSuite.js",
        "src/dataset/javascript/minesweeper_exercism-javascript-ThomasZumsteg/minesweeper_testSuite.js",
        "src/dataset/javascript/ocr-numbers_exercism-javascript-ThomasZumsteg/ocr-numbers_testSuite.js",
        "src/dataset/javascript/octal_exercism-javascript-ThomasZumsteg/octal_testSuite.js",
        "src/dataset/javascript/palindrome-products_exercism-javascript-ThomasZumsteg/palindrome-products_testSuite.js",
        "src/dataset/javascript/pangram_exercism-javascript-bearguns/pangram_testSuite.js",
        "src/dataset/javascript/pangram_exercism-javascript-ThomasZumsteg/pangram_testSuite.js",
        "src/dataset/javascript/pascals-triangle_exercism-javascript-ThomasZumsteg/pascals-triangle_testSuite.js",
        "src/dataset/javascript/perfect-numbers_exercism-javascript-ThomasZumsteg/perfect-numbers_testSuite.js",
        "src/dataset/javascript/phone-number_exercism-javascript-bearguns/phone-number_testSuite.js",
        "src/dataset/javascript/phone-number_exercism-javascript-ThomasZumsteg/phone-number_testSuite.js",
        "src/dataset/javascript/phone-number_exercism-javascript-ThomasZumsteg/phone-number.js",
        "src/dataset/javascript/pig-latin_exercism-javascript-ThomasZumsteg/pig-latin_testSuite.js",
        "src/dataset/javascript/prime-factors_exercism-javascript-ThomasZumsteg/prime-factors_testSuite.js",
        "src/dataset/javascript/proverb_exercism-javascript-ThomasZumsteg/proverb_testSuite.js",
        "src/dataset/javascript/pythagorean-triplet_exercism-javascript-ThomasZumsteg/pythagorean-triplet_testSuite.js",
        "src/dataset/javascript/queen-attack_exercism-javascript-ThomasZumsteg/queen-attack_testSuite.js",
        "src/dataset/javascript/raindrops_exercism-javascript-ThomasZumsteg/raindrops_testSuite.js",
        "src/dataset/javascript/rational-numbers_exercism-javascript-ThomasZumsteg/rational-numbers_testSuite.js",
        "src/dataset/javascript/rectangles_exercism-javascript-ThomasZumsteg/rectangles_testSuite.js",
        "src/dataset/javascript/reverse-string_exercism-javascript-bearguns/reverse-string_testSuite.js",
        "src/dataset/javascript/reverse-string_exercism-javascript-ThomasZumsteg/reverse-string_testSuite.js",
        "src/dataset/javascript/rna-transcription_exercism-javascript-ThomasZumsteg/rna-transcription_testSuite.js",
        "src/dataset/javascript/robot-name_exercism-javascript-bearguns/robot-name_testSuite.js",
        "src/dataset/javascript/robot-name_exercism-javascript-ThomasZumsteg/robot-name_testSuite.js",
        "src/dataset/javascript/robot-simulator_exercism-javascript-ThomasZumsteg/robot-simulator_testSuite.js",
        "src/dataset/javascript/roman-numerals_exercism-javascript-ThomasZumsteg/roman-numerals_testSuite.js",
        "src/dataset/javascript/rotational-cipher_exercism-javascript-ThomasZumsteg/rotational-cipher_testSuite.js",
        "src/dataset/javascript/run-length-encoding_exercism-javascript-ThomasZumsteg/run-length-encoding_testSuite.js",
        "src/dataset/javascript/saddle-points_exercism-javascript-ThomasZumsteg/saddle-points_testSuite.js",
        "src/dataset/javascript/scrabble-score_exercism-javascript-ThomasZumsteg/scrabble-score_testSuite.js",
        "src/dataset/javascript/scramblies/scramblies_testSuite.js",
        "src/dataset/javascript/scramblies.test.js/scramblies.test.js_testSuite.js",
        "src/dataset/javascript/simple-cipher_exercism-javascript-bearguns/simple-cipher_testSuite.js",
        "src/dataset/javascript/simple-cipher_exercism-javascript-ThomasZumsteg/simple-cipher_testSuite.js",
        "src/dataset/javascript/space-age_exercism-javascript-bearguns/space-age_testSuite.js",
        "src/dataset/javascript/space-age_exercism-javascript-ThomasZumsteg/space-age_testSuite.js",
        "src/dataset/javascript/spiralTraversal/spiralTraversal_testSuite.js",
        "src/dataset/javascript/spiralTraversal.test.js/spiralTraversal.test.js_testSuite.js",
        "src/dataset/javascript/strain_exercism-javascript-ThomasZumsteg/strain_testSuite.js",
        "src/dataset/javascript/sublist_exercism-javascript-bearguns/sublist_testSuite.js",
        "src/dataset/javascript/sublist_exercism-javascript-ThomasZumsteg/sublist_testSuite.js",
        "src/dataset/javascript/sum-of-multiples_exercism-javascript-ThomasZumsteg/sum-of-multiples_testSuite.js",
        "src/dataset/javascript/titleCase/titleCase_testSuite.js",
        "src/dataset/javascript/titleCase.test.js/titleCase.test.js_testSuite.js",
        "src/dataset/javascript/transpose_exercism-javascript-ThomasZumsteg/transpose_testSuite.js",
        "src/dataset/javascript/triangle_exercism-javascript-ThomasZumsteg/triangle_testSuite.js",
        "src/dataset/javascript/trinary_exercism-javascript-ThomasZumsteg/trinary_testSuite.js",
        "src/dataset/javascript/twelve-days_exercism-javascript-ThomasZumsteg/twelve-days_testSuite.js",
        "src/dataset/javascript/two-bucket_exercism-javascript-ThomasZumsteg/two-bucket_testSuite.js",
        "src/dataset/javascript/two-fer_exercism-javascript-bearguns/two-fer_testSuite.js",
        "src/dataset/javascript/two-fer_exercism-javascript-ThomasZumsteg/two-fer_testSuite.js",
        "src/dataset/javascript/typoglycemiaGenerator/typoglycemiaGenerator_testSuite.js",
        "src/dataset/javascript/typoglycemiaGenerator.test.js/typoglycemiaGenerator.test.js_testSuite.js",
        "src/dataset/javascript/word-count_exercism-javascript-ThomasZumsteg/word-count_testSuite.js",
        "src/dataset/javascript/wordy_exercism-javascript-ThomasZumsteg/wordy_testSuite.js",
        "src/dataset/typescript/bob_exercism-javascript-samajammin/bob.test.js",
        "src/dataset/typescript/bob_Exercism-typescript-alemarr/bob.test.js",
        "src/dataset/typescript/bob_Exercism-typescript-chriswilding/bob.test.js",
        "src/dataset/typescript/bob_Exercism-typescript-FilipeCerejo/bob.test.js",
        "src/dataset/typescript/bob_Exercism-typescript-shybyte/bob.test.js",
        "src/dataset/typescript/bob_Exercism-typescript-thewanionly/bob.test.js",
        "src/dataset/typescript/bob_Exercism-typescript-uzilan/bob.test.js",
        "src/dataset/typescript/raindrops_Exercism-typescript-alemarr/raindrops_testSuite.js",
        "src/dataset/typescript/raindrops_Exercism-typescript-alemarr/raindrops.test.js",
        "src/dataset/typescript/raindrops_Exercism-typescript-chriswilding/raindrops_testSuite.js",
    ]
    """
    patterns = [
        "src/dataset/javascript/humanReadableNumbers/humanReadableNumbers_testSuite.js",
        "src/dataset/javascript/humanReadableNumbers.test.js/humanReadableNumbers.test.js_testSuite.js",
        "src/dataset/typescript/bob_exercism-javascript-samajammin/bob.test.js",
        "src/dataset/typescript/bob_Exercism-typescript-chriswilding/bob.test.js",
        "src/dataset/typescript/bob_Exercism-typescript-shybyte/bob.test.js",
        "src/dataset/typescript/bob_Exercism-typescript-uzilan/bob.test.js",
        "src/dataset/typescript/raindrops_Exercism-typescript-chriswilding/raindrops.test.js",
        "src/dataset/typescript/raindrops_Exercism-typescript-FilipeCerejo/raindrops_testSuite.js",
        "src/dataset/typescript/raindrops_Exercism-typescript-FilipeCerejo/raindrops.test.js",
        "src/dataset/typescript/raindrops_Exercism-typescript-shybyte/raindrops_testSuite.js",
        "src/dataset/typescript/raindrops_Exercism-typescript-shybyte/raindrops.test.js",
        "src/dataset/typescript/raindrops_Exercism-typescript-thewanionly/raindrops_testSuite.js",                   
        "src/dataset/javascript/accumulate_exercism-javascript-ThomasZumsteg/accumulate.js",
        "src/dataset/javascript/acronym_exercism-javascript-ThomasZumsteg/acronym.js",
        "src/dataset/javascript/allergies_exercism-javascript-ThomasZumsteg/allergies.js",
        "src/dataset/javascript/alphametics_exercism-javascript-ThomasZumsteg/alphametics.js",
        "src/dataset/javascript/anagram_exercism-javascript-bearguns/anagram.js",
        "src/dataset/javascript/anagram_exercism-javascript-ThomasZumsteg/anagram.js",
        "src/dataset/javascript/armstrong-numbers_exercism-javascript-ThomasZumsteg/armstrong-numbers.js",
        "src/dataset/javascript/atbash-cipher_exercism-javascript-ThomasZumsteg/atbash-cipher.js",
        "src/dataset/javascript/beer-song_exercism-javascript-bearguns/beer-song.js",
        "src/dataset/javascript/binary-search_exercism-javascript-ThomasZumsteg/binary-search.js",
        "src/dataset/javascript/binary_exercism-javascript-bearguns/binary.js",
        "src/dataset/javascript/binary_exercism-javascript-ThomasZumsteg/binary.js",
        "src/dataset/javascript/bob_exercism-javascript-bearguns/bob.js",
        "src/dataset/javascript/bob_exercism-javascript-ThomasZumsteg/bob.js",
        "src/dataset/javascript/bracket-push_exercism-javascript-ThomasZumsteg/bracket-push.js",
        "src/dataset/javascript/circular-buffer_exercism-javascript-ThomasZumsteg/circular-buffer.js",
        "src/dataset/javascript/clock_exercism-javascript-ThomasZumsteg/clock.js",
        "src/dataset/javascript/complex-numbers_exercism-javascript-ThomasZumsteg/complex-numbers.js",
        "src/dataset/javascript/connect_exercism-javascript-ThomasZumsteg/connect.js",
        "src/dataset/javascript/crypto-square_exercism-javascript-ThomasZumsteg/crypto-square.js",
        "src/dataset/javascript/custom-set_exercism-javascript-ThomasZumsteg/custom-set.js",
        "src/dataset/javascript/diamond_exercism-javascript-ThomasZumsteg/diamond.js",
        "src/dataset/javascript/domainName/domainName.js",
        "src/dataset/javascript/domainName.test.js/domainName.test.js.js",
        "src/dataset/javascript/etl_exercism-javascript-bearguns/etl.js",
        "src/dataset/javascript/etl_exercism-javascript-ThomasZumsteg/etl.js",
        "src/dataset/javascript/flatten-array_exercism-javascript-ThomasZumsteg/flatten-array.js",
        "src/dataset/javascript/food-chain_exercism-javascript-bearguns/food-chain.js",
        "src/dataset/javascript/food-chain_exercism-javascript-ThomasZumsteg/food-chain.js",
        "src/dataset/javascript/gigasecond_exercism-javascript-bearguns/gigasecond.js",
        "src/dataset/javascript/gigasecond_exercism-javascript-ThomasZumsteg/gigasecond.js",
        "src/dataset/javascript/grade-school_exercism-javascript-bearguns/grade-school.js",
        "src/dataset/javascript/grade-school_exercism-javascript-ThomasZumsteg/grade-school.js",
        "src/dataset/javascript/hamming_exercism-javascript-ThomasZumsteg/hamming.js",
        "src/dataset/javascript/hashtagGenerator/hashtagGenerator.js",
        "src/dataset/javascript/hashtagGenerator.test.js/hashtagGenerator.test.js.js",
        "src/dataset/javascript/hello-world_exercism-javascript-bearguns/hello-world.js",
        "src/dataset/javascript/hello-world_exercism-javascript-ThomasZumsteg/hello-world.js",
        "src/dataset/javascript/hexadecimal_exercism-javascript-ThomasZumsteg/hexadecimal.js",
        "src/dataset/javascript/house_exercism-javascript-ThomasZumsteg/house.js",
        "src/dataset/javascript/humanReadableNumbers/humanReadableNumbers.js",
        "src/dataset/javascript/humanReadableNumbers.test.js/humanReadableNumbers.test.js.js",
        "src/dataset/javascript/isogram_exercism-javascript-bearguns/isogram.js",
        "src/dataset/javascript/isogram_exercism-javascript-ThomasZumsteg/isogram.js",
        "src/dataset/javascript/kindergarten-garden_exercism-javascript-ThomasZumsteg/kindergarten-garden.js",
        "src/dataset/javascript/leap_exercism-javascript-bearguns/leap.js",
        "src/dataset/javascript/leap_exercism-javascript-ThomasZumsteg/leap.js",
        "src/dataset/javascript/linked-list_exercism-javascript-ThomasZumsteg/linked-list.js",
        "src/dataset/javascript/list-ops_exercism-javascript-ThomasZumsteg/list-ops.js",
        "src/dataset/javascript/luhn_exercism-javascript-ThomasZumsteg/luhn.js",
        "src/dataset/javascript/matrix_exercism-javascript-ThomasZumsteg/matrix.js",
        "src/dataset/javascript/meanSquareError/meanSquareError.js",
        "src/dataset/javascript/meanSquareError.test.js/meanSquareError.test.js.js",
        "src/dataset/javascript/meetup_exercism-javascript-ThomasZumsteg/meetup.js",
        "src/dataset/javascript/minesweeper_exercism-javascript-ThomasZumsteg/minesweeper.js",
        "src/dataset/javascript/ocr-numbers_exercism-javascript-ThomasZumsteg/ocr-numbers.js",
        "src/dataset/javascript/octal_exercism-javascript-ThomasZumsteg/octal.js",
        "src/dataset/javascript/palindrome-products_exercism-javascript-ThomasZumsteg/palindrome-products.js",
        "src/dataset/javascript/pangram_exercism-javascript-bearguns/pangram.js",
        "src/dataset/javascript/pangram_exercism-javascript-ThomasZumsteg/pangram.js",
        "src/dataset/javascript/pascals-triangle_exercism-javascript-ThomasZumsteg/pascals-triangle.js",
        "src/dataset/javascript/perfect-numbers_exercism-javascript-ThomasZumsteg/perfect-numbers.js",
        "src/dataset/javascript/phone-number_exercism-javascript-bearguns/phone-number.js",
        "src/dataset/javascript/pig-latin_exercism-javascript-ThomasZumsteg/pig-latin.js",
        "src/dataset/javascript/prime-factors_exercism-javascript-ThomasZumsteg/prime-factors.js",
        "src/dataset/javascript/proverb_exercism-javascript-ThomasZumsteg/proverb.js",
        "src/dataset/javascript/pythagorean-triplet_exercism-javascript-ThomasZumsteg/pythagorean-triplet.js",
        "src/dataset/javascript/queen-attack_exercism-javascript-ThomasZumsteg/queen-attack.js",
        "src/dataset/javascript/raindrops_exercism-javascript-ThomasZumsteg/raindrops.bak",
        "src/dataset/javascript/raindrops_exercism-javascript-ThomasZumsteg/raindrops.js",
        "src/dataset/javascript/raindrops_exercism-javascript-ThomasZumsteg/claude/ClaudeSonnet4_raindrops.js",
        "src/dataset/javascript/raindrops_exercism-javascript-ThomasZumsteg/claude/raindrops.js",
        "src/dataset/javascript/raindrops_exercism-javascript-ThomasZumsteg/gemini/GeminiFlash_raindrops.js",
        "src/dataset/javascript/raindrops_exercism-javascript-ThomasZumsteg/gemini/raindrops.js",
        "src/dataset/javascript/raindrops_exercism-javascript-ThomasZumsteg/openAI/ChatGPT4_raindrops.js",
        "src/dataset/javascript/raindrops_exercism-javascript-ThomasZumsteg/openAI/raindrops.js",
        "src/dataset/javascript/rational-numbers_exercism-javascript-ThomasZumsteg/rational-numbers.js",
        "src/dataset/javascript/rectangles_exercism-javascript-ThomasZumsteg/rectangles.js",
        "src/dataset/javascript/reverse-string_exercism-javascript-bearguns/reverse-string.js",
        "src/dataset/javascript/reverse-string_exercism-javascript-ThomasZumsteg/reverse-string.js",
        "src/dataset/javascript/rna-transcription_exercism-javascript-ThomasZumsteg/rna-transcription.js",
        "src/dataset/javascript/robot-name_exercism-javascript-bearguns/robot-name.js",
        "src/dataset/javascript/robot-name_exercism-javascript-ThomasZumsteg/robot-name.js",
        "src/dataset/javascript/robot-simulator_exercism-javascript-ThomasZumsteg/robot-simulator.js",
        "src/dataset/javascript/roman-numerals_exercism-javascript-ThomasZumsteg/roman-numerals.js",
        "src/dataset/javascript/rotational-cipher_exercism-javascript-ThomasZumsteg/rotational-cipher.js",
        "src/dataset/javascript/run-length-encoding_exercism-javascript-ThomasZumsteg/run-length-encoding.js",
        "src/dataset/javascript/saddle-points_exercism-javascript-ThomasZumsteg/saddle-points.js",
        "src/dataset/javascript/scrabble-score_exercism-javascript-ThomasZumsteg/scrabble-score.js",
        "src/dataset/javascript/scramblies/scramblies.js",
        "src/dataset/javascript/scramblies.test.js/scramblies.test.js.js",
        "src/dataset/javascript/simple-cipher_exercism-javascript-bearguns/simple-cipher.js",
        "src/dataset/javascript/simple-cipher_exercism-javascript-ThomasZumsteg/simple-cipher.js",
        "src/dataset/javascript/space-age_exercism-javascript-bearguns/space-age.js",
        "src/dataset/javascript/space-age_exercism-javascript-ThomasZumsteg/space-age.js",
        "src/dataset/javascript/spiral-matrix_exercism-javascript-ThomasZumsteg/spiral-matrix.js",
        "src/dataset/javascript/spiralTraversal/spiralTraversal.js",
        "src/dataset/javascript/spiralTraversal.test.js/spiralTraversal.test.js.js",
        "src/dataset/javascript/strain_exercism-javascript-ThomasZumsteg/strain.js",
        "src/dataset/javascript/sublist_exercism-javascript-bearguns/sublist.js",
        "src/dataset/javascript/sublist_exercism-javascript-ThomasZumsteg/sublist.js",
        "src/dataset/javascript/sum-of-multiples_exercism-javascript-ThomasZumsteg/sum-of-multiples.js",
        "src/dataset/javascript/titleCase/titleCase.js",
        "src/dataset/javascript/titleCase.test.js/titleCase.test.js.js",
        "src/dataset/javascript/transpose_exercism-javascript-ThomasZumsteg/transpose.js",
        "src/dataset/javascript/triangle_exercism-javascript-ThomasZumsteg/triangle.js",
        "src/dataset/javascript/trinary_exercism-javascript-ThomasZumsteg/trinary.js",
        "src/dataset/javascript/twelve-days_exercism-javascript-ThomasZumsteg/twelve-days.js",
        "src/dataset/javascript/two-bucket_exercism-javascript-ThomasZumsteg/two-bucket.js",
        "src/dataset/javascript/two-fer_exercism-javascript-bearguns/two-fer.js",
        "src/dataset/javascript/two-fer_exercism-javascript-ThomasZumsteg/two-fer.js",
        "src/dataset/javascript/typoglycemiaGenerator/typoglycemiaGenerator.js",
        "src/dataset/javascript/typoglycemiaGenerator.test.js/typoglycemiaGenerator.test.js.js",
        "src/dataset/javascript/word-count_exercism-javascript-ThomasZumsteg/word-count.js",
        "src/dataset/javascript/wordy_exercism-javascript-ThomasZumsteg/wordy.js",
        "src/dataset/javascript/zipper_exercism-javascript-ThomasZumsteg/zipper.js",
    ]
    
    # Espandi i percorsi con wildcards
    file_paths = []
    for pattern in patterns:
        pattern = str(BASE_DIR )+"/"+pattern
        if '*' in pattern or '?' in pattern:
            # Usa glob per espandere i pattern
            from glob import glob
            file_paths.extend(glob(pattern))
        else:
            file_paths.append(pattern)
    
    # Rimuovi duplicati
    file_paths = list(set(file_paths))
    
    if not file_paths:
        print("Nessun file da convertire.")
        return
    
    print(f"File da convertire: {len(file_paths)}")
    for fp in file_paths:
        print(f"  - {fp}")
    print()
    
    # Dry run
    if args.dry_run:
        print("=== DRY RUN ===")
        for file_path in file_paths:
            if not os.path.exists(file_path):
                print(f"❌ File non trovato: {file_path}")
                continue
                
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                converted_content = converter.convert_file_content(content)
                
                if content != converted_content:
                    print(f"📝 {file_path} verrebbe modificato")
                    print("--- Anteprima modifiche ---")
                    
                    # Mostra prime 5 linee di differenza
                    original_lines = content.split('\n')
                    converted_lines = converted_content.split('\n')
                    
                    for i, (orig, conv) in enumerate(zip(original_lines, converted_lines)):
                        if orig != conv:
                            print(f"  Linea {i+1}:")
                            print(f"    - {orig}")
                            print(f"    + {conv}")
                            print()
                else:
                    print(f"✓ {file_path} non necessita modifiche")
                    
            except Exception as e:
                print(f"❌ Errore nell'analisi di {file_path}: {e}")
        
        return
    
    # Conversione effettiva
    results = converter.convert_files(file_paths, backup=not args.no_backup)
    
    # Mostra statistiche
    successful = sum(1 for success in results.values() if success)
    total = len(results)
    
    print(f"\n=== RISULTATI ===")
    print(f"File convertiti con successo: {successful}/{total}")
    
    if successful < total:
        print("\nFile con errori:")
        for file_path, success in results.items():
            if not success:
                print(f"  - {file_path}")


if __name__ == "__main__":
    main()