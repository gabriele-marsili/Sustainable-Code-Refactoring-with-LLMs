import java.text.MessageFormat;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

class BottleSong {
    private static final String FIRST_HALF_TEMPLATE = """
            {0,choice,1#One|2#Two|3#Three|4#Four|5#Five|6#Six|7#Seven|8#Eight|9#Nine|10#Ten} \
            green bottle{0,choice,1#|1<s} hanging on the wall,
            """;

    private static final String LAST_HALF_TEMPLATE = """
            And if one green bottle should accidentally fall,
            There''ll be {0,choice,0#no|1#one|2#two|3#three|4#four|5#five|6#six|7#seven|8#eight|9#nine} \
            green bottle{0,choice,0#s|1#|1<s} hanging on the wall.
            """;

    private String generateVerse(int bottles) {
        String firstHalf = MessageFormat.format(FIRST_HALF_TEMPLATE, bottles).repeat(2);
        String lastHalf = MessageFormat.format(LAST_HALF_TEMPLATE, bottles - 1);
        return firstHalf + lastHalf;
    }

    String recite(int startBottles, int takeDown) {
        return IntStream.rangeClosed(0, takeDown - 1)
                .mapToObj(i -> generateVerse(startBottles - i))
                .collect(Collectors.joining(System.lineSeparator()));
    }
}