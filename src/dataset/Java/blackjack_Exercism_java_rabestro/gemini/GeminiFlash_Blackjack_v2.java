public class Blackjack {

    private static final int ACE_VALUE = 11;
    private static final int FACE_CARD_VALUE = 10;

    public int parseCard(String card) {
        switch (card.charAt(0)) {
            case 'a': return ACE_VALUE;
            case 't':
            case 'j':
            case 'q':
            case 'k': return FACE_CARD_VALUE;
            case '2': return 2;
            case '3': return 3;
            case '4': return 4;
            case '5': return 5;
            case '6': return 6;
            case '7': return 7;
            case '8': return 8;
            case '9': return 9;
            default: return 0;
        }
    }

    public boolean isBlackjack(String card1, String card2) {
        int card1Value = parseCard(card1);
        if (card1Value > 11) card1Value = 10;
        int card2Value = parseCard(card2);
        if (card2Value > 11) card2Value = 10;
        return card1Value + card2Value == 21;
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