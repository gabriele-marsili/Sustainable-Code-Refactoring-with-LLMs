#include "space_age.h"

static const long int EARTH_YEAR = 31557600;

static const float inv_orb_period[COUNT_PLANETS] = {
    1.0f,
    4.1522671f,
    1.6255071f,
    0.53166368f,
    0.08430654f,
    0.03396569f,
    0.01190295f,
    0.00606777f
};

float convert_planet_age(enum planets planet, long int secs)
{
    return (float)secs * inv_orb_period[planet] / EARTH_YEAR;
}