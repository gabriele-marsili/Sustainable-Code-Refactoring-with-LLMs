public class SalaryCalculator {
    public double multiplierPerDaysSkipped(int daysSkipped) {
        final double PENALTY = 0.15;
        final int SALARY_MULTIPLIER = 1;
        return daysSkipped > 5 ? SALARY_MULTIPLIER - PENALTY : SALARY_MULTIPLIER;
    }

    public int multiplierPerProductsSold(int productsSold) {
        final int PRODUCTS_FOR_BIG_BONUS = 20;
        final int SMALL_MULTIPLIER = 10;
        final int BIG_MULTIPLIER = 13;
        return productsSold > PRODUCTS_FOR_BIG_BONUS ? BIG_MULTIPLIER : SMALL_MULTIPLIER;
    }

    public double bonusForProductSold(int productsSold) {
        return productsSold * multiplierPerProductsSold(productsSold);
    }

    public double finalSalary(int daysSkipped, int productsSold) {
        final double BASE_SALARY = 1000;
        final double MAX_SALARY = 2000;
        double salary = BASE_SALARY * multiplierPerDaysSkipped(daysSkipped) + bonusForProductSold(productsSold);
        return salary < MAX_SALARY ? salary : MAX_SALARY;
    }
}
