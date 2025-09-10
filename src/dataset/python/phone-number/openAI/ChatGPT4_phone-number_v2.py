class PhoneNumber:
    def __init__(self, number):
        num = [i for i in number if i.isdigit()]
        if len(num) == 11 and num[0] == '1':
            num = num[1:]
        if len(num) != 10 or num[0] < '2' or num[3] < '2':
            raise ValueError("Not a phone number")
        self.number = "".join(num)

    def area_code(self):
        return self.number[:3]

    def pretty(self):
        return f"({self.area_code()})-{self.number[3:6]}-{self.number[6:]}"