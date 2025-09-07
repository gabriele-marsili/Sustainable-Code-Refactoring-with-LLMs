class Luhn:
    def __init__(self, card_num):
        self.card_num = card_num.replace(" ", "")
    
    def valid(self):
        if len(self.card_num) <= 1 or not self.card_num.isdigit():
            return False
        
        total = 0
        reverse_digits = self.card_num[::-1]
        
        for i, digit in enumerate(reverse_digits):
            n = int(digit)
            if i % 2 == 1:
                n *= 2
                if n > 9:
                    n -= 9
            total += n
        
        return total % 10 == 0