/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { selectionSort, insertionSort, shellSort } from './moreSorts';

test('selectionSort correctly sorts an array and yields steps', () => {
  const initial = [64, 25, 12, 22, 11];
  const working = [...initial];
  const steps = [];

  for (const step of selectionSort(working)) {
    steps.push(step);
  }

  assert.deepEqual(working, [11, 12, 22, 25, 64]);
  assert.equal(steps[steps.length - 1].type, 'all-sorted');
});

test('insertionSort correctly sorts an array and yields steps', () => {
  const initial = [12, 11, 13, 5, 6];
  const working = [...initial];
  const steps = [];

  for (const step of insertionSort(working)) {
    steps.push(step);
  }

  assert.deepEqual(working, [5, 6, 11, 12, 13]);
  assert.equal(steps[steps.length - 1].type, 'all-sorted');
});

test('shellSort correctly sorts an array and reports gap in descriptions', () => {
  const initial = [23, 12, 1, 8, 34, 54, 2, 3];
  const working = [...initial];
  const steps = [];

  for (const step of shellSort(working)) {
    steps.push(step);
    if (step.type === 'compare') {
      assert.ok(step.description.includes('gap ='), 'Description must contain gap');
    }
  }

  assert.deepEqual(working, [1, 2, 3, 8, 12, 23, 34, 54]);
  assert.equal(steps[steps.length - 1].type, 'all-sorted');
});
