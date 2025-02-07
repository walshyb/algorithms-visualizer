/**
 * Convert a number array with null values to be readable by C++
 *
 * Sets nulls to integer min which is handled manually by C++
 */
export function cppifyArray(array) {
  return array.map((item) => (item === null ? -2147483648 : item));
}
