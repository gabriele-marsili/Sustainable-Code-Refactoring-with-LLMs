class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        for name in path.split('/'):
            if name == "..":
                if stack:
                    stack.pop()
            elif name and name != ".":
                stack.append(name)
        return '/' + '/'.join(stack)