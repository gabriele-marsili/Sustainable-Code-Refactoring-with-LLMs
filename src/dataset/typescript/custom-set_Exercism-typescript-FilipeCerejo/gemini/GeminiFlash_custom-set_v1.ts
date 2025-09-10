class NodeTree<T> {
    private _data: T;
    private _left: NodeTree<T> | undefined = undefined;
    private _right: NodeTree<T> | undefined = undefined;

    constructor(data: T) {
        this._data = data;
    }

    public get data(): T {
        return this._data;
    }

    public get right(): NodeTree<T> | undefined {
        return this._right;
    }

    public set right(data: NodeTree<T> | undefined) {
        this._right = data;
    }

    public get left(): NodeTree<T> | undefined {
        return this._left;
    }

    public set left(data: NodeTree<T> | undefined) {
        this._left = data;
    }

    public search(data: T): boolean {
        let current: NodeTree<T> | undefined = this;
        while (current) {
            if (current._data === data) {
                return true;
            }

            if (data < current._data) {
                current = current._left;
            } else {
                current = current._right;
            }
        }
        return false;
    }

    public insert(data: T): void {
        let current: NodeTree<T> = this;
        while (true) {
            if (data < current._data) {
                if (current._left) {
                    current = current._left;
                } else {
                    current._left = new NodeTree<T>(data);
                    break;
                }
            } else if (data > current._data) {
                if (current._right) {
                    current = current._right;
                } else {
                    current._right = new NodeTree<T>(data);
                    break;
                }
            } else {
                break; // Data already exists, no insertion needed
            }
        }
    }

    public array(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(result);
        return result;
    }

    private inOrderTraversal(result: T[]): void {
        if (this._left) {
            this._left.inOrderTraversal(result);
        }
        result.push(this._data);
        if (this._right) {
            this._right.inOrderTraversal(result);
        }
    }
}

export class CustomSet {
    private _head: NodeTree<number> | undefined = undefined;
    private _size: number = 0;

    constructor(initial?: number[]) {
        if (initial && initial.length > 0) {
            initial.forEach(n => this.add(n));
        }
    }

    empty(): boolean {
        return this._size === 0;
    }

    contains(element: number): boolean {
        return this._head ? this._head.search(element) : false;
    }

    add(element: number): CustomSet {
        if (!this.contains(element)) {
            if (this._head) {
                this._head.insert(element);
            } else {
                this._head = new NodeTree<number>(element);
            }
            this._size++;
        }
        return this;
    }

    subset(other: CustomSet): boolean {
        if (this._size > other._size) return false;
        if (this._head === undefined) return true;

        const flatThis = this._head.array();
        for (let i = 0; i < flatThis.length; i++) {
            if (!other.contains(flatThis[i])) {
                return false;
            }
        }
        return true;
    }

    disjoint(other: CustomSet): boolean {
        if (this._head === undefined) return true;

        const flatThis = this._head.array();
        for (let i = 0; i < flatThis.length; i++) {
            if (other.contains(flatThis[i])) {
                return false;
            }
        }
        return true;
    }

    eql(other: CustomSet): boolean {
        if (this._size !== other._size) return false;
        if (this._head === undefined && other._head === undefined) return true;
        if (this._head === undefined || other._head === undefined) return false;

        const flatThis = this._head.array();
        const flatOther = other._head.array();

        for (let i = 0; i < flatThis.length; i++) {
            if (flatThis[i] !== flatOther[i]) {
                return false;
            }
        }
        return true;
    }

    union(other: CustomSet): CustomSet {
        const newCustomSet = new CustomSet();
        if (this._head) {
            const flatThis = this._head.array();
            flatThis.forEach(n => newCustomSet.add(n));
        }
        if (other._head) {
            const flatOther = other._head.array();
            flatOther.forEach(n => newCustomSet.add(n));
        }
        return newCustomSet;
    }

    intersection(other: CustomSet): CustomSet {
        const newCustomSet = new CustomSet();
        if (this._head) {
            const flatThis = this._head.array();
            flatThis.forEach(n => {
                if (other.contains(n)) {
                    newCustomSet.add(n);
                }
            });
        }
        return newCustomSet;
    }

    difference(other: CustomSet): CustomSet {
        const newCustomSet = new CustomSet();
        if (this._head) {
            const flatThis = this._head.array();
            flatThis.forEach(n => {
                if (!other.contains(n)) {
                    newCustomSet.add(n);
                }
            });
        }
        return newCustomSet;
    }

    private flatenSet(): number[] {
        return this._head ? this._head.array() : [];
    }
}