class Luhn:
    def __init__(self, card_num):
        self.card_num = card_num.replace(" ", "")
    
    def valid(self):
        if len(self.card_num) <= 1 or not self.card_num.isnumeric():
            return False
        
        def resdigit(dig):
            doubled = dig * 2
            return doubled - 9 if doubled > 9 else doubled

        digsum = sum(int(self.card_num[i]) if i % 2 == len(self.card_num) % 2 else resdigit(int(self.card_num[i]))
                     for i in range(len(self.card_num)))
        return digsum % 10 == 0