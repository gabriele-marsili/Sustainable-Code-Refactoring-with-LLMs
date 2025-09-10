#include "robot_simulator.h"

RobotGridStatus_t robot_init(void) {
    return robot_init_with_position(Heading_North, 0, 0);
}

RobotGridStatus_t robot_init_with_position(int bearing, int x, int y) {
    return (RobotGridStatus_t){
        .grid = { .x_position = x, .y_position = y },
        .bearing = (0 <= bearing && bearing < Heading_Max) ? bearing : Heading_North
    };
}

static inline void robot_turn(RobotGridStatus_t *robot, int direction) {
    robot->bearing = (robot->bearing + direction + Heading_Max) % Heading_Max;
}

void robot_turn_right(RobotGridStatus_t *robot) {
    robot_turn(robot, 1);
}

void robot_turn_left(RobotGridStatus_t *robot) {
    robot_turn(robot, -1);
}

void robot_advance(RobotGridStatus_t *robot) {
    static const int dx[] = { 0, 0, 1, -1 }; // North, South, East, West
    static const int dy[] = { 1, -1, 0, 0 };
    robot->grid.x_position += dx[robot->bearing];
    robot->grid.y_position += dy[robot->bearing];
}

void robot_simulator(RobotGridStatus_t *robot, const char *commands) {
    while (*commands) {
        switch (*commands++) {
            case Command_Left:
                robot_turn_left(robot);
                break;
            case Command_Right:
                robot_turn_right(robot);
                break;
            case Command_Advance:
                robot_advance(robot);
                break;
        }
    }
}