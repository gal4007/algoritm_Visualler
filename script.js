/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * =============================================================
 * ВИЗУАЛИЗАТОР АЛГОРИТМОВ (СИНХРОНИЗИРОВАННЫЙ С КОДОМ НА C++)
 * =============================================================
 */

/**
 * Константы и параметры конфигурации
 */
const ARRAY_SIZE = 20;       // Ровно 20 случайных чисел по ТЗ
const MIN_VALUE = 5;         // Минимальное значение числа
const MAX_VALUE = 100;       // Максимальное значение числа

import {
  linearSearch,
  binarySearch,
  jumpSearch,
  interpolationSearch,
} from './src/algorithms/searchAlgorithms.ts';

/**
 * Описания поддерживаемых алгоритмов сортировки и поиска
 */
const ALGORITHMS_INFO = {
  bubble: {
    title: 'Пузырьковая сортировка (Bubble Sort)',
    subtitle: 'Сортировка пузырьком (Bubble Sort)',
    description: 'Алгоритм последовательно проходит по массиву, попарно сравнивает соседние элементы и меняет их местами, если левый больше правого. После каждого прохода наибольший элемент «всплывает» в конец, как пузырёк воздуха в воде.',
    timeWorst: 'O(n²)',
    timeAvg: 'O(n²) / O(n)',
    space: 'O(1)',
  },
  selection: {
    title: 'Сортировка выбором (Selection Sort)',
    subtitle: 'Сортировка выбором (Selection Sort)',
    description: 'На каждом шаге алгоритм находит минимальный элемент в неотсортированной части массива и меняет его местами с первым неотсортированным элементом, последовательно расширяя отсортированную зону слева направо.',
    timeWorst: 'O(n²)',
    timeAvg: 'O(n²)',
    space: 'O(1)',
  },
  insertion: {
    title: 'Сортировка вставками (Insertion Sort)',
    subtitle: 'Сортировка вставками (Insertion Sort)',
    description: 'Массив просматривается слева направо. Каждый новый элемент извлекается и сдвигает все большие элементы влево, пока не займёт свою правильную позицию в отсортированном префиксе.',
    timeWorst: 'O(n²)',
    timeAvg: 'O(n²) / O(n)',
    space: 'O(1)',
  },
  shell: {
    title: 'Сортировка Шелла (Shell Sort)',
    subtitle: 'Сортировка Шелла (Shell Sort)',
    description: 'Усовершенствованная сортировка вставками. Элементы сравниваются и перемещаются с шагом (gap). Постепенно gap уменьшается до 1, быстро устраняя дальние беспорядки и обеспечивая высокую скорость.',
    timeWorst: 'O(n²)',
    timeAvg: 'O(n log² n)',
    space: 'O(1)',
  },
  quick: {
    title: 'Быстрая сортировка (Quick Sort)',
    subtitle: 'Быстрая сортировка (Quick Sort)',
    description: 'Алгоритм «разделяй и властвуй». Выбирается опорный элемент (pivot), массив переупорядочивается так, чтобы меньшие элементы оказались слева от опорного, а большие — справа. Затем этот процесс рекурсивно применяется к обеим половинам.',
    timeWorst: 'O(n²)',
    timeAvg: 'O(n log n)',
    space: 'O(log n)',
  },
  linear: {
    title: 'Линейный поиск (Linear Search)',
    subtitle: 'Линейный поиск (Linear Search)',
    description: 'Простейший алгоритм поиска: последовательно проверяет каждый элемент массива слева направо, сравнивая его с искомым значением. Не требует предварительной сортировки данных.',
    timeWorst: 'O(n)',
    timeAvg: 'O(n) / O(1)',
    space: 'O(1)',
  },
  binary: {
    title: 'Бинарный поиск (Binary Search)',
    subtitle: 'Бинарный поиск (Binary Search)',
    description: 'Высокоэффективный алгоритм поиска в отсортированном массиве. На каждом шаге делит диапазон пополам (mid = left + (right - left)/2) и отсекает половину, в которой искомое число гарантированно отсутствует.',
    timeWorst: 'O(log n)',
    timeAvg: 'O(log n) / O(1)',
    space: 'O(1)',
  },
  jump: {
    title: 'Прыжковый поиск (Jump Search)',
    subtitle: 'Прыжковый поиск (Jump Search)',
    description: 'Алгоритм поиска по блокам в отсортированном массиве. Прыгает вперёд с фиксированным шагом √n элементов, пока не найдёт блок, содержащий искомое число, после чего выполняет внутри блока линейный поиск.',
    timeWorst: 'O(√n)',
    timeAvg: 'O(√n)',
    space: 'O(1)',
  },
  interpolation: {
    title: 'Интерполяционный поиск (Interpolation Search)',
    subtitle: 'Интерполяционный поиск (Interpolation Search)',
    description: 'Адаптивный поиск для отсортированных данных. Вычисляет прогнозируемую позицию (pos) по формуле интерполяции пропорционально значению искомого элемента, подобно поиску слова в словаре.',
    timeWorst: 'O(n)',
    timeAvg: 'O(log log n)',
    space: 'O(1)',
  },
};

/**
 * Псевдокод алгоритмов на C++ с номерами строк для подсветки
 */
