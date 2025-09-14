const DEFAULT_STUDENTS = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 
		'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

const PLANT_MAP = {'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets'};

var Garden = function(garden, students) {
	/* A Kindergarden plant garden */
	students = students ? students.slice().sort() : DEFAULT_STUDENTS;
	const rows = garden.split('\n');
	const gardenRows = [
		rows[0].split('').map(plant => PLANT_MAP[plant]),
		rows[1].split('').map(plant => PLANT_MAP[plant])
	];

	for(let i = 0; i < students.length; i++) {
		const startPos = i * 2;
		this[students[i].toLowerCase()] = [
			gardenRows[0][startPos],
			gardenRows[0][startPos + 1],
			gardenRows[1][startPos],
			gardenRows[1][startPos + 1]
		];
	}
};

export default Garden;