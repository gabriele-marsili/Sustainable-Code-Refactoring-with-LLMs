import java.util.List;

class Proverb {
  private final String proverb;

  Proverb(String[] words) {
    if (words.length > 0) {
      StringBuilder builder = new StringBuilder();
      String lastCause = words[0];

      for (int i = 0; i < words.length - 1; i++) {
        builder.append("For want of a ")
               .append(words[i])
               .append(" the ")
               .append(words[i + 1])
               .append(" was lost.\n");
      }

      builder.append("And all for the want of a ").append(lastCause).append(".");
      proverb = builder.toString();
    } else {
      proverb = "";
    }
  }

  String recite() {
    return proverb;
  }
}