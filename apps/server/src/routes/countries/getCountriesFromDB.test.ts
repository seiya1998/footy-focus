function isZero(value: number): boolean {
  return value === 0;
}

test('0を渡したらTrueになる', () => {
  const result = isZero(0);
  expect(result).toBe(true);
})

test('1を渡したらFalseになる', () => {
    const result = isZero(1);
    expect(result).toBe(false);
})
