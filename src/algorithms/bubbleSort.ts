/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StepType = 'compare' | 'swap' | 'sorted' | 'all-sorted';

export interface SortStep {
  type: StepType;
  indices: number[];
  description: string;
  line?: number; // Номер строки в коде C++ для подсветки
}

/**
 * Генератор алгоритма пузырьковой сортировки (Bubble Sort) с привязкой к строкам кода C++
 * @param array Копия массива чисел, которая пошагово сортируется на месте
 */
export function* bubbleSort(array: number[]): Generator<SortStep, void, unknown> {
  const n = array.length;

  if (n <= 1) {
    if (n === 1) {
      yield {
        type: 'sorted',
        indices: [0],
        line: 11,
        description: 'Единственный элемент уже отсортирован.',
      };
    }
    yield {
      type: 'all-sorted',
      indices: Array.from({ length: n }, (_, i) => i),
      line: 14,
      description: 'Массив отсортирован!',
    };
    return;
  }

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {
      // 1. Сравнение элементов (строка 6: if (arr[j] > arr[j + 1]))
      yield {
        type: 'compare',
        indices: [j, j + 1],
        line: 6,
        description: `Сравниваем элементы [${j}] (${array[j]}) и [${j + 1}] (${array[j + 1]})`,
      };

      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swapped = true;

        // 2. Обмен элементов (строка 7: swap(arr[j], arr[j + 1]))
        yield {
          type: 'swap',
          indices: [j, j + 1],
          line: 7,
          description: `Так как ${array[j + 1]} > ${array[j]}, меняем их местами`,
        };
      }
    }

    // 3. Фиксация отсортированного элемента в конце прохода (строка 11)
    const settledIndex = n - 1 - i;
    yield {
      type: 'sorted',
      indices: [settledIndex],
      line: 11,
      description: `Элемент ${array[settledIndex]} на позиции ${settledIndex} занял финальное место`,
    };

    if (!swapped) {
      const remainingIndices = Array.from({ length: settledIndex }, (_, k) => k);
      yield {
        type: 'sorted',
        indices: remainingIndices,
        line: 12,
        description: 'Обменов за проход не произошло — массив уже отсортирован!',
      };
      break;
    }
  }

  yield {
    type: 'sorted',
    indices: [0],
    line: 11,
    description: 'Первый элемент гарантированно на своем месте.',
  };

  yield {
    type: 'all-sorted',
    indices: Array.from({ length: n }, (_, k) => k),
    line: 14,
    description: 'Массив полностью отсортирован!',
  };
}
