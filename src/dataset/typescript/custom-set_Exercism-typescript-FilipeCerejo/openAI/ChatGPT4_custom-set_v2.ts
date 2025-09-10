class NodeTree<T> {
    private _data: T;
    private _left: NodeTree<T> | undefined = undefined;
    private _right: NodeTree<T> | undefined = undefined;

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

    constructor(data: T) {
        this._data = data;
    }

    public search(data: T): NodeTree<T> | undefined {
        let current: NodeTree<T> | undefined = this;
        while (current) {
            if (current._data === data) return current;
            current = data < current._data ? current._left : current._right;
        }
        return undefined;
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
                break; // Avoid duplicates
            }
        }
    }

    public array(result: T[]): void {
        if (this._left) this._left.array(result);
        result.push(this._data);
        if (this._right) this._right.array(result);
    }
}

export class CustomSet {
    private _head: NodeTree<number> | undefined = undefined;

    constructor(initial?: number[]) {
        if (initial && initial.length > 0) {
            this._head = new NodeTree<number>(initial[0]);
            for (let i = 1; i < initial.length; i++) {
                this.add(initial[i]);
            }
        }
    }

    empty(): boolean {
        return this._head === undefined;
    }

    contains(element: number): boolean {
        return this._head?.search(element) !== undefined;
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
        return this.flatenSet().every((data: number) => other.contains(data));
    }

    disjoint(other: CustomSet): boolean {
        return this.flatenSet().every((data: number) => !other.contains(data));
    }

    eql(other: CustomSet): boolean {
        const flatThis = this.flatenSet();
        const flatOther = other.flatenSet();

        if (flatThis.length !== flatOther.length) return false;

        for (let i = 0; i < flatThis.length; i++) {
            if (flatThis[i] !== flatOther[i]) return false;
        }
        return true;
    }

    union(other: CustomSet): CustomSet {
        const result = new CustomSet(this.flatenSet());
        for (const n of other.flatenSet()) {
            result.add(n);
        }
        return result;
    }

    intersection(other: CustomSet): CustomSet {
        return new CustomSet(this.flatenSet().filter((n: number) => other.contains(n)));
    }

    difference(other: CustomSet): CustomSet {
        return new CustomSet(this.flatenSet().filter((n: number) => !other.contains(n)));
    }

    private flatenSet(): number[] {
        const result: number[] = [];
        this._head?.array(result);
        return result;
    }
}