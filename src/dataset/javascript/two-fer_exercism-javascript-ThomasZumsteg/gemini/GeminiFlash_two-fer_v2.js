var TwoFer = function () {};

TwoFer.prototype.twoFer = function (who) {
  if (who === undefined) {
    who = "you";
  }
  return "One for " + who + ", one for me.";
};

export default TwoFer;