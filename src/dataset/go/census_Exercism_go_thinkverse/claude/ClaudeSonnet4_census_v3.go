// Package census simulates a system used to collect census data.
package census

// Resident represents a resident in this city.
type Resident struct {
	Name    string
	Age     int
	Address map[string]string
}

// NewResident registers a new resident in this city.
func NewResident(name string, age int, address map[string]string) *Resident {
	addressCopy := make(map[string]string, len(address))
	for k, v := range address {
		addressCopy[k] = v
	}
	
	return &Resident{
		Name:    name,
		Age:     age,
		Address: addressCopy,
	}
}

// HasRequiredInfo determines if a given resident has all of the required information.
func (r *Resident) HasRequiredInfo() bool {
	if r == nil {
		return false
	}
	return r.Name != "" && r.Address != nil && r.Address["street"] != ""
}

// Delete deletes a resident's information.
func (r *Resident) Delete() {
	if r == nil {
		return
	}
	r.Name = ""
	r.Age = 0
	for k := range r.Address {
		delete(r.Address, k)
	}
}

// Count counts all residents that have provided the required information.
func Count(residents []*Resident) int {
	if len(residents) == 0 {
		return 0
	}
	
	count := 0
	for i := range residents {
		if residents[i] != nil && residents[i].HasRequiredInfo() {
			count++
		}
	}
	
	return count
}