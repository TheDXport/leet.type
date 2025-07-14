class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0) return false;
        int original = x, reversed = 0;
        while (x != 0) {
            int digit = x % 10;
            if (reversed > (INT_MAX - digit) / 10) return false;
            reversed = reversed * 10 + digit;
            x /= 10;
        }
        return original == reversed;
    }
};