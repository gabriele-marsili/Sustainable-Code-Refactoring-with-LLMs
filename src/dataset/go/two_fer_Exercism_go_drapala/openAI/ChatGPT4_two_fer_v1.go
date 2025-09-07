package twofer

// ShareWith returns a string in the format "One for <name>, one for me."
func ShareWith(name string) string {
    if name == "" {
        return "One for you, one for me."
    }
    return "One for " + name + ", one for me."
}