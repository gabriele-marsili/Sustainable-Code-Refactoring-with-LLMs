var TwoFer = function () {};

TwoFer.prototype.twoFer = function (who="you") {
  return "One for " + who.toString() + ", one for me.";
};

export default TwoFer;;
