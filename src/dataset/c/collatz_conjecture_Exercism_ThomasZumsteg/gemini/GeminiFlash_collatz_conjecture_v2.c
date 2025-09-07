#define ERROR_VALUE -1

int steps(int start) {
    if (start <= 0) {
        return ERROR_VALUE;
    }

    int step = 0;
    while (start != 1) {
        if ((start & 1) == 0) { // Check if even using bitwise AND
            start >>= 1;         // Divide by 2 using right bit shift
        } else {
            if (start > (INT_MAX - 1) / 3) return ERROR_VALUE; // Check for potential overflow before multiplication
            start = start * 3 + 1;
            if (start < 0) return ERROR_VALUE; // Check for overflow after multiplication
        }
        step++;
    }
    return step;
}