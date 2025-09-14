class PhoneNumber:
    def __init__(self, number):
        num = ''.join(c for c in number if c.isdigit())
        
        if len(num) == 11:
            if num[0] == '1':
                num = num[1:]
            else:
                raise ValueError("Not a phone number")
        
        if len(num) != 10:
            raise ValueError("Number too short or too long")
        
        if num[0] > '1' and num[3] > '1':
            self.number = num
        else: 
            raise ValueError('Not a phone number')
    
    def area_code(self):
        return self.number[:3]
    
    def pretty(self):
        return f"({self.number[:3]})-{self.number[3:6]}-{self.number[6:]}"