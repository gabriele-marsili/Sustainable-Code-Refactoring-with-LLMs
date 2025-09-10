var DEFAULT_STUDENTS = [ 'Alice', 'Bob', 'Charlie', 'David', 'Eve',
		'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

var Garden = function(garden, students) {
	/* A Kindergarden plant garden */
	students = students ? [...students].sort() : [...DEFAULT_STUDENTS];
	const gardenRows = garden.split('\n');
	const plant_map = {'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets'};

	for(let i = 0; i < students.length; i++) {
		const student = students[i].toLowerCase();
		const plants = [];
		for (const row of gardenRows) {
			plants.push(plant_map[row[2 * i]]);
			plants.push(plant_map[row[2 * i + 1]]);
		}
		this[student] = plants;
	}
};

function MakeRow(row) {
	/* Converts a row of plant letters to an array of plants */
	const plant_map = {'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets'};
	return row.split('').map( plant => plant_map[plant] );
}

function StudentsGarden(garden, position) {
	/* The plants owned by an individual student */
	const plants = [];
	for (const row of garden) {
		plants.push(row[2 * position]);
		plants.push(row[2 * position + 1]);
	}
	return plants;
}

export default Garden;