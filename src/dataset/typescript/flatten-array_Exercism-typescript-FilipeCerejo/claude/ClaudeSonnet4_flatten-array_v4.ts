export function flatten(arr: any[]): number[] {
    const result: number[] = [];
    const stack: any[] = [...arr];
    
    while (stack.length > 0) {
        const current = stack.pop();
        
        if (typeof current === 'number') {
            result.push(current);
        } else if (Array.isArray(current)) {
            stack.push(...current);
        }
    }
    
    return result.reverse();
}

function recFlatten(n: any[], flattened: number[]): void {
    for (let i = 0; i < n.length; i++) {
        if (typeof n[i] === 'number') {
            flattened.push(n[i]);
        } else if(n[i]) {
            recFlatten(n[i], flattened);
        }
    }
}