const CPP_CODE = {
  bubble: [
    { line: 1, text: 'void bubbleSort(vector<int>& arr) {' },
    { line: 2, text: '    int n = arr.size();' },
    { line: 3, text: '    for (int i = 0; i < n - 1; i++) {' },
    { line: 4, text: '        bool swapped = false;' },
    { line: 5, text: '        for (int j = 0; j < n - 1 - i; j++) {' },
    { line: 6, text: '            if (arr[j] > arr[j + 1]) {' },
    { line: 7, text: '                swap(arr[j], arr[j + 1]);' },
    { line: 8, text: '                swapped = true;' },
    { line: 9, text: '            }' },
    { line: 10, text: '        }' },
    { line: 11, text: '        // arr[n - 1 - i] отсортирован' },
    { line: 12, text: '        if (!swapped) break;' },
    { line: 13, text: '    }' },
    { line: 14, text: '}' },
  ],
  selection: [
    { line: 1, text: 'void selectionSort(vector<int>& arr) {' },
    { line: 2, text: '    int n = arr.size();' },
    { line: 3, text: '    for (int i = 0; i < n - 1; i++) {' },
    { line: 4, text: '        int min_idx = i; // поиск минимума' },
    { line: 5, text: '        for (int j = i + 1; j < n; j++) {' },
    { line: 6, text: '            if (arr[j] < arr[min_idx]) {' },
    { line: 7, text: '                min_idx = j;' },
    { line: 8, text: '            }' },
    { line: 9, text: '        }' },
    { line: 10, text: '        if (min_idx != i) {' },
    { line: 11, text: '            swap(arr[i], arr[min_idx]);' },
    { line: 12, text: '        }' },
    { line: 13, text: '        // arr[i] зафиксирован' },
    { line: 14, text: '    }' },
    { line: 15, text: '}' },
  ],
  insertion: [
    { line: 1, text: 'void insertionSort(vector<int>& arr) {' },
    { line: 2, text: '    int n = arr.size();' },
    { line: 3, text: '    // arr[0] изначально отсортирован' },
    { line: 4, text: '    for (int i = 1; i < n; i++) {' },
    { line: 5, text: '        int key = arr[i], j = i - 1;' },
    { line: 6, text: '        while (j >= 0 && arr[j] > key) {' },
    { line: 7, text: '            swap(arr[j], arr[j + 1]);' },
    { line: 8, text: '            j--;' },
    { line: 9, text: '        }' },
    { line: 10, text: '        arr[j + 1] = key;' },
    { line: 11, text: '        // префикс [0..i] упорядочен' },
    { line: 12, text: '    }' },
    { line: 13, text: '}' },
  ],
  shell: [
    { line: 1, text: 'void shellSort(vector<int>& arr) {' },
    { line: 2, text: '    int n = arr.size();' },
    { line: 3, text: '    for (int gap = n / 2; gap > 0; gap /= 2) {' },
    { line: 4, text: '        for (int i = gap; i < n; i++) {' },
    { line: 5, text: '            for (int j = i; j >= gap; j -= gap) {' },
    { line: 6, text: '                if (arr[j - gap] > arr[j]) {' },
    { line: 7, text: '                    swap(arr[j - gap], arr[j]);' },
    { line: 8, text: '                } else break;' },
    { line: 9, text: '            }' },
    { line: 10, text: '        }' },
    { line: 11, text: '    }' },
    { line: 12, text: '}' },
  ],
  quick: [
    { line: 1, text: 'int partition(vector<int>& arr, int low, int high) {' },
    { line: 2, text: '    int pivot = arr[high]; // выбор pivot' },
    { line: 3, text: '    int i = low;' },
    { line: 4, text: '    for (int j = low; j < high; j++) {' },
    { line: 5, text: '        if (arr[j] < pivot) {' },
    { line: 6, text: '            swap(arr[i], arr[j]);' },
    { line: 7, text: '            i++;' },
    { line: 8, text: '        }' },
    { line: 9, text: '    }' },
    { line: 10, text: '    swap(arr[i], arr[high]);' },
    { line: 11, text: '    return i; // pivot зафиксирован' },
    { line: 12, text: '}' },
    { line: 13, text: 'void quickSort(vector<int>& arr, int low, int high) {' },
    { line: 14, text: '    if (low < high) {' },
    { line: 15, text: '        int pi = partition(arr, low, high);' },
    { line: 16, text: '        quickSort(arr, low, pi - 1);' },
    { line: 17, text: '        quickSort(arr, pi + 1, high);' },
    { line: 18, text: '    }' },
    { line: 19, text: '}' },
  ],
  linear: [
    { line: 1, text: 'int linearSearch(const vector<int>& arr, int target) {' },
    { line: 2, text: '    int n = arr.size();' },
    { line: 3, text: '    for (int i = 0; i < n; i++) {' },
    { line: 4, text: '        if (arr[i] == target) {' },
    { line: 5, text: '            return i; // совпадение найдено' },
    { line: 6, text: '        }' },
    { line: 7, text: '    }' },
    { line: 8, text: '    return -1; // элемент отсутствует' },
    { line: 9, text: '}' },
  ],
  binary: [
    { line: 1, text: 'int binarySearch(const vector<int>& arr, int target) {' },
    { line: 2, text: '    int left = 0, right = arr.size() - 1;' },
    { line: 3, text: '    while (left <= right) {' },
    { line: 4, text: '        int mid = left + (right - left) / 2;' },
    { line: 5, text: '        if (arr[mid] == target)' },
    { line: 6, text: '            return mid; // совпадение найдено' },
    { line: 7, text: '        if (arr[mid] < target)' },
    { line: 8, text: '            left = mid + 1;' },
    { line: 9, text: '        else' },
    { line: 10, text: '            right = mid - 1;' },
    { line: 11, text: '    }' },
    { line: 12, text: '    return -1; // не найдено' },
    { line: 13, text: '}' },
  ],
  jump: [
    { line: 1, text: 'int jumpSearch(const vector<int>& arr, int target) {' },
    { line: 2, text: '    int n = arr.size();' },
    { line: 3, text: '    int step = sqrt(n), prev = 0;' },
    { line: 4, text: '    while (step < n && arr[min(step, n) - 1] < target) {' },
    { line: 5, text: '        prev = step;' },
    { line: 6, text: '        step += sqrt(n);' },
    { line: 7, text: '    }' },
    { line: 8, text: '    // Линейный поиск внутри найденного блока' },
    { line: 9, text: '    for (int i = prev; i <= min(step, n) - 1; i++) {' },
    { line: 10, text: '        if (arr[i] == target) return i; // найдено' },
    { line: 11, text: '        if (arr[i] > target) break;' },
    { line: 12, text: '    }' },
    { line: 13, text: '    return -1; // не найдено' },
    { line: 14, text: '}' },
  ],
  interpolation: [
    { line: 1, text: 'int interpolationSearch(const vector<int>& arr, int target) {' },
    { line: 2, text: '    int low = 0, high = arr.size() - 1;' },
    { line: 3, text: '    while (low <= high && target >= arr[low] && target <= arr[high]) {' },
    { line: 4, text: '        int pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]);' },
    { line: 5, text: '        if (arr[pos] == target) return pos; // найдено' },
    { line: 6, text: '        if (arr[pos] < target)' },
    { line: 7, text: '            low = pos + 1;' },
    { line: 8, text: '        else' },
    { line: 9, text: '            high = pos - 1;' },
    { line: 10, text: '    }' },
    { line: 11, text: '    return -1; // не найдено' },
    { line: 12, text: '}' },
  ],
};

/**
 * Глобальное состояние приложения
 */
