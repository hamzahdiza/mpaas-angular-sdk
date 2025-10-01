import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debouncer } from '../debouncer';

describe('debouncer function', () => {
  let callback;

  beforeEach(() => {
    callback = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call the callback after the specified delay', async () => {
    vi.useFakeTimers();

    debouncer(callback, 1000);

    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('should reset the timer if called again before the delay', async () => {
    vi.useFakeTimers();

    debouncer(callback, 1000);
    debouncer(callback, 1000);

    vi.advanceTimersByTime(500);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);

    expect(callback).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('should only call the last debounced function if called multiple times rapidly', async () => {
    vi.useFakeTimers();

    debouncer(callback, 1000);
    debouncer(callback, 1000);
    debouncer(callback, 1000);

    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
