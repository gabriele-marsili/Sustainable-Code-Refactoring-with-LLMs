#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

vector<string> anagram::anagram::matches(vector<string> v)
{
    vector<string> result;
    result.reserve(v.size()); // Pre-allocate memory
    
    // Pre-compute word value once
    int word_value = 0;
    const string& word_ref = anagram::anagram::word;
    for (char c : word_ref) {
        word_value += static_cast<int>(c);
    }
    
    // Use range-based loop and const reference to avoid copies
    for (const string& candidate : v) {
        // Early length check - anagrams must have same length
        if (candidate.length() != word_ref.length()) {
            continue;
        }
        
        int current_value = 0;
        for (char c : candidate) {
            current_value += static_cast<int>(c);
        }
        
        if (current_value == word_value) {
            result.push_back(candidate);
        }
    }
    
    return result;
}