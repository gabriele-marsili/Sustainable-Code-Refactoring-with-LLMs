#include "robot_simulator.h"

robot_status_t robot_create(robot_direction_t direction, int x, int y) {
    robot_status_t new_robot = {direction, {x, y}};
    return new_robot;
}

void robot_move(robot_status_t *robot, const char *commands) {
    const char *command = commands;
    while (*command) {
        switch (*command++) {
            case 'L':
                robot->direction = (robot->direction + 3) % 4;
                break;
            case 'R':
                robot->direction = (robot->direction + 1) % 4;
                break;
            case 'A':
                switch (robot->direction) {
                    case DIRECTION_NORTH:
                        robot->position.y++;
                        break;
                    case DIRECTION_EAST:
                        robot->position.x++;
                        break;
                    case DIRECTION_SOUTH:
                        robot->position.y--;
                        break;
                    case DIRECTION_WEST:
                        robot->position.x--;
                        break;
                }
                break;
        }
    }
}