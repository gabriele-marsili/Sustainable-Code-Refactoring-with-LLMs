import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Comparator;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Ledger {
    public String format(String currencyName, String localeName, LedgerEntry[] entries) {
        var config = new Config(currencyName, localeName);
        var ledgerFormatter = new LedgerFormatter(config);

        var comparator = Comparator
                .comparing(LedgerEntry::date)
                .thenComparing(LedgerEntry::description)
                .thenComparing(LedgerEntry::change);

        var body = Arrays.stream(entries)
                .sorted(comparator)
                .map(ledgerFormatter);

        return Stream.concat(ledgerFormatter.header(), body)
                .collect(Collectors.joining(System.lineSeparator()));
    }

    public LedgerEntry createLedgerEntry(String date, String description, int changeInCents) {
        var changeAmount = BigDecimal.valueOf(changeInCents, 2);
        return new LedgerEntry(LocalDate.parse(date), description, changeAmount);
    }

    public record LedgerEntry(LocalDate date, String description, BigDecimal change) {
    }
}
