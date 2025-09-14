#include "robot_simulator.h"

static const int dx[] = {0, 1, 0, -1};
static const int dy[] = {1, 0, -1, 0};

RobotGridStatus_t robot_init(void) {
    return (RobotGridStatus_t){
        .grid = {.x_position = 0, .y_position = 0},
        .bearing = Heading_North
    };
}

RobotGridStatus_t robot_init_with_position(int bearing, int x, int y) {
    return (RobotGridStatus_t){
        .grid = {.x_position = x, .y_position = y},
        .bearing = (bearing >= 0 && bearing < Heading_Max) ? bearing : 0
    };
}

void robot_turn_right(RobotGridStatus_t * robot) {
    robot->bearing = (robot->bearing + 1) & (Heading_Max - 1);
}

void robot_turn_left(RobotGridStatus_t * robot) {
    robot->bearing = (robot->bearing - 1) & (Heading_Max - 1);
}

void robot_advance(RobotGridStatus_t * robot) {
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
                robot->grid.x_position += dx[robot->bearing];
                robot->grid.y_position += dy[robot->bearing];
                break;
        }
        c++;
    }
}