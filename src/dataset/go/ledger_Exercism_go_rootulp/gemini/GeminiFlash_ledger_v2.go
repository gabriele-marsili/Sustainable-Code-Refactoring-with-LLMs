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

func FormatLedger(currency string, locale string, entries []Entry) (string, error) {
	if _, ok := currencyToSymbol[currency]; !ok {
		return "", errors.New("invalid currency")
	}
	loc, ok := locales[locale]
	if !ok {
		return "", errors.New("invalid locale")
	}

	for _, entry := range entries {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("invalid date")
		}
	}

	var output strings.Builder
	output.WriteString(fmt.Sprintf("%-10s | %-25s | %s\n", loc.Date, loc.Description, loc.Change))

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
		date := formatDate(locale, entry.Date)
		description := formatDescription(entry.Description)
		change := formatChange(locale, currency, entry.Change)

		if entry.Change < 0 {
			output.WriteString(fmt.Sprintf("%-10s | %-25s | %13s\n", date, description, change))
		} else {
			output.WriteString(fmt.Sprintf("%-10s | %-25s | %12s\n", date, description, change))
		}
	}

	return output.String(), nil
}

func formatDate(locale string, date string) string {
	year, month, day := date[0:4], date[5:7], date[8:10]
	loc := locales[locale]

	switch locale {
	case "nl-NL":
		return strings.Join([]string{day, month, year}, loc.DateSeperator)
	case "en-US":
		return strings.Join([]string{month, day, year}, loc.DateSeperator)
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
	absCents := cents
	if cents < 0 {
		absCents = -cents
	}

	paddedChange := fmt.Sprintf("%03d", absCents)
	symbol := currencyToSymbol[currency]

	var change strings.Builder
	if locale == "nl-NL" {
		change.WriteString(symbol)
		change.WriteString(" ")
	} else {
		change.WriteString(symbol)
	}

	integralPart := formatIntegralPart(locale, paddedChange)
	decimalPart := paddedChange[len(paddedChange)-2:]
	loc := locales[locale]
	change.WriteString(strings.Join([]string{integralPart, decimalPart}, loc.DecimalPoint))

	formatted := change.String()
	if cents < 0 {
		if locale == "en-US" {
			formatted = fmt.Sprintf("(%s)", formatted)
		} else if locale == "nl-NL" {
			formatted = fmt.Sprintf("%s-", formatted)
		} else {
			panic("invalid locale")
		}
	}
	return formatted
}

func formatIntegralPart(locale string, paddedChange string) string {
	remainder := paddedChange[:len(paddedChange)-2]
	if len(remainder) == 0 {
		return "0"
	}

	var parts []string
	for len(remainder) > 3 {
		parts = append([]string{remainder[len(remainder)-3:]}, parts...)
		remainder = remainder[:len(remainder)-3]
	}
	parts = append([]string{remainder}, parts...)
	return strings.Join(parts, locales[locale].IntegralSeperator)
}