class Proverb {
  private final String proverb;

  Proverb(String[] words) {
    if (words.length > 0) {
      StringBuilder builder = new StringBuilder();
      String previous = words[0];

      for (int i = 1; i < words.length; i++) {
        builder.append("For want of a ").append(previous).append(" the ").append(words[i]).append(" was lost.\n");
        previous = words[i];
      }

      builder.append("And all for the want of a ").append(words[0]).append(".");
      proverb = builder.toString();
    } else {
      proverb = "";
    }
  }

  String recite() {
    return proverb;
  }
}