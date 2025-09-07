import pandas as pd

class School:
    def __init__(self):
        self.students = pd.DataFrame(columns=['Name', 'Grade'])
        self._grade_cache = {}
        self._roster_cache = None
        self._cache_valid = True

    def add_student(self, name, grade):
        new_row = pd.DataFrame({'Name': [name], 'Grade': [grade]})
        self.students = pd.concat([self.students, new_row], ignore_index=True)
        self._invalidate_cache()
   
    def roster(self):
        if self.students.empty:
            return []
        
        if self._cache_valid and self._roster_cache is not None:
            return self._roster_cache
        
        result = []
        for grade_num in range(1, 8):
            result.extend(self.grade(grade_num))
        
        self._roster_cache = result
        return result

    def grade(self, grade_number): 
        if self.students.empty:
            return []
        
        if self._cache_valid and grade_number in self._grade_cache:
            return self._grade_cache[grade_number]
        
        grade_students = self.students[self.students['Grade'] == grade_number]['Name'].tolist()
        grade_students.sort()
        
        self._grade_cache[grade_number] = grade_students
        return grade_students
    
    def _invalidate_cache(self):
        self._grade_cache.clear()
        self._roster_cache = None
        self._cache_valid = True