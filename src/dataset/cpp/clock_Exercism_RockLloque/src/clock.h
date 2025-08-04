#ifndef CLOCK_H
#define CLOCK_H
#include <string>

namespace date_independent
{
	class clock
	{
		public:
			static clock at(int hour, int minute =0);
			operator std::string() const;

			clock& plus(int);
			clock& minus(int);
			bool operator==(clock const& ) const;
			bool operator!=( clock const& ) const;

		private:
			clock(int h, int m);
			int minute_;
			int hour_;

	};

}
#endif