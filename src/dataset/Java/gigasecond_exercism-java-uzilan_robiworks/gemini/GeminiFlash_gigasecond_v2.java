import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Duration;

public class Gigasecond {
    private final LocalDateTime birth;
    private static final Duration GIGASECOND = Duration.ofSeconds(1000000000);

    public Gigasecond(LocalDate moment) {
        this.birth = moment.atStartOfDay();
    }

    public Gigasecond(LocalDateTime moment) {
        this.birth = moment;
    }

    public LocalDateTime getDateTime() {
        return birth.plus(GIGASECOND);
    }
}