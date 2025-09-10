class NodeTree<T> {
    private _data: T;
    private _left?: NodeTree<T>;
    private _right?: NodeTree<T>;

    constructor(data: T) {
        this._data = data;
    }

    get data(): T {
        return this._data;
    }

    get right(): NodeTree<T> | undefined {
        return this._right;
    }

    set right(node: NodeTree<T> | undefined) {
        this._right = node;
    }

    get left(): NodeTree<T> | undefined {
        return this._left;
    }

    set left(node: NodeTree<T> | undefined) {
        this._left = node;
    }

    search(data: T): NodeTree<T> | undefined {
        if (this._data === data) return this;
        if (data < this._data) return this._left?.search(data);
        return this._right?.search(data);
    }

    insert(data: T): void {
        if (data < this._data) {
            if (this._left) {
                this._left.insert(data);
            } else {
                this._left = new NodeTree<T>(data);
            }
        } else if (data > this._data) {
            if (this._right) {
                this._right.insert(data);
            } else {
                this._right = new NodeTree<T>(data);
            }
        }
    }

    inOrderTraversal(result: T[]): void {
        this._left?.inOrderTraversal(result);
        result.push(this._data);
        this._right?.inOrderTraversal(result);
    }
}

export class CustomSet {
    private _head?: NodeTree<number>;

    constructor(initial?: number[]) {
        if (initial?.length) {
            this._head = new NodeTree<number>(initial[0]);
            for (let i = 1; i < initial.length; i++) {
                this.add(initial[i]);
            }
        }
    }

    empty(): boolean {
        return !this._head;
    }

    contains(element: number): boolean {
        return !!this._head?.search(element);
    }

    add(element: number): CustomSet {
        if (this._head) {
            this._head.insert(element);
        } else {
            this._head = new NodeTree<number>(element);
        }
        return this;
    }

    subset(other: CustomSet): boolean {
        return this.flatenSet().every((data) => other.contains(data));
    }

    disjoint(other: CustomSet): boolean {
        return this.flatenSet().every((data) => !other.contains(data));
    }

    eql(other: CustomSet): boolean {
        const flatThis = this.flatenSet();
        const flatOther = other.flatenSet();
        return flatThis.length === flatOther.length && flatThis.every((n, idx) => n === flatOther[idx]);
    }

    union(other: CustomSet): CustomSet {
        const result = new CustomSet(this.flatenSet());
        other.flatenSet().forEach((n) => result.add(n));
        return result;
    }

    intersection(other: CustomSet): CustomSet {
        return new CustomSet(this.flatenSet().filter((n) => other.contains(n)));
    }

    difference(other: CustomSet): CustomSet {
        return new CustomSet(this.flatenSet().filter((n) => !other.contains(n)));
    }

    private flatenSet(): number[] {
        const result: number[] = [];
        this._head?.inOrderTraversal(result);
        return result;
    }
}