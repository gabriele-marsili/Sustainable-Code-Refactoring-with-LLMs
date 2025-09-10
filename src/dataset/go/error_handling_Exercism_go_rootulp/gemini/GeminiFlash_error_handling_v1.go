package erratum

import (
	"fmt"
)

type opener func() (Resource, error)

func Use(open opener, s string) (err error) {
	var resource Resource
	resource, err = retry(open)
	if err != nil {
		return err
	}

	defer resource.Close()

	defer func() {
		if r := recover(); r != nil {
			if frobErr, ok := r.(FrobError); ok {
				resource.Defrob(frobErr.defrobTag)
				err = frobErr
				return
			}
			if errVal, ok := r.(error); ok {
				err = errVal
				return
			}
			err = fmt.Errorf("panic: %v", r) // Convert panic to error
		}
	}()

	resource.Frob(s)
	return nil
}

func retry(f opener) (r Resource, err error) {
	const attempts = 3 // Reduced attempts for efficiency. Adjust based on needs.
	for i := 0; i < attempts; i++ {
		r, err = f()
		if err == nil {
			return r, nil
		}
	}
	return // Returns the last resource and error
}