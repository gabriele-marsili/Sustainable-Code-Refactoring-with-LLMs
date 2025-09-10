package ledger

import (
	"fmt"
	"sort"
	"strconv"
	"time"
)

const TestVersion = 2

type Entry struct {
	Date        string
	Description string
	Change      int
}

type byDateDescriptionChange []Entry

func (d byDateDescriptionChange) Len() int           { return len(d) }
func (d byDateDescriptionChange) Swap(i, j int)      { d[i], d[j] = d[j], d[i] }
func (d byDateDescriptionChange) Less(i, j int) bool { return d[i].Date < d[j].Date || (d[i].Date == d[j].Date && (d[i].Description < d[j].Description || (d[i].Description == d[j].Description && d[i].Change < d[j].Change))) }

func FormatLedger(currency string, locale string, entries []Entry) (string, error) {
	currencySymbol, dateFmt, headerFmt, localDateFmt, currencyFormatter, err := getLocaleSettings(currency, locale)
	if err != nil {
		return "", err
	}

	sort.Sort(byDateDescriptionChange(entries))

	ledger := fmt.Sprintf(headerFmt, localDateFmt[0], localDateFmt[1], localDateFmt[2])
	for _, entry := range entries {
		if len(entry.Description) > 25 {
			entry.Description = entry.Description[:22] + "..."
		}

		date, err := time.Parse("2006-02-01", entry.Date)
		if err != nil {
			return "", err
		}

		ledger += fmt.Sprintf("%10s | %-25s | %13s\n",
			date.Format(localDateFmt[3]), entry.Description,
			currencyFormatter(entry.Change, currencySymbol))
	}
	return ledger, nil
}

func getLocaleSettings(currency, locale string) (string, string, string, []string, func(int, string) string, error) {
	var currencySymbol, dateFmt, headerFmt string
	var localDateFmt []string
	var currencyFormatter func(int, string) string

	switch currency {
	case "USD":
		currencySymbol = "$"
	case "EUR":
		currencySymbol = "€"
	default:
		return "", "", "", nil, nil, fmt.Errorf("Unknown currency: %s", currency)
	}

	switch locale {
	case "nl-NL":
		dateFmt = "01-02-2006"
		headerFmt = "%-10s | %-25s | %s\n"
		localDateFmt = []string{"Datum", "Omschrijving", "Verandering", dateFmt}
		currencyFormatter = formatDutchCurrency
	case "en-US":
		dateFmt = "02/01/2006"
		headerFmt = "%-10s | %-25s | %s\n"
		localDateFmt = []string{"Date", "Description", "Change", dateFmt}
		currencyFormatter = formatUSCurrency
	default:
		return "", "", "", nil, nil, fmt.Errorf("Unknown locale: %s", locale)
	}

	return currencySymbol, dateFmt, headerFmt, localDateFmt, currencyFormatter, nil
}

func formatDutchCurrency(cents int, currencySymbol string) string {
	sign := " "
	if cents < 0 {
		sign, cents = "-", -cents
	}
	return fmt.Sprintf("%s %s%s", currencySymbol, humanReadable(cents, ".", ","), sign)
}

func formatUSCurrency(cents int, currencySymbol string) string {
	if cents < 0 {
		return fmt.Sprintf("(%s%s)", currencySymbol, humanReadable(-cents, ",", "."))
	}
	return fmt.Sprintf("%s%s ", currencySymbol, humanReadable(cents, ",", "."))
}

func humanReadable(cents int, separator, decimal string) string {
	dollars := strconv.Itoa(cents / 100)
	if len(dollars) > 3 {
		dollars = insertSeparator(dollars, separator)
	}
	return fmt.Sprintf("%s%s%02d", dollars, decimal, cents%100)
}

func insertSeparator(dollars, separator string) string {
	n := len(dollars)
	buf := make([]byte, n+(n-1)/3)
	j := len(buf)
	for i := len(dollars); i > 0; {
		if j < len(buf) {
			j--
			buf[j] = separator[0]
		}
		j--
		i--
		buf[j] = dollars[i]
	}
	return string(buf)
}