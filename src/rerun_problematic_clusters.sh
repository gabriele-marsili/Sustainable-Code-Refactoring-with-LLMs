#!/bin/bash

# Script per ri-eseguire solo i cluster con entries C/C++ problematiche
# usando il flag --overwrite-results per forzare la sovrascrittura

echo "================================================================================"
echo "RE-ESECUZIONE CLUSTER CON ENTRIES C/C++ PROBLEMATICHE"
echo "================================================================================"
echo ""
echo "Questo script ri-eseguirà 53 cluster con entries C/C++ problematiche"
echo "usando il flag --overwrite-results per applicare il fix del parser."
echo ""
echo "Tempo stimato: 1-2 ore (dipende dalla complessità dei test)"
echo ""
echo "-------------------------------------------------------------------------------"

cd run_tests_on_clusters

# Leggi la lista dei cluster problematici
CLUSTERS=(
    "crypto_square"
    "difference_of_squares"
    "dnd_character"
    "eliuds_eggs"
    "etl"
    "food_chain"
    "gigasecond"
    "grade_school"
    "hamming"
    "hello_world"
    "hexadecimal"
    "high_scores"
    "isogram"
    "kindergarten_garden"
    "largest_series_product"
    "linked_list"
    "list_ops"
    "luhn"
    "matching_brackets"
    "minesweeper"
    "nth_prime"
    "nucleotide_count"
    "palindrome_products"
    "pascals_triangle"
    "perfect_numbers"
    "phone_number"
    "prime_factors"
    "protein_translation"
    "queen_attack"
    "react"
    "resistor_color"
    "reverse_string"
    "rna_transcription"
    "robot_simulator"
    "roman_numerals"
    "rotational_cipher"
    "run_length_encoding"
    "saddle_points"
    "say"
    "scrabble_score"
    "secret_handshake"
    "series"
    "sieve"
    "space_age"
    "square_root"
    "strain"
    "sublist"
    "sum_of_multiples"
    "triangle"
    "trinary"
    "two_fer"
    "wordy"
    "zipper"
)

TOTAL=${#CLUSTERS[@]}
CURRENT=0

echo "Totale cluster da processare: $TOTAL"
echo "================================================================================"
echo ""

# Log file
LOG_FILE="../logs/rerun_problematic_$(date +%Y%m%d_%H%M%S).log"
echo "Log salvato in: $LOG_FILE"
echo ""

for cluster in "${CLUSTERS[@]}"; do
    CURRENT=$((CURRENT + 1))

    echo "-------------------------------------------------------------------------------"
    echo "[$CURRENT/$TOTAL] Processing cluster: $cluster"
    echo "-------------------------------------------------------------------------------"

    # Esegui il cluster con --overwrite-results e --base-only
    # --base-only: esegue solo il codice base (non LLM-generated)
    # --overwrite-results: forza la sovrascrittura anche se esistono risultati
    python run_tests_on_cluster.py \
        --cluster-name "$cluster" \
        --run-quantity 5 \
        --base-only \
        --overwrite-results \
        2>&1 | tee -a "$LOG_FILE"

    EXIT_CODE=${PIPESTATUS[0]}

    if [ $EXIT_CODE -eq 0 ]; then
        echo "✓ Cluster $cluster completato con successo"
    else
        echo "⚠ Cluster $cluster completato con errori (exit code: $EXIT_CODE)"
    fi

    echo ""
done

echo "================================================================================"
echo "RE-ESECUZIONE COMPLETATA"
echo "================================================================================"
echo ""
echo "Cluster processati: $TOTAL"
echo "Log completo: $LOG_FILE"
echo ""
echo "Prossimi passi:"
echo "  1. Verifica che i tipi siano corretti negli output JSON"
echo "  2. Ri-esegui l'analisi: cd ../auto_fixer && python analyze_base_code.py"
echo "  3. Confronta i risultati con l'analisi precedente"
echo ""
echo "================================================================================"
