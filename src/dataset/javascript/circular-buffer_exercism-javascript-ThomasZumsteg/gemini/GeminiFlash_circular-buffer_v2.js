var circularBuffer = function (size) {
    /* A circular buffer */
    var buffer = new Array(size);
    var head = 0;
    var tail = 0;
    var count = 0;

    return {
        read: function () {
            /* Reads data from the buffer */
            if (count === 0) {
                throw new bufferEmptyException();
            }
            var value = buffer[head];
            buffer[head] = undefined; // Release reference for GC
            head = (head + 1) % size;
            count--;
            return value;
        },

        write: function (data) {
            /* Writes data to the buffer */
            if (count === size) {
                throw new bufferFullException();
            }
            if (data !== undefined && data !== null) { // Avoid writing undefined/null
                buffer[tail] = data;
                tail = (tail + 1) % size;
                count++;
            }
        },

        /* Clears the buffer */
        clear: function () {
            // Clear the buffer by setting all elements to undefined and resetting pointers
            for (let i = 0; i < size; i++) {
                buffer[i] = undefined;
            }
            head = 0;
            tail = 0;
            count = 0;
        },

        forceWrite: function (data) {
            /* Writes data to the buffer even if it will overwrite data */
            buffer[tail] = data;
            tail = (tail + 1) % size;
            if (count === size) {
                head = (head + 1) % size; // Advance head if buffer is full
            } else {
                count++;
            }
        },
    };
};

var bufferEmptyException = function () {
    /* Buffer is empty */
    this.name = "Buffer Empty";
    this.message = "Buffer is empty there is no data to read.";
    this.toString = function () { return this.name + ": " + this.message; };
};
bufferEmptyException.prototype = new Error(); // Inherit from Error for better stack traces

var bufferFullException = function () {
    /* Buffer is full */
    this.name = "Buffer Full";
    this.message = "Buffer is full there is no space to write.";
    this.toString = function () { return this.name + ": " + this.message; };
};
bufferFullException.prototype = new Error(); // Inherit from Error for better stack traces


export default {
    circularBuffer: circularBuffer,
    bufferEmptyException: bufferEmptyException,
    bufferFullException: bufferFullException,
};