public class Blackjack {

    private static final int[] CARD_VALUES = new int[128];

    static {
        CARD_VALUES['a'] = 11; // ace
        CARD_VALUES['t'] = 10; // ten
        CARD_VALUES['j'] = 10; // jack
        CARD_VALUES['q'] = 10; // queen
        CARD_VALUES['k'] = 10; // king
        CARD_VALUES['2'] = 2;
        CARD_VALUES['3'] = 3;
        CARD_VALUES['4'] = 4;
        CARD_VALUES['5'] = 5;
        CARD_VALUES['6'] = 6;
        CARD_VALUES['7'] = 7;
        CARD_VALUES['8'] = 8;
        CARD_VALUES['9'] = 9;
    }

    public int parseCard(String card) {
        return card.isEmpty() ? 0 : CARD_VALUES[card.charAt(0)];
    }

    public boolean isBlackjack(String card1, String card2) {
        return parseCard(card1) + parseCard(card2) == 21;
    }

    public String largeHand(boolean isBlackjack, int dealerScore) {
        return isBlackjack ? (dealerScore > 9 ? "S" : "W") : "P";
    }

    public String smallHand(int handScore, int dealerScore) {
        return handScore > 16 ? "S" : (handScore < 12 || dealerScore >= 7) ? "H" : "S";
    }

    public String firstTurn(String card1, String card2, String dealerCard) {
        int handScore = parseCard(card1) + parseCard(card2);
        int dealerScore = parseCard(dealerCard);
        return handScore > 20 ? largeHand(isBlackjack(card1, card2), dealerScore) : smallHand(handScore, dealerScore);
    }
}