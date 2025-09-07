class Clock:
    __slots__ = ('h', 'm')

    def __init__(self, hour, minute):
        total_minutes = (hour * 60 + minute) % (24 * 60)
        self.h = total_minutes // 60
        self.m = total_minutes % 60

    def __repr__(self):
        return "{:02d}:{:02d}".format(self.h, self.m)

    def __eq__(self, other):
        return self.h == other.h and self.m == other.m

    def __add__(self, minutes):
        total_minutes = (self.h * 60 + self.m + minutes) % (24 * 60)
        hour = total_minutes // 60
        minute = total_minutes % 60
        return Clock(hour, minute)

    def __sub__(self, minutes):
        total_minutes = (self.h * 60 + self.m - minutes) % (24 * 60)
        hour = total_minutes // 60
        minute = total_minutes % 60
        return Clock(hour, minute)