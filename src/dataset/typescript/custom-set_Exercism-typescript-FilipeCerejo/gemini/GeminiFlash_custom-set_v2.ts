class NodeTree<T> {
    private _data: T;
    private _left: NodeTree<T> | undefined;
    private _right: NodeTree<T> | undefined;

    constructor(data: T) {
        this._data = data;
        this._left = undefined;
        this._right = undefined;
    }

    public get data(): T {
        return this._data;
    }

    public search(data: T): NodeTree<T> | undefined {
        let current = this;
        while (current) {
            if (data === current._data) {
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
    private _size: number;

    constructor(initial?: number[]) {
        this._head = undefined;
        this._size = 0;
        if (initial && initial.length > 0) {
            initial.forEach((n: number) => this.add(n));
        }
    }

    empty(): boolean {
        return this._size === 0;
    }

    contains(element: number): boolean {
        return this._head ? this._head.search(element) !== undefined : false;
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
        if (this._size === 0) return true;

        let current = this._head;
        const checkSubset = (node: NodeTree<number> | undefined): boolean => {
            if (!node) return true;

            if (!other.contains(node.data)) return false;

            return checkSubset(node._left) && checkSubset(node._right);
        };

        return checkSubset(current);
    }

    disjoint(other: CustomSet): boolean {
        if (this._size === 0 || other._size === 0) return true;

        let current = this._head;
        const checkDisjoint = (node: NodeTree<number> | undefined): boolean => {
            if (!node) return true;

            if (other.contains(node.data)) return false;

            return checkDisjoint(node._left) && checkDisjoint(node._right);
        };

        return checkDisjoint(current);
    }

    eql(other: CustomSet): boolean {
        if (this._size !== other._size) return false;
        if (this._size === 0 && other._size === 0) return true;

        let flatThis = this.flatenSet();
        let flatOther = other.flatenSet();

        for (let i = 0; i < flatThis.length; i++) {
            if (flatThis[i] !== flatOther[i]) return false;
        }

        return true;
    }

    union(other: CustomSet): CustomSet {
        let newCustomSet = new CustomSet();
        this.flatenSet().forEach((n: number) => newCustomSet.add(n));
        other.flatenSet().forEach((n: number) => newCustomSet.add(n));
        return newCustomSet;
    }

    intersection(other: CustomSet): CustomSet {
        let newCustomSet = new CustomSet();
        this.flatenSet().forEach((n: number) => {
            if (other.contains(n)) {
                newCustomSet.add(n);
            }
        });
        return newCustomSet;
    }

    difference(other: CustomSet): CustomSet {
        let newCustomSet = new CustomSet();
        this.flatenSet().forEach((n: number) => {
            if (!other.contains(n)) {
                newCustomSet.add(n);
            }
        });
        return newCustomSet;
    }

    private flatenSet(): number[] {
        return this._head ? this._head.array() : [];
    }
}