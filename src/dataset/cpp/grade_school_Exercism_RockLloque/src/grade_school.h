#ifndef GRADE_SCHOOL_H
#define GRADE_SCHOOL_H
#include <map>
#include <vector>
#include <string>
#include <utility>

namespace grade_school
{
	class school
	{
		public:
			typedef std::vector< std::string> stringVec;
			typedef std::map< int , stringVec> mapvec;

			inline mapvec roster() const
			{
				return std::move(roster_);
			}

			void add(std::string const&, int);
			stringVec grade(int);
		private:
			mapvec roster_;

	};
}


#endif