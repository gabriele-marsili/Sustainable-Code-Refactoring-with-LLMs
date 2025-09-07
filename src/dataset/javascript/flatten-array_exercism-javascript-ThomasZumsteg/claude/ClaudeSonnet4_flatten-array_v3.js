class Flattener {
    flatten(array) {
        if (array == null) return [];
        if (!Array.isArray(array)) return [array];
        
        const result = [];
        const stack = [array];
        
        while (stack.length > 0) {
            const current = stack.pop();
            
            for (let i = current.length - 1; i >= 0; i--) {
                const item = current[i];
                if (Array.isArray(item)) {
                    stack.push(item);
                } else {
                    result.unshift(item);
                }
            }
        }
        
        return result;
    }
}

export default Flattener;