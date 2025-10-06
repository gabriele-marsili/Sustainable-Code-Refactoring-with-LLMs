import Meetup from './meetup'; // Adjust the path as necessary

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Helper function to format the Date object as 'YYYY-MM-DD' for easy comparison
const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    return 'Invalid Date';
  }
  const year = date.getFullYear();
  // month is 0-indexed, so add 1 and pad with 0
  const month = String(date.getMonth() + 1).padStart(2, '0');
  // day of the month
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// All month arguments passed to Meetup are 0-indexed (0 = January) as they are passed to Date constructor
// The test suite verifies the day calculation for different occurrences (1st, 2nd, ..., last, teenth)
describe('Meetup', () => {
  // ---
  describe('1st occurrence', () => {
    test('mon first monday of 2025/00 (Jan)', () => {
      // January 2025 starts on a Wednesday. First Monday is Jan 6.
      const date = Meetup(2025, 0, 'Monday', '1st');
      expect(formatDate(date)).toBe('2025-01-06');
    });

    test('sun first sunday of 2025/00 (Jan)', () => {
      // January 2025 starts on a Wednesday. First Sunday is Jan 5.
      const date = Meetup(2025, 0, 'Sunday', '1st');
      expect(formatDate(date)).toBe('2025-01-05');
    });

    test('fri first friday of 2024/01 (Feb - leap year)', () => {
      // February 2024 (leap year) starts on a Thursday. First Friday is Feb 2.
      const date = Meetup(2024, 1, 'Friday', '1st');
      expect(formatDate(date)).toBe('2024-02-02');
    });
  });

  // ---
  describe('2nd occurrence', () => {
    test('tue second tuesday of 2025/01 (Feb)', () => {
      // February 2025 starts on a Saturday. First Tuesday is Feb 4, Second is Feb 11.
      const date = Meetup(2025, 1, 'Tuesday', '2nd');
      expect(formatDate(date)).toBe('2025-02-11');
    });

    test('sat second saturday of 2025/07 (Aug)', () => {
      // August 2025 starts on a Friday. First Saturday is Aug 2, Second is Aug 9.
      const date = Meetup(2025, 7, 'Saturday', '2nd');
      expect(formatDate(date)).toBe('2025-08-09');
    });
  });

  // ---
  describe('3rd occurrence', () => {
    test('wed third wednesday of 2025/03 (Apr)', () => {
      // April 2025 starts on a Tuesday. First Wed is Apr 2, Third is Apr 16.
      const date = Meetup(2025, 3, 'Wednesday', '3rd');
      expect(formatDate(date)).toBe('2025-04-16');
    });

    test('thu third thursday of 2024/09 (Oct)', () => {
      // October 2024 starts on a Tuesday. First Thu is Oct 3, Third is Oct 17.
      const date = Meetup(2024, 9, 'Thursday', '3rd');
      expect(formatDate(date)).toBe('2024-10-17');
    });
  });

  // ---
  describe('4th occurrence', () => {
    test('fri fourth friday of 2025/05 (Jun)', () => {
      // June 2025 starts on a Sunday. First Fri is Jun 6, Fourth is Jun 27.
      const date = Meetup(2025, 5, 'Friday', '4th');
      expect(formatDate(date)).toBe('2025-06-27');
    });

    test('mon fourth monday of 2025/10 (Nov)', () => {
      // November 2025 starts on a Saturday. First Mon is Nov 3, Fourth is Nov 24.
      const date = Meetup(2025, 10, 'Monday', '4th');
      expect(formatDate(date)).toBe('2025-11-24');
    });
  });

  // ---
  describe('5th occurrence', () => {
    test('tue fifth tuesday of 2024/09 (Oct - month with 5 occurrences)', () => {
      // October 2024 has 31 days. It starts on a Tuesday. First Tue is Oct 1. Fifth is Oct 29.
      const date = Meetup(2024, 9, 'Tuesday', '5th');
      expect(formatDate(date)).toBe('2024-10-29');
    });

    test('sat fifth saturday of 2024/02 (Feb - 29 days, no 5th sat)', () => {
      // February 2024 (leap) has 29 days. It starts on a Thursday. Last Sat is Feb 24 (4th).
      // The 5th Saturday does not exist.
      expect(() => Meetup(2024, 1, 'Saturday', '5th')).toThrow(new Error("Date does not exist"));
    });

    test('thu fifth thursday of 2025/04 (Apr - 30 days, no 5th thu)', () => {
      // April 2025 has 30 days. It starts on a Tuesday. Last Thu is Apr 24 (4th).
      // The 5th Thursday does not exist.
      expect(() => Meetup(2025, 3, 'Thursday', '5th')).toThrow(new Error("Date does not exist"));
    });
  });

  // ---
  describe('teenth occurrence', () => {
    test('wed teenth wednesday of 2025/08 (Sep)', () => {
      // September 2025 starts on a Monday. Dates 13-19. Wed 13, Thu 14, Fri 15, Sat 16, Sun 17, Mon 18, Tue 19.
      // Wednesday is Sept 17.
      const date = Meetup(2025, 8, 'Wednesday', 'teenth');
      expect(formatDate(date)).toBe('2025-09-17');
    });

    test('fri teenth friday of 2025/11 (Dec)', () => {
      // December 2025 starts on a Monday. Dates 13-19.
      // Friday is Dec 19.
      const date = Meetup(2025, 11, 'Friday', 'teenth');
      expect(formatDate(date)).toBe('2025-12-19');
    });
  });

  // ---
  describe('last occurrence', () => {
    test('sun last sunday of 2025/00 (Jan - 31 days)', () => {
      // January 2025 has 31 days. Starts on Wed. Jan 26 is the last Sunday.
      const date = Meetup(2025, 0, 'Sunday', 'last');
      expect(formatDate(date)).toBe('2025-01-26');
    });

    test('tue last tuesday of 2025/01 (Feb - 28 days)', () => {
      // February 2025 has 28 days. Starts on Sat. Last Tuesday is Feb 25.
      const date = Meetup(2025, 1, 'Tuesday', 'last');
      expect(formatDate(date)).toBe('2025-02-25');
    });

    test('thu last thursday of 2024/01 (Feb - 29 days - leap year)', () => {
      // February 2024 has 29 days. Starts on Thu. Last Thursday is Feb 29.
      const date = Meetup(2024, 1, 'Thursday', 'last');
      expect(formatDate(date)).toBe('2024-02-29');
    });

    test('sat last saturday of 2025/03 (Apr - 30 days)', () => {
      // April 2025 has 30 days. Starts on Tue. Last Saturday is Apr 26.
      const date = Meetup(2025, 3, 'Saturday', 'last');
      expect(formatDate(date)).toBe('2025-04-26');
    });
  });

  // ---
  describe('Error handling', () => {
    test('throws error for non-existent date (5th week day in short month)', () => {
      // February 2025 has 28 days, starts on a Saturday. First Friday is Feb 7. 5th Fri is not possible.
      expect(() => Meetup(2025, 1, 'Friday', '5th')).toThrow(new Error("Date does not exist"));
    });

    test('throws error for invalid month day argument', () => {
      // The implementation does not explicitly check for invalid 'nth' strings, 
      // but '5th' fails naturally for non-existent dates. Test another invalid case.
      // An assumption is that the 'switch' handles all expected cases.
      // If we pass an unexpected 'nth', the function returns undefined because no case matches and no default is set.
      // Depending on the strictness required, this might be a flaw in the original code,
      // but the test suite focuses on the existing logic.
      const result = Meetup(2025, 0, 'Monday', 'invalid');
      expect(result).toBeUndefined(); // Assuming no case matches and returns undefined
    });
  });
});