import java.util.Arrays;

class Proverb {
  private String proverb = "";

  Proverb(String[] words) {
    if (words.length > 0) {
      var builder = new StringBuilder();
      var lastCause = words[0];
      var previous = lastCause;

      for (int i = 1; i < words.length; i++) {
        builder.append("For want of a ").append(previous).append(" the ").append(words[i]).append(" was lost.\n");
        previous = words[i];
      }

      builder.append("And all for the want of a ").append(lastCause).append(".");
      proverb = builder.toString();
    }
  }

  String recite() {
    return proverb;
  }
}