public class Lasagna {
    // expectedMinutesInOven method: returns minutes lasagna should be in the oven
    public int expectedMinutesInOven() {
        return 40;
    }
    
    // remainingMinutesInOven method: calculates number of minutes lasagna has left in the oven
    public int remainingMinutesInOven(int timeInOven) {
        return this.expectedMinutesInOven() - timeInOven;
    }

    // preparationTimeInMinutes method: calculate prep time based on number of layers created
    public int preparationTimeInMinutes(int numberOfLayers) {
        return numberOfLayers * 2;
    }

    // totalTimeInMinutes method: calculates total time taken so far to make lasagna
    public int totalTimeInMinutes(int numberOfLayers, int timeInOven) {
        return this.preparationTimeInMinutes(numberOfLayers) + timeInOven;
    }
}
