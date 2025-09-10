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
	NegativeFormat    string // Added for negative formatting
	CurrencyPlacement string // Added for currency placement
}

var locales = map[string]Locale{
	"en-US": {
		Date:              "Date",
		Description:       "Description",
		Change:            "Change",
		DateSeperator:     "/",
		DecimalPoint:      ".",
		IntegralSeperator: ",",
		NegativeFormat:    "(%s)",
		CurrencyPlacement: "prefix",
	},
	"nl-NL": {
		Date:              "Datum",
		Description:       "Omschrijving",
		Change:            "Verandering",
		DateSeperator:     "-",
		DecimalPoint:      ",",
		IntegralSeperator: ".",
		NegativeFormat:    "%s-",
		CurrencyPlacement: "suffix",
	},
}

var currencyToSymbol = map[string]string{
	"USD": "$",
	"EUR": "€",
}

func FormatLedger(currency string, locale string, entries []Entry) (output string, err error) {
	if _, ok := currencyToSymbol[currency]; !ok {
		return "", errors.New("invalid currency")
	}
	l, ok := locales[locale]
	if !ok {
		return "", errors.New("invalid locale")
	}

	for _, entry := range entries {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("invalid date")
		}
	}

	outputBuilder := strings.Builder{}
	outputBuilder.WriteString(fmt.Sprintf("%-10s | %-25s | %s\n", l.Date, l.Description, l.Change))

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
		outputBuilder.WriteString(formatEntry(l, currency, entry))
	}

	return outputBuilder.String(), nil
}

func formatEntry(locale Locale, currency string, entry Entry) string {
	date := formatDate(locale, entry.Date)
	description := formatDescription(entry.Description)
	change := formatChange(locale, currency, entry.Change, locale)

	if entry.Change < 0 {
		return fmt.Sprintf("%-10s | %-25s | %13s\n", date, description, change)
	}
	return fmt.Sprintf("%-10s | %-25s | %12s\n", date, description, change)
}

func formatDate(locale Locale, date string) string {
	year, month, day := date[0:4], date[5:7], date[8:10]
	return strings.Join([]string{month, day, year}, locale.DateSeperator)
}

func formatDescription(description string) string {
	if len(description) > 25 {
		return description[:22] + "..."
	}
	return description
}

func formatChange(locale string, currency string, cents int, l Locale) string {
	absCents := abs(cents)
	paddedChange := fmt.Sprintf("%03d", absCents)
	number := formatNumber(paddedChange, l)
	symbol := currencyToSymbol[currency]

	var formatted string
	if l.CurrencyPlacement == "prefix" {
		formatted = symbol + number
	} else {
		formatted = symbol + " " + number
	}

	if cents < 0 {
		formatted = fmt.Sprintf(l.NegativeFormat, formatted)
	}

	return formatted
}

func formatNumber(paddedChange string, l Locale) string {
	integralPart := formatIntegralPart(paddedChange, l)
	decimalPart := paddedChange[len(paddedChange)-2:]
	return strings.Join([]string{integralPart, decimalPart}, l.DecimalPoint)
}

func formatIntegralPart(paddedChange string, l Locale) string {
	remainder := paddedChange[:len(paddedChange)-2]
	if len(remainder) <= 3 {
		return remainder
	}

	var parts []string
	for i := len(remainder); i > 0; i -= 3 {
		start := i - 3
		if start < 0 {
			start = 0
		}
		parts = append([]string{remainder[start:i]}, parts...)
	}
	return strings.Join(parts, l.IntegralSeperator)
}

func abs(n int) int {
	if n < 0 {
		return -n
	}
	return n
}