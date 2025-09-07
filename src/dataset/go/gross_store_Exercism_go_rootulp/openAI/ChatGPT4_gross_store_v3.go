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
	return units
}

// NewBill create a new bill
func NewBill() map[string]int {
	return make(map[string]int)
}

// AddItem add item to customer bill
func AddItem(bill, units map[string]int, item, unit string) bool {
	if unit_quantity, ok := units[unit]; ok {
		bill[item] += unit_quantity
		return true
	}
	return false
}

// RemoveItem remove item from customer bill
func RemoveItem(bill, units map[string]int, item, unit string) bool {
	if item_in_bill, ok := bill[item]; ok {
		if unit_quantity, ok := units[unit]; ok {
			switch {
			case item_in_bill < unit_quantity:
				return false
			case item_in_bill == unit_quantity:
				delete(bill, item)
			default:
				bill[item] -= unit_quantity
			}
			return true
		}
	}
	return false
}

// GetItem return the quantity of item that the customer has in his/her bill
func GetItem(bill map[string]int, item string) (int, bool) {
	item_in_bill, ok := bill[item]
	return item_in_bill, ok
}