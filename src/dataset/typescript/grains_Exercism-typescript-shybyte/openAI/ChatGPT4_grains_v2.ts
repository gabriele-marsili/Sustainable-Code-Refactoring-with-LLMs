const precomputedSquares = Array.from({ length: 64 }, (_, i) => 2 ** i);
const totalGrains = (2n ** 64n) - 1n;

export default {
    square(field: number) {
        return field >= 1 && field <= 64 ? precomputedSquares[field - 1] : -1;
    },
    total: () => totalGrains
};