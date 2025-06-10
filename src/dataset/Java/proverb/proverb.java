import java.util.Arrays;
import java.util.stream.Collectors;

class Proverb {
  private String proverb = "";

  Proverb(String[] words) {
    if (words.length > 0) {
      var causes = Arrays.stream(words).skip(1).collect(Collectors.toList());
      var lastCause = words[0];

      var builder = new StringBuilder();
      var previous = lastCause;

      for (String cause : causes) {
        builder.append(String.format("For want of a %s the %s was lost.\n", previous, cause));
        previous = cause;
      }

      builder.append(String.format("And all for the want of a %s.", lastCause));
      proverb = builder.toString();
    }
  }

  String recite() {
    return proverb;
  }

}
