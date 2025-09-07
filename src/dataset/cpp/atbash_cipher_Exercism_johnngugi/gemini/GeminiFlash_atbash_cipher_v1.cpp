#include <string>
#include <algorithm>
#include <cctype>

#include "atbash_cipher.h"

using namespace std;

namespace atbash {

    char letters(char c) {
        if (isdigit(c)) {
            return c;
        } else if (isalpha(c)) {
            char lower_c = tolower(c);
            return 'z' - (lower_c - 'a');
        }
        return c; // Handle non-alphanumeric characters gracefully (e.g., return them unchanged)
    }

    string cipher(string text) {
        string result;
        result.reserve(text.length()); // Pre-allocate memory

        for (char c : text) {
            if (isalnum(c)) {
                result += letters(c);
            }
        }

        return result;
    }

    string encode(string text) {
        string encoded = cipher(std::move(text));
        string result;
        result.reserve(encoded.length() + encoded.length() / 5); // Pre-allocate memory

        for (size_t i = 0; i < encoded.length(); ++i) {
            result += encoded[i];
            if ((i + 1) % 5 == 0 && (i + 1) != encoded.length()) {
                result += ' ';
            }
        }
        return result;
    }

    string decode(string text) {
        string result;
        result.reserve(text.length());

        for (char c : text) {
            if (isalnum(c)) {
                result += letters(c);
            }
        }

        return result;
    }
}