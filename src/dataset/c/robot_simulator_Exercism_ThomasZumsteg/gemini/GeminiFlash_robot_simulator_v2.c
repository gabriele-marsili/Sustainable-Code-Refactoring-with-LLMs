#include "robot_simulator.h"

RobotGridStatus_t robot_init(void) {
    RobotGridStatus_t status = {
        .grid = { .x_position = 0, .y_position = 0 },
        .bearing = Heading_North
    };
    return status;
}

RobotGridStatus_t robot_init_with_position(int bearing, int x, int y) {
    RobotGridStatus_t status = {
        .grid = { .x_position = x, .y_position = y },
        .bearing = (bearing >= 0 && bearing < Heading_Max) ? bearing : Heading_North
    };
    return status;
}

inline void robot_turn_right(RobotGridStatus_t * robot) {
    robot->bearing = (robot->bearing + 1) % Heading_Max;
}

inline void robot_turn_left(RobotGridStatus_t * robot) {
    robot->bearing = (robot->bearing - 1 + Heading_Max) % Heading_Max;
}

inline void robot_advance(RobotGridStatus_t * robot) {
    switch (robot->bearing) {
        case Heading_North:
            robot->grid.y_position++;
            break;
        case Heading_South:
            robot->grid.y_position--;
            break;
        case Heading_East:
            robot->grid.x_position++;
            break;
        case Heading_West:
            robot->grid.x_position--;
            break;
    }
}

void robot_simulator(RobotGridStatus_t * robot, const char *commands) {
    const char *c = commands;
    while (*c) {
        switch (*c) {
            case Command_Left:
                robot_turn_left(robot);
                break;
            case Command_Right:
                robot_turn_right(robot);
                break;
            case Command_Advance:
                robot_advance(robot);
                break;
            default:
                break;
        }
        c++;
    }
}