/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { quickSort } from './quickSort';

test('quickSort correctly sorts a random array and emits appropriate steps', () => {
  const initial = [33, 10, 55, 71, 14, 99, 2, 45];
  const working = [...initial];
  const steps = [];

  let comparisons = 0;
  let swaps = 0;
  let pivots = 0;

  for (const step of quickSort(working)) {
    steps.push(step);
    if (step.type === 'compare') comparisons++;
    if (step.type === 'swap') swaps++;
    if (step.type === 'pivot') pivots++;
  }

  // Sorted check
  const sortedExpected = [...initial].sort((a, b) => a - b);
  assert.deepEqual(working, sortedExpected, 'Working array should end up fully sorted');
  assert.ok(comparisons > 0, 'There should be comparison steps');
  assert.ok(pivots > 0, 'There should be pivot selection steps');

  // Last step should be all-sorted
  const lastStep = steps[steps.length - 1];
  assert.equal(lastStep.type, 'all-sorted');
  assert.equal(lastStep.indices.length, initial.length);
});

test('quickSort handles already sorted array', () => {
  const sortedArr = [5, 10, 15, 20];
  const working = [...sortedArr];

  for (const _ of quickSort(working)) {
    // step through
  }

  assert.deepEqual(working, sortedArr);
});

test('quickSort handles reverse-sorted array', () => {
  const revArr = [50, 40, 30, 20, 10];
  const working = [...revArr];

  for (const _ of quickSort(working)) {
    // step through
  }

  assert.deepEqual(working, [10, 20, 30, 40, 50]);
});
