#include "pangram.h"

bool is_pangram(const char *sentence) {
    if (sentence == NULL) return false;

    bool alphabet_seen[ALPHABET_SIZE] = { false };
    int unique_letters = 0;

    for (const char *ptr = sentence; *ptr != '\0'; ++ptr) {
        char chr = *ptr;
        if (chr >= 'a' && chr <= 'z') {
            chr -= 'a';
        } else if (chr >= 'A' && chr <= 'Z') {
            chr -= 'A';
        } else {
            continue;
        }

        if (!alphabet_seen[(int)chr]) {
            alphabet_seen[(int)chr] = true;
            unique_letters++;
            if (unique_letters == ALPHABET_SIZE) {
                return true;
            }
        }
    }

    return false;
}