const MAX_FIELD = 64;
const MAX_TOTAL = BigInt(2 ** MAX_FIELD - 1);

export default {
    square(field: number) {
        return field >= 1 && field <= MAX_FIELD ? 1n << BigInt(field - 1) : -1;
    },
    total: () => MAX_TOTAL
};