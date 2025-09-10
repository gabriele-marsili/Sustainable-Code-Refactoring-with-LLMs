var DEFAULT_STUDENTS = ['Alice', 'Bob', 'Charlie', 'David', 'Eve',
    'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

var Garden = function (garden, students) {
    students = students ? [...students].sort() : [...DEFAULT_STUDENTS];
    const gardenRows = garden.split('\n');
    const plantMap = { 'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets' };

    for (let i = 0; i < students.length; i++) {
        const student = students[i].toLowerCase();
        const plants = [];
        for (let j = 0; j < gardenRows.length; j++) {
            const row = gardenRows[j];
            plants.push(plantMap[row[2 * i]]);
            plants.push(plantMap[row[2 * i + 1]]);
        }
        this[student] = plants;
    }
};

export default Garden;