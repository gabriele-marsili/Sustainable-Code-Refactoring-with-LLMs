class Badge {
    public String print(Integer id, String name, String department) {
        String departmentUpper;
        if (department == null) {
            departmentUpper = "OWNER";
        } else {
            departmentUpper = department.toUpperCase();
        }
        
        if (id == null) {
            return String.format("%s - %s", name, departmentUpper);
        }
        return String.format("[%d] - %s - %s", id, name, departmentUpper);
    }
}
