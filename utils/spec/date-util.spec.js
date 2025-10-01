import { expect, test } from 'vitest';
import { dateFormat } from '../date-util';

// Raw format (server time, backend-provided timezone)
test('Convert raw format from backend to default format (raw)', () => {
  expect(dateFormat('2023-10-17 17:08:45.000+0000', 'raw', 'id', true)).toBe('2023-10-17T17:08:45.000+00:00');
});


// Datetime format with Indonesian locale (server time, WIB suffix)
test('Convert 2023-10-17 to datetime format (server, Indonesia)', () => {
  expect(dateFormat('2023-10-17T17:08:45', 'datetime', 'id', true)).toBe('17 10 2023 17:08:45 WIB');
});

// Datetime format with Indonesian locale (local time, no WIB suffix)
test('Convert 2023-10-17 to datetime format (local, Indonesia)', () => {
  expect(dateFormat('2023-10-17T17:08:45', 'datetime', 'id', false)).toBe('17 10 2023 17:08:45');
});

// Datetime format with US locale (server time, no WIB suffix)
test('Convert 2023-10-17 to datetime format (server, US)', () => {
  expect(dateFormat('2023-10-17T17:08:45', 'datetime', 'en', true)).toBe('17 10 2023 17:08:45 WIB');
});

// Short date format (Indonesian locale)
test('Convert 2023-10-17 to short date format (Indonesia)', () => {
  expect(dateFormat('2023-10-17', 'shortDate', 'en')).toBe('17 Oct 2023');
});

// Short date format (Indonesian locale)
test('Convert 2023-10-17 to short date format (Indonesia)', () => {
  expect(dateFormat('2023-10-17', 'shortDate', 'id')).toBe('17 Okt 2023');
});

// Long date format (Indonesian locale)
test('Convert 2023-10-17 to long date format (Indonesia)', () => {
  expect(dateFormat('2023-10-17', 'longDate', 'id')).toBe('17 Oktober 2023');
});

// Long date format (US locale)
test('Convert 2023-10-17 to long date format (US)', () => {
  expect(dateFormat('2023-10-17', 'longDate', 'en')).toBe('17 October 2023');
});

// Month and year format (Indonesian locale)
test('Convert 2023-10-17 to month year format (Indonesia)', () => {
  expect(dateFormat('2023-10-17', 'monthYear', 'id')).toBe('Oktober 2023');
});

// Time format (server time, Indonesian locale with WIB suffix)
test('Convert 2023-10-17T17:08:45 to time format (server, Indonesia)', () => {
  expect(dateFormat('2023-10-17T17:08:45', 'time', 'id', true)).toBe('17:08:45 WIB');
});

// Time format (local time, Indonesian locale without WIB suffix)
test('Convert 2023-10-17T17:08:45 to time format (local, Indonesia)', () => {
  expect(dateFormat('2023-10-17T17:08:45', 'time', 'id', false)).toBe('17:08:45');
});

// Hour and minute format (server time, Indonesian locale with WIB suffix)
test('Convert 2023-10-17T17:08:45 to hourMinute format (server, Indonesia)', () => {
  expect(dateFormat('2023-10-17T17:08:45', 'hourMinute', 'id', true)).toBe('17:08 WIB');
});

// Hour and minute format (local time, Indonesian locale without WIB suffix)
test('Convert 2023-10-17T17:08:45 to hourMinute format (local, Indonesia)', () => {
  expect(dateFormat('2023-10-17T17:08:45', 'hourMinute', 'id', false)).toBe('17:08');
});

// Custom format (US locale)
test('Convert 2023-10-17 to custom format in US locale', () => {
  expect(dateFormat('2023-10-17', 'D MMMM YYYY', 'en')).toBe('17 October 2023');
});

// Custom format (Non string date value)
test('Convert 1 to custom format in US locale', () => {
  expect(dateFormat(1, 'D MMMM YYYY', 'en')).toBe('1 January 1970');
});

// Handle invalid date format with space replacement
test('Handle date with space instead of T', () => {
  expect(dateFormat('2023-10-17 17:08:45.000+0000', 'datetime', 'id', true)).toBe('17 10 2023 17:08:45 WIB');
});
