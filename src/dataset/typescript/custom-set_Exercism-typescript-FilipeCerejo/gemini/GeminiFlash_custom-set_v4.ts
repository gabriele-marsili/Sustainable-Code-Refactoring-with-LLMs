class NodeTree<T> {
    private _data: T;
    private _left: NodeTree<T> | undefined;
    private _right: NodeTree<T> | undefined;

    constructor(data: T) {
        this._data = data;
        this._left = undefined;
        this._right = undefined;
    }

    get data(): T {
        return this._data;
    }

    get right(): NodeTree<T> | undefined {
        return this._right;
    }

    set right(data: NodeTree<T> | undefined) {
        this._right = data;
    }

    get left(): NodeTree<T> | undefined {
        return this._left;
    }

    set left(data: NodeTree<T> | undefined) {
        this._left = data;
    }

    public search(data: T): NodeTree<T> | undefined {
        let current = this;
        while (current) {
            if (current._data === data) {
                return current;
            }

            if (data < current._data) {
                current = current._left;
            } else {
                current = current._right;
            }
        }
        return undefined;
    }

    public insert(data: T): void {
        let current = this;
        while (true) {
            if (data < current._data) {
                if (current._left) {
                    current = current._left;
                } else {
                    current._left = new NodeTree<T>(data);
                    return;
                }
            } else if (data > current._data) {
                if (current._right) {
                    current = current._right;
                } else {
                    current._right = new NodeTree<T>(data);
                    return;
                }
            } else {
                return;
            }
        }
    }

    public array(): T[] {
        const result: T[] = [];
        const traverse = (node: NodeTree<T> | undefined) => {
            if (node) {
                traverse(node._left);
                result.push(node._data);
                traverse(node._right);
            }
        };
        traverse(this);
        return result;
    }
}

export class CustomSet {
    private _head: NodeTree<number> | undefined;

    constructor(initial?: number[]) {
        this._head = undefined;
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
        return this._head ? this._head.search(element) !== undefined : false;
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
        if (!this._head) return true;
        let flatThis = this.flatenSet();
        for (let i = 0; i < flatThis.length; i++) {
            if (!other.contains(flatThis[i])) {
                return false;
            }
        }
        return true;
    }

    disjoint(other: CustomSet): boolean {
        if (!this._head) return true;
        let flatThis = this.flatenSet();
        for (let i = 0; i < flatThis.length; i++) {
            if (other.contains(flatThis[i])) {
                return false;
            }
        }
        return true;
    }

    eql(other: CustomSet): boolean {
        if (!this._head && !other._head) return true;
        if (!this._head || !other._head) return false;

        let flatThis = this.flatenSet();
        let flatOther = other.flatenSet();

        if (flatThis.length !== flatOther.length) return false;

        for (let i = 0; i < flatThis.length; i++) {
            if (flatThis[i] !== flatOther[i]) return false;
        }

        return true;
    }

    union(other: CustomSet): CustomSet {
        let newCustomSet = new CustomSet(this.flatenSet());
        if (other._head) {
            let flatOther = other.flatenSet();
            for (let i = 0; i < flatOther.length; i++) {
                newCustomSet.add(flatOther[i]);
            }
        }
        return newCustomSet;
    }

    intersection(other: CustomSet): CustomSet {
        let flatThis = this.flatenSet();
        const intersectionArray: number[] = [];
        for (let i = 0; i < flatThis.length; i++) {
            if (other.contains(flatThis[i])) {
                intersectionArray.push(flatThis[i]);
            }
        }
        return new CustomSet(intersectionArray);
    }

    difference(other: CustomSet): CustomSet {
        let flatThis = this.flatenSet();
        const differenceArray: number[] = [];
        for (let i = 0; i < flatThis.length; i++) {
            if (!other.contains(flatThis[i])) {
                differenceArray.push(flatThis[i]);
            }
        }
        return new CustomSet(differenceArray);
    }

    private flatenSet(): number[] {
        return this._head ? this._head.array() : [];
    }
}