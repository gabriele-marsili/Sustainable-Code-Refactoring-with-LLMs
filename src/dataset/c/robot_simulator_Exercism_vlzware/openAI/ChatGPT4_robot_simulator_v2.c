#include "robot_simulator.h"

robot_grid_status_t robot_init(void)
{
	return (robot_grid_status_t){
		(bearing_t)DEFAULT_BEARING,
		{DEFAULT_X_COORDINATE, DEFAULT_Y_COORDINATE}
	};
}

robot_grid_status_t robot_init_with_position(int bearing, int x, int y)
{
	bearing_t b = (bearing >= 0 && bearing < HEADING_MAX) ? (bearing_t)bearing : (bearing_t)DEFAULT_BEARING;
	return (robot_grid_status_t){b, {x, y}};
}

void robot_turn_right(robot_grid_status_t *robot)
{
	if (robot)
		robot->bearing = (bearing_t)((robot->bearing + 1) % HEADING_MAX);
}

void robot_turn_left(robot_grid_status_t *robot)
{
	if (robot)
		robot->bearing = (bearing_t)((robot->bearing + HEADING_MAX - 1) % HEADING_MAX);
}

void robot_advance(robot_grid_status_t *robot)
{
	if (!robot)
		return;

	switch (robot->bearing) {
	case HEADING_NORTH:
		robot->grid.y_position++;
		break;
	case HEADING_EAST:
		robot->grid.x_position++;
		break;
	case HEADING_SOUTH:
		robot->grid.y_position--;
		break;
	case HEADING_WEST:
		robot->grid.x_position--;
		break;
	default:
		break;
	}
}

void robot_simulator(robot_grid_status_t *robot, const char *commands)
{
	if (!robot || !commands)
		return;

	for (const char *cmd = commands; *cmd; ++cmd) {
		switch (*cmd) {
		case COMMAND_LEFT:
			robot_turn_left(robot);
			break;
		case COMMAND_RIGHT:
			robot_turn_right(robot);
			break;
		case COMMAND_ADVANCE:
			robot_advance(robot);
			break;
		default:
			break;
		}
	}
}