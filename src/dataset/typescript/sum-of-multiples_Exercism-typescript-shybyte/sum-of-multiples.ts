export default (factors: number[]) => {
    return {
        to: (n: number) => {
            let sum = 0
            for (let i = 3; i < n; i++) {
                if (factors.some((factor) => i % factor === 0)) {
                    sum += i
                }
            }
            return sum
        }
    }
}
