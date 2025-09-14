var circularBuffer = function (size) {
	/* A circular buffer */
	var buffer = new Array(size);
	var head = 0;
	var tail = 0;
	var count = 0;
	
	return {
		read: function() {
			/* Reads data from the buffer */
			if(count <= 0)
				throw new bufferEmptyException();
			var data = buffer[head];
			buffer[head] = undefined; // Help GC
			head = (head + 1) % size;
			count--;
			return data;
		},
		
		write: function(data) {
			/* Writes data to the buffer */
			if(count >= size)
				throw new bufferFullException();
			if(data) {
				buffer[tail] = data;
				tail = (tail + 1) % size;
				count++;
			}
		},
		
		/* Clears the buffer */
		clear: function() { 
			for(var i = 0; i < size; i++) {
				buffer[i] = undefined;
			}
			head = 0;
			tail = 0;
			count = 0;
		},
		
		forceWrite: function(data) {
			/* Writes data to the buffer even if it will overwrite data */
			if(count >= size) {
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
	/* Buffer is empty */
	return { 
    	name: "Buffer Empty", 
    	message: "Buffer is empty there is no data to read.", 
    	toString: function(){return this.name + ": " + this.message;}
    }; 
};

var bufferFullException = function() {
	/* Buffer is full */
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