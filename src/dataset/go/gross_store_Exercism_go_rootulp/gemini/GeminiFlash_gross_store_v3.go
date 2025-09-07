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
	// Return a copy to prevent external modification of the original map.
	newMap := make(map[string]int, len(units))
	for k, v := range units {
		newMap[k] = v
	}
	return newMap
}

// NewBill create a new bill
func NewBill() map[string]int {
	return make(map[string]int)
}

// AddItem add item to customer bill
func AddItem(bill map[string]int, units map[string]int, item, unit string) bool {
	unit_quantity, ok := units[unit]
	if !ok {
		return false
	}
	bill[item] += unit_quantity
	return true
}

// RemoveItem remove item from customer bill
func RemoveItem(bill map[string]int, units map[string]int, item, unit string) bool {
	item_in_bill, ok := bill[item]
	if !ok {
		return false
	}
	unit_quantity, ok := units[unit]
	if !ok {
		return false
	}
	if item_in_bill < unit_quantity {
		return false
	}
	item_in_bill -= unit_quantity
	if item_in_bill == 0 {
		delete(bill, item)
	} else {
		bill[item] = item_in_bill
	}
	return true
}

// GetItem return the quantity of item that the customer has in his/her bill
func GetItem(bill map[string]int, item string) (int, bool) {
	item_in_bill, ok := bill[item]
	return item_in_bill, ok
}