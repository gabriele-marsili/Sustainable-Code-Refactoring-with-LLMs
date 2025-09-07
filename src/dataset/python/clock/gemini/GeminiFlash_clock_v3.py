class Clock:
    def __init__(self, hour, minute):
        total_minutes = (hour * 60 + minute) % (24 * 60)
        self.h = total_minutes // 60
        self.m = total_minutes % 60

    def __repr__(self):
        return f'{self.h:02}:{self.m:02}'

    def __eq__(self, other):
        return self.h == other.h and self.m == other.m

    def __add__(self, minutes):
        total_minutes = (self.h * 60 + self.m + minutes)
        new_hour = (total_minutes // 60) % 24
        new_minute = total_minutes % 60
        return Clock(new_hour, new_minute)

    def __sub__(self, minutes):
        total_minutes = (self.h * 60 + self.m - minutes)
        new_hour = (total_minutes // 60) % 24
        new_minute = total_minutes % 60
        return Clock(new_hour, new_minute)