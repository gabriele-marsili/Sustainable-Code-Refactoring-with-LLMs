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
        this.insertNode(this, item);
    }

    private insertNode(current: BinarySearchTree | undefined, item: number): void {
        if (item <= current!._data) {
            if (current!._left) {
                this.insertNode(current!._left, item);
            } else {
                current!._left = new BinarySearchTree(item);
            }
        } else {
            if (current!._right) {
                this.insertNode(current!._right, item);
            } else {
                current!._right = new BinarySearchTree(item);
            }
        }
    }

    public each(callback: (data: number) => void): void {
        this.eachNode(callback, this);
    }

    private eachNode(callback: (data: number) => void, curret: BinarySearchTree | undefined): void {
        if (curret!._left) {
            this.eachNode(callback, curret!._left);
        }

        callback(curret!._data);

      if (curret!._right) {
            this.eachNode(callback, curret!._right);
        }
    }
}
