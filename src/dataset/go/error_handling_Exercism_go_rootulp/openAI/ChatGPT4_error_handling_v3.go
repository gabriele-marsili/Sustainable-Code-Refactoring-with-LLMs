package erratum

import (
	"fmt"
)

type opener func() (Resource, error)

func Use(open opener, s string) (err error) {
	var resource Resource
	for attempts := 0; attempts < 5; attempts++ {
		resource, err = open()
		if err == nil {
			break
		}
		if attempts == 4 {
			return err
		}
	}
	defer func() {
		if resource != nil {
			resource.Close()
		}
	}()
	defer func() {
		if r := recover(); r != nil {
			switch e := r.(type) {
			case FrobError:
				resource.Defrob(e.defrobTag)
				err = e
			case error:
				err = e
			}
		}
	}()
	resource.Frob(s)
	return nil
}