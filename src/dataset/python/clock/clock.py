class Clock:
    def __init__(self, hour, minute):
        self.m = minute%60
        self.h = (hour + minute//60)%24
    def __repr__(self):
        return f'{self.h:02}:{self.m:02}'

    def __eq__(self, other):
        return (self.h == other.h and self.m == other.m)

    def __add__(self, minutes):
        return Clock(self.h, self.m+minutes)

    def __sub__(self, minutes):
        return Clock(self.h, self.m - minutes)
