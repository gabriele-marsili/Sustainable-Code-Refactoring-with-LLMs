export default class FlattenArray {
  static flatten(arr: any[]): number[] {
    const result: number[] = [];

    for (const item of arr) {
      if (Array.isArray(item)) {
        result.push(...this.flatten(item));
      } else if (typeof item === 'number') {
        result.push(item);
      }
    }

    return result;
  }
}