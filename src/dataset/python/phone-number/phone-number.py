class PhoneNumber:
    def __init__(self, number):
        num = []
        for i in number:
            if i.isdigit() == True:
               num.append(i)
        if len(num) == 11:
           if num[0] == '1':
              num.pop(0)
           else:
              raise ValueError("Not a phone number")
        if len(num) != 10:
           raise ValueError("Number too short or too long")
        if int(num[0]) > 1 and int(num[3]) > 1:
           self.number = "".join(num)
        else: 
           raise ValueError('Not a phone number')
    def area_code(self):
        return self.number[:3]
    def pretty(self):
        return "(" + self.area_code() + ")-" + self.number[3:6] + '-' + self.number[6:] 
