const DEFAULT_STUDENTS = [ 'Alice', 'Bob', 'Charlie', 'David', 'Eve',
		'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

const plantMap = {'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets'};

function makeRow(row) {
	const plants = [];
    for (let i = 0; i < row.length; i++) {
        plants.push(plantMap[row[i]]);
    }
    return plants;
}

function studentsGarden(garden, position) {
	const plants = [];
    for (const row of garden) {
        plants.push(row[2 * position], row[2 * position + 1]);
    }
    return plants;
}

var Garden = function(garden, students) {
	const studentList = students ? [...students].sort() : [...DEFAULT_STUDENTS];
	const gardenRows = garden.split('\n');
    const gardenPlan = [];
    for(const row of gardenRows) {
        gardenPlan.push(makeRow(row));
    }

	for(let i = 0; i < studentList.length; i++) {
		this[studentList[i].toLowerCase()] = studentsGarden(gardenPlan, i);
	}
};

export default Garden;