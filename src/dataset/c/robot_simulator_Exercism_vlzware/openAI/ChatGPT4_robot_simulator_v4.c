#include "robot_simulator.h"

robot_grid_status_t robot_init(void)
{
	return (robot_grid_status_t){
		(bearing_t)DEFAULT_BEARING,
		{DEFAULT_X_COORDINATE, DEFAULT_Y_COORDINATE}};
}

robot_grid_status_t robot_init_with_position(int bearing, int x, int y)
{
	return (robot_grid_status_t){
		(bearing_t)((bearing >= 0 && bearing < HEADING_MAX) ? bearing : DEFAULT_BEARING),
		{x, y}};
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

	switch (robot->bearing)
	{
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

	for (; *commands; commands++)
	{
		switch (*commands)
		{
		case COMMAND_LEFT:
			robot_turn_left(robot);
			break;
		case COMMAND_RIGHT:
			robot_turn_right(robot);
			break;
		case COMMAND_ADVANCE:
			robot_advance(robot);
			break;
		}
	}
}