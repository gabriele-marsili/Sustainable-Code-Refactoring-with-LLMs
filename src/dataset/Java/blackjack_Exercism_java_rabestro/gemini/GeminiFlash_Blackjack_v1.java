public class Blackjack {

    private static final int[] cardValues = new int[13];

    static {
        cardValues[0] = 11; // Ace
        cardValues[1] = 2;  // Two
        cardValues[2] = 3;  // Three
        cardValues[3] = 4;  // Four
        cardValues[4] = 5;  // Five
        cardValues[5] = 6;  // Six
        cardValues[6] = 7;  // Seven
        cardValues[7] = 8;  // Eight
        cardValues[8] = 9;  // Nine
        cardValues[9] = 10; // Ten
        cardValues[10] = 10; // Jack
        cardValues[11] = 10; // Queen
        cardValues[12] = 10; // King
    }

    public int parseCard(String card) {
        switch (card) {
            case "ace": return cardValues[0];
            case "two": return cardValues[1];
            case "three": return cardValues[2];
            case "four": return cardValues[3];
            case "five": return cardValues[4];
            case "six": return cardValues[5];
            case "seven": return cardValues[6];
            case "eight": return cardValues[7];
            case "nine": return cardValues[8];
            case "ten":
            case "jack":
            case "queen":
            case "king": return cardValues[9];
            default: return 0;
        }
    }

    public boolean isBlackjack(String card1, String card2) {
        return parseCard(card1) + parseCard(card2) == 21;
    }

    public String largeHand(boolean isBlackjack, int dealerScore) {
        return isBlackjack ? (dealerScore > 9 ? "S" : "W") : "P";
    }

    public String smallHand(int handScore, int dealerScore) {
        if (handScore > 16) return "S";
        if (handScore < 12) return "H";
        return dealerScore < 7 ? "S" : "H";
    }

    public String firstTurn(String card1, String card2, String dealerCard) {
        int handScore = parseCard(card1) + parseCard(card2);
        int dealerScore = parseCard(dealerCard);

        if (handScore > 20)
            return largeHand(isBlackjack(card1, card2), dealerScore);
        else
            return smallHand(handScore, dealerScore);
    }
}