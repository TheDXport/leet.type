def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')':'(', '}':'{', ']':'['}
        for c in s:
            if c in mapping.values():
                stack.append(c)
            else:
                if not stack or stack.pop() != mapping[c]:
                    return False
        return not stack
