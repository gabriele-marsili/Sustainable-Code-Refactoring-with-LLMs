public class SalaryCalculator {
  private static final int daysSkippedAllowance = 5;
  private static final double daysSkippedPenalty = 0.15;
  private static final double penalizedMultiplier = 1 - daysSkippedPenalty; // 0.85
  private static final int baseBonusMultiplier = 10;
  private static final int improvedBonusMultiplier = 13;
  private static final int improvedBonusMinimumProducts = 20;
  private static final double baseSalary = 1000;
  private static final double salaryCap = 2000;

  public double salaryMultiplier(int daysSkipped) {
    return daysSkipped >= daysSkippedAllowance ? penalizedMultiplier : 1.0;
  }

  public int bonusMultiplier(int productsSold) {
    return productsSold >= improvedBonusMinimumProducts
        ? improvedBonusMultiplier
        : baseBonusMultiplier;
  }

  public double bonusForProductsSold(int productsSold) {
    return productsSold * (productsSold >= improvedBonusMinimumProducts
        ? improvedBonusMultiplier
        : baseBonusMultiplier);
  }

  public double finalSalary(int daysSkipped, int productsSold) {
    double salaryMultiplier = daysSkipped >= daysSkippedAllowance ? penalizedMultiplier : 1.0;
    int bonusMultiplier = productsSold >= improvedBonusMinimumProducts
        ? improvedBonusMultiplier
        : baseBonusMultiplier;
    
    double calculatedSalary = baseSalary * salaryMultiplier + productsSold * bonusMultiplier;
    return calculatedSalary > salaryCap ? salaryCap : calculatedSalary;
  }
}