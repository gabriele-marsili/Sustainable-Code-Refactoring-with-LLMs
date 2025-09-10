class PhoneNumber:
    def __init__(self, number):
        digits = ''.join(filter(str.isdigit, number))

        if len(digits) == 11:
            if digits[0] == '1':
                digits = digits[1:]
            else:
                raise ValueError("Not a phone number")

        if len(digits) != 10:
            raise ValueError("Number too short or too long")

        if int(digits[0]) < 2 or int(digits[3]) < 2:
            raise ValueError('Not a phone number')

        self.number = digits

    def area_code(self):
        return self.number[:3]

    def pretty(self):
        return f"({self.area_code()})-{self.number[3:6]}-{self.number[6:]}"