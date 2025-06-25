export default (lettersByScore: { [score: string]: string[] }) => {
    const result: { [letter: string]: number } = {}
    Object.entries(lettersByScore).forEach(([score, letters]) => {
        for (const letter of letters) {
            result[letter.toLowerCase()] = Number(score)
        }
    })
    return result
}
