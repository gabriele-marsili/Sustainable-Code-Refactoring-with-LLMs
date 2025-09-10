package ledger

import (
	"errors"
	"fmt"
	"math"
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
	if _, ok := locales[locale]; !ok {
		return "", errors.New("invalid locale")
	}
	for _, entry := range entries {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("invalid date")
		}
	}

	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("%-10s | %-25s | %s\n", locales[locale].Date, locales[locale].Description, locales[locale].Change))
	for _, entry := range sortEntries(entries) {
		sb.WriteString(formatEntry(locale, currency, entry))
	}
	return sb.String(), nil
}

func sortEntries(entries []Entry) []Entry {
	sorted := append([]Entry(nil), entries...)
	sort.Slice(sorted, func(i, j int) bool {
		if sorted[i].Date != sorted[j].Date {
			return sorted[i].Date < sorted[j].Date
		}
		if sorted[i].Description != sorted[j].Description {
			return sorted[i].Description < sorted[j].Description
		}
		return sorted[i].Change < sorted[j].Change
	})
	return sorted
}

func formatEntry(locale, currency string, entry Entry) string {
	date := formatDate(locale, entry.Date)
	description := formatDescription(entry.Description)
	change := formatChange(locale, currency, entry.Change)
	if entry.Change < 0 {
		return fmt.Sprintf("%-10s | %-25s | %13s\n", date, description, change)
	}
	return fmt.Sprintf("%-10s | %-25s | %12s\n", date, description, change)
}

func formatDate(locale, date string) string {
	year, month, day := date[:4], date[5:7], date[8:]
	if locale == "nl-NL" {
		return day + locales[locale].DateSeperator + month + locales[locale].DateSeperator + year
	}
	return month + locales[locale].DateSeperator + day + locales[locale].DateSeperator + year
}

func formatDescription(description string) string {
	if len(description) > 25 {
		return description[:22] + "..."
	}
	return description
}

func formatChange(locale, currency string, cents int) string {
	absCents := strconv.Itoa(int(math.Abs(float64(cents))))
	integralPart := formatIntegralPart(locale, absCents[:len(absCents)-2])
	decimalPart := absCents[len(absCents)-2:]
	change := currencyToSymbol[currency] + formatNumber(locale, integralPart, decimalPart)
	if cents < 0 {
		if locale == "en-US" {
			return "(" + change + ")"
		}
		return change + "-"
	}
	if locale == "nl-NL" {
		return currencyToSymbol[currency] + " " + change
	}
	return change
}

func formatNumber(locale, integralPart, decimalPart string) string {
	return integralPart + locales[locale].DecimalPoint + decimalPart
}

func formatIntegralPart(locale, number string) string {
	var parts []string
	for len(number) > 3 {
		parts = append([]string{number[len(number)-3:]}, parts...)
		number = number[:len(number)-3]
	}
	if len(number) > 0 {
		parts = append([]string{number}, parts...)
	}
	return strings.Join(parts, locales[locale].IntegralSeperator)
}