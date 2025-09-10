var circularBuffer = function (size) {
	let buffer = new Array(size);
	let head = 0;
	let tail = 0;
	let count = 0;

	return {
		read: function() {
			if (count === 0) {
				throw new bufferEmptyException();
			}
			const value = buffer[head];
			buffer[head] = undefined; // Help garbage collection
			head = (head + 1) % size;
			count--;
			return value;
		},

		write: function(data) {
			if (count === size) {
				throw new bufferFullException();
			}
			if (data !== undefined && data !== null) {
				buffer[tail] = data;
				tail = (tail + 1) % size;
				count++;
			}
		},

		clear: function() {
			for (let i = 0; i < size; i++) {
				buffer[i] = undefined; // Help garbage collection
			}
			head = 0;
			tail = 0;
			count = 0;
		},

		forceWrite: function(data) {
			buffer[tail] = data;
			if (count === size) {
				head = (head + 1) % size;
			} else {
				count++;
			}
			tail = (tail + 1) % size;
		},
	};
};

var bufferEmptyException = function() {
	this.name = "Buffer Empty";
	this.message = "Buffer is empty there is no data to read.";
	this.toString = function(){return this.name + ": " + this.message;};
};

var bufferFullException = function() {
	this.name = "Buffer Full";
	this.message = "Buffer is full there is no space to write.";
	this.toString = function(){return this.name + ": " + this.message;};
};

export default {
	circularBuffer: circularBuffer,
	bufferEmptyException: bufferEmptyException,
	bufferFullException: bufferFullException,
};