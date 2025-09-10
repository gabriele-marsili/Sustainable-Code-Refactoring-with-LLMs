const circularBuffer = function (size) {
	/* A circular buffer */
	let head = 0, tail = 0, count = 0;
	const buffer = new Array(size);

	return {
		read: function () {
			/* Reads data from the buffer */
			if (count === 0) throw new bufferEmptyException();
			const data = buffer[head];
			head = (head + 1) % size;
			count--;
			return data;
		},

		write: function (data) {
			/* Writes data to the buffer */
			if (count >= size) throw new bufferFullException();
			if (data !== undefined && data !== null) {
				buffer[tail] = data;
				tail = (tail + 1) % size;
				count++;
			}
		},

		/* Clears the buffer */
		clear: function () {
			head = 0;
			tail = 0;
			count = 0;
		},

		forceWrite: function (data) {
			/* Writes data to the buffer even if it will overwrite data */
			if (data !== undefined && data !== null) {
				if (count >= size) {
					head = (head + 1) % size;
					count--;
				}
				buffer[tail] = data;
				tail = (tail + 1) % size;
				count++;
			}
		},
	};
};

const bufferEmptyException = function () {
	/* Buffer is empty */
	return {
		name: "Buffer Empty",
		message: "Buffer is empty there is no data to read.",
		toString: function () {
			return this.name + ": " + this.message;
		},
	};
};

const bufferFullException = function () {
	/* Buffer is full */
	return {
		name: "Buffer Full",
		message: "Buffer is full there is no space to write.",
		toString: function () {
			return this.name + ": " + this.message;
		},
	};
};

export default {
	circularBuffer: circularBuffer,
	bufferEmptyException: bufferEmptyException,
	bufferFullException: bufferFullException,
};