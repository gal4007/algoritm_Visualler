/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { bubbleSort } from './bubbleSort';

test('bubbleSort correctly sorts a random array and emits appropriate steps', () => {
  const initial = [42, 12, 88, 3, 25, 7, 64];
  const working = [...initial];
  const steps = [];

  let comparisons = 0;
  let swaps = 0;

  for (const step of bubbleSort(working)) {
    steps.push(step);
    if (step.type === 'compare') comparisons++;
    if (step.type === 'swap') swaps++;
  }

  // Sorted check
  const sortedExpected = [...initial].sort((a, b) => a - b);
  assert.deepEqual(working, sortedExpected, 'Working array should end up fully sorted');
  assert.ok(comparisons > 0, 'There should be comparison steps');
  assert.ok(swaps > 0, 'There should be swap steps');

  // Last step should be all-sorted
  const lastStep = steps[steps.length - 1];
  assert.equal(lastStep.type, 'all-sorted');
  assert.equal(lastStep.indices.length, initial.length);
});

test('bubbleSort terminates early on already sorted array', () => {
  const sortedArr = [1, 2, 3, 4, 5];
  const working = [...sortedArr];
  let swaps = 0;
  let comparisons = 0;

  for (const step of bubbleSort(working)) {
    if (step.type === 'compare') comparisons++;
    if (step.type === 'swap') swaps++;
  }

  assert.equal(swaps, 0, 'Should not have any swaps for sorted array');
  assert.equal(comparisons, 4, 'Should only perform 1 pass with 4 comparisons (n - 1)');
  assert.deepEqual(working, sortedArr);
});

test('bubbleSort handles single-element array', () => {
  const arr = [99];
  const working = [...arr];
  const steps = [];

  for (const step of bubbleSort(working)) {
    steps.push(step);
  }

  assert.deepEqual(working, [99]);
  assert.equal(steps.length, 2);
  assert.equal(steps[0].type, 'sorted');
  assert.equal(steps[1].type, 'all-sorted');
});
