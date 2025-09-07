export default class FlattenArray {
  static flatten(arr: any[]): number[] {
    const result: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (Array.isArray(item)) {
        result.push(...this.flatten(item));
      } else if (typeof item === 'number') {
        result.push(item);
      }
    }

    return result;
  }
}