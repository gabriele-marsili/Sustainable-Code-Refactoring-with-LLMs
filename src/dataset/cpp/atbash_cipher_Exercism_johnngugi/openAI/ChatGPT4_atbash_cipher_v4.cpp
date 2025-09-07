#include <string>
#include <cctype>
#include <sstream>
#include "atbash_cipher.h"

using namespace std;

namespace atbash {

    inline char letters(char c) {
        if (isdigit(c)) {
            return c;
        } else if (c >= 'a' && c <= 'z') {
            return 'z' - (c - 'a');
        } else if (c >= 'A' && c <= 'Z') {
            return 'z' - (c - 'A');
        }
        return c;
    }

    string cipher(const string& text) {
        string result;
        result.reserve(text.size());

        for (char c : text) {
            if (isalnum(c))
                result += letters(c);
        }

        return result;
    }

    string encode(const string& text) {
        string store = cipher(text);
        string result;
        result.reserve(store.size() + store.size() / 5);

        for (size_t i = 0; i < store.size(); ++i) {
            result += store[i];
            if ((i + 1) % 5 == 0 && (i + 1) != store.size())
                result += ' ';
        }

        return result;
    }

    string decode(const string& text) {
        return cipher(text);
    }
}