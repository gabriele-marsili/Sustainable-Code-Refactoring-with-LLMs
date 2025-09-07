class Proverb {
  private final String proverb;

  Proverb(String[] words) {
    if (words.length == 0) {
      proverb = "";
    } else {
      StringBuilder builder = new StringBuilder();
      for (int i = 0; i < words.length - 1; i++) {
        builder.append("For want of a ").append(words[i])
               .append(" the ").append(words[i + 1]).append(" was lost.\n");
      }
      builder.append("And all for the want of a ").append(words[0]).append(".");
      proverb = builder.toString();
    }
  }

  String recite() {
    return proverb;
  }
}