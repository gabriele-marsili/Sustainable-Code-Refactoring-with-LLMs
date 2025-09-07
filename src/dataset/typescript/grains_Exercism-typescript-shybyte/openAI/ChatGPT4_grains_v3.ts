export default {
    square(field: number) {
        return field >= 1 && field <= 64 ? 1n << BigInt(field - 1) : -1;
    },
    total: () => (1n << 64n) - 1n
}