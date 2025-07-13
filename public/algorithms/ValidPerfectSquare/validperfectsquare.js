function isPerfectSquare(num) {
  if (num < 2) return true;
  let left = 2,
    right = Math.floor(num / 2);
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let square = mid * mid;
    if (square === num) return true;
    else if (square < num) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}