const state = {
  selectedAlgorithm: 'bubble', // 'bubble' | 'selection' | 'insertion' | 'shell' | 'quick' | 'linear' | 'binary' | 'jump' | 'interpolation'
  initialArray: [],            // Исходный массив для функции «Сброс»
  currentArray: [],            // Текущий рабочий массив чисел
  barStates: [],               // Цветовое состояние каждого столбика: 'default' | 'pivot' | 'compare' | 'swap' | 'sorted'
  dimmedIndices: new Set(),    // Набор индексов для затемнения (вне диапазона поиска)
  targetValue: 42,             // Искомое число для алгоритмов поиска
  generator: null,             // Экземпляр активной generator-функции
  isPlaying: false,            // Флаг авто-воспроизведения (Play / Pause)
  timerId: null,               // ID активного таймера setTimeout для авто-шага
  stepDelay: 120,              // Задержка между шагами в миллисекундах
  isFinished: false,           // Завершена ли сортировка / поиск
  activeCodeLine: null,        // Номер текущей подсвечиваемой строки C++
  isSoundMuted: false,         // Включен ли звук

  // Счётчики статистики
  comparisons: 0,              // Количество сравнений
  swaps: 0,                    // Количество обменов (для сортировок)
  stepNumber: 0,               // Общий номер дискретного шага
  currentPass: 0,              // Текущий проход или глубина разделения
};

/**
 * Ссылки на ключевые DOM-элементы страницы
 */
const elements = {
  algoSelect: document.getElementById('algoSelect'),
  algoSubtitle: document.getElementById('algoSubtitle'),
  btnSoundToggle: document.getElementById('btnSoundToggle'),
  soundIcon: document.getElementById('soundIcon'),
  soundText: document.getElementById('soundText'),
  chartContainer: document.getElementById('chartContainer'),
  btnPlayPause: document.getElementById('btnPlayPause'),
  playIcon: document.getElementById('playIcon'),
  playText: document.getElementById('playText'),
  btnStep: document.getElementById('btnStep'),
  btnReset: document.getElementById('btnReset'),
  btnNewArray: document.getElementById('btnNewArray'),
  speedSlider: document.getElementById('speedSlider'),
  speedDisplay: document.getElementById('speedDisplay'),
  statusTag: document.getElementById('statusTag'),
  statusMessage: document.getElementById('statusMessage'),
  stepCounterLabel: document.getElementById('stepCounterLabel'),
  comparisonsCount: document.getElementById('comparisonsCount'),
  swapsCount: document.getElementById('swapsCount'),
  currentPassCount: document.getElementById('currentPassCount'),
  sortedCount: document.getElementById('sortedCount'),

  // Элементы карточки псевдокода на C++
  codeBlock: document.getElementById('codeBlock'),
  codeCardSubtitle: document.getElementById('codeCardSubtitle'),
  activeLineBadge: document.getElementById('activeLineBadge'),

  // Элементы обучающей карточки
  infoTitle: document.getElementById('infoTitle'),
  infoText: document.getElementById('infoText'),
  timeWorst: document.getElementById('timeWorst'),
  timeAvg: document.getElementById('timeAvg'),
  spaceComplexity: document.getElementById('spaceComplexity'),

  // Элементы управления поиском
  searchControlsRow: document.getElementById('searchControlsRow'),
  targetInput: document.getElementById('targetInput'),
  btnPickRandom: document.getElementById('btnPickRandom'),
  btnPickMissing: document.getElementById('btnPickMissing'),
};

// =============================================================
// АЛГОРИТМ 1: GENERATOR ПУЗЫРЬКОВОЙ СОРТИРОВКИ
// =============================================================

/**
 * Generator-функция пузырьковой сортировки с привязкой к строкам C++
 * @param {number[]} arr Массив чисел, сортируемый на месте
 */
export function* bubbleSort(arr) {
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) {
      yield {
        type: 'sorted',
        indices: [0],
        pass: 1,
        line: 11,
        description: 'Массив из одного элемента уже отсортирован.',
      };
    }
    yield {
      type: 'all-sorted',
      indices: Array.from({ length: n }, (_, i) => i),
      pass: 1,
      line: 14,
      description: 'Сортировка завершена!',
    };
    return;
  }

  for (let i = 0; i < n - 1; i++) {
    let swappedInThisPass = false;
    const currentPassNumber = i + 1;

    for (let j = 0; j < n - 1 - i; j++) {
      const valA = arr[j];
      const valB = arr[j + 1];

      // 1. Шаг «Сравнение» (строка 6: if (arr[j] > arr[j + 1]))
      yield {
        type: 'compare',
        indices: [j, j + 1],
        pass: currentPassNumber,
        line: 6,
        description: `Сравниваем столбики [${j}] (${valA}) и [${j + 1}] (${valB}). ${valA > valB ? 'Левый больше правого — требуется обмен!' : 'Порядок верный, обмен не нужен.'}`,
      };

      // 2. Шаг «Обмен» (строка 7: swap(arr[j], arr[j + 1]))
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swappedInThisPass = true;

        yield {
          type: 'swap',
          indices: [j, j + 1],
          pass: currentPassNumber,
          line: 7,
          description: `Меняем местами: ${valA} ⇄ ${valB}. Большее число перемещается вправо.`,
        };
      }
    }

    // 3. Шаг «Отсортирован» (строка 11)
    const settledIndex = n - 1 - i;
    yield {
      type: 'sorted',
      indices: [settledIndex],
      pass: currentPassNumber,
      line: 11,
      description: `Элемент ${arr[settledIndex]} на позиции ${settledIndex} занял своё финальное место!`,
    };

    if (!swappedInThisPass) {
      const remainingIndices = Array.from({ length: settledIndex }, (_, k) => k);
      yield {
        type: 'sorted',
        indices: remainingIndices,
        pass: currentPassNumber,
        line: 12,
        description: 'За текущий проход обменов не было — все оставшиеся элементы уже на своих местах!',
      };
      break;
    }
  }

  yield {
    type: 'sorted',
    indices: [0],
    pass: n,
    line: 11,
    description: 'Первый элемент зафиксирован на своём месте.',
  };

  yield {
    type: 'all-sorted',
    indices: Array.from({ length: n }, (_, k) => k),
    pass: n,
    line: 14,
    description: '🎉 Пузырьковая сортировка успешно завершена! Все 20 чисел упорядочены.',
  };
}

// =============================================================
// АЛГОРИТМ 2: GENERATOR БЫСТРОЙ СОРТИРОВКИ (QUICK SORT)
// =============================================================

