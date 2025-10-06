import Garden from './garden'; 

const DEFAULT_STUDENTS = [ 'Alice', 'Bob', 'Charlie', 'David', 'Eve',
		'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

describe('Garden', () => {

  // A small, simple garden diagram for basic tests
  const diagram1 = 'VRCG\nRVGC';
  // A larger, more complex garden diagram
  const diagram2 = 'VVGGCC\nVVRGCC\nGRVVGG\nCCVRGR';

  // ---

  describe('Default Students and Small Garden', () => {

    let gardenInstance;
    beforeEach(() => {
      gardenInstance = new Garden(diagram1);
    });

    test('should use default students when none are provided', () => {
      // The default students are sorted alphabetically *inside* the constructor
      const expectedStudents = DEFAULT_STUDENTS.map(s => s.toLowerCase());
      expectedStudents.forEach(student => {
        expect(gardenInstance).toHaveProperty(student);
      });
    });

    test('should assign the correct plants to Alice (default, 1st student)', () => {
      // Alice is the first in the sorted default list: 'Alice'
      // Row 1: VRCG -> [violets, radishes]
      // Row 2: RVGC -> [radishes, violets]
      expect(gardenInstance.alice).toEqual(['violets', 'radishes', 'radishes', 'violets']);
    });

    test('should assign the correct plants to Bob (default, 2nd student)', () => {
      // Bob is the second in the sorted default list: 'Bob'
      // Row 1: VRCG -> [clover, grass] (positions 2-3)
      // Row 2: RVGC -> [grass, clover] (positions 2-3)
      expect(gardenInstance.bob).toEqual(['clover', 'grass', 'grass', 'clover']);
    });

    test('should assign the correct plants to the last default student (Larry)', () => {
      // Larry is the last in the sorted default list: 'Larry'. He should get the 6th pair (positions 10-11)
      // The small diagram only has 4 plant pairs per row. This tests array slicing limits.
      // Expected result depends on how `slice` handles out-of-bounds indices.
      // row.slice(10, 12) on 'VRCG' (length 4) returns []
      expect(gardenInstance.larry).toEqual([]);
    });

  });

  // ---

  describe('Custom Students and Larger Garden', () => {

    const customStudents = ['Peter', 'Penny', 'Paul'];
    let gardenInstance;

    beforeEach(() => {
      gardenInstance = new Garden(diagram2, customStudents);
    });

    test('should use custom students and sort them alphabetically', () => {
      // Sorted custom students: 'Paul', 'Penny', 'Peter'
      expect(gardenInstance).toHaveProperty('paul');
      expect(gardenInstance).toHaveProperty('penny');
      expect(gardenInstance).toHaveProperty('peter');
      expect(gardenInstance).not.toHaveProperty('alice');
    });

    test('should assign the correct plants to the first custom student (Paul)', () => {
      // Paul (1st): gets the 1st pair (positions 0-1)
      // Row 1: VVGGCC -> [violets, violets]
      // Row 2: VVRGCC -> [violets, violets]
      // Row 3: GRVVGG -> [grass, radishes]
      // Row 4: CCVRGR -> [clover, clover]
      expect(gardenInstance.paul).toEqual([
        'violets', 'violets', 'violets', 'violets', 'grass', 'radishes', 'clover', 'clover'
      ]);
    });

    test('should assign the correct plants to the middle custom student (Penny)', () => {
      // Penny (2nd): gets the 2nd pair (positions 2-3)
      // Row 1: VVGGCC -> [grass, grass]
      // Row 2: VVRGCC -> [radishes, grass]
      // Row 3: GRVVGG -> [violets, violets]
      // Row 4: CCVRGR -> [violets, radishes]
      expect(gardenInstance.penny).toEqual([
        'grass', 'grass', 'radishes', 'grass', 'violets', 'violets', 'violets', 'radishes'
      ]);
    });

    test('should assign the correct plants to the last custom student (Peter)', () => {
      // Peter (3rd): gets the 3rd pair (positions 4-5)
      // Row 1: VVGGCC -> [clover, clover]
      // Row 2: VVRGCC -> [clover, clover]
      // Row 3: GRVVGG -> [grass, grass]
      // Row 4: CCVRGR -> [grass, radishes]
      expect(gardenInstance.peter).toEqual([
        'clover', 'clover', 'clover', 'clover', 'grass', 'grass', 'grass', 'radishes'
      ]);
    });
  });

  // ---

  describe('Edge Cases', () => {

    test('should handle an empty diagram (no rows)', () => {
      const gardenInstance = new Garden('', ['Zoe']);
      expect(gardenInstance.zoe).toEqual([]);
    });

    test('should handle a garden with only one row', () => {
      const gardenInstance = new Garden('VRCG', ['Zoe']);
      expect(gardenInstance.zoe).toEqual(['violets', 'radishes']);
    });

    test('should handle a student whose name is a JavaScript keyword (if sorted)', () => {
      // Test case where a student name might conflict with a property name.
      // 'Const' sorts before 'Var'. The properties are lowercase.
      const gardenInstance = new Garden(diagram1, ['Var', 'Const']);
      expect(gardenInstance.const).toEqual(['violets', 'radishes', 'radishes', 'violets']);
      expect(gardenInstance.var).toEqual(['clover', 'grass', 'grass', 'clover']);
    });
  });
});