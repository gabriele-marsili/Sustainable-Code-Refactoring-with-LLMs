const DEFAULT_STUDENTS = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 
		'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

const PLANT_MAP = Object.freeze({'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets'});

const Garden = function(garden, students) {
	const sortedStudents = students ? [...students].sort() : DEFAULT_STUDENTS;
	const gardenRows = garden.split('\n');
	const processedRows = gardenRows.map(MakeRow);

	for(let i = 0; i < sortedStudents.length; i++) {
		this[sortedStudents[i].toLowerCase()] = StudentsGarden(processedRows, i);
	}
};

function MakeRow(row) {
	const plants = new Array(row.length);
	for(let i = 0; i < row.length; i++) {
		plants[i] = PLANT_MAP[row[i]];
	}
	return plants;
}

function StudentsGarden(garden, position) {
	const startPos = position << 1;
	const endPos = startPos + 2;
	const result = [];
	
	for(let i = 0; i < garden.length; i++) {
		const row = garden[i];
		result.push(row[startPos], row[startPos + 1]);
	}
	
	return result;
}

export default Garden;