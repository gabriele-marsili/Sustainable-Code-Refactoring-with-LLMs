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
            return 'z' - (tolower(c) - 'a');
        }
        return c; // Handle non-alphanumeric characters gracefully
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
        string store = cipher(std::move(text));
        string result;
        result.reserve(store.length() + (store.length() / 5)); // Pre-allocate memory

        for (size_t i = 0; i < store.length(); ++i) {
            result += store[i];

            if ((i + 1) % 5 == 0 && (i + 1) != store.length()) {
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