#include "pangram.h"

bool is_pangram(const char *sentence)
{
    if (sentence == NULL)
        return false;

    bool seen_letters[26];
    for (int i = 0; i < 26; ++i) {
        seen_letters[i] = false;
    }

    int count = 0;

    for (int i = 0; sentence[i] != '\0'; i++)
    {
        unsigned char current_char_unsigned = (unsigned char)sentence[i];
        int lower_char = tolower(current_char_unsigned);

        if (lower_char >= 'a' && lower_char <= 'z')
        {
            int index = lower_char - 'a';

            if (!seen_letters[index])
            {
                seen_letters[index] = true;
                count++;

                if (count == 26)
                {
                    return true;
                }
            }
        }
    }

    return count == 26;
}