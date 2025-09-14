function markMultiple(array: boolean[], n: number, max: number) {
    for (let i = n * n; i <= max; i += n) {
        array[i] = true
    }
}

function primes(max: number) {
    if (max < 2) return []
    
    const array = new Array(max + 1).fill(false)
    const primes = []
    
    for (let i = 2; i <= max; i++) {
        if (!array[i]) {
            primes.push(i)
            if (i <= Math.sqrt(max)) {
                markMultiple(array, i, max)
            }
        }
    }
    return primes
}

export default {primes}