/**
 * Вспомогательный генератор разбиения подмассива (схема Ломуто) с привязкой к C++
 */
function* partition(arr, low, high, depth) {
  const pivot = arr[high];

  // 1. Выбор опорного элемента (строка 2: int pivot = arr[high];)
  yield {
    type: 'pivot',
    indices: [high],
    pass: depth,
    line: 2,
    description: `Выбран опорный элемент (pivot): [${high}] со значением ${pivot}`,
  };

  let i = low;

  for (let j = low; j < high; j++) {
    // 2. Сравнение с опорным (строка 5: if (arr[j] < pivot))
    yield {
      type: 'compare',
      indices: [j, high],
      pass: depth,
      line: 5,
      description: `Сравниваем [${j}] (${arr[j]}) с опорным [${high}] (${pivot}). ${arr[j] < pivot ? 'Меньше опорного — перемещаем в левую часть.' : 'Не меньше опорного — остаётся справа.'}`,
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
          pass: depth,
          line: 6,
          description: `Меняем местами [${i}] (${arr[j]}) и [${j}] (${arr[i]}), сдвигая меньшие элементы влево`,
        };
      }
      i++;
    }
  }

  // 4. Установка опорного элемента (строка 10: swap(arr[i], arr[high]);)
  if (i !== high) {
    const temp = arr[i];
    arr[i] = arr[high];
    arr[high] = temp;

    yield {
      type: 'swap',
      indices: [i, high],
      pass: depth,
      line: 10,
      description: `Переносим опорный элемент ${pivot} на его постоянную позицию [${i}]`,
    };
  }

  // 5. Опорный элемент зафиксирован (строка 11: return i;)
  yield {
    type: 'sorted',
    indices: [i],
    pass: depth,
    line: 11,
    description: `Опорный элемент ${pivot} зафиксирован на финальной позиции [${i}]`,
  };

  return i;
}

/**
 * Рекурсивный генератор быстрой сортировки
 */
function* quickSortHelper(arr, low, high, depth = 1) {
  if (low < high) {
    const pivotIndex = yield* partition(arr, low, high, depth);
    yield* quickSortHelper(arr, low, pivotIndex - 1, depth + 1);
    yield* quickSortHelper(arr, pivotIndex + 1, high, depth + 1);
  } else if (low === high) {
    yield {
      type: 'sorted',
      indices: [low],
      pass: depth,
      line: 14,
      description: `Элемент [${low}] (${arr[low]}) зафиксирован на своём месте`,
    };
  }
}

/**
 * Входная generator-функция быстрой сортировки (Quick Sort)
 */
export function* quickSort(arr) {
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) {
      yield {
        type: 'sorted',
        indices: [0],
        pass: 1,
        line: 14,
        description: 'Единственный элемент массива уже отсортирован.',
      };
    }
    yield {
      type: 'all-sorted',
      indices: Array.from({ length: n }, (_, i) => i),
      pass: 1,
      line: 19,
      description: 'Массив отсортирован!',
    };
    return;
  }

  yield* quickSortHelper(arr, 0, n - 1, 1);

  yield {
    type: 'all-sorted',
    indices: Array.from({ length: n }, (_, k) => k),
    pass: n,
    line: 19,
    description: '🎉 Быстрая сортировка успешно завершена! Все 20 чисел упорядочены.',
  };
}

// =============================================================
// АЛГОРИТМ 3: GENERATOR СОРТИРОВКИ ВЫБОРОМ (SELECTION SORT)
// =============================================================

/**
 * Generator-функция сортировки выбором (Selection Sort)
 * @param {number[]} arr
 */
export function* selectionSort(arr) {
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

    // Подсвечиваем текущую позицию поиска минимума
    yield {
      type: 'pivot',
      indices: [i],
      pass: i + 1,
      line: 4,
      description: `Ищем наименьший элемент в диапазоне [${i}..${n - 1}]. Начальный минимум: [${i}] (${arr[i]})`,
    };

    for (let j = i + 1; j < n; j++) {
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
    description: `Последний элемент ${arr[n - 1]} гарантированно занял своё место.`,
  };

  yield {
    type: 'all-sorted',
    indices: Array.from({ length: n }, (_, k) => k),
    pass: n,
    line: 15,
    description: '🎉 Сортировка выбором успешно завершена! Все 20 чисел упорядочены.',
  };
}

// =============================================================
// АЛГОРИТМ 4: GENERATOR СОРТИРОВКИ ВСТАВКАМИ (INSERTION SORT)
// =============================================================

/**
 * Generator-функция сортировки вставками (Insertion Sort)
 * @param {number[]} arr
 */
export function* insertionSort(arr) {
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

  // Первый элемент изначально образует упорядоченный префикс
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
      line: 5,
      description: `Берём элемент [${i}] (${key}) для вставки в отсортированную левую часть [0..${i - 1}]`,
    };

    while (j >= 0 && arr[j] > key) {
      yield {
        type: 'compare',
        indices: [j, j + 1],
        pass: i,
        line: 6,
        description: `Сравниваем [${j}] (${arr[j]}) и ключ (${key}). Так как ${arr[j]} > ${key}, сдвигаем ${arr[j]} вправо`,
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
        description: `Сравниваем [${j}] (${arr[j]}) и (${key}). Порядок верный, позиция вставки найдена.`,
      };
    }

    const sortedRange = Array.from({ length: i + 1 }, (_, k) => k);
    yield {
      type: 'sorted',
      indices: sortedRange,
      pass: i,
      line: 11,
      description: `Элемент ${key} успешно вставлен. Префикс [0..${i}] упорядочен!`,
    };
  }

  yield {
    type: 'all-sorted',
    indices: Array.from({ length: n }, (_, k) => k),
    pass: n,
    line: 13,
    description: '🎉 Сортировка вставками успешно завершена! Все 20 чисел упорядочены.',
  };
}

// =============================================================
// АЛГОРИТМ 5: GENERATOR СОРТИРОВКИ ШЕЛЛА (SHELL SORT)
// =============================================================

/**
 * Generator-функция сортировки Шелла (Shell Sort).
 * В описании каждого шага выводится текущий gap по ТЗ.
 * @param {number[]} arr
 */
