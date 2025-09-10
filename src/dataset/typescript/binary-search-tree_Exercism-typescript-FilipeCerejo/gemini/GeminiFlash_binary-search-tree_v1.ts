export class BinarySearchTree {
    private _data: number;
    private _left: BinarySearchTree | undefined;
    private _right: BinarySearchTree | undefined;

    constructor(data: number) {
        this._data = data;
        this._left = undefined;
        this._right = undefined;
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
        this.eachNode(callback, this);
    }

    private eachNode(callback: (data: number) => void, current: BinarySearchTree | undefined): void {
        if (current) {
            if (current._left) {
                this.eachNode(callback, current._left);
            }

            callback(current._data);

            if (current._right) {
                this.eachNode(callback, current._right);
            }
        }
    }
}