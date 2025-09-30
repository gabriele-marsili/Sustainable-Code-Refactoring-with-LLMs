class Luhn:
    def __init__(self, card_num):
        self.card_num = card_num.replace(" ", "")
    
    def valid(self):
        if len(self.card_num) <= 1 or not self.card_num.isnumeric():
            return False
        
        digsum = 0
        for i, digit in enumerate(reversed(self.card_num)):
            n = int(digit)
            if i % 2 == 1:
                n = n * 2
                if n > 9:
                    n -= 9
            digsum += n
        
        return digsum % 10 == 0