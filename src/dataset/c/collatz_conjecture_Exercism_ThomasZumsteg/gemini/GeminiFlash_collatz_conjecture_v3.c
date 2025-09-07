#define ERROR_VALUE -1

int steps(int start) {
    if (start <= 0) {
        return ERROR_VALUE;
    }

    int step = 0;
    while (start != 1) {
        if ((start & 1) == 0) {
            start >>= 1;
        } else {
            if (start > (INT_MAX - 1) / 3) {
                return ERROR_VALUE;
            }
            start = start * 3 + 1;
            if (start < 0) {
                return ERROR_VALUE;
            }
        }
        step++;
    }
    return step;
}