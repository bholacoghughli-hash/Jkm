/**
 * Pure calculation utilities for JK Montessori School ERP
 * Developed by Bhaskar Gautam
 */

export interface FeeEntry {
  amount: number;
  paid: number;
}

export interface AttendanceGroup {
  present: number;
  total: number;
}

/**
 * Formats an amount in Indian Rupee format (e.g. ₹3,42,500)
 */
export function formatCurrencyINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  const rounded = Math.round(amount);
  const isNegative = rounded < 0;
  const absStr = Math.abs(rounded).toString();

  if (absStr.length <= 3) {
    return `${isNegative ? '-' : ''}₹${absStr}`;
  }

  const lastThree = absStr.substring(absStr.length - 3);
  const otherNumbers = absStr.substring(0, absStr.length - 3);
  const formattedOthers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

  return `${isNegative ? '-' : ''}₹${formattedOthers},${lastThree}`;
}

/**
 * Calculates percentage safely avoiding division by zero
 */
export function calculatePercentage(numerator: number, denominator: number, decimals: number = 1): number {
  if (!denominator || denominator <= 0) return 0;
  const val = (numerator / denominator) * 100;
  return Number(val.toFixed(decimals));
}

/**
 * Aggregates overall attendance percentage from wing groups
 */
export function aggregateAttendance(groups: AttendanceGroup[]): { totalPresent: number; totalEnrolled: number; percentage: number } {
  const totalPresent = groups.reduce((acc, curr) => acc + curr.present, 0);
  const totalEnrolled = groups.reduce((acc, curr) => acc + curr.total, 0);
  const percentage = calculatePercentage(totalPresent, totalEnrolled, 1);

  return {
    totalPresent,
    totalEnrolled,
    percentage,
  };
}

/**
 * Computes fee summary metrics
 */
export function computeFeeMetrics(entries: FeeEntry[]): {
  totalExpected: number;
  totalCollected: number;
  totalPending: number;
  collectionRate: number;
} {
  const totalExpected = entries.reduce((acc, curr) => acc + curr.amount, 0);
  const totalCollected = entries.reduce((acc, curr) => acc + curr.paid, 0);
  const totalPending = Math.max(0, totalExpected - totalCollected);
  const collectionRate = calculatePercentage(totalCollected, totalExpected, 1);

  return {
    totalExpected,
    totalCollected,
    totalPending,
    collectionRate,
  };
}

/**
 * Filter an array of items by a search string across specified keys
 */
export function filterBySearchTerm<T>(items: T[], term: string, searchKeys: (keyof T)[]): T[] {
  if (!term || term.trim() === '') return items;
  const cleanTerm = term.toLowerCase().trim();

  return items.filter((item) =>
    searchKeys.some((key) => {
      const val = item[key];
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(cleanTerm);
    })
  );
}
