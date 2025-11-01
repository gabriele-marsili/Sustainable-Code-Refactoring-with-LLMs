int ovenTime()
{
    return 40;
}

int remainingOvenTime(int actualMinutesInOven)
{
    return 40 - actualMinutesInOven;
}

int preparationTime(int numberOfLayers)
{
    return numberOfLayers * 2;
}

int elapsedTime(int numberOfLayers, int actualMinutesInOven)
{
    return (numberOfLayers * 2) + actualMinutesInOven;
}