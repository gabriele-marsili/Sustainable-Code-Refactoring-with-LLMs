#include "space_age.h"


space_age::space_age(unsigned long int ageInSeconds)
{
    this->ageInSeconds = ageInSeconds;
}

unsigned long int space_age::seconds() const
{
    return this->ageInSeconds;
}

double space_age::on_earth() const
{
    return (double) this->ageInSeconds / 31557600;
}

double space_age::on_mercury() const
{
    return (double) this->on_earth() / 0.2408467;
}

double space_age::on_venus() const
{
    return (double) this->on_earth() / 0.61519726;
}

double space_age::on_mars() const
{
    return (double) this->on_earth() / 1.8808158;
}

double space_age::on_jupiter() const
{
    return (double) this->on_earth() / 11.862615;
}

double space_age::on_saturn() const
{
    return (double) this->on_earth() / 29.447498;
}

double space_age::on_uranus() const
{
    return this->on_earth() / 84.016846;
}

double space_age::on_neptune() const
{
    return this->on_earth() / 164.79132;
}
