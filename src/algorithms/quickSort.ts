/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StepType = 'compare' | 'swap' | 'sorted' | 'all-sorted' | 'pivot';

export interface SortStep {
  type: StepType;
  indices: number[];
  description: string;
  line?: number;
}

/**
 * Вспомогательный генератор разделения массива (схема Ломуто) с привязкой к строкам C++
 */
function* partition(arr: number[], low: number, high: number): Generator<SortStep, number, unknown> {
  const pivot = arr[high];

  // 1. Опорный элемент (строка 2: int pivot = arr[high];)
  yield {
    type: 'pivot',
    indices: [high],
    line: 2,
    description: `Выбран опорный элемент (pivot): [${high}] со значением ${pivot}`,
  };

  let i = low;

  for (let j = low; j < high; j++) {
    // 2. Сравнение с опорным (строка 5: if (arr[j] < pivot))
    yield {
      type: 'compare',
      indices: [j, high],
      line: 5,
      description: `Сравниваем элемент [${j}] (${arr[j]}) с опорным [${high}] (${pivot}). ${arr[j] < pivot ? 'Меньше опорного — перемещаем в левую часть.' : 'Не меньше опорного — остаётся справа.'}`,
    };

    if (arr[j] < pivot) {
      if (i !== j) {
        // 3. Обмен (строка 6: swap(arr[i], arr[j]);)
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        yield {
          type: 'swap',
          indices: [i, j],
          line: 6,
          description: `Меняем местами [${i}] (${arr[j]}) и [${j}] (${arr[i]}), собирая элементы меньше ${pivot} слева`,
        };
      }
      i++;
    }
  }

  // 4. Перемещение pivot (строка 10: swap(arr[i], arr[high]);)
  if (i !== high) {
    const temp = arr[i];
    arr[i] = arr[high];
    arr[high] = temp;

    yield {
      type: 'swap',
      indices: [i, high],
      line: 10,
      description: `Ставим опорный элемент ${pivot} на его постоянную позицию [${i}]`,
    };
  }

  // 5. Опорный зафиксирован (строка 11: return i;)
  yield {
    type: 'sorted',
    indices: [i],
    line: 11,
    description: `Опорный элемент ${pivot} зафиксирован на финальной позиции [${i}]`,
  };

  return i;
}

/**
 * Рекурсивный генератор быстрой сортировки
 */
function* quickSortHelper(arr: number[], low: number, high: number): Generator<SortStep, void, unknown> {
  if (low < high) {
    const pivotIndex: number = yield* partition(arr, low, high);
    yield* quickSortHelper(arr, low, pivotIndex - 1);
    yield* quickSortHelper(arr, pivotIndex + 1, high);
  } else if (low === high) {
    yield {
      type: 'sorted',
      indices: [low],
      line: 14,
      description: `Элемент [${low}] (${arr[low]}) зафиксирован`,
    };
  }
}

/**
 * Генератор быстрой сортировки (Quick Sort)
 * @param array Рабочий массив чисел
 */
export function* quickSort(array: number[]): Generator<SortStep, void, unknown> {
  const n = array.length;

  if (n <= 1) {
    if (n === 1) {
      yield {
        type: 'sorted',
        indices: [0],
        line: 14,
        description: 'Единственный элемент массива уже отсортирован.',
      };
    }
    yield {
      type: 'all-sorted',
      indices: Array.from({ length: n }, (_, i) => i),
      line: 19,
      description: 'Массив отсортирован!',
    };
    return;
  }

  yield* quickSortHelper(array, 0, n - 1);

  yield {
    type: 'all-sorted',
    indices: Array.from({ length: n }, (_, i) => i),
    line: 19,
    description: '🎉 Быстрая сортировка успешно завершена! Все элементы упорядочены.',
  };
}
