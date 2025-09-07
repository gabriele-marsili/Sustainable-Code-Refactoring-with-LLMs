class Flattener {
    flatten(array) {
        if (!Array.isArray(array)) return array == null ? [] : [array];
        const result = [];
        const stack = [...array];
        while (stack.length) {
            const elem = stack.pop();
            if (Array.isArray(elem)) {
                stack.push(...elem);
            } else if (elem != null) {
                result.push(elem);
            }
        }
        return result.reverse();
    }
}

export default Flattener;