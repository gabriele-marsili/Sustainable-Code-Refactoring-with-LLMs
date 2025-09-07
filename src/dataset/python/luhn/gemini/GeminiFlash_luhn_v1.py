class Luhn:
    def __init__(self, card_num):
        self.card_num = card_num.replace(" ", "")

    def valid(self):
        card_num = self.card_num
        if len(card_num) <= 1 or not card_num.isnumeric():
            return False

        total = 0
        for i in range(len(card_num) - 1, -1, -2):
            total += int(card_num[i])

        for i in range(len(card_num) - 2, -1, -2):
            digit = int(card_num[i])
            doubled_digit = digit * 2
            total += doubled_digit - 9 if doubled_digit > 9 else doubled_digit

        return total % 10 == 0