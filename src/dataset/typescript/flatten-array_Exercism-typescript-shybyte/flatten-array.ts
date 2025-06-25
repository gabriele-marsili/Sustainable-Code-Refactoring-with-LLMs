// Advanced typing, yeah!
// See https://github.com/Microsoft/TypeScript/issues/6230
interface NestedArray<T> extends Array<NestedArrayElement<T>> {}
type NestedArrayElement<T> = NestedArray<T> | T

export default class FlattenArray {
    static flatten<T>(inputArray: NestedArray<T>) {
        const result: T[] = []

        function pushFlat(input: NestedArray<T>) {
            if (Array.isArray(input)) {
                input.forEach(pushFlat)
            } else if (input !== undefined && input !== null) {
                result.push(input)
            }
        }

        pushFlat(inputArray)
        return result
    }
}
