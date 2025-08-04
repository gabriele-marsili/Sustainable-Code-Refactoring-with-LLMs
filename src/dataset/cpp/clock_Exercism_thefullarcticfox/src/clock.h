#if !defined(CLOCK_H)
#define CLOCK_H
#include <string>

namespace date_independent {
	namespace clock {
		class at{
		private:
			std::pair<int, int>	time_hm;
		public:
			at(int hour, int min);

			at		plus(int min);

			bool	operator==(const at& other) const;
			bool	operator!=(const at& other) const;

			operator std::string() const;
		};
	}
}  // namespace date_independent

#endif // CLOCK_H
