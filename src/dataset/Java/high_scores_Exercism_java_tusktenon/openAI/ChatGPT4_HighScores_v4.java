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
    return scores.isEmpty() ? 0 : scores.get(scores.size() - 1);
  }

  Integer personalBest() {
    return scores.isEmpty() ? 0 : Collections.max(scores);
  }

  List<Integer> personalTopThree() {
    int size = scores.size();
    if (size == 0) return Collections.emptyList();
    List<Integer> sortedScores = new ArrayList<>(scores);
    sortedScores.sort(Collections.reverseOrder());
    return sortedScores.subList(0, Math.min(3, size));
  }
}