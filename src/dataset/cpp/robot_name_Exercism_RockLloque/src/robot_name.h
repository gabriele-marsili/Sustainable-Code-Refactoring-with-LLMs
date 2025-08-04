#ifndef ROBOT_NAME_H
#define ROBOT_NAME_H
#include <string>
#include <vector>

namespace robot_name
{
	class robot
	{
		public:
			robot() 
			{ addToVector();} 

		
			std::string const& name() const;
			void reset();

		private:
			void addToVector();
			std::string createName();
			std::string name_;
			static std::vector< std::string> robotNames_;

	};
}

#endif