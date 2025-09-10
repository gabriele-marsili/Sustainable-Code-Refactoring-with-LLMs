package erratum

import "errors"

// Use performs operations on a resource, handling potential errors and panics.
func Use(opener ResourceOpener, input string) (err error) {
	var resource Resource
	var openErr error

	// Open resource with retry logic for TransientError
	for {
		resource, openErr = opener()
		if openErr == nil {
			break // Successfully opened resource
		}
		if !IsTransient(openErr) {
			return openErr // Non-transient error, return immediately
		}
	}
	defer resource.Close() // Ensure resource is closed

	// Recover from panic and handle FrobError specifically
	defer func() {
		if r := recover(); r != nil {
			frobErr, ok := r.(FrobError)
			if ok {
				resource.Defrob(frobErr.defrobTag)
				err = frobErr.inner
				return
			}
			err, ok = r.(error)
			if !ok {
				err = errors.New("unknown panic")
			}
		}
	}()

	// Perform operation on the resource
	resource.Frob(input)
	return err
}

// IsTransient checks if an error is a TransientError.
func IsTransient(err error) bool {
	_, ok := err.(TransientError)
	return ok
}