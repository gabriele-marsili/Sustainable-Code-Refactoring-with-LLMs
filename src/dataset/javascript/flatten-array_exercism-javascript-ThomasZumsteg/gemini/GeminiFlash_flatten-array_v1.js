class Flattener {
    flatten(array) {
        if (array == null) {
            return [];
        }

        if (!Array.isArray(array)) {
            return [array];
        }

        const result = [];
        this.flattenHelper(array, result);
        return result;
    }

    flattenHelper(array, result) {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (Array.isArray(element)) {
                this.flattenHelper(element, result);
            } else {
                result.push(element);
            }
        }
    }
}

export default Flattener;