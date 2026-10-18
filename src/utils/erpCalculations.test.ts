import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrencyINR,
  calculatePercentage,
  aggregateAttendance,
  computeFeeMetrics,
  filterBySearchTerm,
} from './erpCalculations.ts';

test('formatCurrencyINR formats Indian currency numbers with commas properly', () => {
  assert.equal(formatCurrencyINR(0), '₹0');
  assert.equal(formatCurrencyINR(500), '₹500');
  assert.equal(formatCurrencyINR(1250), '₹1,250');
  assert.equal(formatCurrencyINR(50000), '₹50,000');
  assert.equal(formatCurrencyINR(342500), '₹3,42,500');
  assert.equal(formatCurrencyINR(12500000), '₹1,25,00,000');
});

test('calculatePercentage safely handles positive values and zero denominator', () => {
  assert.equal(calculatePercentage(0, 100), 0);
  assert.equal(calculatePercentage(50, 0), 0);
  assert.equal(calculatePercentage(942, 1000), 94.2);
  assert.equal(calculatePercentage(1338, 1420), 94.2);
});

test('aggregateAttendance sums counts and computes overall attendance rate', () => {
  const groups = [
    { present: 480, total: 500 }, // Primary
    { present: 375, total: 400 }, // Middle
    { present: 285, total: 300 }, // Secondary
    { present: 198, total: 220 }, // Senior Sec
  ];
  const result = aggregateAttendance(groups);
  assert.equal(result.totalPresent, 1338);
  assert.equal(result.totalEnrolled, 1420);
  assert.equal(result.percentage, 94.2);
});

test('computeFeeMetrics calculates total expected, collected, pending, and rate', () => {
  const records = [
    { amount: 10000, paid: 10000 },
    { amount: 15000, paid: 10000 },
    { amount: 20000, paid: 12000 },
  ];
  const metrics = computeFeeMetrics(records);
  assert.equal(metrics.totalExpected, 45000);
  assert.equal(metrics.totalCollected, 32000);
  assert.equal(metrics.totalPending, 13000);
  assert.equal(metrics.collectionRate, 71.1);
});

test('filterBySearchTerm correctly searches records across multiple keys', () => {
  const items = [
    { name: 'Aarav Sharma', grade: 'Class 10', roll: '1001' },
    { name: 'Priya Verma', grade: 'Class 8', roll: '802' },
    { name: 'Rahul Gautam', grade: 'Class 12', roll: '1205' },
  ];
  const result = filterBySearchTerm(items, 'Aarav', ['name', 'grade', 'roll']);
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Aarav Sharma');

  const class12Result = filterBySearchTerm(items, 'class 12', ['name', 'grade']);
  assert.equal(class12Result.length, 1);
  assert.equal(class12Result[0].name, 'Rahul Gautam');

  const emptyFilter = filterBySearchTerm(items, '', ['name']);
  assert.equal(emptyFilter.length, 3);
});
