export default class FlattenArray {
  static flatten(arr: any[]): number[] {
    const result: number[] = [];

    function flattenHelper(arr: any[]): void {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (Array.isArray(item)) {
          flattenHelper(item);
        } else if (typeof item === 'number') {
          result.push(item);
        }
      }
    }

    flattenHelper(arr);
    return result;
  }
}