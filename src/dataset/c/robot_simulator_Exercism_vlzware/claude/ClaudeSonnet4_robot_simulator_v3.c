#include "robot_simulator.h"
#include <stddef.h>

static const int dx[] = {0, 1, 0, -1};
static const int dy[] = {1, 0, -1, 0};

robot_grid_status_t robot_init(void)
{
    return (robot_grid_status_t){
        .bearing = DEFAULT_BEARING,
        .grid = {DEFAULT_X_COORDINATE, DEFAULT_Y_COORDINATE}
    };
}

robot_grid_status_t robot_init_with_position(int bearing, int x, int y)
{
    bearing_t b = (bearing < 0 || bearing >= HEADING_MAX) ? DEFAULT_BEARING : (bearing_t)bearing;
    return (robot_grid_status_t){.bearing = b, .grid = {x, y}};
}

void robot_turn_right(robot_grid_status_t *robot)
{
    if (robot == NULL) return;
    robot->bearing = (robot->bearing + 1) & 3;
}

void robot_turn_left(robot_grid_status_t *robot)
{
    if (robot == NULL) return;
    robot->bearing = (robot->bearing + 3) & 3;
}

void robot_advance(robot_grid_status_t *robot)
{
    if (robot == NULL) return;
    robot->grid.x_position += dx[robot->bearing];
    robot->grid.y_position += dy[robot->bearing];
}

void robot_simulator(robot_grid_status_t *robot, const char *commands)
{
    if (robot == NULL || commands == NULL) return;
    
    for (const char *cmd = commands; *cmd; cmd++) {
        switch (*cmd) {
        case COMMAND_LEFT:
            robot->bearing = (robot->bearing + 3) & 3;
            break;
        case COMMAND_RIGHT:
            robot->bearing = (robot->bearing + 1) & 3;
            break;
        case COMMAND_ADVANCE:
            robot->grid.x_position += dx[robot->bearing];
            robot->grid.y_position += dy[robot->bearing];
            break;
        }
    }
}