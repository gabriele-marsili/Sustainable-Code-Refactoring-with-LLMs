#if !defined(GRADE_SCHOOL_H)
#define GRADE_SCHOOL_H
#include <string>
#include <vector>
#include <map>

namespace grade_school {
	class school {
		private:
			std::map<int, std::vector<std::string>>		_roster;
		public:
			school();

			const std::map<int, std::vector<std::string>>&	roster() const;
			const std::vector<std::string>					grade(int grade) const;
			void	add(const std::string& name, int grade);
	};
}  // namespace grade_school

#endif // GRADE_SCHOOL_H
