const DEFAULT_STUDENTS = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 
		'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

const PLANT_MAP = Object.freeze({
	'C': 'clover', 
	'G': 'grass', 
	'R': 'radishes', 
	'V': 'violets'
});

var Garden = function(garden, students) {
	const sortedStudents = students ? students.slice().sort() : DEFAULT_STUDENTS;
	const rows = garden.split('\n');
	const gardenRows = new Array(rows.length);
	
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		const plants = new Array(row.length);
		for (let j = 0; j < row.length; j++) {
			plants[j] = PLANT_MAP[row[j]];
		}
		gardenRows[i] = plants;
	}

	for (let i = 0; i < sortedStudents.length; i++) {
		const studentName = sortedStudents[i].toLowerCase();
		const startPos = i * 2;
		const endPos = startPos + 2;
		const studentPlants = [];
		
		for (let j = 0; j < gardenRows.length; j++) {
			const row = gardenRows[j];
			for (let k = startPos; k < endPos && k < row.length; k++) {
				studentPlants.push(row[k]);
			}
		}
		
		this[studentName] = studentPlants;
	}
};

function MakeRow(row) {
	const plants = new Array(row.length);
	for (let i = 0; i < row.length; i++) {
		plants[i] = PLANT_MAP[row[i]];
	}
	return plants;
}

function StudentsGarden(garden, position) {
	const startPos = position * 2;
	const endPos = startPos + 2;
	const plants = [];
	
	for (let i = 0; i < garden.length; i++) {
		const row = garden[i];
		for (let j = startPos; j < endPos && j < row.length; j++) {
			plants.push(row[j]);
		}
	}
	
	return plants;
}

export default Garden;