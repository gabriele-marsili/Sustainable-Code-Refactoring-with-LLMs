import java.time.LocalDate;
import java.time.LocalDateTime;

public class Gigasecond {
    private LocalDateTime birth;

    public Gigasecond(LocalDate moment) {
        this.birth = moment.atStartOfDay();
    }

    public Gigasecond(LocalDateTime moment) {
        this.birth = moment;
    }

    public LocalDateTime getDateTime() {
        return birth.plusSeconds(1000000000);
    }
}
