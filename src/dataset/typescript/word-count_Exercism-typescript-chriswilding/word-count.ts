class Words {
    count(input: string): Map<string, number> {
        return input
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .reduce((map, s) => {
                const count = map.get(s) || 0
                map.set(s, count + 1)
                return map
            }, new Map())
    }
}

export default Words
