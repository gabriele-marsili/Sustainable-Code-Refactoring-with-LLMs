#include <algorithm>
#include <string>
#include "atbash_cipher.h"

namespace atbash {

    char letters(char c) {
        if (c >= '0' && c <= '9') {
            return c;
        } else if (c >= 'a' && c <= 'z') {
            return 'z' - (c - 'a');
        } else if (c >= 'A' && c <= 'Z') {
            return 'z' - (c - 'A');
        }
        return c;
    }

    std::string cipher(std::string text) {
        std::string result;
        result.reserve(text.length());

        for (char c : text) {
            if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
                result += letters(c);
            }
        }

        return result;
    }

    std::string encode(std::string text) {
        std::string store = cipher(std::move(text));
        std::string result;
        result.reserve(store.length() + store.length() / 5);

        for (size_t i = 0; i < store.length(); ++i) {
            result += store[i];

            if ((i + 1) % 5 == 0 && (i + 1) != store.length()) {
                result += ' ';
            }
        }

        return result;
    }

    std::string decode(std::string text) {
        return cipher(std::move(text));
    }
}