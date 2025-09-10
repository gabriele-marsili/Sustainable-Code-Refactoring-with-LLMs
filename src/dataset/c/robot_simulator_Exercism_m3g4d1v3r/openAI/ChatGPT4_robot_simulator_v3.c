#include "robot_simulator.h"

robot_status_t robot_create(robot_direction_t direction, int x, int y) {
    return (robot_status_t){.direction = direction, .position = {.x = x, .y = y}};
}

void robot_move(robot_status_t *robot, const char *commands) {
    static const robot_direction_t left_turn[] = {
        [DIRECTION_NORTH] = DIRECTION_WEST,
        [DIRECTION_EAST] = DIRECTION_NORTH,
        [DIRECTION_SOUTH] = DIRECTION_EAST,
        [DIRECTION_WEST] = DIRECTION_SOUTH
    };

    static const robot_direction_t right_turn[] = {
        [DIRECTION_NORTH] = DIRECTION_EAST,
        [DIRECTION_EAST] = DIRECTION_SOUTH,
        [DIRECTION_SOUTH] = DIRECTION_WEST,
        [DIRECTION_WEST] = DIRECTION_NORTH
    };

    static const struct {
        int dx, dy;
    } advance[] = {
        [DIRECTION_NORTH] = {0, 1},
        [DIRECTION_EAST] = {1, 0},
        [DIRECTION_SOUTH] = {0, -1},
        [DIRECTION_WEST] = {-1, 0}
    };

    for (; *commands; ++commands) {
        switch (*commands) {
            case 'L':
                robot->direction = left_turn[robot->direction];
                break;
            case 'R':
                robot->direction = right_turn[robot->direction];
                break;
            case 'A':
                robot->position.x += advance[robot->direction].dx;
                robot->position.y += advance[robot->direction].dy;
                break;
        }
    }
}