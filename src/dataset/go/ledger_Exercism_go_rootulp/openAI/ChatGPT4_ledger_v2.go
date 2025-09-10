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
	sb.WriteString(header(locale))
	for _, entry := range sortEntries(entries) {
		sb.WriteString(formatEntry(locale, currency, entry))
	}
	return sb.String(), nil
}

func sortEntries(entries []Entry) []Entry {
	sort.Slice(entries, func(i, j int) bool {
		if entries[i].Date != entries[j].Date {
			return entries[i].Date < entries[j].Date
		}
		if entries[i].Description != entries[j].Description {
			return entries[i].Description < entries[j].Description
		}
		return entries[i].Change < entries[j].Change
	})
	return entries
}

func formatEntry(locale, currency string, entry Entry) string {
	date := formatDate(locale, entry.Date)
	description := formatDescription(entry.Description)
	change := formatChange(locale, currency, entry.Change)
	return fmt.Sprintf("%-10s | %-25s | %13s\n", date, description, change)
}

func header(locale string) string {
	loc := locales[locale]
	return fmt.Sprintf("%-10s | %-25s | %s\n", loc.Date, loc.Description, loc.Change)
}

func formatDate(locale, date string) string {
	year, month, day := date[:4], date[5:7], date[8:10]
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
	absCents := absoluteValue(cents)
	integralPart := formatIntegralPart(locale, absCents/100)
	decimalPart := fmt.Sprintf("%02d", absCents%100)
	change := currencyToSymbol[currency] + locales[locale].IntegralSeperator + integralPart + locales[locale].DecimalPoint + decimalPart
	if cents < 0 {
		if locale == "en-US" {
			return fmt.Sprintf("(%s)", change)
		}
		return change + "-"
	}
	return change
}

func formatIntegralPart(locale string, value int) string {
	var parts []string
	for value > 0 {
		parts = append([]string{fmt.Sprintf("%03d", value%1000)}, parts...)
		value /= 1000
	}
	if len(parts) == 0 {
		return "0"
	}
	return strings.Join(parts, locales[locale].IntegralSeperator)
}

func absoluteValue(n int) int {
	if n < 0 {
		return -n
	}
	return n
}