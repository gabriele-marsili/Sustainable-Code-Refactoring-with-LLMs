const circularBuffer = function (size) {
	let start = 0, end = 0, count = 0;
	const buffer = new Array(size);

	return {
		read: function () {
			if (count === 0) throw new bufferEmptyException();
			const data = buffer[start];
			start = (start + 1) % size;
			count--;
			return data;
		},

		write: function (data) {
			if (count >= size) throw new bufferFullException();
			if (data !== undefined && data !== null) {
				buffer[end] = data;
				end = (end + 1) % size;
				count++;
			}
		},

		clear: function () {
			start = 0;
			end = 0;
			count = 0;
		},

		forceWrite: function (data) {
			if (data !== undefined && data !== null) {
				if (count >= size) {
					start = (start + 1) % size;
					count--;
				}
				buffer[end] = data;
				end = (end + 1) % size;
				count++;
			}
		},
	};
};

const bufferEmptyException = function () {
	return {
		name: "Buffer Empty",
		message: "Buffer is empty there is no data to read.",
		toString: function () {
			return this.name + ": " + this.message;
		},
	};
};

const bufferFullException = function () {
	return {
		name: "Buffer Full",
		message: "Buffer is full there is no space to write.",
		toString: function () {
			return this.name + ": " + this.message;
		},
	};
};

export default {
	circularBuffer,
	bufferEmptyException,
	bufferFullException,
};