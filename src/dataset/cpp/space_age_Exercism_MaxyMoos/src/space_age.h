#ifndef SPACE_AGE_H_
#define SPACE_AGE_H_

class space_age
{
    unsigned long int ageInSeconds;
public:
    space_age(unsigned long int ageInSeconds);

    unsigned long int seconds() const;
    double on_earth() const;
    double on_mercury() const;
    double on_venus() const;
    double on_mars() const;
    double on_jupiter() const;
    double on_saturn() const;
    double on_uranus() const;
    double on_neptune() const;
};


#endif