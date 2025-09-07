package gross

var units = map[string]int{
	"quarter_of_a_dozen": 3,
	"half_of_a_dozen":    6,
	"dozen":              12,
	"small_gross":        120,
	"gross":              144,
	"great_gross":        1728,
}

// Units store the Gross Store unit measurement
func Units() map[string]int {
	// Return a copy to prevent external modification of the original map
	result := make(map[string]int, len(units))
	for k, v := range units {
		result[k] = v
	}
	return result
}

// NewBill create a new bill
func NewBill() map[string]int {
	return make(map[string]int)
}

// AddItem add item to customer bill
func AddItem(bill, units map[string]int, item, unit string) bool {
	unitQuantity, ok := units[unit]
	if !ok {
		return false
	}
	bill[item] += unitQuantity
	return true
}

// RemoveItem remove item from customer bill
func RemoveItem(bill, units map[string]int, item, unit string) bool {
	itemInBill, ok := bill[item]
	if !ok {
		return false
	}
	unitQuantity, ok := units[unit]
	if !ok {
		return false
	}
	if itemInBill < unitQuantity {
		return false
	}
	itemInBill -= unitQuantity
	if itemInBill == 0 {
		delete(bill, item)
	} else {
		bill[item] = itemInBill
	}
	return true
}

// GetItem return the quantity of item that the customer has in his/her bill
func GetItem(bill map[string]int, item string) (int, bool) {
	itemInBill, ok := bill[item]
	return itemInBill, ok
}