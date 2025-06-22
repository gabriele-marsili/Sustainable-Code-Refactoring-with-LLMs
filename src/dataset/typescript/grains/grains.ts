export default {
    square(field: number) {
        if (field < 1 || field > 64) {
            return -1
        }
        return 2 ** (field - 1)
    },
    total: () => (2 ** 64) - 1
}