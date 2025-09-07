class Clock:
    __slots__ = ('_total_minutes',)
    
    def __init__(self, hour, minute):
        self._total_minutes = ((hour * 60 + minute) % 1440)
    
    @property
    def h(self):
        return self._total_minutes // 60
    
    @property
    def m(self):
        return self._total_minutes % 60
    
    def __repr__(self):
        return f'{self.h:02d}:{self.m:02d}'
    
    def __eq__(self, other):
        return self._total_minutes == other._total_minutes
    
    def __add__(self, minutes):
        new_clock = Clock.__new__(Clock)
        new_clock._total_minutes = (self._total_minutes + minutes) % 1440
        return new_clock
    
    def __sub__(self, minutes):
        new_clock = Clock.__new__(Clock)
        new_clock._total_minutes = (self._total_minutes - minutes) % 1440
        return new_clock