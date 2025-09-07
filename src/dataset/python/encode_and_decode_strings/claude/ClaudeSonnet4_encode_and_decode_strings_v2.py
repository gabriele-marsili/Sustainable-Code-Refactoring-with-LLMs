from typing import List


class Codec:
    def encode(self, strs: List[str]) -> str:
        """Encodes a list of strings to a single string."""
        if not strs:
            return ""
        
        result = []
        for s in strs:
            result.append(f"{len(s)}#{s}")
        return "".join(result)

    def decode(self, s: str) -> List[str]:
        """Decodes a single string to a list of strings."""
        if not s:
            return []
        
        result = []
        i = 0
        
        while i < len(s):
            # Find the delimiter '#'
            delimiter_pos = s.find('#', i)
            if delimiter_pos == -1:
                break
                
            # Extract length
            length = int(s[i:delimiter_pos])
            
            # Extract string of specified length
            start = delimiter_pos + 1
            result.append(s[start:start + length])
            
            # Move to next encoded string
            i = start + length
            
        return result


# Your Codec object will be instantiated and called as such:
# codec = Codec()
# codec.decode(codec.encode(strs))