class Flattener {
    flatten(array) {
        if (array == null) {
            return [];
        }

        if (!Array.isArray(array)) {
            return [array];
        }

        const result = [];
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (Array.isArray(element)) {
                const flattened = this.flatten(element);
                for (let j = 0; j < flattened.length; j++) {
                    result.push(flattened[j]);
                }
            } else {
                result.push(element);
            }
        }
        return result;
    }
}

export default Flattener;