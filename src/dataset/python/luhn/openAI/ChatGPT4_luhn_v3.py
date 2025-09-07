class Luhn:
    def __init__(self, card_num):
        self.card_num = card_num.replace(" ", "")

    def valid(self):
        if len(self.card_num) <= 1 or not self.card_num.isnumeric():
            return False

        def resdigit(dig):
            doubled = dig * 2
            return doubled if doubled < 10 else doubled - 9

        digits = map(int, self.card_num)
        even_sum = sum(resdigit(d) for d in list(digits)[-2::-2])
        odd_sum = sum(digits)
        return (even_sum + odd_sum) % 10 == 0