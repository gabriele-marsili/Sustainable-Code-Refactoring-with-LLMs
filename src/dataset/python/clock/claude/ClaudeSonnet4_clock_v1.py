class Clock:
    def __init__(self, hour, minute):
        total_minutes = hour * 60 + minute
        self.total_minutes = total_minutes % 1440  # 24 * 60 = 1440 minutes in a day
    
    def __repr__(self):
        h, m = divmod(self.total_minutes, 60)
        return f'{h:02}:{m:02}'

    def __eq__(self, other):
        return self.total_minutes == other.total_minutes

    def __add__(self, minutes):
        new_clock = Clock(0, 0)
        new_clock.total_minutes = (self.total_minutes + minutes) % 1440
        return new_clock

    def __sub__(self, minutes):
        new_clock = Clock(0, 0)
        new_clock.total_minutes = (self.total_minutes - minutes) % 1440
        return new_clock