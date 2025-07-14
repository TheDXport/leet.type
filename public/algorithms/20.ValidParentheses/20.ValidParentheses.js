var isValid = function (s) {
  const stack = [];
  const map = { ")": "(", "}": "{", "]": "[" };
  for (let c of s) {
    if (c === "(" || c === "{" || c === "[") stack.push(c);
    else {
      if (!stack.length || stack.pop() !== map[c]) return false;
    }
  }
  return stack.length === 0;
};
