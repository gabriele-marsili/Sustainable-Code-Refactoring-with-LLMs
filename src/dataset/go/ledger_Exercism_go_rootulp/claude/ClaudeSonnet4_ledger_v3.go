package ledger

import (
	"errors"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

type Entry struct {
	Date        string // "Y-m-d"
	Description string
	Change      int // in cents
}

type Locale struct {
	Date              string
	Description       string
	Change            string
	DateSeperator     string
	DecimalPoint      string
	IntegralSeperator string
}

var locales = map[string]Locale{
	"en-US": {
		Date:              "Date",
		Description:       "Description",
		Change:            "Change",
		DateSeperator:     "/",
		DecimalPoint:      ".",
		IntegralSeperator: ",",
	},
	"nl-NL": {
		Date:              "Datum",
		Description:       "Omschrijving",
		Change:            "Verandering",
		DateSeperator:     "-",
		DecimalPoint:      ",",
		IntegralSeperator: ".",
	},
}

var currencyToSymbol = map[string]string{
	"USD": "$",
	"EUR": "€",
}

func FormatLedger(currency string, locale string, entries []Entry) (output string, e error) {
	if !isValidCurrency(currency) {
		return "", errors.New("invalid currency")
	}
	if !isValidLocale(locale) {
		return "", errors.New("invalid locale")
	}
	if !isValidDate(entries) {
		return "", errors.New("invalid date")
	}

	var builder strings.Builder
	builder.WriteString(header(locale))
	
	sorted := sortEntries(entries)
	for _, entry := range sorted {
		builder.WriteString(formatEntry(locale, currency, entry))
	}
	return builder.String(), nil
}

func sortEntries(entries []Entry) []Entry {
	if len(entries) == 0 {
		return entries
	}
	
	sorted := make([]Entry, len(entries))
	copy(sorted, entries)
	sort.Slice(sorted, func(i, j int) bool {
		a := sorted[i]
		b := sorted[j]
		if a.Date != b.Date {
			return a.Date < b.Date
		}
		if a.Description != b.Description {
			return a.Description < b.Description
		}
		return a.Change < b.Change
	})
	return sorted
}

func formatEntry(locale string, currency string, entry Entry) string {
	date := formatDate(locale, entry.Date)
	description := formatDescription(entry.Description)
	change := formatChange(locale, currency, entry.Change)

	if isNegative(entry.Change) {
		return fmt.Sprintf("%-10s | %-25s | %13s\n", date, description, change)
	}
	return fmt.Sprintf("%-10s | %-25s | %12s\n", date, description, change)
}

func header(locale string) string {
	l := locales[locale]
	return fmt.Sprintf("%-10s | %-25s | %s\n", l.Date, l.Description, l.Change)
}

func formatDate(locale string, date string) string {
	year, month, day := date[0:4], date[5:7], date[8:10]
	sep := locales[locale].DateSeperator

	switch locale {
	case "nl-NL":
		return day + sep + month + sep + year
	case "en-US":
		return month + sep + day + sep + year
	default:
		panic("invalid locale")
	}
}

func formatDescription(description string) string {
	if len(description) > 25 {
		return description[:22] + "..."
	}
	return description
}

func formatChange(locale string, currency string, cents int) string {
	absValue := cents
	if cents < 0 {
		absValue = -cents
	}
	
	paddedChange := strconv.Itoa(absValue)
	if len(paddedChange) < 3 {
		paddedChange = strings.Repeat("0", 3-len(paddedChange)) + paddedChange
	}
	
	var builder strings.Builder
	builder.WriteString(formatCurrencySymbol(locale, currency))
	builder.WriteString(formatNumber(locale, paddedChange))
	
	change := builder.String()
	if isNegative(cents) {
		change = formatNegative(locale, change)
	}
	return change
}

func formatNumber(locale string, paddedChange string) string {
	integralPart := formatIntegralPart(locale, paddedChange)
	decimalPart := paddedChange[len(paddedChange)-2:]
	return integralPart + locales[locale].DecimalPoint + decimalPart
}

func formatCurrencySymbol(locale string, currency string) string {
	symbol := currencyToSymbol[currency]
	if locale == "nl-NL" {
		return symbol + " "
	}
	return symbol
}

func formatNegative(locale string, change string) string {
	switch locale {
	case "en-US":
		return "(" + change + ")"
	case "nl-NL":
		return change + "-"
	default:
		panic("invalid locale")
	}
}

func formatIntegralPart(locale string, paddedChange string) string {
	remainder := paddedChange[:len(paddedChange)-2]
	if len(remainder) <= 3 {
		return remainder
	}
	
	var parts []string
	for len(remainder) > 3 {
		parts = append([]string{remainder[len(remainder)-3:]}, parts...)
		remainder = remainder[:len(remainder)-3]
	}
	if len(remainder) > 0 {
		parts = append([]string{remainder}, parts...)
	}
	return strings.Join(parts, locales[locale].IntegralSeperator)
}

func isValidCurrency(currency string) bool {
	_, ok := currencyToSymbol[currency]
	return ok
}

func isValidLocale(locale string) bool {
	_, ok := locales[locale]
	return ok
}

func isValidDate(entries []Entry) bool {
	for _, entry := range entries {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return false
		}
	}
	return true
}

func isNegative(cents int) bool {
	return cents < 0
}

func absoluteValue(n int) int {
	if n < 0 {
		return -n
	}
	return n
}