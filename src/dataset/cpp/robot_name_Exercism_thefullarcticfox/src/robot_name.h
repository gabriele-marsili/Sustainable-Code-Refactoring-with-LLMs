#if !defined(ROBOT_NAME_H)
#define ROBOT_NAME_H
#include <string>
#include <set>

namespace robot_name {
	class robot {
	private:
		static std::set<std::string>	generated;
		std::string						_name;
		static std::string				generate();
	public:
		robot();

		const std::string&		name() const;
		void					reset();
	};
}  // namespace robot_name

#endif // ROBOT_NAME_H