export function* shellSort(arr) {
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) {
      yield {
        type: 'sorted',
        indices: [0],
        pass: 1,
        line: 12,
        description: 'Единственный элемент отсортирован.',
      };
    }
    yield {
      type: 'all-sorted',
      indices: Array.from({ length: n }, (_, i) => i),
      pass: 1,
      line: 12,
      description: 'Массив отсортирован!',
    };
    return;
  }

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    yield {
      type: 'pivot',
      indices: [],
      pass: gap,
      line: 3,
      description: `[Шаг gap = ${gap}] Начинаем проход с шагом gap = ${gap}`,
    };

    for (let i = gap; i < n; i++) {
      for (let j = i; j >= gap; j -= gap) {
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

  yield {
    type: 'all-sorted',
    indices: Array.from({ length: n }, (_, k) => k),
    pass: 1,
    line: 12,
    description: '🎉 Сортировка Шелла успешно завершена! Все 20 чисел упорядочены.',
  };
}

// =============================================================
// ПОДСВЕТКА И ОТРИСОВКА ПСЕВДОКОДА НА C++
// =============================================================

/**
 * Подсветка синтаксиса строки кода C++
 * @param {string} text
 * @returns {string} HTML со спанами подсветки
 */
function formatCppSyntax(text) {
  // Выделяем комментарии
  if (text.includes('//')) {
    const parts = text.split('//');
    return formatCppTokens(parts[0]) + `<span class="syn-comment">//${escapeHtml(parts.slice(1).join('//'))}</span>`;
  }
  return formatCppTokens(text);
}

/**
 * Экранирование HTML
 */
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Подсветка ключевых слов и типов C++
 */
function formatCppTokens(code) {
  let escaped = escapeHtml(code);

  // Ключевые слова
  escaped = escaped.replace(/\b(void|int|bool|double|for|while|if|else|break|return|const)\b/g, '<span class="syn-kw">$1</span>');

  // Типы
  escaped = escaped.replace(/vector&lt;int&gt;/g, '<span class="syn-type">vector&lt;int&gt;</span>');

  // Функции
  escaped = escaped.replace(/\b(swap|bubbleSort|quickSort|partition|selectionSort|insertionSort|shellSort|linearSearch|binarySearch|jumpSearch|interpolationSearch|min|sqrt)\b/g, '<span class="syn-fn">$1</span>');

  return escaped;
}

/**
 * Отрисовка блока псевдокода на C++ для выбранного алгоритма
 */
function renderCppCodeBlock() {
  if (!elements.codeBlock) return;
  const lines = CPP_CODE[state.selectedAlgorithm] || CPP_CODE.bubble;

  elements.codeBlock.innerHTML = '';

  for (const item of lines) {
    const row = document.createElement('div');
    row.className = 'code-line-row';
    row.id = `code-line-${item.line}`;
    row.setAttribute('data-line', String(item.line));

    const numSpan = document.createElement('span');
    numSpan.className = 'code-line-num';
    numSpan.textContent = String(item.line);

    const textSpan = document.createElement('span');
    textSpan.className = 'code-line-text';
    textSpan.innerHTML = formatCppSyntax(item.text);

    row.appendChild(numSpan);
    row.appendChild(textSpan);
    elements.codeBlock.appendChild(row);
  }

  if (elements.codeCardSubtitle) {
    elements.codeCardSubtitle.textContent = ALGORITHMS_INFO[state.selectedAlgorithm].subtitle;
  }
  highlightCodeLine(null);
}

/**
 * Подсветка активной строки в псевдокоде на C++
 * @param {number|null} lineNum
 */
function highlightCodeLine(lineNum) {
  state.activeCodeLine = lineNum;

  // Снимаем подсветку со всех строк
  const rows = document.querySelectorAll('.code-line-row');
  rows.forEach(r => r.classList.remove('active-line'));

  if (!lineNum) {
    if (elements.activeLineBadge) elements.activeLineBadge.textContent = 'Строка: —';
    return;
  }

  const activeRow = document.getElementById(`code-line-${lineNum}`);
  if (activeRow) {
    activeRow.classList.add('active-line');
    activeRow.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  if (elements.activeLineBadge) {
    elements.activeLineBadge.textContent = `Строка: ${lineNum}`;
  }
}

// =============================================================
// ЗВУКОВОЙ СИНТЕЗАТОР (WEB AUDIO API)
// =============================================================

/** @type {AudioContext|null} */
let audioCtx = null;

/**
 * Инициализация Web Audio контекста при первом действии пользователя
 */
function initAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || /** @type {any} */ (window).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

/**
 * Проигрывание звукового тона для сравнения элементов.
 * Частота (высота тона) напрямую зависит от значения столбика (5..100).
 * Чем больше число — тем выше тон (от 200 Гц до 900 Гц).
 * @param {number} value Значение элемента массива
 */
function playToneForValue(value) {
  if (state.isSoundMuted) return;
  initAudioContext();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;

    // Плавное сопоставление значения [5..100] в диапазон частот [200..900] Гц
    const minFreq = 200;
    const maxFreq = 900;
    const ratio = Math.max(0, Math.min(1, (value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)));
    const freq = minFreq + ratio * (maxFreq - minFreq);

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine'; // Чистый приятный синусоидальный тон
    osc.frequency.setValueAtTime(freq, now);

    // Длительность зависит от скорости анимации
    const duration = Math.max(0.035, Math.min(0.08, (state.stepDelay / 1000) * 0.6));

    // Огибающая громкости для мягкого звука без щелчков
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.09, now + 0.006);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch (err) {
    // Безопасное подавление ошибок аудио
  }
}

/**
 * Мелодичный аккорд при успешном завершении сортировки
 */
function playCompletionChime() {
  if (state.isSoundMuted) return;
  initAudioContext();
  if (!audioCtx) return;

  try {
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // Аккорд C-E-G-C
    freqs.forEach((freq, idx) => {
      const now = audioCtx.currentTime + idx * 0.07;
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(0.07, now + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    });
  } catch (err) {
    // Безопасная обработка
  }
}

/**
 * Включение / выключение звукового сопровождения
 */
function toggleSound() {
  state.isSoundMuted = !state.isSoundMuted;
  if (elements.btnSoundToggle) {
    if (state.isSoundMuted) {
      elements.btnSoundToggle.classList.add('is-muted');
      if (elements.soundIcon) elements.soundIcon.textContent = '🔇';
      if (elements.soundText) elements.soundText.textContent = 'Без звука';
    } else {
      elements.btnSoundToggle.classList.remove('is-muted');
      if (elements.soundIcon) elements.soundIcon.textContent = '🔊';
      if (elements.soundText) elements.soundText.textContent = 'Звук';
      initAudioContext();
    }
  }
}

// =============================================================
// УПРАВЛЕНИЕ МАССИВОМ И ОТРИСОВКА СТОЛБИКОВ
// =============================================================

function isSearchAlgorithm(algo) {
  return ['linear', 'binary', 'jump', 'interpolation'].includes(algo);
}

function isSortedRequired(algo) {
  return ['binary', 'jump', 'interpolation'].includes(algo);
}

function createAlgorithmGenerator(algorithmKey, array) {
  switch (algorithmKey) {
    case 'selection':
      return selectionSort(array);
    case 'insertion':
      return insertionSort(array);
    case 'shell':
      return shellSort(array);
    case 'quick':
      return quickSort(array);
    case 'linear':
      return linearSearch(array, state.targetValue);
    case 'binary':
      return binarySearch(array, state.targetValue);
    case 'jump':
      return jumpSearch(array, state.targetValue);
    case 'interpolation':
      return interpolationSearch(array, state.targetValue);
    default:
      return bubbleSort(array);
  }
}

function generateRandomArray() {
  const arr = [];
  for (let i = 0; i < ARRAY_SIZE; i++) {
    const val = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
    arr.push(val);
  }
  return arr;
}

function createBarsDOM() {
  if (!elements.chartContainer) return;
  elements.chartContainer.querySelectorAll('.bar-wrapper').forEach(el => el.remove());

  for (let i = 0; i < ARRAY_SIZE; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bar-wrapper';

    const bar = document.createElement('div');
    bar.className = 'bar state-default';
    bar.id = `bar-${i}`;

    const valueSpan = document.createElement('span');
    valueSpan.className = 'bar-value';
    valueSpan.id = `val-${i}`;

    const indexSpan = document.createElement('span');
    indexSpan.className = 'bar-index';
    indexSpan.textContent = String(i);

    bar.appendChild(valueSpan);
    wrapper.appendChild(bar);
    wrapper.appendChild(indexSpan);
    elements.chartContainer.appendChild(wrapper);
  }
}

function render() {
  const isSearch = isSearchAlgorithm(state.selectedAlgorithm);

  for (let i = 0; i < ARRAY_SIZE; i++) {
    const bar = document.getElementById(`bar-${i}`);
    const valSpan = document.getElementById(`val-${i}`);
    if (!bar || !valSpan) continue;

    const val = state.currentArray[i];
    const heightPercent = Math.max(6, (val / MAX_VALUE) * 100);

    bar.style.height = `${heightPercent}%`;
    valSpan.textContent = String(val);

    bar.className = 'bar';
    if (heightPercent < 18) {
      bar.classList.add('is-short');
    }

    const barState = state.barStates[i] || 'default';
    bar.classList.add(`state-${barState}`);

    // Элементы вне текущей области поиска затемняются (state-dimmed)
    if (state.dimmedIndices && state.dimmedIndices.has(i)) {
      bar.classList.add('state-dimmed');
    }
  }

  if (elements.comparisonsCount) elements.comparisonsCount.textContent = String(state.comparisons);
  if (elements.swapsCount) {
    elements.swapsCount.textContent = isSearch ? String(state.targetValue) : String(state.swaps);
  }
  if (elements.stepCounterLabel) elements.stepCounterLabel.textContent = `Шаг: ${state.stepNumber}`;
  if (elements.currentPassCount) {
    elements.currentPassCount.textContent = isSearch
      ? (isSortedRequired(state.selectedAlgorithm) ? 'Отсортирован' : 'Произвольный')
      : `${Math.min(state.currentPass, ARRAY_SIZE)} / ${ARRAY_SIZE}`;
  }

  if (elements.sortedCount) {
    if (isSearch) {
      const hasFound = state.barStates.some(s => s === 'sorted');
      const isFailed = state.isFinished && !hasFound;
      elements.sortedCount.textContent = hasFound ? '🎯 Найдено' : (isFailed ? '❌ Не найдено' : '🔍 Поиск...');
    } else {
      const sortedTotal = state.barStates.filter(s => s === 'sorted').length;
      elements.sortedCount.textContent = `${sortedTotal} / ${ARRAY_SIZE}`;
    }
  }
}

function initializeNewArray() {
  pause();
  state.initialArray = generateRandomArray();

  // Для поиска, где нужен отсортированный массив (бинарный, прыжковый, интерполяционный),
  // автоматически генерируем отсортированный массив по ТЗ
  if (isSortedRequired(state.selectedAlgorithm)) {
    state.initialArray.sort((a, b) => a - b);
  }

  state.currentArray = [...state.initialArray];
  state.barStates = new Array(ARRAY_SIZE).fill('default');
  state.dimmedIndices.clear();

  // Если открыт алгоритм поиска, инициализируем искомое число из массива, если пользователь ещё не ввёл своё
  if (isSearchAlgorithm(state.selectedAlgorithm)) {
    if (elements.targetInput) {
      const currentInputVal = parseInt(elements.targetInput.value, 10);
      if (!currentInputVal || (!state.initialArray.includes(currentInputVal) && currentInputVal === 42)) {
        const randomPick = state.initialArray[Math.floor(Math.random() * state.initialArray.length)];
        state.targetValue = randomPick;
        elements.targetInput.value = String(randomPick);
      } else {
        state.targetValue = currentInputVal;
      }
    }
  }

  state.generator = createAlgorithmGenerator(state.selectedAlgorithm, state.currentArray);
  state.comparisons = 0;
  state.swaps = 0;
  state.stepNumber = 0;
  state.currentPass = 0;
  state.isFinished = false;

  highlightCodeLine(null);
  const algoTitle = ALGORITHMS_INFO[state.selectedAlgorithm].title;
  const isSearch = isSearchAlgorithm(state.selectedAlgorithm);
  updateStatusUI('idle', isSearch
    ? `Сгенерирован ${isSortedRequired(state.selectedAlgorithm) ? 'отсортированный' : 'произвольный'} массив для «${algoTitle}». Ищем число ${state.targetValue}.`
    : `Сгенерирован новый массив из 20 чисел для «${algoTitle}». Готов к сортировке.`);

  render();
  updateButtonsState();
}

function resetCurrentArray() {
  pause();
  state.currentArray = [...state.initialArray];
  state.barStates = new Array(ARRAY_SIZE).fill('default');
  state.dimmedIndices.clear();
  state.generator = createAlgorithmGenerator(state.selectedAlgorithm, state.currentArray);
  state.comparisons = 0;
  state.swaps = 0;
  state.stepNumber = 0;
  state.currentPass = 0;
  state.isFinished = false;

  highlightCodeLine(null);
  const isSearch = isSearchAlgorithm(state.selectedAlgorithm);
  updateStatusUI('idle', isSearch
    ? `Массив сброшен. Поиск числа ${state.targetValue}. Нажмите «Старт» или «Шаг».`
    : 'Массив возвращён к исходному состоянию. Нажмите «Старт» или «Шаг».');

  render();
  updateButtonsState();
}

function changeAlgorithm(newAlgoKey) {
  if (!ALGORITHMS_INFO[newAlgoKey]) return;
  state.selectedAlgorithm = newAlgoKey;

  const isSearch = isSearchAlgorithm(newAlgoKey);
  const needsSort = isSortedRequired(newAlgoKey);

  // Переключаем видимость панели параметров поиска
  if (elements.searchControlsRow) {
    elements.searchControlsRow.style.display = isSearch ? 'flex' : 'none';
  }

  const info = ALGORITHMS_INFO[newAlgoKey];
  if (elements.algoSubtitle) elements.algoSubtitle.textContent = info.subtitle;
  if (elements.infoTitle) elements.infoTitle.textContent = `Принцип работы: ${info.title}`;
  if (elements.infoText) elements.infoText.textContent = info.description;
  if (elements.timeWorst) elements.timeWorst.textContent = info.timeWorst;
  if (elements.timeAvg) elements.timeAvg.textContent = info.timeAvg;
  if (elements.spaceComplexity) elements.spaceComplexity.textContent = info.space;

  // Динамическое обновление подписей в легенде
  const legendPivotText = document.getElementById('legendPivotText');
  if (legendPivotText) {
    if (isSearch) {
      legendPivotText.textContent = 'Пурпурный: Границы (left / right / mid)';
    } else {
      const pivotLabels = {
        bubble: 'Пурпурный: Опорный',
        selection: 'Пурпурный: Минимум',
        insertion: 'Пурпурный: Ключ',
        shell: 'Пурпурный: Шаг gap',
        quick: 'Пурпурный: Опорный',
      };
      legendPivotText.textContent = pivotLabels[newAlgoKey] || 'Пурпурный: Опорный';
    }
  }

  const legendCompareText = document.getElementById('legendCompareText');
  if (legendCompareText) {
    legendCompareText.textContent = isSearch ? 'Жёлтый: Проверяемый элемент' : 'Жёлтый: Сравнение';
  }

  const legendSwapText = document.getElementById('legendSwapText');
  if (legendSwapText) {
    legendSwapText.textContent = isSearch ? 'Красный: Не найдено' : 'Красный: Обмен';
  }

  const legendSortedText = document.getElementById('legendSortedText');
  if (legendSortedText) {
    legendSortedText.textContent = isSearch ? 'Зелёный: Найденный элемент' : 'Зелёный: Отсортирован';
  }

  // Обновляем подписи счетчиков под поиск или сортировку
  const counter2Card = document.getElementById('counterSwapsCard');
  if (counter2Card) {
    const label = counter2Card.querySelector('.counter-label');
    if (label) label.textContent = isSearch ? 'Искомое' : 'Обмены';
  }
  const counter3Card = document.getElementById('counterPassCard');
  if (counter3Card) {
    const label = counter3Card.querySelector('.counter-label');
    if (label) label.textContent = isSearch ? 'Массив' : 'Проход по массиву';
  }
  const counter4Card = document.getElementById('counterResultCard');
  if (counter4Card) {
    const label = counter4Card.querySelector('.counter-label');
    if (label) label.textContent = isSearch ? 'Результат' : 'Отсортировано';
  }

  // Если для поиска требуется отсортированный массив, сортируем текущие данные
  if (needsSort) {
    state.initialArray.sort((a, b) => a - b);
  }

  renderCppCodeBlock();
  resetCurrentArray();
}

function updateStatusUI(type, message) {
  if (elements.statusMessage) elements.statusMessage.textContent = message;
  if (!elements.statusTag) return;

  const isSearch = isSearchAlgorithm(state.selectedAlgorithm);
  elements.statusTag.className = 'status-tag';
  switch (type) {
    case 'pivot':
      elements.statusTag.classList.add('tag-pivot');
      if (isSearch) {
        elements.statusTag.textContent = 'Границы';
      } else if (state.selectedAlgorithm === 'selection') {
        elements.statusTag.textContent = 'Минимум';
      } else if (state.selectedAlgorithm === 'insertion') {
        elements.statusTag.textContent = 'Ключ';
      } else if (state.selectedAlgorithm === 'shell') {
        elements.statusTag.textContent = 'Интервал';
      } else {
        elements.statusTag.textContent = 'Опорный';
      }
      break;
    case 'compare':
      elements.statusTag.classList.add('tag-compare');
      elements.statusTag.textContent = isSearch ? 'Проверка' : 'Сравнение';
      break;
    case 'swap':
      elements.statusTag.classList.add('tag-swap');
      elements.statusTag.textContent = isSearch ? 'Не найдено' : 'Обмен';
      break;
    case 'sorted':
      elements.statusTag.classList.add('tag-sorted');
      elements.statusTag.textContent = isSearch ? 'Найдено' : 'Зафиксирован';
      break;
    case 'all-sorted':
      elements.statusTag.classList.add('tag-done');
      elements.statusTag.textContent = 'Готово';
      break;
    default:
      elements.statusTag.classList.add('tag-idle');
      elements.statusTag.textContent = 'Ожидание';
      break;
  }
}

function updateButtonsState() {
  if (!elements.btnStep || !elements.btnPlayPause) return;
  if (state.isFinished) {
    elements.btnStep.disabled = true;
    elements.btnPlayPause.disabled = true;
  } else {
    elements.btnStep.disabled = state.isPlaying;
    elements.btnPlayPause.disabled = false;
  }
}

// =============================================================
// ПОШАГОВОЕ ВЫПОЛНЕНИЕ И УПРАВЛЕНИЕ ВОСПРОИЗВЕДЕНИЕМ
// =============================================================

function executeSingleStep() {
  if (state.isFinished || !state.generator) {
    return false;
  }

  const result = state.generator.next();

  if (result.done) {
    state.isFinished = true;
    pause();
    updateButtonsState();
    return false;
  }

  const step = result.value;
  state.stepNumber++;
  if (step.pass !== undefined) {
    state.currentPass = step.pass;
  }

  // Обновляем затемнение элементов вне диапазона поиска
  if (step.dimmed && Array.isArray(step.dimmed)) {
    state.dimmedIndices = new Set(step.dimmed);
  } else {
    state.dimmedIndices.clear();
  }

  // Подсвечиваем соответствующую строку кода на C++!
  if (step.line !== undefined) {
    highlightCodeLine(step.line);
  }

  const isSearch = isSearchAlgorithm(state.selectedAlgorithm);

  // Сброс временных состояний в серый
  for (let i = 0; i < ARRAY_SIZE; i++) {
    if (state.barStates[i] !== 'sorted') {
      state.barStates[i] = 'default';
    }
  }

  switch (step.type) {
    case 'pivot':
      for (const idx of step.indices) {
        state.barStates[idx] = 'pivot';
      }
      updateStatusUI('pivot', step.description);
      break;

    case 'compare':
      state.comparisons++;
      for (const idx of step.indices) {
        state.barStates[idx] = 'compare';
      }
      // Звук на каждое сравнение: высота тона зависит от значения столбика (по ТЗ)
      if (step.indices.length > 0) {
        const val = state.currentArray[step.indices[0]];
        playToneForValue(val);
      }
      updateStatusUI('compare', step.description);
      break;

    case 'swap':
      if (isSearch) {
        // Для поиска 'swap' используется как сигнал "Элемент не найден" (красный цвет)
        for (let i = 0; i < ARRAY_SIZE; i++) {
          state.barStates[i] = 'swap';
        }
        state.isFinished = true;
        updateStatusUI('swap', step.description);
        pause();
      } else {
        state.swaps++;
        for (const idx of step.indices) {
          state.barStates[idx] = 'swap';
        }
        updateStatusUI('swap', step.description);
      }
      break;

    case 'sorted':
      for (const idx of step.indices) {
        state.barStates[idx] = 'sorted';
      }
      if (isSearch) {
        state.isFinished = true;
        updateStatusUI('sorted', step.description);
        playCompletionChime();
        pause();
      } else {
        updateStatusUI('sorted', step.description);
      }
      break;

    case 'all-sorted':
      state.barStates.fill('sorted');
      state.isFinished = true;
      updateStatusUI('all-sorted', step.description);
      playCompletionChime();
      pause();
      break;
  }

  render();
  return !state.isFinished;
}

function play() {
  if (state.isFinished) return;
  state.isPlaying = true;
  if (elements.btnPlayPause) elements.btnPlayPause.classList.add('is-playing');
  if (elements.playIcon) elements.playIcon.textContent = '⏸';
  if (elements.playText) elements.playText.textContent = 'Пауза';
  updateButtonsState();

  runLoop();
}

function pause() {
  state.isPlaying = false;
  if (state.timerId) {
    clearTimeout(state.timerId);
    state.timerId = null;
  }
  if (elements.btnPlayPause) elements.btnPlayPause.classList.remove('is-playing');
  if (elements.playIcon) elements.playIcon.textContent = '▶';
  if (elements.playText) elements.playText.textContent = 'Старт';
  updateButtonsState();
}

function togglePlayPause() {
  if (state.isPlaying) {
    pause();
  } else {
    play();
  }
}

function runLoop() {
  if (!state.isPlaying) return;

  const hasNext = executeSingleStep();
  if (hasNext && state.isPlaying) {
    state.timerId = setTimeout(runLoop, state.stepDelay);
  }
}

function setupEventListeners() {
  // Кнопка включения/выключения звука
  if (elements.btnSoundToggle) {
    elements.btnSoundToggle.addEventListener('click', () => {
      initAudioContext();
      toggleSound();
    });
  }

  if (elements.algoSelect) {
    elements.algoSelect.addEventListener('change', (e) => {
      const target = /** @type {HTMLSelectElement} */ (e.target);
      changeAlgorithm(target.value);
    });
  }

  // Поле ввода «Искомое число»
  if (elements.targetInput) {
    elements.targetInput.addEventListener('input', (e) => {
      const target = /** @type {HTMLInputElement} */ (e.target);
      const val = parseInt(target.value, 10);
      if (!isNaN(val)) {
        state.targetValue = val;
        resetCurrentArray();
      }
    });
  }

  // Кнопка «Случайное из массива»
  if (elements.btnPickRandom) {
    elements.btnPickRandom.addEventListener('click', () => {
      initAudioContext();
      if (state.currentArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * state.currentArray.length);
        const pick = state.currentArray[randomIndex];
        state.targetValue = pick;
        if (elements.targetInput) elements.targetInput.value = String(pick);
        resetCurrentArray();
      }
    });
  }

  // Кнопка «Число не из массива» (проверка отрицательного исхода)
  if (elements.btnPickMissing) {
    elements.btnPickMissing.addEventListener('click', () => {
      initAudioContext();
      // Выбираем значение, которого гарантированно нет в текущем массиве
      const maxVal = Math.max(...state.currentArray);
      const missing = maxVal + 5;
      state.targetValue = missing;
      if (elements.targetInput) elements.targetInput.value = String(missing);
      resetCurrentArray();
    });
  }

  if (elements.btnPlayPause) {
    elements.btnPlayPause.addEventListener('click', () => {
      initAudioContext();
      togglePlayPause();
    });
  }

  if (elements.btnStep) {
    elements.btnStep.addEventListener('click', () => {
      initAudioContext();
      if (!state.isPlaying) {
        executeSingleStep();
      }
    });
  }

  if (elements.btnReset) {
    elements.btnReset.addEventListener('click', resetCurrentArray);
  }

  if (elements.btnNewArray) {
    elements.btnNewArray.addEventListener('click', initializeNewArray);
  }

  if (elements.speedSlider) {
    elements.speedSlider.addEventListener('input', (e) => {
      const target = /** @type {HTMLInputElement} */ (e.target);
      state.stepDelay = parseInt(target.value, 10);
      if (elements.speedDisplay) {
        elements.speedDisplay.textContent = `${state.stepDelay} мс`;
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      initAudioContext();
      togglePlayPause();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      initAudioContext();
      if (!state.isPlaying) executeSingleStep();
    } else if (e.code === 'KeyM') {
      e.preventDefault();
      toggleSound();
    } else if (e.code === 'KeyR') {
      e.preventDefault();
      resetCurrentArray();
    } else if (e.code === 'KeyN') {
      e.preventDefault();
      initializeNewArray();
    }
  });
}

function initApp() {
  createBarsDOM();
  renderCppCodeBlock();
  setupEventListeners();
  initializeNewArray();
  window.__appState = state;
  window.__changeAlgo = changeAlgorithm;
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
