class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        for name in path.split('/'):
            if name in ('', '.'):
                continue
            if name == "..":
                if stack:
                    stack.pop()
            else:
                stack.append(name)
        return f"/{'/'.join(stack)}"