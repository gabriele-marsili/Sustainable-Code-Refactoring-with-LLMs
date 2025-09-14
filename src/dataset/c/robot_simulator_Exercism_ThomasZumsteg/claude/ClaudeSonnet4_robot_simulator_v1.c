#include "robot_simulator.h"

RobotGridStatus_t robot_init(void) {
    return robot_init_with_position(Heading_North, 0, 0);
}

RobotGridStatus_t robot_init_with_position(int bearing, int x, int y) {
    RobotGridStatus_t status = { 
        .grid = { .x_position = x, .y_position = y },
        .bearing = (bearing >= 0 && bearing < Heading_Max) ? bearing : 0
    };
    return status;
}

void robot_turn_right(RobotGridStatus_t * robot) {
    robot->bearing = (robot->bearing + 1) & (Heading_Max - 1);
}

void robot_turn_left(RobotGridStatus_t * robot) {
    robot->bearing = (robot->bearing - 1) & (Heading_Max - 1);
}

void robot_advance(RobotGridStatus_t * robot) {
    static const int dx[] = {0, 1, 0, -1};
    static const int dy[] = {1, 0, -1, 0};
    
    robot->grid.x_position += dx[robot->bearing];
    robot->grid.y_position += dy[robot->bearing];
}

void robot_simulator(RobotGridStatus_t * robot, const char *commands) {
    const char *c = commands;
    while (*c) {
        switch(*c) {
            case Command_Left:
                robot->bearing = (robot->bearing - 1) & (Heading_Max - 1);
                break;
            case Command_Right:
                robot->bearing = (robot->bearing + 1) & (Heading_Max - 1);
                break;
            case Command_Advance:
                {
                    static const int dx[] = {0, 1, 0, -1};
                    static const int dy[] = {1, 0, -1, 0};
                    robot->grid.x_position += dx[robot->bearing];
                    robot->grid.y_position += dy[robot->bearing];
                }
                break;
        }
        c++;
    }
}