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
	if _, ok := locales[locale]; !ok {
		return "", errors.New("invalid locale")
	}

	for _, entry := range entries {
		if len(entry.Date) != 10 || entry.Date[4] != '-' || entry.Date[7] != '-' {
			return "", errors.New("invalid date")
		}
	}

	sort.Slice(entries, func(i, j int) bool {
		if entries[i].Date != entries[j].Date {
			return entries[i].Date < entries[j].Date
		}
		if entries[i].Description != entries[j].Description {
			return entries[i].Description < entries[j].Description
		}
		return entries[i].Change < entries[j].Change
	})

	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("%-10s | %-25s | %s\n", locales[locale].Date, locales[locale].Description, locales[locale].Change))

	for _, entry := range entries {
		date := formatDate(locale, entry.Date)
		description := formatDescription(entry.Description)
		change := formatChange(locale, currency, entry.Change)

		if entry.Change < 0 {
			sb.WriteString(fmt.Sprintf("%-10s | %-25s | %13s\n", date, description, change))
		} else {
			sb.WriteString(fmt.Sprintf("%-10s | %-25s | %12s\n", date, description, change))
		}
	}

	return sb.String(), nil
}

func formatDate(locale string, date string) string {
	year, month, day := date[0:4], date[5:7], date[8:10]

	switch locale {
	case "nl-NL":
		return strings.Join([]string{day, month, year}, locales[locale].DateSeperator)
	case "en-US":
		return strings.Join([]string{month, day, year}, locales[locale].DateSeperator)
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

	var change string
	switch locale {
	case "en-US":
		change = symbol + formatNumber(locale, paddedChange)
		if cents < 0 {
			change = fmt.Sprintf("(%s)", change)
		}
	case "nl-NL":
		change = symbol + " " + formatNumber(locale, paddedChange)
		if cents < 0 {
			change = change + "-"
		}
	default:
		panic("invalid locale")
	}

	return change
}

func formatNumber(locale string, paddedChange string) string {
	integralPart := formatIntegralPart(locale, paddedChange)
	decimalPart := paddedChange[len(paddedChange)-2:]
	return strings.Join([]string{integralPart, decimalPart}, locales[locale].DecimalPoint)
}

func formatIntegralPart(locale string, paddedChange string) string {
	remainder := paddedChange[:len(paddedChange)-2]
	if len(remainder) <= 3 {
		return remainder
	}

	var parts []string
	for len(remainder) > 0 {
		n := len(remainder)
		if n > 3 {
			n = 3
		}
		parts = append([]string{remainder[len(remainder)-n:]}, parts...)
		remainder = remainder[:len(remainder)-n]
	}
	return strings.Join(parts, locales[locale].IntegralSeperator)
}