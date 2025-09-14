import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class HighScores {
  private final List<Integer> scores;
  private Integer cachedMax;
  private List<Integer> cachedTopThree;
  private boolean cacheValid = false;

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
    
    if (!cacheValid) {
      updateCache();
    }
    
    return cachedMax;
  }

  List<Integer> personalTopThree() {
    if (!cacheValid) {
      updateCache();
    }
    
    return new ArrayList<>(cachedTopThree);
  }
  
  private void updateCache() {
    if (scores.isEmpty()) {
      cachedMax = 0;
      cachedTopThree = new ArrayList<>();
      cacheValid = true;
      return;
    }
    
    List<Integer> sortedScores = new ArrayList<>(scores);
    Collections.sort(sortedScores, Collections.reverseOrder());
    
    cachedMax = sortedScores.get(0);
    cachedTopThree = sortedScores.subList(0, Math.min(3, sortedScores.size()));
    cacheValid = true;
  }
}