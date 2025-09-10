var Robot = function() { this.name = getName() }

Robot.prototype.reset = function() {
	this.name = getName();
};

var namesInUse = new Set();
var nameCache = [];

function getName() {
    if (nameCache.length === 0) {
        generateNameCache();
    }
    return nameCache.pop();
}

function generateNameCache() {
    const maxNames = 676000;
    const newNames = [];
    while (newNames.length < maxNames) {
        const name = generateUniqueName();
        if (name) {
            newNames.push(name);
        }
    }
    nameCache = newNames;
}

function generateUniqueName() {
    let name;
    let attempts = 0;
    const maxAttempts = 1000;

    while (attempts < maxAttempts) {
        name = String.fromCharCode(rand('Z'.charCodeAt(0), 'A'.charCodeAt(0)), rand('Z'.charCodeAt(0), 'A'.charCodeAt(0)), rand('9'.charCodeAt(0), '0'.charCodeAt(0)), rand('9'.charCodeAt(0), '0'.charCodeAt(0)), rand('9'.charCodeAt(0), '0'.charCodeAt(0)));

        if (!namesInUse.has(name)) {
            namesInUse.add(name);
            return name;
        }
        attempts++;
    }
    return null;
}

function rand(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Robot;