package erratum

type opener func() (Resource, error)

func Use(open opener, s string) (err error) {
	resource, err := retry(5, open)
	if err != nil {
		return err
	}
	defer resource.Close()

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

func retry(attempts int, f func() (Resource, error)) (Resource, error) {
	var err error
	for i := 0; i < attempts; i++ {
		var r Resource
		r, err = f()
		if err == nil {
			return r, nil
		}
	}
	return nil, err
}