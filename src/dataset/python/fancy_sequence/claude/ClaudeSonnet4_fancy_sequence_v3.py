class Fancy:
    def __init__(self):
        self.appending = []
        self.adding = []
        self.multiplying = []
        self.MOD = 1000000007

    def append(self, val: int) -> None:
        self.appending.append(val)
        
        if self.adding:
            self.adding.append(self.adding[-1])
            self.multiplying.append(self.multiplying[-1])
        else:
            self.adding.append(0)
            self.multiplying.append(1)

    def addAll(self, inc: int) -> None:
        if self.appending:
            self.adding[-1] = (self.adding[-1] + inc) % self.MOD

    def multAll(self, m: int) -> None:
        if self.appending:
            self.adding[-1] = (self.adding[-1] * m) % self.MOD
            self.multiplying[-1] = (self.multiplying[-1] * m) % self.MOD

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.appending):
            return -1

        if idx == 0:
            prevAdding = 0
            prevMultiplying = 1
        else:
            prevAdding = self.adding[idx-1]
            prevMultiplying = self.multiplying[idx-1]

        currMultiplying = (self.multiplying[-1] * pow(prevMultiplying, self.MOD-2, self.MOD)) % self.MOD
        currAdding = (self.adding[-1] - (prevAdding * currMultiplying)) % self.MOD

        return (self.appending[idx] * currMultiplying + currAdding) % self.MOD