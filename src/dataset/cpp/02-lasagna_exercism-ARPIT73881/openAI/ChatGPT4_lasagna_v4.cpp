constexpr int ovenTime()
{
    return 40;
}

constexpr int remainingOvenTime(int actualMinutesInOven)
{
    return 40 - actualMinutesInOven;
}

constexpr int preparationTime(int numberOfLayers)
{
    return numberOfLayers * 2;
}

constexpr int elapsedTime(int numberOfLayers, int actualMinutesInOven)
{
    return (numberOfLayers * 2) + actualMinutesInOven;
}