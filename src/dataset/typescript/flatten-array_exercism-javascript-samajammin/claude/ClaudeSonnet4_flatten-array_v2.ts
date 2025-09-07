export default class FlattenArray {
  static flatten(arr: any[]): number[] {
    const result: number[] = [];
    const stack: any[] = [...arr];
    
    while (stack.length > 0) {
      const item = stack.pop();
      if (Array.isArray(item)) {
        stack.push(...item);
      } else if (typeof item === 'number') {
        result.push(item);
      }
    }
    
    return result.reverse();
  }
}