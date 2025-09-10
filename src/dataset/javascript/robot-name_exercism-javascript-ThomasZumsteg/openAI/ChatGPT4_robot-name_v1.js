var Robot = function() {
    this.name = getName();
};

Robot.prototype.reset = function() {
    /* Give the robot a new name */
    namesInUse.delete(this.name);
    this.name = getName();
};

// Keeps track of robot names in use
const namesInUse = new Set();
const availableNames = generateAllNames();

function generateAllNames() {
    const names = [];
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
            for (let k = 0; k < 1000; k++) {
                const name = String.fromCharCode(65 + i, 65 + j) + String(k).padStart(3, '0');
                names.push(name);
            }
        }
    }
    return names;
}

function getName() {
    if (availableNames.length === 0) {
        throw new Error("No more unique names available");
    }
    const index = Math.floor(Math.random() * availableNames.length);
    const name = availableNames.splice(index, 1)[0];
    namesInUse.add(name);
    return name;
}

export default Robot;