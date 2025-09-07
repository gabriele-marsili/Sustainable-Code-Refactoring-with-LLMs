import java.time.LocalDate;
import java.time.LocalDateTime;

public class Gigasecond {
    private final LocalDateTime gigasecondMoment;

    public Gigasecond(LocalDate moment) {
        this.gigasecondMoment = moment.atStartOfDay().plusSeconds(1_000_000_000L);
    }

    public Gigasecond(LocalDateTime moment) {
        this.gigasecondMoment = moment.plusSeconds(1_000_000_000L);
    }

    public LocalDateTime getDateTime() {
        return gigasecondMoment;
    }
}