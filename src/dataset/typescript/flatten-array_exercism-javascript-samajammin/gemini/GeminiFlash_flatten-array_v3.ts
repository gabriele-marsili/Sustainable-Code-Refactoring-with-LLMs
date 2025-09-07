export default class FlattenArray {
  static flatten(arr: any[]): number[] {
    const result: number[] = [];

    function flattenRecursive(subArr: any[]): void {
      for (let i = 0; i < subArr.length; i++) {
        const item = subArr[i];
        if (Array.isArray(item)) {
          flattenRecursive(item);
        } else if (typeof item === 'number') {
          result.push(item);
        }
      }
    }

    flattenRecursive(arr);
    return result;
  }
}