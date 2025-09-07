export default {
    square(field: number) {
        if (field < 1 || field > 64) {
            return -1;
        }
        return 1 << (field - 1);
    },
    total: () => {
        const result = BigInt(2) ** BigInt(64) - BigInt(1);
        return Number(result);
    }
}