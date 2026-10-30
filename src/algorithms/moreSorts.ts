/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StepType = 'compare' | 'swap' | 'sorted' | 'all-sorted' | 'pivot';

export interface SortStep {
  type: StepType;
  indices: number[];
  description: string;
  pass?: number;
  line?: number;
}

/**
 * Генератор алгоритма сортировки выбором (Selection Sort)
 */
export function* selectionSort(arr: number[]): Generator<SortStep, void, unknown> {
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) {
      yield {
        type: 'sorted',
        indices: [0],
        pass: 1,
        line: 13,
        description: 'Единственный элемент уже отсортирован.',
      };
    }
    yield {
      type: 'all-sorted',
      indices: Array.from({ length: n }, (_, i) => i),
      pass: 1,
      line: 15,
      description: 'Массив отсортирован!',
    };
    return;
  }

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Подсвечиваем текущий исходный минимум
    yield {
      type: 'pivot',
      indices: [i],
      pass: i + 1,
      line: 4,
      description: `Ищем минимальный элемент в неотсортированной части [${i}..${n - 1}]. Текущий минимум: [${i}] (${arr[i]})`,
    };

    for (let j = i + 1; j < n; j++) {
      // Сравнение с текущим минимумом
      yield {
        type: 'compare',
        indices: [j, minIdx],
        pass: i + 1,
        line: 6,
        description: `Сравниваем элемент [${j}] (${arr[j]}) с текущим минимумом [${minIdx}] (${arr[minIdx]}). ${arr[j] < arr[minIdx] ? 'Найден меньший элемент!' : 'Больше или равен минимуму.'}`,
      };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        yield {
          type: 'pivot',
          indices: [minIdx],
          pass: i + 1,
          line: 7,
          description: `Новый кандидат на минимум: столбик [${minIdx}] со значением ${arr[minIdx]}`,
        };
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      yield {
        type: 'swap',
        indices: [i, minIdx],
        pass: i + 1,
        line: 11,
        description: `Меняем местами [${i}] (${arr[minIdx]}) и найденный минимум [${minIdx}] (${arr[i]})`,
      };
    }

    yield {
      type: 'sorted',
      indices: [i],
      pass: i + 1,
      line: 13,
      description: `Элемент ${arr[i]} зафиксирован на своей итоговой позиции [${i}]`,
    };
  }

  yield {
    type: 'sorted',
    indices: [n - 1],
    pass: n,
    line: 13,
    description: `Последний элемент ${arr[n - 1]} гарантированно занял своё место`,
  };

  yield {
    type: 'all-sorted',
    indices: Array.from({ length: n }, (_, k) => k),
    pass: n,
    line: 15,
    description: '🎉 Сортировка выбором успешно завершена! Все элементы упорядочены.',
  };
}

/**
 * Генератор алгоритма сортировки вставками (Insertion Sort)
 */
export function* insertionSort(arr: number[]): Generator<SortStep, void, unknown> {
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) {
      yield {
        type: 'sorted',
        indices: [0],
        pass: 1,
        line: 11,
        description: 'Первый элемент уже отсортирован.',
      };
    }
    yield {
      type: 'all-sorted',
      indices: Array.from({ length: n }, (_, i) => i),
      pass: 1,
      line: 13,
      description: 'Массив отсортирован!',
    };
    return;
  }

  // Первый элемент изначально образует отсортированный префикс
  yield {
    type: 'sorted',
    indices: [0],
    pass: 1,
    line: 3,
    description: `Элемент [0] (${arr[0]}) образует начальную отсортированную последовательность`,
  };

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    yield {
      type: 'pivot',
      indices: [i],
      pass: i,
      line: 4,
      description: `Берём элемент [${i}] (${key}) для вставки в отсортированную левую часть [0..${i - 1}]`,
    };

    while (j >= 0 && arr[j] > key) {
      yield {
        type: 'compare',
        indices: [j, j + 1],
        pass: i,
        line: 6,
        description: `Сравниваем [${j}] (${arr[j]}) и вставляемый ключ (${key}). Так как ${arr[j]} > ${key}, сдвигаем ${arr[j]} вправо`,
      };

      const temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;

      yield {
        type: 'swap',
        indices: [j, j + 1],
        pass: i,
        line: 7,
        description: `Сдвинули элемент: перемещаем ключ (${key}) на позицию [${j}]`,
      };

      j--;
    }

    if (j >= 0) {
      yield {
        type: 'compare',
        indices: [j, j + 1],
        pass: i,
        line: 6,
        description: `Сравниваем [${j}] (${arr[j]}) и (${key}). ${arr[j]} <= ${key} — позиция для вставки найдена.`,
      };
    }

    const sortedRange = Array.from({ length: i + 1 }, (_, k) => k);
    yield {
      type: 'sorted',
      indices: sortedRange,
      pass: i,
      line: 11,
      description: `Элемент ${key} успешно вставлен. Префикс [0..${i}] отсортирован!`,
    };
  }

  yield {
    type: 'all-sorted',
    indices: Array.from({ length: n }, (_, k) => k),
    pass: n,
    line: 13,
    description: '🎉 Сортировка вставками успешно завершена! Все элементы упорядочены.',
  };
}

/**
 * Генератор алгоритма сортировки Шелла (Shell Sort)
 * В описании каждого шага явно выводится текущий gap.
 */
export function* shellSort(arr: number[]): Generator<SortStep, void, unknown> {
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) {
      yield {
        type: 'sorted',
        indices: [0],
        pass: 1,
        line: 14,
        description: 'Единственный элемент отсортирован.',
      };
    }
    yield {
      type: 'all-sorted',
      indices: Array.from({ length: n }, (_, i) => i),
      pass: 1,
      line: 14,
      description: 'Массив отсортирован!',
    };
    return;
  }

  let passIndex = 0;

  // Последовательность шагов: gap = n / 2, gap / 2 ... 1
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    passIndex++;

    yield {
      type: 'pivot',
      indices: [],
      pass: gap,
      line: 3,
      description: `[Шаг gap = ${gap}] Начинаем проход с расстоянием между элементами gap = ${gap}`,
    };

    for (let i = gap; i < n; i++) {
      for (let j = i; j >= gap; j -= gap) {
        // Сравнение элементов на расстоянии gap
        yield {
          type: 'compare',
          indices: [j - gap, j],
          pass: gap,
          line: 6,
          description: `[gap = ${gap}] Сравниваем столбики [${j - gap}] (${arr[j - gap]}) и [${j}] (${arr[j]}). ${arr[j - gap] > arr[j] ? 'Левый больше — требуется обмен!' : 'Порядок верный.'}`,
        };

        if (arr[j - gap] > arr[j]) {
          const temp = arr[j - gap];
          arr[j - gap] = arr[j];
          arr[j] = temp;

          yield {
            type: 'swap',
            indices: [j - gap, j],
            pass: gap,
            line: 7,
            description: `[gap = ${gap}] Меняем местами элементы на расстоянии ${gap}: [${j - gap}] и [${j}] (${arr[j]} ⇄ ${arr[j - gap]})`,
          };
        } else {
          break;
        }
      }
    }
  }

  // Финальный проход при gap = 1 завершает сортировку
  yield {
    type: 'all-sorted',
    indices: Array.from({ length: n }, (_, k) => k),
    pass: 1,
    line: 14,
    description: '🎉 Сортировка Шелла успешно завершена! Все элементы упорядочены.',
  };
}
