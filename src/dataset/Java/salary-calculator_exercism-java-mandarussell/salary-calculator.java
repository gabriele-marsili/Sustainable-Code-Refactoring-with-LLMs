import javax.security.sasl.SaslClientFactory;

public class SalaryCalculator {
    public double salaryMultiplier(int daysSkipped) {
        return (daysSkipped < 5) ? 1.0 : 0.85;
    }

    public int bonusMultiplier(int productsSold) {
        return (productsSold < 20) ? 10 : 13;
    }

    public double bonusForProductsSold(int productsSold) {
        return productsSold * this.bonusMultiplier(productsSold);
    }

    public double finalSalary(int daysSkipped, int productsSold) {
        double baseSalary = 1000.00;
        double salaryCap = 2000.00;

        double salary = (baseSalary * this.salaryMultiplier(daysSkipped));
        salary += this.bonusForProductsSold(productsSold);

        return (salary < salaryCap) ? salary : salaryCap;
    } 
}
