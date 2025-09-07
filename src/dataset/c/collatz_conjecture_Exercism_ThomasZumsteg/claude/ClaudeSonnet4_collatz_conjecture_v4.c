#define ERROR_VALUE -1

int steps(int start) {
    if (start <= 0)
        return ERROR_VALUE;
    
    int step = 0;
    while (start != 1) {
        if (start & 1) {
            start = start * 3 + 1;
        } else {
            start >>= 1;
        }
        step++;
    }
    return step;
}