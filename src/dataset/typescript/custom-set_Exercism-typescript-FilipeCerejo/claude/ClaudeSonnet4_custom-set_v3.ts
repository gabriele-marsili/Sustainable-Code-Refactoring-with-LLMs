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
        while (current) {
            if (current._data === data) {
                return current;
            }
            current = data < current._data ? current._left : current._right;
        }
        return undefined;
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
    private _head: NodeTree<number> | undefined = undefined;
    private _size: number = 0;

    constructor(initial?: number[]) {
        if (initial && initial.length > 0) {
            this._head = new NodeTree<number>(initial[0]);
            this._size = 1;
            for (let i = 1; i < initial.length; i++) {
                this.add(initial[i]);
            }
        }
    }

    empty(): boolean {
        return this._head === undefined;
    }

    contains(element: number): boolean {
        return this._head ? this._head.search(element, this._head) !== undefined : false;
    }

    add(element: number): CustomSet {
        if (this._head) {
            const existing = this._head.search(element, this._head);
            if (!existing) {
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
        if (this._size > other._size) return false;
        if (this.empty()) return true;
        
        const result: number[] = [];
        this._head!.array(this._head!, result);
        return result.every((data: number) => other.contains(data));
    }

    disjoint(other: CustomSet): boolean {
        if (this.empty() || other.empty()) return true;
        
        const result: number[] = [];
        this._head!.array(this._head!, result);
        return result.every((data: number) => !other.contains(data));
    }

    eql(other: CustomSet): boolean {
        if (this._size !== other._size) return false;
        if (this.empty() && other.empty()) return true;
        
        const thisArray: number[] = [];
        const otherArray: number[] = [];
        
        this._head!.array(this._head!, thisArray);
        other._head!.array(other._head!, otherArray);
        
        for (let i = 0; i < thisArray.length; i++) {
            if (thisArray[i] !== otherArray[i]) return false;
        }
        return true;
    }

    union(other: CustomSet): CustomSet {
        if (this.empty()) return new CustomSet(other.flatenSet());
        if (other.empty()) return new CustomSet(this.flatenSet());
        
        const thisArray = this.flatenSet();
        const newSet = new CustomSet(thisArray);
        
        const otherArray = other.flatenSet();
        for (const n of otherArray) {
            newSet.add(n);
        }
        return newSet;
    }

    intersection(other: CustomSet): CustomSet {
        if (this.empty() || other.empty()) return new CustomSet();
        
        const thisArray = this.flatenSet();
        const intersection: number[] = [];
        
        for (const n of thisArray) {
            if (other.contains(n)) {
                intersection.push(n);
            }
        }
        return new CustomSet(intersection);
    }

    difference(other: CustomSet): CustomSet {
        if (this.empty()) return new CustomSet();
        if (other.empty()) return new CustomSet(this.flatenSet());
        
        const thisArray = this.flatenSet();
        const difference: number[] = [];
        
        for (const n of thisArray) {
            if (!other.contains(n)) {
                difference.push(n);
            }
        }
        return new CustomSet(difference);
    }

    private flatenSet(): number[] {
        if (!this._head) return [];
        const result: number[] = [];
        this._head.array(this._head, result);
        return result;
    }
}