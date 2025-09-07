class Clock:
    __slots__ = ('h', 'm')  # Reduce memory usage by limiting attributes

    def __init__(self, hour, minute):
        total_minutes = (hour * 60 + minute) % 1440
        self.h, self.m = divmod(total_minutes, 60)

    def __repr__(self):
        return f'{self.h:02}:{self.m:02}'

    def __eq__(self, other):
        return self.h == other.h and self.m == other.m

    def __add__(self, minutes):
        return Clock(0, self.h * 60 + self.m + minutes)

    def __sub__(self, minutes):
        return Clock(0, self.h * 60 + self.m - minutes)