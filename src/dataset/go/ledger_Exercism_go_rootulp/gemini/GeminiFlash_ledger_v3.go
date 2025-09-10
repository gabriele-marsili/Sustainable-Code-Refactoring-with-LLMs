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

	outputBuilder := strings.Builder{}
	outputBuilder.WriteString(header(locale))

	sortedEntries := make([]Entry, len(entries))
	copy(sortedEntries, entries)
	sort.Slice(sortedEntries, func(i, j int) bool {
		if sortedEntries[i].Date != sortedEntries[j].Date {
			return sortedEntries[i].Date < sortedEntries[j].Date
		}
		if sortedEntries[i].Description != sortedEntries[j].Description {
			return sortedEntries[i].Description < sortedEntries[j].Description
		}
		return sortedEntries[i].Change < sortedEntries[j].Change
	})

	for _, entry := range sortedEntries {
		outputBuilder.WriteString(formatEntry(locale, currency, entry))
	}

	return outputBuilder.String(), nil
}

func formatEntry(locale string, currency string, entry Entry) string {
	date := formatDate(locale, entry.Date)
	description := formatDescription(entry.Description)
	change := formatChange(locale, currency, entry.Change)

	if entry.Change < 0 {
		return fmt.Sprintf("%-10s | %-25s | %13s\n", date, description, change)
	}
	return fmt.Sprintf("%-10s | %-25s | %12s\n", date, description, change)
}

func header(locale string) string {
	loc := locales[locale]
	return fmt.Sprintf("%-10s | %-25s | %s\n", loc.Date, loc.Description, loc.Change)
}

func formatDate(locale string, date string) string {
	year := date[:4]
	month := date[5:7]
	day := date[8:10]

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
	absCents := abs(cents)
	paddedChange := fmt.Sprintf("%03d", absCents)

	symbol := currencyToSymbol[currency]
	var change string
	if locale == "nl-NL" {
		change = symbol + " "
	} else {
		change = symbol
	}

	integralPart := formatIntegralPart(locale, paddedChange)
	decimalPart := paddedChange[len(paddedChange)-2:]
	change += integralPart + locales[locale].DecimalPoint + decimalPart

	if cents < 0 {
		if locale == "en-US" {
			change = "(" + change + ")"
		} else if locale == "nl-NL" {
			change = change + "-"
		} else {
			panic("invalid locale")
		}
	}

	return change
}

func formatIntegralPart(locale string, paddedChange string) string {
	remainder := paddedChange[:len(paddedChange)-2]
	lenRemainder := len(remainder)
	if lenRemainder == 0 {
		return "0"
	}

	var parts []string
	for lenRemainder > 3 {
		parts = append([]string{remainder[lenRemainder-3:]}, parts...)
		lenRemainder -= 3
		remainder = remainder[:lenRemainder]
	}
	parts = append([]string{remainder}, parts...)
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
		if len(entry.Date) != 10 {
			return false
		}
		if entry.Date[4] != '-' || entry.Date[7] != '-' {
			return false
		}
	}
	return true
}

func abs(n int) int {
	if n < 0 {
		return -n
	}
	return n
}