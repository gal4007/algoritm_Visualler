/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SearchStep {
  type: 'compare' | 'pivot' | 'sorted' | 'swap' | 'not-found' | 'all-sorted';
  indices: number[];
  dimmed?: number[];
  line?: number;
  description: string;
}

/**
 * Линейный поиск (Linear Search)
 */
export function* linearSearch(arr: number[], target: number): Generator<SearchStep, void, unknown> {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    const dimmed = Array.from({ length: i }, (_, k) => k);

    yield {
      type: 'compare',
      indices: [i],
      dimmed,
      line: 4,
      description: `Индекс: [${i}]. Значение arr[${i}] = ${arr[i]}, ищем ${target}. ${arr[i] === target ? 'Совпадение найдено!' : 'Не совпадает, переходим к следующему.'}`,
    };

    if (arr[i] === target) {
      yield {
        type: 'sorted',
        indices: [i],
        dimmed,
        line: 5,
        description: `🎯 Число ${target} успешно найдено на позиции [${i}]!`,
      };
      return;
    }
  }

  yield {
    type: 'swap',
    indices: [],
    dimmed: Array.from({ length: n }, (_, k) => k),
    line: 8,
    description: `❌ Число ${target} отсутствует в массиве (проверены все ${n} элементов).`,
  };
}

/**
 * Бинарный поиск (Binary Search)
 */
export function* binarySearch(arr: number[], target: number): Generator<SearchStep, void, unknown> {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    const dimmed: number[] = [];
    for (let k = 0; k < arr.length; k++) {
      if (k < left || k > right) dimmed.push(k);
    }

    // 1. Показываем вычисление середины mid и границы
    yield {
      type: 'pivot',
      indices: [mid, left, right],
      dimmed,
      line: 4,
      description: `Границы: left = ${left} (${arr[left]}), right = ${right} (${arr[right]}), mid = ${mid} (${arr[mid]}). Сравниваем arr[mid] с target = ${target}.`,
    };

    // 2. Сравнение
    yield {
      type: 'compare',
      indices: [mid],
      dimmed,
      line: 5,
      description: `Сравнение: arr[${mid}] (${arr[mid]}) ${arr[mid] === target ? '==' : arr[mid] < target ? '<' : '>'} ${target}.`,
    };

    if (arr[mid] === target) {
      yield {
        type: 'sorted',
        indices: [mid],
        dimmed,
        line: 6,
        description: `🎯 Число ${target} найдено на позиции mid = [${mid}]!`,
      };
      return;
    }

    if (arr[mid] < target) {
      left = mid + 1;
      yield {
        type: 'pivot',
        indices: [mid],
        dimmed,
        line: 8,
        description: `Так как ${arr[mid]} < ${target}, искомое число справа. Сдвигаем левую границу: left = ${left}.`,
      };
    } else {
      right = mid - 1;
      yield {
        type: 'pivot',
        indices: [mid],
        dimmed,
        line: 10,
        description: `Так как ${arr[mid]} > ${target}, искомое число слева. Сдвигаем правую границу: right = ${right}.`,
      };
    }
  }

  // Не найдено
  yield {
    type: 'swap',
    indices: [],
    dimmed: Array.from({ length: arr.length }, (_, k) => k),
    line: 12,
    description: `❌ Число ${target} не найдено: границы сошлись (left = ${left} > right = ${right}).`,
  };
}

/**
 * Прыжковый поиск (Jump Search)
 */
