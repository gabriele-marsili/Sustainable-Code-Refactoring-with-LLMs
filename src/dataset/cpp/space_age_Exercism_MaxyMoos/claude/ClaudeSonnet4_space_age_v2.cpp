#include "space_age.h"

space_age::space_age(unsigned long int ageInSeconds)
    : ageInSeconds(ageInSeconds), earthAge(static_cast<double>(ageInSeconds) / 31557600.0)
{
}

unsigned long int space_age::seconds() const
{
    return ageInSeconds;
}

double space_age::on_earth() const
{
    return earthAge;
}

double space_age::on_mercury() const
{
    return earthAge / 0.2408467;
}

double space_age::on_venus() const
{
    return earthAge / 0.61519726;
}

double space_age::on_mars() const
{
    return earthAge / 1.8808158;
}

double space_age::on_jupiter() const
{
    return earthAge / 11.862615;
}

double space_age::on_saturn() const
{
    return earthAge / 29.447498;
}

double space_age::on_uranus() const
{
    return earthAge / 84.016846;
}

double space_age::on_neptune() const
{
    return earthAge / 164.79132;
}