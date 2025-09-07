class Luhn:
    def __init__(self, card_num):
        self.card_num = card_num.replace(" ", "")
    
    def valid(self):
        if len(self.card_num) <= 1 or not self.card_num.isdigit():
            return False
        
        total = 0
        double = False
        for digit in reversed(self.card_num):
            num = int(digit)
            if double:
                num = num * 2
                if num > 9:
                    num -= 9
            total += num
            double = not double
        
        return total % 10 == 0