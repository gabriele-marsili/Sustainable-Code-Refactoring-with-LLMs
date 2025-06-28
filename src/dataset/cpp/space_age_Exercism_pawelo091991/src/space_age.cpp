#include "space_age.h"

space_age::space_age::space_age(double input) {
	time = input;
}

double space_age::space_age::calculate(double planet) const {
	return time / (earth * planet);
}

double space_age::space_age::seconds(void) const {
	return time;
}

double space_age::space_age::on_earth(void) const {
	return calculate(1);
}

double space_age::space_age::on_mercury(void) const {
	return calculate(mercury);
}

double space_age::space_age::on_venus(void) const {
	return calculate(venus);
}

double space_age::space_age::on_mars(void) const {
	return calculate(mars);
}

double space_age::space_age::on_jupiter(void) const {
	return calculate(jupiter);
}

double space_age::space_age::on_saturn(void) const {
	return calculate(saturn);
}

double space_age::space_age::on_uranus(void) const {
	return calculate(uranus);
}

double space_age::space_age::on_neptune(void) const {
	return calculate(neptune);
}