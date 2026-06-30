// src/__tests__/simple.test.js
// This test doesn't need react-router-dom
describe('Simple Test', () => {
  test('should pass basic test', () => {
    expect(true).toBe(true);
  });

  test('should handle arrays', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });

  test('should handle objects', () => {
    const obj = { name: 'test', value: 123 };
    expect(obj).toHaveProperty('name', 'test');
    expect(obj.value).toBe(123);
  });

  test('should handle math operations', () => {
    expect(1 + 1).toBe(2);
    expect(2 * 3).toBe(6);
    expect(10 / 2).toBe(5);
  });
});