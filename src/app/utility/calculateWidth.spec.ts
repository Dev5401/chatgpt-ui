import { beforeEach, describe } from 'node:test';
import { calculateWidth } from './calculateWidth';

describe('calculateWidth', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns the width', () => {
    const mockText = "Let's learn react";

    expect(calculateWidth(mockText)).toBe(8.5);
  });
});
