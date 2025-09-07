import java.time.LocalDate;
import java.time.LocalDateTime;

public class Gigasecond {
    private final LocalDateTime birthPlusGigasecond;

    public Gigasecond(LocalDate moment) {
        this.birthPlusGigasecond = moment.atStartOfDay().plusSeconds(1_000_000_000);
    }

    public Gigasecond(LocalDateTime moment) {
        this.birthPlusGigasecond = moment.plusSeconds(1_000_000_000);
    }

    public LocalDateTime getDateTime() {
        return birthPlusGigasecond;
    }
}