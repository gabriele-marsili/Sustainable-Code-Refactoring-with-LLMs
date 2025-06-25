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

    public search(data: T, current: NodeTree<T> | undefined): NodeTree<T> | undefined {
        if (!current || current._data == data) {
            return current;
        }

        if (data < current!._data) {
            return this.search(data, current!._left);
        } else {
            return this.search(data, current!._right);
        }
    }

    public insert(data: T, current: NodeTree<T>) {
        if (data < current!._data) {
            if (current!._left) {
                this.insert(data, current!._left);
            } else {
                current._left = new NodeTree<T>(data);
            }
        } else if (data > current!._data) {
            if (current!._right) {
                this.insert(data, current!._right);
            } else {
                current._right = new NodeTree<T>(data);
            }
        }
    }

    public array(current: NodeTree<T>, result: T[]): void {
        if (current._left) {
            this.array(current._left, result);
        }

        result.push(current._data);

        if (current._right) {
            this.array(current._right, result);
        }
    }
}

export class CustomSet {
    private _head: NodeTree<number> | undefined = undefined;

    constructor(initial?: number[]) {
        if (initial && initial[0]) {
            this._head = new NodeTree<number>(initial[0]);
            initial.slice(1).forEach((n: number) => this.add(n));
        }
    }

    empty(): boolean {
        return this._head === undefined;
    }

    contains(element: number): boolean {
        if (this._head) {
            return this._head.search(element, this._head) !== undefined;
        }
        return false;
    }

    add(element: number): CustomSet {
        if (this._head) {
            this._head.insert(element, this._head);
        } else {
            this._head = new NodeTree<number>(element);
        }
        return this;
    }

    subset(other: CustomSet): boolean {
        let flatThis = this.flatenSet();
        return flatThis.every((data: number) => other.contains(data));
    }

    disjoint(other: CustomSet): boolean {
        let flatThis = this.flatenSet();
        return flatThis.every((data: number) => !other.contains(data));
    }

    eql(other: CustomSet): boolean {
        let flatThis = this.flatenSet();
        let flatOther = other.flatenSet();

        if (flatThis.length !== flatOther.length) return false;

        return flatThis.every((n: number, idx: number) => flatOther[idx] === n);
    }

    union(other: CustomSet): CustomSet {
        let flatThis = this.flatenSet();
        let flatOther = other.flatenSet();

        let newCustomSet = new CustomSet(flatThis);
        flatOther.forEach((n: number) => newCustomSet.add(n));
        return newCustomSet;
    }

    intersection(other: CustomSet): CustomSet {
        let flatThis = this.flatenSet();
        return new CustomSet(flatThis.filter((n: number) => other.contains(n)));
    }

    difference(other: CustomSet): CustomSet {
        let flatThis = this.flatenSet();
        return new CustomSet(flatThis.filter((n: number) => !other.contains(n)));
    }

    private flatenSet(): number[] {
        let result: number[] = [];
        this._head?.array(this._head!, result);
        return result;
    }
}