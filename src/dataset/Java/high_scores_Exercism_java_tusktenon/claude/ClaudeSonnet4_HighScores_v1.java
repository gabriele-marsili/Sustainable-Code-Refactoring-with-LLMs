import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class HighScores {
  private final List<Integer> scores;
  private Integer cachedMax;
  private List<Integer> cachedTopThree;

  public HighScores(List<Integer> highScores) {
    scores = new ArrayList<>(highScores);
  }

  List<Integer> scores() {
    return new ArrayList<>(scores);
  }

  Integer latest() {
    return scores.get(scores.size() - 1);
  }

  Integer personalBest() {
    if (scores.isEmpty()) {
      return 0;
    }
    if (cachedMax == null) {
      cachedMax = Collections.max(scores);
    }
    return cachedMax;
  }

  List<Integer> personalTopThree() {
    if (cachedTopThree == null) {
      cachedTopThree = new ArrayList<>(scores);
      cachedTopThree.sort(Collections.reverseOrder());
      if (cachedTopThree.size() > 3) {
        cachedTopThree = cachedTopThree.subList(0, 3);
      }
    }
    return new ArrayList<>(cachedTopThree);
  }
}