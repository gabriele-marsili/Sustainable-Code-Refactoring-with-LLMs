#include "all_your_base.h"

size_t rebase(int8_t digits[DIGITS_ARRAY_SIZE], int16_t input_base,
              int16_t output_base, size_t input_length) {
    double result = 0;
    uint32_t power = 0;
    size_t output_length = 0;

    if (input_length == 0 || input_base <= 1 || output_base <= 1)
        return (output_length);
    for (size_t idx = 0; idx < input_length; idx++) {
        int8_t current_digit = digits[input_length - 1 - idx];
        if (current_digit < 0 || current_digit >= input_base)
            return (output_length);
        result += current_digit * pow(input_base, power++);
    }
    while (result >= 1) {
        digits[output_length++] = (int16_t)result % output_base;
        result = result / output_base;
    }
    if (result == 0) {
        output_length++;
        return (output_length);
    }
    for (size_t idx = 0; idx < output_length / 2; idx++) {
        int8_t aux = digits[idx];
        digits[idx] = digits[output_length - 1 - idx];
        digits[output_length - 1 - idx] = aux;
    }
    return (output_length);
}
