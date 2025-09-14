const DEFAULT_STUDENTS = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 
		'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

const PLANT_MAP = {'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets'};

var Garden = function(garden, students) {
	/* A Kindergarden plant garden */
	students = students ? students.slice().sort() : DEFAULT_STUDENTS;
	const rows = garden.split('\n');
	const gardenRows = [
		MakeRow(rows[0]),
		MakeRow(rows[1])
	];

	for(let i = 0; i < students.length; i++) {
		this[students[i].toLowerCase()] = StudentsGarden(gardenRows, i);
	}
};

function MakeRow(row) {
	/* Converts a row of plant letters to an array of plants */
	const result = new Array(row.length);
	for(let i = 0; i < row.length; i++) {
		result[i] = PLANT_MAP[row[i]];
	}
	return result;
}

function StudentsGarden(garden, position) {
	/* The plants owned by an individual student */
	const startPos = 2 * position;
	return [
		garden[0][startPos],
		garden[0][startPos + 1],
		garden[1][startPos],
		garden[1][startPos + 1]
	];
}

export default Garden;