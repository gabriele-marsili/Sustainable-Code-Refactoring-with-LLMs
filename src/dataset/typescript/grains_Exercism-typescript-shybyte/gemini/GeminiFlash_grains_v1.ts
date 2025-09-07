export default {
    square(field: number) {
        if (field < 1 || field > 64) {
            return -1;
        }
        return 1 << (field - 1);
    },
    total: () => {
        const maxSquares = 18446744073709551615n;
        return Number(maxSquares);
    }
}