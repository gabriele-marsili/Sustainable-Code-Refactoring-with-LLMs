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
    return scores.isEmpty() ? null : scores.get(scores.size() - 1);
  }

  Integer personalBest() {
    return scores.isEmpty() ? 0 : Collections.max(scores);
  }

  List<Integer> personalTopThree() {
    List<Integer> topScores = new ArrayList<>(scores);
    topScores.sort(Collections.reverseOrder());
    return topScores.subList(0, Math.min(3, topScores.size()));
  }
}