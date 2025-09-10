const DEFAULT_STUDENTS = [ 'Alice', 'Bob', 'Charlie', 'David', 'Eve',
		'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

const plantMap = {'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets'};

const Garden = function(garden, students) {
	/* A Kindergarden plant garden */
	const studentList = students ? [...students].sort() : [...DEFAULT_STUDENTS];
	const gardenRows = garden.split('\n');
	const gardenPlan = gardenRows.map(row => row.split('').map(plant => plantMap[plant]));

	for(let i = 0; i < studentList.length; i++) {
		const student = studentList[i].toLowerCase();
		this[student] = getStudentPlants(gardenPlan, i);
	}
};

function getStudentPlants(garden, position) {
	/* The plants owned by an individual student */
	const plants = [];
	for (const row of garden) {
		plants.push(row[2 * position], row[2 * position + 1]);
	}
	return plants;
}

export default Garden;