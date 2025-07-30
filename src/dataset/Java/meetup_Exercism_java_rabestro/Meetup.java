import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;

import static java.time.temporal.TemporalAdjusters.*;

record Meetup(int month, int year) {
    private static final int FIRST_TEENTH_DAY = 13;

    public LocalDate day(DayOfWeek dayOfWeek, MeetupSchedule occurrence) {
        var adjuster = switch (occurrence) {
            case FIRST -> firstInMonth(dayOfWeek);
            case SECOND -> dayOfWeekInMonth(2, dayOfWeek);
            case THIRD -> dayOfWeekInMonth(3, dayOfWeek);
            case FOURTH -> dayOfWeekInMonth(4, dayOfWeek);
            case TEENTH -> nextOrSame(dayOfWeek);
            case LAST -> lastInMonth(dayOfWeek);
        };
        return YearMonth.of(year, month).atDay(FIRST_TEENTH_DAY).with(adjuster);
    }
}
