import java.time.LocalDate;
import java.time.LocalDateTime;

public class Gigasecond {
    private static final long GIGASECOND = 1_000_000_000L;
    private final LocalDateTime birth;

    public Gigasecond(LocalDate moment) {
        this.birth = moment.atStartOfDay();
    }

    public Gigasecond(LocalDateTime moment) {
        this.birth = moment;
    }

    public LocalDateTime getDateTime() {
        return birth.plusSeconds(GIGASECOND);
    }
}