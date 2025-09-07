export default {
    square(field: number) {
        if (field < 1 || field > 64) {
            return -1
        }
        return field === 1 ? 1 : 1 << (field - 1)
    },
    total: () => 0xFFFFFFFFFFFFFFFF
}