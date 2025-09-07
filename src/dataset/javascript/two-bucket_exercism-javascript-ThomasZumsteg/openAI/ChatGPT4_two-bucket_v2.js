class TwoBucket {
  constructor(sizeOne, sizeTwo, goal, starterBucket) {
    this.goalBucketSize = starterBucket === "one" ? sizeOne : sizeTwo;
    this.otherBucketSize = starterBucket === "one" ? sizeTwo : sizeOne;
    this.goalBucket = starterBucket;
    this.goal = goal;
  }

  moves() {
    let waterInGoal = 0;
    let otherBucket = 0;
    let moves = 0;

    while (waterInGoal !== this.goal) {
      moves++;

      if (waterInGoal === 0) {
        // Fill the goal bucket
        waterInGoal = this.goalBucketSize;
      } else if (otherBucket === this.otherBucketSize) {
        // Empty the other bucket
        otherBucket = 0;
      } else {
        // Pour from the goal bucket into the other bucket
        const pourAmount = Math.min(waterInGoal, this.otherBucketSize - otherBucket);
        waterInGoal -= pourAmount;
        otherBucket += pourAmount;
      }
    }

    return moves;
  }
}

export default TwoBucket;