class Fancy:
    def __init__(self):
        self.sequence = []
        self.add = 0
        self.mult = 1
        self.operations = []
        self.mod = 10**9 + 7

    def append(self, val: int) -> None:
        self.sequence.append(val)
        self.operations.append((self.add, self.mult))

    def addAll(self, inc: int) -> None:
        self.add = (self.add + inc) % self.mod

    def multAll(self, m: int) -> None:
        self.add = (self.add * m) % self.mod
        self.mult = (self.mult * m) % self.mod

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.sequence):
            return -1

        initial_add, initial_mult = self.operations[idx]
        
        current_val = self.sequence[idx]
        
        # Reverse modular arithmetic to find the "delta" add and mult
        inv_initial_mult = pow(initial_mult, self.mod - 2, self.mod)  # Modular inverse
        
        delta_mult = (self.mult * inv_initial_mult) % self.mod
        delta_add = (self.add - (initial_add * delta_mult)) % self.mod

        return (current_val * delta_mult + delta_add) % self.mod