class Luhn:
    def __init__(self, card_num):
        self.card_num = card_num.replace(" ", "")
    
    def valid(self):
        if len(self.card_num) <= 1 or not self.card_num.isdigit():
            return False
        
        total = 0
        reverse_digits = self.card_num[::-1]
        
        for i, char in enumerate(reverse_digits):
            digit = int(char)
            if i % 2 == 1:  # Every second digit from right
                digit *= 2
                if digit > 9:
                    digit -= 9
            total += digit
        
        return total % 10 == 0