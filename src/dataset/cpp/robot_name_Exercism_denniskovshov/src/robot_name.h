#if !defined(ROBOT_NAME_H)
#define ROBOT_NAME_H

#include <string>
#include <unordered_set>

namespace robot_name {
    class robot {
        public:
            robot();

            std::string name() const;
            void reset();
        
        private:
            static std::unordered_set<std::string> _existing_names;
            
            std::string _name = "";

            std::string _generate_name();
            char _generate_rand_char();
            char _generate_rand_digit();
    };
}  // namespace robot_name

#endif // ROBOT_NAME_H