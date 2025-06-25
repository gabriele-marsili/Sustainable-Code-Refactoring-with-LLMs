// This code fails for the current test case "test many lines"
// but I guess this test case is "wrong".
// See https://github.com/exercism/typescript/issues/199

function trimTrailingUndefined(array: string[]) {
    const trailingUndefinedCount = [...array].reverse().findIndex((x) => x !== undefined)
    return array.slice(0, array.length - trailingUndefinedCount)
}

export default {
    transpose(input: string[]) {
        const maxCol = Math.max(0, ...(input.map((row) => row.length)))
        return [...Array(maxCol).keys()].map((col) =>
            trimTrailingUndefined(input.map((_v, row) => input[row][col]))
                .map((charOrUndefined) => charOrUndefined || ' ')
                .join('')
        )
    }
}
