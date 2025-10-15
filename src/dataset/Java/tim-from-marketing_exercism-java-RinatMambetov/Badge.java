class Badge {
    public String print(Integer id, String name, String department) {
        if (department == null) {
            department = "OWNER";
        } else {
            department = department.toUpperCase();
        }

        String result;
        if (id == null) {
            result = String.format("%s - %s", name, department);
        } else {
            result = String.format("[%d] - %s - %s", id, name, department);
        }

        return result;
    }
}
