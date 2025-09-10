import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class HighScores {
  private final List<Integer> scores;

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
    int max = scores.get(0);
    for (int i = 1; i < scores.size(); i++) {
      if (scores.get(i) > max) {
        max = scores.get(i);
      }
    }
    return max;
  }

  List<Integer> personalTopThree() {
    List<Integer> sortedScores = new ArrayList<>(scores);
    sortedScores.sort(Collections.reverseOrder());
    return sortedScores.subList(0, Math.min(3, sortedScores.size()));
  }
}