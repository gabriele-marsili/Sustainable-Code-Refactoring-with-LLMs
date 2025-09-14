#include "robot_simulator.h"
#include <stddef.h>

robot_grid_status_t robot_init(void)
{
	return (robot_grid_status_t){
		DEFAULT_BEARING,
		{DEFAULT_X_COORDINATE, DEFAULT_Y_COORDINATE}
	};
}

robot_grid_status_t robot_init_with_position(int bearing, int x, int y)
{
	if (bearing < 0 || bearing >= HEADING_MAX)
		bearing = DEFAULT_BEARING;

	return (robot_grid_status_t){ (bearing_t)bearing, {x, y} };
}

void robot_turn_right(robot_grid_status_t *robot)
{
	if (robot == NULL)
		return;

	robot->bearing = (robot->bearing + 1) & 3;
}

void robot_turn_left(robot_grid_status_t *robot)
{
	if (robot == NULL)
		return;

	robot->bearing = (robot->bearing - 1) & 3;
}

void robot_advance(robot_grid_status_t *robot)
{
	if (robot == NULL)
		return;

	static const int dx[] = {0, 1, 0, -1};
	static const int dy[] = {1, 0, -1, 0};
	
	robot->grid.x_position += dx[robot->bearing];
	robot->grid.y_position += dy[robot->bearing];
}

void robot_simulator(robot_grid_status_t *robot, const char *commands)
{
	if (robot == NULL || commands == NULL)
		return;

	for (const char *cmd = commands; *cmd; cmd++) {
		switch (*cmd) {
		case COMMAND_LEFT:
			robot->bearing = (robot->bearing - 1) & 3;
			break;
		case COMMAND_RIGHT:
			robot->bearing = (robot->bearing + 1) & 3;
			break;
		case COMMAND_ADVANCE:
			{
				static const int dx[] = {0, 1, 0, -1};
				static const int dy[] = {1, 0, -1, 0};
				robot->grid.x_position += dx[robot->bearing];
				robot->grid.y_position += dy[robot->bearing];
			}
			break;
		}
	}
}