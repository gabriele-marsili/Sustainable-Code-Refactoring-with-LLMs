const isPalindrome = (n: number): boolean => {
    const str = n.toString()
    const len = str.length
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i]) return false
    }
    return true
}

const getNumericKeys = <T>(object: { [product: number]: T }): number[] =>
    Object.keys(object).map(Number)

export default function generate({minFactor = 1, maxFactor = Number.MAX_VALUE}) {
    const factorsByProduct: { [product: number]: Array<[number, number]> } = {}
    let smallestProduct = Infinity
    let largestProduct = -Infinity

    for (let factor1 = minFactor; factor1 <= maxFactor; factor1++) {
        for (let factor2 = factor1; factor2 <= maxFactor; factor2++) {
            const product = factor1 * factor2
            if (isPalindrome(product)) {
                if (!factorsByProduct[product]) {
                    factorsByProduct[product] = []
                }
                factorsByProduct[product].push([factor1, factor2])
                
                if (product < smallestProduct) smallestProduct = product
                if (product > largestProduct) largestProduct = product
            }
        }
    }

    const getOutputFactors = (factors: Array<[number, number]>) =>
        factors.length === 1 ? factors[0] : factors

    return {
        smallest: {
            value: smallestProduct,
            factors: getOutputFactors(factorsByProduct[smallestProduct])
        },
        largest: {
            value: largestProduct,
            factors: getOutputFactors(factorsByProduct[largestProduct])
        }
    }
}