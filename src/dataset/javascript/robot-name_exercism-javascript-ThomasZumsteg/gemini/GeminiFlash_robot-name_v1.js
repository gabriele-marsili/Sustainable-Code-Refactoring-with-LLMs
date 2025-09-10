var Robot = function() { this.name = getName() }

Robot.prototype.reset = function() {
	this.name = getName();
};

// Keeps track of robot names in use
const namesInUse = new Set();
const nameCache = new Set();

function getName() {
    let name = generateName();
    while (namesInUse.has(name)) {
        if (nameCache.size > 0) {
            for (const cachedName of nameCache) {
                if (!namesInUse.has(cachedName)) {
                    name = cachedName;
                    nameCache.delete(cachedName);
                    break;
                }
            }
        } else {
            name = generateName();
        }
    }

    namesInUse.add(name);
    return name;
}

function generateName() {
    let name = '';
    for (let i = 0; i < 2; i++) {
        name += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    for (let i = 0; i < 3; i++) {
        name += String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    return name;
}

export default Robot;