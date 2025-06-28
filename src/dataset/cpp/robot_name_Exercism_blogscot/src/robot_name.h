#ifndef ROBOT_NAME_H_
#define ROBOT_NAME_H_

#include <string>

namespace robot_name {

class robot {
  std::string robotName;

 public:
  robot();
  std::string const name() const;
  void reset();
};

}  // namespace robot_name

#endif  // ROBOT_NAME_H_
