import java.util.ArrayList;
import java.util.List;

class HighScores {
  private List<Integer> scores;
  private Integer cachedMax;
  private List<Integer> cachedTopThree;
  private boolean maxCacheValid = false;
  private boolean topThreeCacheValid = false;

  public HighScores(List<Integer> highScores) {
    scores = new ArrayList<>(highScores);
  }

  List<Integer> scores() {
    return new ArrayList<>(scores);
  }

  Integer latest() {
    return scores.isEmpty() ? null : scores.get(scores.size() - 1);
  }

  Integer personalBest() {
    if (scores.isEmpty()) {
      return 0;
    }
    
    if (!maxCacheValid) {
      cachedMax = scores.get(0);
      for (int i = 1; i < scores.size(); i++) {
        if (scores.get(i) > cachedMax) {
          cachedMax = scores.get(i);
        }
      }
      maxCacheValid = true;
    }
    
    return cachedMax;
  }

  List<Integer> personalTopThree() {
    if (!topThreeCacheValid) {
      cachedTopThree = new ArrayList<>();
      
      for (Integer score : scores) {
        if (cachedTopThree.size() < 3) {
          cachedTopThree.add(score);
          cachedTopThree.sort((a, b) -> b.compareTo(a));
        } else if (score > cachedTopThree.get(2)) {
          cachedTopThree.set(2, score);
          cachedTopThree.sort((a, b) -> b.compareTo(a));
        }
      }
      
      topThreeCacheValid = true;
    }
    
    return new ArrayList<>(cachedTopThree);
  }
}