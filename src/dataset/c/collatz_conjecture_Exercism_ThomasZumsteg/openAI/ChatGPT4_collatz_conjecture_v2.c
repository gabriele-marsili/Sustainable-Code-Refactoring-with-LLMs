#define ERROR_VALUE -1

int steps(int start) {
    if (start <= 0)
        return ERROR_VALUE;

    int step = 0;
    while (start != 1) {
        if (start & 1) { // Odd number
            start = start * 3 + 1;
        } else { // Even number
            start >>= 1; // Equivalent to start / 2
        }
        step++;
    }
    return step;
}