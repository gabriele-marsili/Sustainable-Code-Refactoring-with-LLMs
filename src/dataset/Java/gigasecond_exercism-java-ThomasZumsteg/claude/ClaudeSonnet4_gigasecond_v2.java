import java.time.LocalDate;
import java.time.LocalDateTime;

public class Gigasecond {
    private final LocalDateTime date;
    private static final long GIGASECOND = 1_000_000_000L;

    public Gigasecond(LocalDate date) {
        this.date = date.atStartOfDay();
    }

    public Gigasecond(LocalDateTime date) {
        this.date = date;
    }

    public LocalDateTime getDate() {
        return date.plusSeconds(GIGASECOND);
    }
}