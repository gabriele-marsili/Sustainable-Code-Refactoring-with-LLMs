class NodeTree<T> {
    private _data: T;
    private _left: NodeTree<T> | undefined;
    private _right: NodeTree<T> | undefined;

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
        while (current && current._data !== data) {
            current = data < current._data ? current._left : current._right;
        }
        return current;
    }

    public insert(data: T, current: NodeTree<T>) {
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
                break;
            }
        }
    }

    public array(current: NodeTree<T>, result: T[]): void {
        const stack: NodeTree<T>[] = [];
        let node: NodeTree<T> | undefined = current;

        while (stack.length > 0 || node) {
            while (node) {
                stack.push(node);
                node = node._left;
            }
            node = stack.pop()!;
            result.push(node._data);
            node = node._right;
        }
    }
}

export class CustomSet {
    private _head: NodeTree<number> | undefined;
    private _size = 0;

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
            const found = this._head.search(element, this._head);
            if (!found) {
                this._head.insert(element, this._head);
                this._size++;
            }
        } else {
            this._head = new NodeTree<number>(element);
            this._size = 1;
        }
        return this;
    }

    subset(other: CustomSet): boolean {
        if (this._size === 0) return true;
        if (this._size > other._size) return false;
        
        const result: number[] = [];
        this._head?.array(this._head, result);
        return result.every(data => other.contains(data));
    }

    disjoint(other: CustomSet): boolean {
        if (this._size === 0 || other._size === 0) return true;
        
        const result: number[] = [];
        this._head?.array(this._head, result);
        return result.every(data => !other.contains(data));
    }

    eql(other: CustomSet): boolean {
        if (this._size !== other._size) return false;
        if (this._size === 0) return true;

        const thisResult: number[] = [];
        const otherResult: number[] = [];
        this._head?.array(this._head, thisResult);
        other._head?.array(other._head, otherResult);

        for (let i = 0; i < thisResult.length; i++) {
            if (thisResult[i] !== otherResult[i]) return false;
        }
        return true;
    }

    union(other: CustomSet): CustomSet {
        const thisResult: number[] = [];
        const otherResult: number[] = [];
        this._head?.array(this._head, thisResult);
        other._head?.array(other._head, otherResult);

        const newCustomSet = new CustomSet(thisResult);
        for (const n of otherResult) {
            newCustomSet.add(n);
        }
        return newCustomSet;
    }

    intersection(other: CustomSet): CustomSet {
        if (this._size === 0 || other._size === 0) return new CustomSet();
        
        const result: number[] = [];
        this._head?.array(this._head, result);
        return new CustomSet(result.filter(n => other.contains(n)));
    }

    difference(other: CustomSet): CustomSet {
        if (this._size === 0) return new CustomSet();
        if (other._size === 0) return new CustomSet(this.flatenSet());
        
        const result: number[] = [];
        this._head?.array(this._head, result);
        return new CustomSet(result.filter(n => !other.contains(n)));
    }

    private flatenSet(): number[] {
        const result: number[] = [];
        this._head?.array(this._head, result);
        return result;
    }
}