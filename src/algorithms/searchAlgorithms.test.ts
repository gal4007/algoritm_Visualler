/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  linearSearch,
  binarySearch,
  jumpSearch,
  interpolationSearch,
  SearchStep,
} from './searchAlgorithms.ts';

describe('Search Algorithms Generators', () => {
  const sortedArray = [5, 12, 18, 23, 29, 34, 41, 48, 55, 60, 67, 72, 79, 83, 88, 91, 94, 96, 98, 100];
  const unsortedArray = [45, 12, 89, 34, 23, 78, 90, 11, 56, 67, 88, 4, 19, 52, 63, 71, 82, 95, 33, 27];

  describe('linearSearch', () => {
    it('successfully finds an existing target in unsorted array', () => {
      const target = 78; // at index 5
      const gen = linearSearch(unsortedArray, target);
      const steps: SearchStep[] = [];
      let res = gen.next();
      while (!res.done) {
        steps.push(res.value);
        res = gen.next();
      }

      assert.ok(steps.length > 0, 'Should yield steps');
      const lastStep = steps[steps.length - 1];
      assert.strictEqual(lastStep.type, 'sorted', 'Last step should indicate target found');
      assert.deepStrictEqual(lastStep.indices, [5], 'Target index should be 5');
    });

    it('correctly handles target missing from array', () => {
      const target = 999;
      const gen = linearSearch(unsortedArray, target);
      const steps: SearchStep[] = [];
      let res = gen.next();
      while (!res.done) {
        steps.push(res.value);
        res = gen.next();
      }

      const lastStep = steps[steps.length - 1];
      assert.strictEqual(lastStep.type, 'swap', 'Missing target should emit swap/not-found');
      assert.ok(lastStep.description.includes('отсутствует') || lastStep.description.includes('не найдено'));
    });
  });

  describe('binarySearch', () => {
    it('successfully finds target in sorted array and produces left/right/mid in description', () => {
      const target = 67;
      const gen = binarySearch(sortedArray, target);
      const steps: SearchStep[] = [];
      let res = gen.next();
      while (!res.done) {
        steps.push(res.value);
        res = gen.next();
      }

      const lastStep = steps[steps.length - 1];
      assert.strictEqual(lastStep.type, 'sorted');
      assert.strictEqual(sortedArray[lastStep.indices[0]], target);

      // Check that step description contains left, right, mid
      const pivotStep = steps.find(s => s.type === 'pivot' && s.description.includes('left') && s.description.includes('mid'));
      assert.ok(pivotStep, 'Should have steps with left, right, mid descriptions');
    });

    it('reports not found when target is missing', () => {
      const target = 50;
      const gen = binarySearch(sortedArray, target);
      const steps: SearchStep[] = [];
      let res = gen.next();
      while (!res.done) {
        steps.push(res.value);
        res = gen.next();
      }

      const lastStep = steps[steps.length - 1];
      assert.strictEqual(lastStep.type, 'swap');
      assert.ok(lastStep.description.includes('не найдено'));
    });
  });

  describe('jumpSearch', () => {
    it('finds target using block jumps and linear scan', () => {
      const target = 83;
      const gen = jumpSearch(sortedArray, target);
      const steps: SearchStep[] = [];
      let res = gen.next();
      while (!res.done) {
        steps.push(res.value);
        res = gen.next();
      }

      const lastStep = steps[steps.length - 1];
      assert.strictEqual(lastStep.type, 'sorted');
      assert.strictEqual(sortedArray[lastStep.indices[0]], target);
    });

    it('reports not found when target is missing', () => {
      const target = 1;
      const gen = jumpSearch(sortedArray, target);
      const steps: SearchStep[] = [];
      let res = gen.next();
      while (!res.done) {
        steps.push(res.value);
        res = gen.next();
      }

      const lastStep = steps[steps.length - 1];
      assert.strictEqual(lastStep.type, 'swap');
      assert.ok(lastStep.description.includes('не найдено'));
    });
  });

  describe('interpolationSearch', () => {
    it('finds target using interpolation formula', () => {
      const target = 41;
      const gen = interpolationSearch(sortedArray, target);
      const steps: SearchStep[] = [];
      let res = gen.next();
      while (!res.done) {
        steps.push(res.value);
        res = gen.next();
      }

      const lastStep = steps[steps.length - 1];
      assert.strictEqual(lastStep.type, 'sorted');
      assert.strictEqual(sortedArray[lastStep.indices[0]], target);
    });

    it('handles out of bounds target', () => {
      const target = 999;
      const gen = interpolationSearch(sortedArray, target);
      const steps: SearchStep[] = [];
      let res = gen.next();
      while (!res.done) {
        steps.push(res.value);
        res = gen.next();
      }

      const lastStep = steps[steps.length - 1];
      assert.strictEqual(lastStep.type, 'swap');
      assert.ok(lastStep.description.includes('не найдено'));
    });
  });
});
