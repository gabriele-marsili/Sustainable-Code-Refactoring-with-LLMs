constexpr int OVEN_TIME = 40;
constexpr int TIME_PER_LAYER = 2;

int ovenTime()
{
    return OVEN_TIME;
}

int remainingOvenTime(int actualMinutesInOven)
{
    return OVEN_TIME - actualMinutesInOven;
}

int preparationTime(int numberOfLayers)
{
    return TIME_PER_LAYER * numberOfLayers;
}

int elapsedTime(int numberOfLayers, int actualMinutesInOven)
{
    return (TIME_PER_LAYER * numberOfLayers) + actualMinutesInOven;
}