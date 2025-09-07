class Flattener {
    flatten(array) {
        if (array == null) return [];
        if (!Array.isArray(array)) return [array];
        
        const result = [];
        const stack = [array];
        
        while (stack.length > 0) {
            const current = stack.pop();
            
            for (let i = current.length - 1; i >= 0; i--) {
                const elem = current[i];
                if (Array.isArray(elem)) {
                    stack.push(elem);
                } else {
                    result.unshift(elem);
                }
            }
        }
        
        return result;
    }
}

export default Flattener;