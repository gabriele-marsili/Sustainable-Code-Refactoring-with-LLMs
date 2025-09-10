class NodeTree<T> {
    public data: T;
    public left: NodeTree<T> | undefined = undefined;
    public right: NodeTree<T> | undefined = undefined;

    constructor(data: T) {
        this.data = data;
    }

    public search(data: T, current: NodeTree<T> | undefined): NodeTree<T> | undefined {
        while (current) {
            if (current.data === data) return current;
            current = data < current.data ? current.left : current.right;
        }
        return undefined;
    }

    public insert(data: T, current: NodeTree<T>) {
        while (true) {
            if (data < current.data) {
                if (current.left) {
                    current = current.left;
                } else {
                    current.left = new NodeTree<T>(data);
                    break;
                }
            } else if (data > current.data) {
                if (current.right) {
                    current = current.right;
                } else {
                    current.right = new NodeTree<T>(data);
                    break;
                }
            } else {
                break; // duplicate value
            }
        }
    }

    public array(current: NodeTree<T>, result: T[]): void {
        const stack: NodeTree<T>[] = [];
        let node: NodeTree<T> | undefined = current;

        while (stack.length > 0 || node) {
            while (node) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop()!;
            result.push(node.data);
            node = node.right;
        }
    }
}

export class CustomSet {
    private _head: NodeTree<number> | undefined = undefined;
    private _size: number = 0;

    constructor(initial?: number[]) {
        if (initial?.length) {
            this._head = new NodeTree<number>(initial[0]);
            this._size = 1;
            for (let i = 1; i < initial.length; i++) {
                this.add(initial[i]);
            }
        }
    }

    empty(): boolean {
        return this._size === 0;
    }

    contains(element: number): boolean {
        return this._head ? this._head.search(element, this._head) !== undefined : false;
    }

    add(element: number): CustomSet {
        if (this._head) {
            const oldSize = this._size;
            this._head.insert(element, this._head);
            if (oldSize === this._size) this._size++; // only increment if new element
        } else {
            this._head = new NodeTree<number>(element);
            this._size = 1;
        }
        return this;
    }

    subset(other: CustomSet): boolean {
        if (this._size > other._size) return false;
        const flatThis = this.flatenSet();
        return flatThis.every((data: number) => other.contains(data));
    }

    disjoint(other: CustomSet): boolean {
        if (this._size === 0 || other._size === 0) return true;
        const flatThis = this.flatenSet();
        return flatThis.every((data: number) => !other.contains(data));
    }

    eql(other: CustomSet): boolean {
        if (this._size !== other._size) return false;
        if (this._size === 0) return true;
        
        const flatThis = this.flatenSet();
        const flatOther = other.flatenSet();
        
        for (let i = 0; i < flatThis.length; i++) {
            if (flatThis[i] !== flatOther[i]) return false;
        }
        return true;
    }

    union(other: CustomSet): CustomSet {
        const newCustomSet = new CustomSet();
        
        if (this._head) {
            const flatThis = this.flatenSet();
            newCustomSet._head = new NodeTree<number>(flatThis[0]);
            newCustomSet._size = 1;
            for (let i = 1; i < flatThis.length; i++) {
                newCustomSet.add(flatThis[i]);
            }
        }
        
        if (other._head) {
            const flatOther = other.flatenSet();
            for (const n of flatOther) {
                newCustomSet.add(n);
            }
        }
        
        return newCustomSet;
    }

    intersection(other: CustomSet): CustomSet {
        if (this._size === 0 || other._size === 0) return new CustomSet();
        const flatThis = this.flatenSet();
        return new CustomSet(flatThis.filter((n: number) => other.contains(n)));
    }

    difference(other: CustomSet): CustomSet {
        if (this._size === 0) return new CustomSet();
        if (other._size === 0) return new CustomSet(this.flatenSet());
        const flatThis = this.flatenSet();
        return new CustomSet(flatThis.filter((n: number) => !other.contains(n)));
    }

    private flatenSet(): number[] {
        if (!this._head) return [];
        const result: number[] = [];
        this._head.array(this._head, result);
        return result;
    }
}