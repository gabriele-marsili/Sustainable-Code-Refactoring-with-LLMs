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
	if unitQuantity, exists := units[unit]; exists {
		bill[item] += unitQuantity
		return true
	}
	return false
}

// RemoveItem removes an item from the customer bill
func RemoveItem(bill, units map[string]int, item, unit string) bool {
	if itemQuantity, exists := bill[item]; exists {
		if unitQuantity, validUnit := units[unit]; validUnit {
			switch {
			case itemQuantity < unitQuantity:
				return false
			case itemQuantity == unitQuantity:
				delete(bill, item)
			default:
				bill[item] -= unitQuantity
			}
			return true
		}
	}
	return false
}

// GetItem returns the quantity of an item in the customer's bill
func GetItem(bill map[string]int, item string) (int, bool) {
	itemQuantity, exists := bill[item]
	return itemQuantity, exists
}