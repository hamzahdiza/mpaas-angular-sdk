import { checkMinimumVersion } from '../compare-version';
import { describe, it, expect } from 'vitest'

describe('checkMinimumVersion', () => {
  it('returns false if versions are equal', () => {
    expect(checkMinimumVersion('1.2.3', '1.2.3')).toBe(false);
  });

  it('returns true if minimum version is greater than current', () => {
    expect(checkMinimumVersion('1.3.0', '1.2.9')).toBe(true);
  });

  it('returns false if current version is greater than minimum', () => {
    expect(checkMinimumVersion('1.2.3', '1.3.0')).toBe(false);
  });

  it('returns true if patch in minimum is higher than in current', () => {
    expect(checkMinimumVersion('1.2.5', '1.2.3')).toBe(true);
  });

});

