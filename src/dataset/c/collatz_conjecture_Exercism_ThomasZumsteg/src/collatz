#define ERROR_VALUE -1

int steps(int start) {
    if (start <= 0)
        return ERROR_VALUE;
    int step = 0;
    while (start != 1) {
        start = (start & 1) ? start * 3 + 1 : start >> 1;
        step++;
    }
    return step;
}