class PhoneNumber:
    def __init__(self, number):
        # Extract digits directly into a string
        digits = ''.join(c for c in number if c.isdigit())
        
        # Handle 11-digit numbers starting with '1'
        if len(digits) == 11:
            if digits[0] == '1':
                digits = digits[1:]
            else:
                raise ValueError("Not a phone number")
        
        # Validate length
        if len(digits) != 10:
            raise ValueError("Number too short or too long")
        
        # Validate area code and exchange code
        if digits[0] <= '1' or digits[3] <= '1':
            raise ValueError('Not a phone number')
        
        self.number = digits
    
    def area_code(self):
        return self.number[:3]
    
    def pretty(self):
        return f"({self.number[:3]})-{self.number[3:6]}-{self.number[6:]}"