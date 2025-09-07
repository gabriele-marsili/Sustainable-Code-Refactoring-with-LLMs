class Flattener {
    flatten(array) {
        if (!Array.isArray(array)) return array == null ? [] : [array];
        const stack = [...array];
        const result = [];
        while (stack.length) {
            const next = stack.pop();
            if (Array.isArray(next)) {
                stack.push(...next);
            } else if (next != null) {
                result.push(next);
            }
        }
        return result.reverse();
    }
}

export default Flattener;