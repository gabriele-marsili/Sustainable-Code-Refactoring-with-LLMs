var circularBuffer = function (size) {
	var buffer = new Array(size);
	var head = 0;
	var tail = 0;
	var count = 0;
	
	return {
		read: function() {
			if (count === 0)
				throw new bufferEmptyException();
			var data = buffer[head];
			buffer[head] = undefined;
			head = (head + 1) % size;
			count--;
			return data;
		},
		
		write: function(data) {
			if (count >= size)
				throw new bufferFullException();
			if (data !== undefined && data !== null) {
				buffer[tail] = data;
				tail = (tail + 1) % size;
				count++;
			}
		},
		
		clear: function() { 
			head = 0;
			tail = 0;
			count = 0;
			buffer.fill(undefined);
		},
		
		forceWrite: function(data) {
			if (count >= size) {
				head = (head + 1) % size;
				count--;
			}
			buffer[tail] = data;
			tail = (tail + 1) % size;
			count++;
		},
	};
};

var bufferEmptyException = function() {
	return { 
    	name: "Buffer Empty", 
    	message: "Buffer is empty there is no data to read.", 
    	toString: function(){return this.name + ": " + this.message;}
    }; 
};

var bufferFullException = function() {
	return { 
    	name: "Buffer Full", 
    	message: "Buffer is full there is no space to write.", 
    	toString: function(){return this.name + ": " + this.message;} 
    };
};

export default {
	circularBuffer: circularBuffer,
	bufferEmptyException: bufferEmptyException,
	bufferFullException: bufferFullException,
};