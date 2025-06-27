#include "robot_simulator.h"

robot_status_t robot_create(robot_direction_t direction, int x, int y) {
    robot_status_t new_robot;

    new_robot.direction = direction;
    new_robot.position.x = x;
    new_robot.position.y = y;
    return (new_robot);
}

void robot_move(robot_status_t *robot, const char *commands) {
    while (*commands != '\0') {
        switch (*commands++) {
            case 'L':
                switch (robot->direction) {
                    case DIRECTION_NORTH:
                        robot->direction = DIRECTION_WEST;
                        break;
                    case DIRECTION_EAST:
                        robot->direction = DIRECTION_NORTH;
                        break;
                    case DIRECTION_SOUTH:
                        robot->direction = DIRECTION_EAST;
                        break;
                    case DIRECTION_WEST:
                        robot->direction = DIRECTION_SOUTH;
                        break;
                    default:
                        break;
                }
                break;
            case 'R':
                switch (robot->direction) {
                    case DIRECTION_NORTH:
                        robot->direction = DIRECTION_EAST;
                        break;
                    case DIRECTION_EAST:
                        robot->direction = DIRECTION_SOUTH;
                        break;
                    case DIRECTION_SOUTH:
                        robot->direction = DIRECTION_WEST;
                        break;
                    case DIRECTION_WEST:
                        robot->direction = DIRECTION_NORTH;
                        break;
                    default:
                        break;
                }
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
                    default:
                        break;
                }
                break;
        }
    }
}
