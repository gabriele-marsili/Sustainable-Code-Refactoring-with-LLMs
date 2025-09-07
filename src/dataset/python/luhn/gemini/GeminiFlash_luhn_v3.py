class Luhn:
    def __init__(self, card_num):
        self.card_num = card_num.replace(" ", "")

    def valid(self):
        card_num = self.card_num
        if len(card_num) <= 1 or not card_num.isnumeric():
            return False

        digits = [int(d) for d in card_num]
        total = 0
        alt = False

        for i in range(len(digits) - 1, -1, -1):
            n = digits[i]
            if alt:
                n *= 2
                if n > 9:
                    n -= 9
            total += n
            alt = not alt

        return total % 10 == 0