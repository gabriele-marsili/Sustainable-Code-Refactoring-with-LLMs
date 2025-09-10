#include "robot_simulator.h"

robot_status_t robot_create(robot_direction_t direction, int x, int y) {
    return (robot_status_t){.direction = direction, .position = {.x = x, .y = y}};
}

void robot_move(robot_status_t *robot, const char *commands) {
    static const robot_direction_t left_turn[] = {DIRECTION_WEST, DIRECTION_NORTH, DIRECTION_EAST, DIRECTION_SOUTH};
    static const robot_direction_t right_turn[] = {DIRECTION_EAST, DIRECTION_SOUTH, DIRECTION_WEST, DIRECTION_NORTH};
    static const int move_x[] = {0, 1, 0, -1};
    static const int move_y[] = {1, 0, -1, 0};

    while (*commands) {
        switch (*commands++) {
            case 'L':
                robot->direction = left_turn[robot->direction];
                break;
            case 'R':
                robot->direction = right_turn[robot->direction];
                break;
            case 'A':
                robot->position.x += move_x[robot->direction];
                robot->position.y += move_y[robot->direction];
                break;
        }
    }
}