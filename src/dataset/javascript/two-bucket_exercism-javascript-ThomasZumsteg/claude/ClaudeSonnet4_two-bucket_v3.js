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
      if (waterInGoal === 0) {
        waterInGoal = this.goalBucketSize;
      } else if (otherBucket === this.otherBucketSize) {
        otherBucket = 0;
      } else {
        const spaceInOther = this.otherBucketSize - otherBucket;
        if (waterInGoal <= spaceInOther) {
          otherBucket += waterInGoal;
          waterInGoal = 0;
        } else {
          waterInGoal -= spaceInOther;
          otherBucket = this.otherBucketSize;
        }
      }
      moves++;
    }

    this.waterInGoal = waterInGoal;
    this.otherBucket = otherBucket;
    return moves;
  }
}

export default TwoBucket;