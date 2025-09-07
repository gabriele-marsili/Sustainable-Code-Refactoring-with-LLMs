package gross

var units = map[string]int{
	"quarter_of_a_dozen": 3,
	"half_of_a_dozen":    6,
	"dozen":              12,
	"small_gross":        120,
	"gross":              144,
	"great_gross":        1728,
}

// Units returns a copy of the Gross Store unit measurement to prevent external modification
func Units() map[string]int {
	copy := make(map[string]int, len(units))
	for k, v := range units {
		copy[k] = v
	}
	return copy
}

// NewBill creates a new bill
func NewBill() map[string]int {
	return make(map[string]int)
}

// AddItem adds an item to the customer bill
func AddItem(bill, units map[string]int, item, unit string) bool {
	if unitQuantity, ok := units[unit]; ok {
		bill[item] += unitQuantity
		return true
	}
	return false
}

// RemoveItem removes an item from the customer bill
func RemoveItem(bill, units map[string]int, item, unit string) bool {
	unitQuantity, unitExists := units[unit]
	itemQuantity, itemExists := bill[item]

	if !unitExists || !itemExists || itemQuantity < unitQuantity {
		return false
	}

	if itemQuantity == unitQuantity {
		delete(bill, item)
	} else {
		bill[item] -= unitQuantity
	}
	return true
}

// GetItem returns the quantity of an item in the customer's bill
func GetItem(bill map[string]int, item string) (int, bool) {
	itemQuantity, ok := bill[item]
	return itemQuantity, ok
}