export function* jumpSearch(arr: number[], target: number): Generator<SearchStep, void, unknown> {
  const n = arr.length;
  const stepSize = Math.floor(Math.sqrt(n)); // для n=20 шаг = 4
  let prev = 0;
  let step = stepSize;

  // Прыжки по блокам
  while (step < n && arr[Math.min(step, n) - 1] < target) {
    const blockEnd = Math.min(step, n) - 1;
    const dimmed: number[] = [];
    for (let k = 0; k < prev; k++) dimmed.push(k);

    yield {
      type: 'compare',
      indices: [blockEnd],
      dimmed,
      line: 4,
      description: `[Прыжок блоком] Проверяем конец блока: index = [${blockEnd}] (${arr[blockEnd]}). Так как ${arr[blockEnd]} < ${target}, прыгаем дальше на ${stepSize}.`,
    };

    prev = step;
    step += stepSize;
  }

  // Финальная проверка границы текущего блока
  const blockRight = Math.min(step, n) - 1;
  const dimmedBlock: number[] = [];
  for (let k = 0; k < n; k++) {
    if (k < prev || k > blockRight) dimmedBlock.push(k);
  }

  yield {
    type: 'pivot',
    indices: [prev, blockRight],
    dimmed: dimmedBlock,
    line: 8,
    description: `Диапазон найден: left = ${prev} (${arr[prev]}), right = ${blockRight} (${arr[blockRight]}). Запускаем линейный поиск внутри блока.`,
  };

  // Линейный поиск внутри найденного диапазона
  for (let i = prev; i <= blockRight; i++) {
    const currentDimmed: number[] = [];
    for (let k = 0; k < n; k++) {
      if (k < i || k > blockRight) currentDimmed.push(k);
    }

    yield {
      type: 'compare',
      indices: [i],
      dimmed: currentDimmed,
      line: 9,
      description: `Поиск в блоке: столбик [${i}] (${arr[i]}). Сравниваем с target = ${target}.`,
    };

    if (arr[i] === target) {
      yield {
        type: 'sorted',
        indices: [i],
        dimmed: currentDimmed,
        line: 9,
        description: `🎯 Число ${target} найдено на позиции [${i}]!`,
      };
      return;
    }

    if (arr[i] > target) {
      break;
    }
  }

  yield {
    type: 'swap',
    indices: [],
    dimmed: Array.from({ length: n }, (_, k) => k),
    line: 13,
    description: `❌ Число ${target} не найдено в массиве.`,
  };
}

/**
 * Интерполяционный поиск (Interpolation Search)
 */
export function* interpolationSearch(arr: number[], target: number): Generator<SearchStep, void, unknown> {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    const dimmed: number[] = [];
    for (let k = 0; k < arr.length; k++) {
      if (k < low || k > high) dimmed.push(k);
    }

    if (low === high) {
      yield {
        type: 'compare',
        indices: [low],
        dimmed,
        line: 4,
        description: `Единственный оставшийся элемент: left = right = [${low}] (${arr[low]}). Сравниваем с target = ${target}.`,
      };

      if (arr[low] === target) {
        yield {
          type: 'sorted',
          indices: [low],
          dimmed,
          line: 5,
          description: `🎯 Число ${target} найдено на позиции [${low}]!`,
        };
        return;
      }
      break;
    }

    // Формула интерполяции: pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));

    yield {
      type: 'pivot',
      indices: [pos, low, high],
      dimmed,
      line: 4,
      description: `Границы: left = ${low} (${arr[low]}), right = ${high} (${arr[high]}). Вычисленная интерполяционная позиция pos (mid) = [${pos}] (${arr[pos]}).`,
    };

    yield {
      type: 'compare',
      indices: [pos],
      dimmed,
      line: 5,
      description: `Сравниваем: arr[${pos}] (${arr[pos]}) с target = ${target}.`,
    };

    if (arr[pos] === target) {
      yield {
        type: 'sorted',
        indices: [pos],
        dimmed,
        line: 5,
        description: `🎯 Число ${target} найдено на позиции pos = [${pos}]!`,
      };
      return;
    }

    if (arr[pos] < target) {
      low = pos + 1;
      yield {
        type: 'pivot',
        indices: [pos],
        dimmed,
        line: 7,
        description: `Так как arr[${pos}] (${arr[pos]}) < ${target}, сдвигаем левую границу: low = ${low}.`,
      };
    } else {
      high = pos - 1;
      yield {
        type: 'pivot',
        indices: [pos],
        dimmed,
        line: 9,
        description: `Так как arr[${pos}] (${arr[pos]}) > ${target}, сдвигаем правую границу: high = ${high}.`,
      };
    }
  }

  yield {
    type: 'swap',
    indices: [],
    dimmed: Array.from({ length: arr.length }, (_, k) => k),
    line: 11,
    description: `❌ Число ${target} не найдено: вышло за границы [${low}..${high}] или отсутствует.`,
  };
}
