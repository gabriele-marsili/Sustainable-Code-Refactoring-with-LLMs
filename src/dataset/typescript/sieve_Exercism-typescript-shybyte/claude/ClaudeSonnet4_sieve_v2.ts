function primes(max: number) {
    if (max < 2) return []
    
    const isComposite = new Array(max + 1).fill(false)
    const primes = []
    
    for (let i = 2; i * i <= max; i++) {
        if (!isComposite[i]) {
            for (let j = i * i; j <= max; j += i) {
                isComposite[j] = true
            }
        }
    }
    
    for (let i = 2; i <= max; i++) {
        if (!isComposite[i]) {
            primes.push(i)
        }
    }
    
    return primes
}

export default {primes}