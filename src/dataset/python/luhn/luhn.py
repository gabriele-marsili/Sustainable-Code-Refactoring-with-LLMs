class Luhn:
    def __init__(self, card_num):
        self.card_num = card_num.replace(" ","")
    def valid(self):
        def resdigit(dig):
            if 2*dig < 9:
               return (2*dig)
            else:
               return (2*dig-9)
        if len(self.card_num) > 1 and self.card_num.isnumeric():
           digsum = sum([int(e) for e in self.card_num[::-2]])
           digsum += sum([resdigit(int(o)) for o in self.card_num[-2::-2]])
           return digsum % 10 == 0
        else:
           return False
