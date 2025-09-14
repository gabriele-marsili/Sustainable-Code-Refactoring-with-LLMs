export class BinarySearchTree {
    private _data: number;
    private _left: BinarySearchTree | undefined = undefined;
    private _right: BinarySearchTree | undefined = undefined;

    constructor(data: number) {
        this._data = data;
    }

    public get data(): number {
        return this._data;
    }

    public get right(): BinarySearchTree | undefined {
        return this._right;
    }

    public get left(): BinarySearchTree | undefined {
        return this._left;
    }

    public insert(item: number): void {
        let current: BinarySearchTree = this;
        
        while (true) {
            if (item <= current._data) {
                if (current._left) {
                    current = current._left;
                } else {
                    current._left = new BinarySearchTree(item);
                    break;
                }
            } else {
                if (current._right) {
                    current = current._right;
                } else {
                    current._right = new BinarySearchTree(item);
                    break;
                }
            }
        }
    }

    public each(callback: (data: number) => void): void {
        const stack: BinarySearchTree[] = [];
        let current: BinarySearchTree | undefined = this;
        
        while (current || stack.length > 0) {
            while (current) {
                stack.push(current);
                current = current._left;
            }
            
            current = stack.pop()!;
            callback(current._data);
            current = current._right;
        }
    }
}