export class Queue<T> {
	_store: T[] = [];
	push(val: T) {
	  this._store.push(val);
	}
	pop(): T | undefined {
	  return this._store.shift();
	}
      
	size(): number {
	  return this._store.length;
	}
      
	isEmpty(): boolean {
	  return this._store.length === 0;
	}
      
	clearAll(): void {
	  this._store = [];
	}
}