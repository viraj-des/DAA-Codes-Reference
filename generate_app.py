import json

with open('repo_codes.json') as f:
    codes = json.load(f)

template = r'''// DAA & DSA Interactive Learning Handbook
// Connected to github.com/viraj-des/DAA-Lab-TY

const REPO_URL = "https://github.com/viraj-des/DAA-Lab-TY";
const REPO_CODES = __REPO_CODES__;

// Helper to parse student array input gracefully (accepts commas, spaces, or tabs)
function parseNumbers(str) {
  return str
    .replace(/,/g, ' ')
    .trim()
    .split(/\s+/)
    .map(x => parseInt(x))
    .filter(x => !isNaN(x));
}

// Categories & Algorithms Catalog
const CATEGORIES = [
  {
    name: "Divide & Conquer",
    items: ["binary_search", "merge_sort", "quick_sort"]
  },
  {
    name: "Greedy Algorithms",
    items: ["job_sequencing", "prims_mst", "dijkstra"]
  },
  {
    name: "Dynamic Programming",
    items: ["floyd_warshall"]
  },
  {
    name: "Backtracking",
    items: ["sudoku", "n_queens"]
  }
];

const ALGORITHMS = [
  {
    id: "binary_search",
    name: "Binary Search",
    category: "Divide & Conquer",
    githubFile: "Binary search/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Binary%20search/Main.java`,
    concept: "Repeatedly halves the candidate search window by comparing the target key with the middle element.",
    description: "Binary Search is the gold standard search algorithm for sorted datasets. Instead of scanning one element at a time (linear search in O(n)), it eliminates half of the remaining elements in every single comparison step, yielding lightning fast O(log n) time.",
    steps: [
      "Verify the collection is already sorted in ascending order.",
      "Calculate the midpoint index: mid = Math.floor((low + high) / 2).",
      "Compare target with array[mid]: if equal, target is found!",
      "If target < array[mid], discard the right half by setting high = mid - 1.",
      "If target > array[mid], discard the left half by setting low = mid + 1.",
      "Repeat until target is found or low > high (element does not exist)."
    ],
    complexity: { best: "O(1)", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
    defaultParams: {
      arr: [4, 9, 15, 23, 38, 45, 56, 67, 72, 89, 94],
      key: 45
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div class="control-group">
          <label class="control-label">Array Elements (comma or space separated):</label>
          <input type="text" id="bs-arr-input" class="text-input" value="${params.arr.join(', ')}">
        </div>
        <div class="btn-chips">
          <button class="btn-chip" id="bs-pre-rand">🎲 Random (10)</button>
          <button class="btn-chip" id="bs-pre-simple">🔢 10 to 90</button>
          <button class="btn-chip" id="bs-pre-sort">📈 Auto-Sort List</button>
        </div>
        <div style="margin-top: 14px;">
          <label class="control-label">Select Target Key (click a chip or type below):</label>
          <div class="btn-chips" id="bs-key-pills">
            ${params.arr.map(num => `<button class="btn-chip ${num === params.key ? 'active' : ''}" data-val="${num}">${num}</button>`).join('')}
            <button class="btn-chip" data-val="999" style="color: #ff3b30; border-color: #ffc7c4;">Missing (999)</button>
          </div>
        </div>
        <div class="control-group" style="margin-top: 10px; max-width: 140px;">
          <input type="number" id="bs-key-input" class="text-input" value="${params.key}">
        </div>
      `;

      const arrInput = container.querySelector('#bs-arr-input');
      const keyInput = container.querySelector('#bs-key-input');

      const apply = () => {
        let raw = parseNumbers(arrInput.value);
        if (raw.length === 0) raw = [10, 20, 30, 40, 50];
        raw.sort((a, b) => a - b);
        arrInput.value = raw.join(', ');
        const k = parseInt(keyInput.value) || raw[0];
        onChange({ arr: raw, key: k });
      };

      container.querySelectorAll('[data-val]').forEach(pill => {
        pill.onclick = () => {
          keyInput.value = pill.dataset.val;
          apply();
        };
      });

      container.querySelector('#bs-pre-rand').onclick = () => {
        const sz = 8 + Math.floor(Math.random() * 5);
        const r = Array.from({length: sz}, () => Math.floor(Math.random() * 90) + 10);
        r.sort((a, b) => a - b);
        arrInput.value = r.join(', ');
        keyInput.value = r[Math.floor(Math.random() * r.length)];
        apply();
      };

      container.querySelector('#bs-pre-simple').onclick = () => {
        arrInput.value = "10, 20, 30, 40, 50, 60, 70, 80, 90";
        keyInput.value = 50;
        apply();
      };

      container.querySelector('#bs-pre-sort').onclick = apply;
      arrInput.onchange = apply;
      keyInput.onchange = apply;
    },
    computeSteps(params) {
      const arr = [...params.arr];
      const key = params.key;
      const steps = [];
      let low = 0;
      let high = arr.length - 1;

      steps.push({
        low, high, mid: -1, key, found: false,
        log: `Step 1: Start search interval [0..${arr.length - 1}]. Target key is ${key}.`
      });

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const val = arr[mid];
        const stepNum = steps.length + 1;

        if (val === key) {
          steps.push({
            low, high, mid, key, found: true,
            log: `Step ${stepNum}: Middle element at index ${mid} is ${val}. Target found! Search complete in ${stepNum} operations.`
          });
          return steps;
        } else if (key < val) {
          steps.push({
            low, high, mid, key, found: false,
            log: `Step ${stepNum}: Middle element is ${val}. Target ${key} < ${val}, so discard right half. High updated to index ${mid - 1}.`
          });
          high = mid - 1;
        } else {
          steps.push({
            low, high, mid, key, found: false,
            log: `Step ${stepNum}: Middle element is ${val}. Target ${key} > ${val}, so discard left half. Low updated to index ${mid + 1}.`
          });
          low = mid + 1;
        }
      }

      steps.push({
        low, high, mid: -1, key, found: false, notFound: true,
        log: `Search Complete: Candidate range exhausted (low > high). Key ${key} does not exist in array.`
      });
      return steps;
    },
    renderStep(stage, step, params) {
      const arr = params.arr;
      let html = `<div class="bs-tape">`;
      arr.forEach((val, idx) => {
        let cls = "bs-cell";
        let isLow = idx === step.low;
        let isHigh = idx === step.high;
        let isMid = idx === step.mid;
        let inRange = idx >= step.low && idx <= step.high;

        if (step.mid !== -1 && idx === step.mid) {
          cls += step.found ? " found" : " mid-cell";
        } else if (inRange) {
          cls += " active-range";
        } else {
          cls += " dimmed";
        }

        html += `
          <div class="bs-cell-wrapper">
            ${isLow ? '<span class="bs-pointer low">LOW</span>' : ''}
            ${isMid ? '<span class="bs-pointer mid">MID</span>' : ''}
            ${isHigh && (!isLow || step.low !== step.high) ? '<span class="bs-pointer high">HIGH</span>' : ''}
            <div class="${cls}">${val}</div>
            <div class="bs-idx">[${idx}]</div>
          </div>
        `;
      });
      html += `</div>`;
      stage.innerHTML = html;
    }
  },

  {
    id: "merge_sort",
    name: "Merge Sort",
    category: "Divide & Conquer",
    githubFile: "Lab2-MergeSort/MergeSort.java",
    githubUrl: `${REPO_URL}/blob/main/Lab2-MergeSort/MergeSort.java`,
    concept: "Recursively divides array into singletons, then merges sorted subarrays pairwise in linear time.",
    description: "Merge Sort is a stable, comparison-based divide-and-conquer algorithm. It guarantees O(n log n) running time even in the worst case by breaking the problem down to trivial size-1 arrays and then executing efficient two-pointer merges.",
    steps: [
      "Divide: Compute midpoint m = (l + r) / 2 and recursively sort left half [l..m] and right half [m+1..r].",
      "Base Case: Recursion halts when a subarray has 1 or 0 elements (which are trivially sorted).",
      "Merge: Create temporary buffers for left and right subarrays.",
      "Conquer: Compare front elements of both buffers, copy the smaller into the main array, and advance pointers.",
      "Copy any remaining elements from either buffer to finish the merge step."
    ],
    complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
    defaultParams: {
      arr: [38, 27, 43, 3, 9, 82, 10, 19]
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div class="control-group">
          <label class="control-label">Array Elements (comma or space separated):</label>
          <input type="text" id="ms-arr-input" class="text-input" value="${params.arr.join(', ')}">
        </div>
        <div class="btn-chips">
          <button class="btn-chip" id="ms-pre-rand">🎲 Random (8)</button>
          <button class="btn-chip" id="ms-pre-rev">📉 Reversed Order</button>
          <button class="btn-chip" id="ms-pre-sorted">📈 Already Sorted</button>
          <button class="btn-chip" id="ms-pre-small">🧼 Simple (5)</button>
        </div>
      `;
      const input = container.querySelector('#ms-arr-input');
      const apply = () => {
        let vals = parseNumbers(input.value).slice(0, 14);
        if (vals.length === 0) vals = [45, 12, 85, 32, 8];
        onChange({ arr: vals });
      };

      container.querySelector('#ms-pre-rand').onclick = () => {
        const r = Array.from({length: 8}, () => Math.floor(Math.random() * 85) + 10);
        input.value = r.join(', ');
        apply();
      };
      container.querySelector('#ms-pre-rev').onclick = () => {
        input.value = "80, 70, 60, 50, 40, 30, 20, 10";
        apply();
      };
      container.querySelector('#ms-pre-sorted').onclick = () => {
        input.value = "10, 20, 30, 40, 50, 60, 70, 80";
        apply();
      };
      container.querySelector('#ms-pre-small').onclick = () => {
        input.value = "9, 3, 7, 1, 5";
        apply();
      };
      input.onchange = apply;
    },
    computeSteps(params) {
      const arr = [...params.arr];
      const steps = [];
      steps.push({
        arr: [...arr], left: -1, right: -1, mid: -1,
        log: `Step 1: Input array has ${arr.length} elements: [${arr.join(', ')}].`
      });

      function mergeSort(a, l, r) {
        if (l < r) {
          const m = Math.floor((l + r) / 2);
          steps.push({
            arr: [...a], left: l, right: r, mid: m, phase: "divide",
            log: `Divide: Subarray [${l}..${r}] split at midpoint ${m} -> [${l}..${m}] and [${m+1}..${r}].`
          });
          mergeSort(a, l, m);
          mergeSort(a, m + 1, r);
          merge(a, l, m, r);
        }
      }

      function merge(a, l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;
        const L = [];
        const R = [];
        for (let i = 0; i < n1; i++) L.push(a[l + i]);
        for (let j = 0; j < n2; j++) R.push(a[m + 1 + j]);

        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
          steps.push({
            arr: [...a], left: l, right: r, mid: m, comparing: [l + i, m + 1 + j],
            log: `Compare: L[${i}]=${L[i]} with R[${j}]=${R[j]}. Placing smaller value ${Math.min(L[i], R[j])} at index ${k}.`
          });
          if (L[i] <= R[j]) {
            a[k] = L[i];
            i++;
          } else {
            a[k] = R[j];
            j++;
          }
          k++;
        }
        while (i < n1) { a[k] = L[i]; i++; k++; }
        while (j < n2) { a[k] = R[j]; j++; k++; }

        steps.push({
          arr: [...a], left: l, right: r, mid: m, merged: true,
          log: `Merge complete: Subarray [${l}..${r}] is now sorted: [${a.slice(l, r + 1).join(', ')}].`
        });
      }

      mergeSort(arr, 0, arr.length - 1);
      steps.push({
        arr: [...arr], complete: true,
        log: `Sorting Complete: Entire array is sorted in-place: [${arr.join(', ')}].`
      });
      return steps;
    },
    renderStep(stage, step) {
      const arr = step.arr;
      const maxVal = Math.max(...arr, 50);
      let html = `<div class="bars-container">`;
      arr.forEach((val, idx) => {
        const heightPct = Math.round((val / maxVal) * 85) + 10;
        let barClass = "sort-bar";
        if (step.complete) {
          barClass += " sorted";
        } else if (step.comparing && (idx === step.comparing[0] || idx === step.comparing[1])) {
          barClass += " comparing";
        } else if (step.left !== -1 && (idx >= step.left && idx <= step.right)) {
          barClass += " active";
        } else if (step.left !== -1) {
          barClass += " dimmed";
        }
        html += `
          <div class="sort-bar-col">
            <div class="${barClass}" style="height: ${heightPct}%;">${val}</div>
            <span style="font-size: 11px; margin-top: 6px; color: var(--text-secondary); font-weight: 600;">[${idx}]</span>
          </div>
        `;
      });
      html += `</div>`;
      stage.innerHTML = html;
    }
  },

  {
    id: "quick_sort",
    name: "Quick Sort",
    category: "Divide & Conquer",
    githubFile: "Quick sort/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Quick%20sort/Main.java`,
    concept: "Partitions elements around a pivot so smaller elements precede and greater follow, then recurses.",
    description: "Quick Sort is widely considered the fastest practical sorting algorithm in practice. It works in-place by selecting a pivot, partitioning all smaller elements to the left, and placing the pivot directly into its definitive final position.",
    steps: [
      "Select a pivot element (the student Java implementation selects the last element).",
      "Initialize pointer i = low - 1. Iterate j from low to high - 1.",
      "If array[j] < pivot, increment i and swap array[i] with array[j].",
      "Place pivot in correct position by swapping array[i + 1] with array[high].",
      "Recursively apply quick sort to left subarray [low..i] and right subarray [i+2..high]."
    ],
    complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n^2)", space: "O(log n)" },
    defaultParams: {
      arr: [48, 12, 75, 33, 90, 24, 60, 15]
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div class="control-group">
          <label class="control-label">Array Elements (comma or space separated):</label>
          <input type="text" id="qs-arr-input" class="text-input" value="${params.arr.join(', ')}">
        </div>
        <div class="btn-chips">
          <button class="btn-chip" id="qs-pre-rand">🎲 Random (8)</button>
          <button class="btn-chip" id="qs-pre-sorted">⚠️ Sorted (Demonstrates Worst Case)</button>
          <button class="btn-chip" id="qs-pre-small">🧼 Simple (5)</button>
        </div>
      `;
      const input = container.querySelector('#qs-arr-input');
      const apply = () => {
        let vals = parseNumbers(input.value).slice(0, 14);
        if (vals.length === 0) vals = [20, 5, 40, 10, 80];
        onChange({ arr: vals });
      };

      container.querySelector('#qs-pre-rand').onclick = () => {
        const r = Array.from({length: 8}, () => Math.floor(Math.random() * 85) + 10);
        input.value = r.join(', ');
        apply();
      };
      container.querySelector('#qs-pre-sorted').onclick = () => {
        input.value = "10, 20, 30, 40, 50, 60, 70, 80";
        apply();
      };
      container.querySelector('#qs-pre-small').onclick = () => {
        input.value = "30, 10, 50, 20, 40";
        apply();
      };
      input.onchange = apply;
    },
    computeSteps(params) {
      const arr = [...params.arr];
      const steps = [];
      const finalized = new Set();

      steps.push({
        arr: [...arr], low: 0, high: arr.length - 1, pivotIdx: -1, i: -1, j: -1,
        finalized: Array.from(finalized),
        log: `Step 1: Starting Quick Sort on [${arr.join(', ')}]. Last element is chosen as pivot.`
      });

      function quickSort(a, low, high) {
        if (low < high) {
          const p = partition(a, low, high);
          quickSort(a, low, p - 1);
          quickSort(a, p + 1, high);
        } else if (low === high) {
          finalized.add(low);
        }
      }

      function partition(a, low, high) {
        const pivot = a[high];
        let i = low - 1;
        steps.push({
          arr: [...a], low, high, pivotIdx: high, i, j: low,
          finalized: Array.from(finalized),
          log: `Partition section [${low}..${high}]: Pivot is ${pivot} (highlighted in red). Scanning elements against pivot.`
        });

        for (let j = low; j < high; j++) {
          if (a[j] < pivot) {
            i++;
            const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
            steps.push({
              arr: [...a], low, high, pivotIdx: high, i, j, swap: [i, j],
              finalized: Array.from(finalized),
              log: `Element ${a[i]} < pivot ${pivot}: increment index i to ${i}, swap values at [${i}] and [${j}].`
            });
          } else {
            steps.push({
              arr: [...a], low, high, pivotIdx: high, i, j,
              finalized: Array.from(finalized),
              log: `Element ${a[j]} >= pivot ${pivot}: maintain position and advance scanner.`
            });
          }
        }

        const tmp = a[i + 1]; a[i + 1] = a[high]; a[high] = tmp;
        finalized.add(i + 1);
        steps.push({
          arr: [...a], low, high, pivotIdx: i + 1, placed: true,
          finalized: Array.from(finalized),
          log: `Pivot placed: Pivot ${a[i + 1]} locked into final sorted index [${i + 1}].`
        });
        return i + 1;
      }

      quickSort(arr, 0, arr.length - 1);
      for (let i = 0; i < arr.length; i++) finalized.add(i);
      steps.push({
        arr: [...arr], complete: true, finalized: Array.from(finalized),
        log: `Complete: Array is fully sorted: [${arr.join(', ')}].`
      });
      return steps;
    },
    renderStep(stage, step) {
      const arr = step.arr;
      const maxVal = Math.max(...arr, 50);
      let html = `<div class="bars-container">`;
      arr.forEach((val, idx) => {
        const heightPct = Math.round((val / maxVal) * 85) + 10;
        let barClass = "sort-bar";
        if (step.finalized && step.finalized.includes(idx)) {
          barClass += " sorted";
        } else if (idx === step.pivotIdx) {
          barClass += " pivot";
        } else if (idx === step.j || idx === step.i) {
          barClass += " comparing";
        } else if (step.low !== undefined && (idx < step.low || idx > step.high)) {
          barClass += " dimmed";
        }
        html += `
          <div class="sort-bar-col">
            <div class="${barClass}" style="height: ${heightPct}%;">${val}</div>
            <span style="font-size: 11px; margin-top: 6px; color: var(--text-secondary); font-weight: 600;">[${idx}]</span>
          </div>
        `;
      });
      html += `</div>`;
      stage.innerHTML = html;
    }
  },

  {
    id: "job_sequencing",
    name: "Job Sequencing with Deadlines",
    category: "Greedy Algorithms",
    githubFile: "Job sequencing/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Job%20sequencing/Main.java`,
    concept: "Sorts jobs by profit descending, greedily booking each job into the latest available time slot before its deadline.",
    description: "Job Sequencing with Deadlines is a classic optimization problem. Given jobs with deadlines and profits, the goal is to maximize total profit earned under the constraint that each job takes 1 unit of time and only 1 job can be scheduled per slot.",
    steps: [
      "Sort all candidate jobs in descending order of profit.",
      "Determine maximum deadline T_max to establish available discrete time slots [1..T_max].",
      "For each job, search backwards from min(T_max, job.deadline) down to 1.",
      "If an empty slot is found, assign the job to that slot and accumulate its profit.",
      "If all valid slots are occupied, the job cannot be scheduled and is discarded."
    ],
    complexity: { best: "O(n log n)", avg: "O(n^2)", worst: "O(n^2)", space: "O(d)" },
    defaultParams: {
      jobs: [
        { id: "J1", deadline: 2, profit: 100 },
        { id: "J2", deadline: 1, profit: 19 },
        { id: "J3", deadline: 2, profit: 27 },
        { id: "J4", deadline: 1, profit: 25 },
        { id: "J5", deadline: 3, profit: 15 }
      ]
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div class="btn-chips">
          <button class="btn-chip" id="js-pre-1">💼 5-Job Lab Assignment</button>
          <button class="btn-chip" id="js-pre-2">⚡ 4-Job Quick Test</button>
        </div>
        <div style="margin-top: 14px; margin-bottom: 8px;">
          <label class="control-label">Editable Job Pool:</label>
        </div>
        <div id="js-job-table" style="max-height: 130px; overflow-y: auto; background: #fff; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 6px;">
          ${params.jobs.map((j, idx) => `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-weight: 600; width: 28px; font-size: 12px;">#${idx+1}</span>
              <input type="text" class="text-input j-id" style="width: 60px; padding: 4px 8px;" value="${j.id}">
              <span style="font-size: 12px; color: var(--text-secondary);">Deadline:</span>
              <input type="number" class="text-input j-dl" style="width: 50px; padding: 4px 8px;" min="1" max="6" value="${j.deadline}">
              <span style="font-size: 12px; color: var(--text-secondary);">Profit $:</span>
              <input type="number" class="text-input j-pr" style="width: 65px; padding: 4px 8px;" min="1" value="${j.profit}">
            </div>
          `).join('')}
        </div>
        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button id="js-add-btn" class="btn-action">+ Add Job</button>
          <button id="js-apply-btn" class="btn-action primary">Apply Changes</button>
        </div>
      `;
      const readJobs = () => {
        const ids = container.querySelectorAll('.j-id');
        const dls = container.querySelectorAll('.j-dl');
        const prs = container.querySelectorAll('.j-pr');
        const out = [];
        for (let i = 0; i < ids.length; i++) {
          out.push({
            id: ids[i].value || `J${i+1}`,
            deadline: parseInt(dls[i].value) || 1,
            profit: parseInt(prs[i].value) || 10
          });
        }
        return out;
      };
      container.querySelector('#js-apply-btn').onclick = () => onChange({ jobs: readJobs() });
      container.querySelector('#js-pre-1').onclick = () => onChange({
        jobs: [
          { id: "J1", deadline: 2, profit: 100 },
          { id: "J2", deadline: 1, profit: 19 },
          { id: "J3", deadline: 2, profit: 27 },
          { id: "J4", deadline: 1, profit: 25 },
          { id: "J5", deadline: 3, profit: 15 }
        ]
      });
      container.querySelector('#js-pre-2').onclick = () => onChange({
        jobs: [
          { id: "A", deadline: 4, profit: 70 },
          { id: "B", deadline: 1, profit: 80 },
          { id: "C", deadline: 1, profit: 30 },
          { id: "D", deadline: 1, profit: 100 }
        ]
      });
      container.querySelector('#js-add-btn').onclick = () => {
        const cur = readJobs();
        cur.push({ id: `J${cur.length + 1}`, deadline: 2, profit: 35 });
        onChange({ jobs: cur });
      };
    },
    computeSteps(params) {
      const jobs = params.jobs.map(j => ({ ...j }));
      jobs.sort((a, b) => b.profit - a.profit);
      const maxDeadline = Math.max(...jobs.map(j => j.deadline), 1);
      const slots = Array(maxDeadline + 1).fill(null);
      let totalProfit = 0;
      const steps = [];

      steps.push({
        jobs: [...jobs], slots: [...slots], totalProfit: 0, currentJob: null,
        log: `Step 1: Jobs sorted by profit descending: [${jobs.map(j => `${j.id} ($${j.profit})`).join(', ')}]. Total available slots: ${maxDeadline}.`
      });

      for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        let assignedSlot = -1;

        for (let s = Math.min(maxDeadline, job.deadline); s >= 1; s--) {
          if (slots[s] === null) {
            slots[s] = job;
            assignedSlot = s;
            totalProfit += job.profit;
            break;
          }
        }

        if (assignedSlot !== -1) {
          steps.push({
            jobs: [...jobs], slots: [...slots], totalProfit, currentJob: job, slot: assignedSlot,
            log: `Step ${steps.length + 1}: Job ${job.id} (Profit $${job.profit}, Deadline ${job.deadline}) assigned to Slot ${assignedSlot}. Total profit is now $${totalProfit}.`
          });
        } else {
          steps.push({
            jobs: [...jobs], slots: [...slots], totalProfit, currentJob: job, slot: null, rejected: true,
            log: `Step ${steps.length + 1}: Job ${job.id} (Profit $${job.profit}) rejected. All slots <= deadline ${job.deadline} are already filled.`
          });
        }
      }

      steps.push({
        jobs: [...jobs], slots: [...slots], totalProfit, complete: true,
        log: `Complete: Optimal job schedule determined! Maximum total profit earned: $${totalProfit}.`
      });
      return steps;
    },
    renderStep(stage, step) {
      const slots = step.slots;
      const maxSlots = slots.length - 1;
      let html = `
        <div class="gantt-grid">
          <div style="font-weight: 600; font-size: 13px; color: var(--text-secondary);">Schedule Timeline (Slot 1 to ${maxSlots}):</div>
          <div class="gantt-slots-row">
      `;
      for (let s = 1; s <= maxSlots; s++) {
        const j = slots[s];
        html += `
          <div class="gantt-slot ${j ? 'filled' : ''}">
            <span class="gantt-slot-num">Slot ${s}</span>
            ${j ? `<span class="gantt-job-name">${j.id}</span><span class="gantt-job-profit">+$${j.profit}</span>` : '<span style="color:#aaa; font-size:12px;">Free</span>'}
          </div>
        `;
      }
      html += `
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 12px 16px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
            <span><b>Cumulative Profit:</b> <span style="font-size: 18px; color: #1a7f37; font-weight: 700; margin-left: 6px;">$${step.totalProfit}</span></span>
            <span><b>Active Job:</b> ${step.currentJob ? `<span style="font-weight: 600; color: var(--color-primary);">${step.currentJob.id} (Profit: $${step.currentJob.profit}, Due: Slot ${step.currentJob.deadline})</span>` : 'None'}</span>
          </div>
        </div>
      `;
      stage.innerHTML = html;
    }
  },

  {
    id: "prims_mst",
    name: "Prim's Minimum Spanning Tree",
    category: "Greedy Algorithms",
    githubFile: "Assignment 8 - Prims/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Assignment%208%20-%20Prims/Main.java`,
    concept: "Grows a Minimum Spanning Tree from a starting node by greedily absorbing the lowest-weight cut edge.",
    description: "Prim's algorithm finds a Minimum Spanning Tree (MST) for a connected, weighted undirected graph. Starting from any arbitrary source node, it grows a single tree by repeatedly picking the cheapest edge connecting an already-visited node to an unvisited node.",
    steps: [
      "Select an arbitrary starting root vertex and add it to the visited set.",
      "Identify all cut edges: edges with one endpoint in visited and one endpoint in unvisited.",
      "Select the edge with the minimal edge weight among all valid cut edges.",
      "Add the selected edge to the MST and mark the newly reached vertex as visited.",
      "Repeat until all V vertices are in the visited set (tree has exactly V - 1 edges)."
    ],
    complexity: { best: "O(E log V)", avg: "O(V^2)", worst: "O(V^2)", space: "O(V)" },
    defaultParams: {
      numVertices: 5,
      startNode: 0,
      matrix: [
        [0, 2, 0, 6, 0],
        [2, 0, 3, 8, 5],
        [0, 3, 0, 0, 7],
        [6, 8, 0, 0, 9],
        [0, 5, 7, 9, 0]
      ]
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div class="btn-chips">
          <button class="btn-chip" id="pm-pre-5">🏙️ 5-Node Network</button>
          <button class="btn-chip" id="pm-pre-4">🔺 4-Node Ring</button>
          <button class="btn-chip" id="pm-pre-6">🌐 6-Node Graph</button>
        </div>
        <div style="margin-top: 14px;">
          <label class="control-label">Select Starting Vertex:</label>
          <div class="btn-chips">
            ${Array.from({length: params.numVertices}, (_, i) => `
              <button class="btn-chip ${i === params.startNode ? 'active' : ''}" data-node="${i}">Node ${i}</button>
            `).join('')}
          </div>
        </div>
      `;

      container.querySelectorAll('[data-node]').forEach(btn => {
        btn.onclick = () => onChange({ ...params, startNode: parseInt(btn.dataset.node) });
      });

      container.querySelector('#pm-pre-4').onclick = () => {
        onChange({
          numVertices: 4,
          startNode: 0,
          matrix: [
            [0, 10, 6, 5],
            [10, 0, 0, 15],
            [6, 0, 0, 4],
            [5, 15, 4, 0]
          ]
        });
      };
      container.querySelector('#pm-pre-5').onclick = () => {
        onChange({
          numVertices: 5,
          startNode: 0,
          matrix: [
            [0, 2, 0, 6, 0],
            [2, 0, 3, 8, 5],
            [0, 3, 0, 0, 7],
            [6, 8, 0, 0, 9],
            [0, 5, 7, 9, 0]
          ]
        });
      };
      container.querySelector('#pm-pre-6').onclick = () => {
        onChange({
          numVertices: 6,
          startNode: 0,
          matrix: [
            [0, 4, 0, 0, 0, 2],
            [4, 0, 6, 0, 0, 0],
            [0, 6, 0, 3, 0, 1],
            [0, 0, 3, 0, 2, 0],
            [0, 0, 0, 2, 0, 4],
            [2, 0, 1, 0, 4, 0]
          ]
        });
      };
    },
    computeSteps(params) {
      const V = params.numVertices;
      const mat = params.matrix;
      const start = params.startNode;
      const visited = new Set([start]);
      const mstEdges = [];
      let totalCost = 0;
      const steps = [];

      steps.push({
        visited: Array.from(visited), mstEdges: [], candidateEdges: [], totalCost: 0,
        log: `Step 1: Initialize Prim's MST starting at Node ${start}. Visited set: {${start}}.`
      });

      while (visited.size < V) {
        let minWeight = Infinity;
        let bestU = -1, bestV = -1;
        const candidates = [];

        visited.forEach(u => {
          for (let v = 0; v < V; v++) {
            const w = mat[u][v];
            if (w > 0 && !visited.has(v)) {
              candidates.push({ u, v, w });
              if (w < minWeight) {
                minWeight = w;
                bestU = u;
                bestV = v;
              }
            }
          }
        });

        if (bestU === -1) break;

        visited.add(bestV);
        mstEdges.push({ u: bestU, v: bestV, w: minWeight });
        totalCost += minWeight;

        steps.push({
          visited: Array.from(visited),
          mstEdges: [...mstEdges],
          candidateEdges: candidates,
          addedEdge: { u: bestU, v: bestV, w: minWeight },
          totalCost,
          log: `Step ${steps.length + 1}: Minimum cut edge is (${bestU} <-> ${bestV}) with weight ${minWeight}. Added Node ${bestV} to tree. Total MST cost: ${totalCost}.`
        });
      }

      steps.push({
        visited: Array.from(visited), mstEdges: [...mstEdges], totalCost, complete: true,
        log: `Complete: MST constructed with ${mstEdges.length} edges. Total Minimum Spanning Tree Weight: ${totalCost}.`
      });
      return steps;
    },
    renderStep(stage, step, params) {
      const V = params.numVertices;
      const mat = params.matrix;
      const cx = 160, cy = 150, r = 105;
      const nodeCoords = [];
      for (let i = 0; i < V; i++) {
        const angle = (2 * Math.PI / V) * i - Math.PI / 2;
        nodeCoords.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
      }

      let edgesSvg = "";
      for (let i = 0; i < V; i++) {
        for (let j = i + 1; j < V; j++) {
          const w = mat[i][j];
          if (w > 0) {
            const isMst = step.mstEdges.some(e => (e.u === i && e.v === j) || (e.u === j && e.v === i));
            const isCandidate = step.candidateEdges && step.candidateEdges.some(e => (e.u === i && e.v === j) || (e.u === j && e.v === i));
            let cls = "graph-edge";
            if (isMst) cls += " mst-edge";
            else if (isCandidate) cls += " candidate-edge";

            const mx = (nodeCoords[i].x + nodeCoords[j].x) / 2;
            const my = (nodeCoords[i].y + nodeCoords[j].y) / 2;

            edgesSvg += `
              <line class="${cls}" x1="${nodeCoords[i].x}" y1="${nodeCoords[i].y}" x2="${nodeCoords[j].x}" y2="${nodeCoords[j].y}" />
              <rect x="${mx - 10}" y="${my - 9}" width="20" height="18" fill="#ffffff" stroke="var(--border-subtle)" rx="4" />
              <text class="graph-edge-text" x="${mx}" y="${my}">${w}</text>
            `;
          }
        }
      }

      let nodesSvg = "";
      nodeCoords.forEach((pt, i) => {
        const isVisited = step.visited.includes(i);
        nodesSvg += `
          <circle class="graph-node ${isVisited ? 'visited' : ''}" cx="${pt.x}" cy="${pt.y}" r="18" />
          <text class="graph-node-text" x="${pt.x}" y="${pt.y}">${i}</text>
        `;
      });

      stage.innerHTML = `
        <div style="display: flex; gap: 24px; width: 100%; align-items: center; justify-content: space-around; flex-wrap: wrap;">
          <svg class="graph-svg" viewBox="0 0 320 300">
            ${edgesSvg}
            ${nodesSvg}
          </svg>
          <div style="min-width: 230px; background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">MST State:</div>
            <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;"><b>Visited Nodes:</b> {${step.visited.join(', ')}}</div>
            <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;"><b>Tree Edges:</b> ${step.mstEdges.length} / ${V - 1}</div>
            <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">Selected Edges:</div>
            <ul style="margin-left: 16px; margin-top: 4px; font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);">
              ${step.mstEdges.map(e => `<li>(${e.u} <-> ${e.v}) wt: ${e.w}</li>`).join('') || '<li>(None yet)</li>'}
            </ul>
            <div style="margin-top: 12px; font-weight: 700; color: #1a7f37; font-size: 15px;">Total Weight: ${step.totalCost}</div>
          </div>
        </div>
      `;
    }
  },

  {
    id: "dijkstra",
    name: "Dijkstra's Shortest Path",
    category: "Greedy Algorithms",
    githubFile: "Assignment 9 - Djikstra/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Assignment%209%20-%20Djikstra/Main.java`,
    concept: "Computes the shortest paths from a single source vertex to all other vertices by greedily finalizing nearest unvisited nodes.",
    description: "Dijkstra's algorithm solves the single-source shortest path problem on graphs with non-negative edge weights. It maintains tentative distances and iteratively locks in the closest unvisited vertex, relaxing its outgoing edges.",
    steps: [
      "Initialize distance array: dist[source] = 0, and all other dist[v] = Infinity.",
      "Select unvisited vertex u with the smallest tentative distance dist[u].",
      "Mark vertex u as finalized (visited).",
      "For each unvisited neighbor v of u: check if dist[u] + weight(u, v) < dist[v].",
      "If shorter, update dist[v] = dist[u] + weight(u, v) and record u as predecessor.",
      "Repeat until all reachable vertices are visited."
    ],
    complexity: { best: "O((V+E) log V)", avg: "O(V^2)", worst: "O(V^2)", space: "O(V)" },
    defaultParams: {
      numVertices: 5,
      source: 0,
      matrix: [
        [0, 10, 0, 30, 100],
        [10, 0, 50, 0, 0],
        [0, 50, 0, 20, 10],
        [30, 0, 20, 0, 60],
        [100, 0, 10, 60, 0]
      ]
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div class="btn-chips">
          <button class="btn-chip" id="dj-pre-5">🏙️ 5-Node Map</button>
          <button class="btn-chip" id="dj-pre-4">🔷 4-Node Diamond</button>
        </div>
        <div style="margin-top: 14px;">
          <label class="control-label">Select Source Vertex:</label>
          <div class="btn-chips">
            ${Array.from({length: params.numVertices}, (_, i) => `
              <button class="btn-chip ${i === params.source ? 'active' : ''}" data-src="${i}">Node ${i}</button>
            `).join('')}
          </div>
        </div>
      `;

      container.querySelectorAll('[data-src]').forEach(btn => {
        btn.onclick = () => onChange({ ...params, source: parseInt(btn.dataset.src) });
      });

      container.querySelector('#dj-pre-5').onclick = () => {
        onChange({
          numVertices: 5,
          source: 0,
          matrix: [
            [0, 10, 0, 30, 100],
            [10, 0, 50, 0, 0],
            [0, 50, 0, 20, 10],
            [30, 0, 20, 0, 60],
            [100, 0, 10, 60, 0]
          ]
        });
      };
      container.querySelector('#dj-pre-4').onclick = () => {
        onChange({
          numVertices: 4,
          source: 0,
          matrix: [
            [0, 1, 4, 0],
            [1, 0, 2, 5],
            [4, 2, 0, 1],
            [0, 5, 1, 0]
          ]
        });
      };
    },
    computeSteps(params) {
      const V = params.numVertices;
      const mat = params.matrix;
      const src = params.source;
      const dist = Array(V).fill(Infinity);
      const visited = Array(V).fill(false);
      const prev = Array(V).fill(-1);
      dist[src] = 0;

      const steps = [];
      steps.push({
        dist: [...dist], visited: [...visited], prev: [...prev], u: -1,
        log: `Step 1: Initialize dist[${src}] = 0. All other vertices set to Infinity.`
      });

      for (let count = 0; count < V; count++) {
        let u = -1;
        let minD = Infinity;
        for (let i = 0; i < V; i++) {
          if (!visited[i] && dist[i] < minD) {
            minD = dist[i];
            u = i;
          }
        }

        if (u === -1 || minD === Infinity) break;

        visited[u] = true;
        steps.push({
          dist: [...dist], visited: [...visited], prev: [...prev], u,
          log: `Step ${steps.length + 1}: Finalize Node ${u} with minimal known distance ${dist[u]}.`
        });

        for (let v = 0; v < V; v++) {
          const weight = mat[u][v];
          if (!visited[v] && weight > 0 && dist[u] + weight < dist[v]) {
            dist[v] = dist[u] + weight;
            prev[v] = u;
            steps.push({
              dist: [...dist], visited: [...visited], prev: [...prev], u, relaxedV: v,
              log: `Step ${steps.length + 1}: Relax edge (${u} -> ${v}). Found shorter path to Node ${v} with distance ${dist[v]} via Node ${u}.`
            });
          }
        }
      }

      steps.push({
        dist: [...dist], visited: [...visited], prev: [...prev], complete: true,
        log: `Complete: Shortest paths from Node ${src} to all vertices computed.`
      });
      return steps;
    },
    renderStep(stage, step, params) {
      const V = params.numVertices;
      const mat = params.matrix;
      const cx = 160, cy = 150, r = 105;
      const nodeCoords = [];
      for (let i = 0; i < V; i++) {
        const angle = (2 * Math.PI / V) * i - Math.PI / 2;
        nodeCoords.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
      }

      let edgesSvg = "";
      for (let i = 0; i < V; i++) {
        for (let j = i + 1; j < V; j++) {
          const w = mat[i][j];
          if (w > 0) {
            const isPath = (step.prev[j] === i) || (step.prev[i] === j);
            const isRelax = (step.u === i && step.relaxedV === j) || (step.u === j && step.relaxedV === i);
            let cls = "graph-edge";
            if (isPath) cls += " path-edge";
            else if (isRelax) cls += " candidate-edge";

            const mx = (nodeCoords[i].x + nodeCoords[j].x) / 2;
            const my = (nodeCoords[i].y + nodeCoords[j].y) / 2;

            edgesSvg += `
              <line class="${cls}" x1="${nodeCoords[i].x}" y1="${nodeCoords[i].y}" x2="${nodeCoords[j].x}" y2="${nodeCoords[j].y}" />
              <rect x="${mx - 10}" y="${my - 9}" width="20" height="18" fill="#ffffff" stroke="var(--border-subtle)" rx="4" />
              <text class="graph-edge-text" x="${mx}" y="${my}">${w}</text>
            `;
          }
        }
      }

      let nodesSvg = "";
      nodeCoords.forEach((pt, i) => {
        const isVisited = step.visited[i];
        const isCurrent = step.u === i;
        let cls = "graph-node";
        if (isCurrent) cls += " current";
        else if (isVisited) cls += " visited";

        nodesSvg += `
          <circle class="${cls}" cx="${pt.x}" cy="${pt.y}" r="18" />
          <text class="graph-node-text" x="${pt.x}" y="${pt.y}">${i}</text>
        `;
      });

      stage.innerHTML = `
        <div style="display: flex; gap: 24px; width: 100%; align-items: center; justify-content: space-around; flex-wrap: wrap;">
          <svg class="graph-svg" viewBox="0 0 320 300">
            ${edgesSvg}
            ${nodesSvg}
          </svg>
          <div style="min-width: 250px; background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 10px;">Shortest Path Table:</div>
            <table class="matrix-table" style="width: 100%; margin: 0;">
              <thead>
                <tr><th>Node</th><th>Shortest Distance</th><th>Predecessor</th></tr>
              </thead>
              <tbody>
                ${step.dist.map((d, idx) => `
                  <tr style="${step.visited[idx] ? 'background: #f0fdf4;' : ''}">
                    <td><b>Node ${idx}</b></td>
                    <td style="font-weight: 700; color: ${d === Infinity ? '#999' : 'var(--color-primary)'};">${d === Infinity ? 'INF' : d}</td>
                    <td>${step.prev[idx] === -1 ? '-' : `Node ${step.prev[idx]}`}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  {
    id: "floyd_warshall",
    name: "Floyd-Warshall Algorithm",
    category: "Dynamic Programming",
    githubFile: "Assignment 11 - Floyd-Warshall/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Assignment%2011%20-%20Floyd-Warshall/Main.java`,
    concept: "Dynamic programming approach calculating all-pairs shortest paths through intermediate vertices k in [0..V-1].",
    description: "Floyd-Warshall solves the all-pairs shortest path problem in O(V^3) time. It uses dynamic programming to check whether a path between any pair of vertices (i, j) can be shortened by routing through an intermediate vertex k.",
    steps: [
      "Initialize distance matrix D(0) with direct edge weights; set D[i][j] = INF if no edge exists, and D[i][i] = 0.",
      "Iterate intermediate vertex k from 0 to V - 1.",
      "For every pair of vertices (i, j): check if D[i][k] + D[k][j] < D[i][j].",
      "If shorter, update D[i][j] = D[i][k] + D[k][j].",
      "After V iterations, D(V) contains the shortest path distances between all pairs."
    ],
    complexity: { best: "O(V^3)", avg: "O(V^3)", worst: "O(V^3)", space: "O(V^2)" },
    defaultParams: {
      numVertices: 4,
      matrix: [
        [0, 5, 999, 10],
        [999, 0, 3, 999],
        [999, 999, 0, 1],
        [999, 999, 999, 0]
      ]
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div class="btn-chips">
          <button class="btn-chip" id="fw-pre-4">🗺️ 4-Node Network</button>
          <button class="btn-chip" id="fw-pre-3">🔺 3-Node Triangle</button>
        </div>
      `;
      container.querySelector('#fw-pre-4').onclick = () => {
        onChange({
          numVertices: 4,
          matrix: [
            [0, 5, 999, 10],
            [999, 0, 3, 999],
            [999, 999, 0, 1],
            [999, 999, 999, 0]
          ]
        });
      };
      container.querySelector('#fw-pre-3').onclick = () => {
        onChange({
          numVertices: 3,
          matrix: [
            [0, 4, 11],
            [6, 0, 2],
            [3, 999, 0]
          ]
        });
      };
    },
    computeSteps(params) {
      const V = params.numVertices;
      const dist = params.matrix.map(r => [...r]);
      const steps = [];

      steps.push({
        D: dist.map(r => [...r]), k: -1, i: -1, j: -1,
        log: `Step 1: Initial Distance Matrix D(0). INF indicates no direct edge.`
      });

      for (let k = 0; k < V; k++) {
        steps.push({
          D: dist.map(r => [...r]), k, i: -1, j: -1, phaseStart: true,
          log: `Phase ${k + 1}: Using Node ${k} as intermediate waypoint.`
        });

        for (let i = 0; i < V; i++) {
          for (let j = 0; j < V; j++) {
            if (dist[i][k] !== 999 && dist[k][j] !== 999 && dist[i][k] + dist[k][j] < dist[i][j]) {
              const oldVal = dist[i][j];
              dist[i][j] = dist[i][k] + dist[k][j];
              steps.push({
                D: dist.map(r => [...r]), k, i, j, updated: true,
                log: `Updated D[${i}][${j}] from ${oldVal === 999 ? 'INF' : oldVal} to ${dist[i][j]} via intermediate Node ${k}.`
              });
            }
          }
        }
      }

      steps.push({
        D: dist.map(r => [...r]), k: V, complete: true,
        log: `Complete: Matrix D(${V}) holds all-pairs shortest distances.`
      });
      return steps;
    },
    renderStep(stage, step, params) {
      const V = params.numVertices;
      const D = step.D;
      let html = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <div style="font-weight: 600; font-size: 13px; color: var(--text-secondary);">
            ${step.k === -1 ? 'Initial Adjacency Matrix D(0)' : `Matrix D(${step.k + 1}): Intermediate Node ${step.k < V ? step.k : 'Finished'}`}
          </div>
          <table class="matrix-table">
            <thead>
              <tr><th>From / To</th>${Array.from({length: V}, (_, j) => `<th>Node ${j}</th>`).join('')}</tr>
            </thead>
            <tbody>
      `;
      for (let i = 0; i < V; i++) {
        html += `<tr><th>Node ${i}</th>`;
        for (let j = 0; j < V; j++) {
          const isK = (step.k !== -1 && (i === step.k || j === step.k));
          const isUpdated = (step.i === i && step.j === j);
          let cls = "";
          if (isUpdated) cls = "updated-cell";
          else if (isK) cls = "highlight-k";
          html += `<td class="${cls}">${D[i][j] >= 999 ? 'INF' : D[i][j]}</td>`;
        }
        html += `</tr>`;
      }
      html += `
            </tbody>
          </table>
          <div style="font-size: 12px; color: var(--text-muted);">Highlighted row/column corresponds to intermediate hub Node ${step.k !== -1 ? step.k : 'none'}.</div>
        </div>
      `;
      stage.innerHTML = html;
    }
  },

  {
    id: "sudoku",
    name: "Sudoku Solver",
    category: "Backtracking",
    githubFile: "Assignment 10 - Sudoku/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Assignment%2010%20-%20Sudoku/Main.java`,
    concept: "Recursive depth-first backtracking search placing digits 1 to 9 in empty cells obeying row, column, and 3x3 box rules.",
    description: "The Sudoku Solver is a textbook example of recursive backtracking. When an empty cell is reached, the algorithm tests numbers 1-9. If all constraints hold, it moves forward. If a conflict arises down the decision tree, it erases the candidate and backtracks.",
    steps: [
      "Find the next empty cell (value 0). If no empty cells remain, the puzzle is solved!",
      "For numbers 1 to 9: test if placing number is valid (isSafe).",
      "Check: Number must not appear in the current row, current column, or 3x3 subgrid.",
      "If valid, assign the number and recursively attempt to solve the remaining board.",
      "If the recursive call fails, undo the assignment (backtrack to 0) and try the next number."
    ],
    complexity: { best: "O(1)", avg: "O(9^m)", worst: "O(9^(N*N))", space: "O(N*N)" },
    defaultParams: {
      preset: "easy"
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div class="btn-chips">
          <button class="btn-chip ${params.preset === 'easy' ? 'active' : ''}" id="sd-pre-easy">🌟 Easy Demo (Fast)</button>
          <button class="btn-chip ${params.preset === 'medium' ? 'active' : ''}" id="sd-pre-med">🧩 Classic Puzzle</button>
        </div>
      `;
      container.querySelector('#sd-pre-easy').onclick = () => onChange({ preset: "easy" });
      container.querySelector('#sd-pre-med').onclick = () => onChange({ preset: "medium" });
    },
    computeSteps(params) {
      const easyGrid = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ];

      const medGrid = [
        [0, 0, 0, 2, 6, 0, 7, 0, 1],
        [6, 8, 0, 0, 7, 0, 0, 9, 0],
        [1, 9, 0, 0, 0, 4, 5, 0, 0],
        [8, 2, 0, 1, 0, 0, 0, 4, 0],
        [0, 0, 4, 6, 0, 2, 9, 0, 0],
        [0, 5, 0, 0, 0, 3, 0, 2, 8],
        [0, 0, 9, 3, 0, 0, 0, 7, 4],
        [0, 4, 0, 0, 5, 0, 0, 3, 6],
        [7, 0, 3, 0, 1, 8, 0, 0, 0]
      ];

      const board = (params.preset === 'medium' ? medGrid : easyGrid).map(r => [...r]);
      const initial = board.map(r => [...r]);
      const steps = [];

      steps.push({
        board: board.map(r => [...r]), initial, r: -1, c: -1, val: 0,
        log: `Step 1: Initial clues loaded. Testing candidate digits 1 to 9 in empty cells.`
      });

      function isSafe(b, row, col, num) {
        for (let i = 0; i < 9; i++) {
          if (b[row][i] === num || b[i][col] === num) return false;
        }
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (b[startRow + i][startCol + j] === num) return false;
          }
        }
        return true;
      }

      let stepCap = 300;
      function solve(b) {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (b[row][col] === 0) {
              for (let num = 1; num <= 9; num++) {
                if (isSafe(b, row, col, num)) {
                  b[row][col] = num;
                  if (steps.length < stepCap) {
                    steps.push({
                      board: b.map(r => [...r]), initial, r: row, c: col, val: num,
                      log: `Trial placement: cell (${row + 1}, ${col + 1}) = ${num} satisfies all row, column, and box constraints.`
                    });
                  }
                  if (solve(b)) return true;
                  b[row][col] = 0;
                  if (steps.length < stepCap) {
                    steps.push({
                      board: b.map(r => [...r]), initial, r: row, c: col, val: 0, backtrack: true,
                      log: `Backtracking: Conflict reached down branch. Erase cell (${row + 1}, ${col + 1}) and test next digit.`
                    });
                  }
                }
              }
              return false;
            }
          }
        }
        return true;
      }

      solve(board);
      steps.push({
        board: board.map(r => [...r]), initial, complete: true,
        log: `Solved! Sudoku board satisfied with zero constraint violations.`
      });
      return steps;
    },
    renderStep(stage, step) {
      const b = step.board;
      const init = step.initial;
      let html = `<div class="sudoku-board">`;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const isGiven = init[r][c] !== 0;
          const isCurr = step.r === r && step.c === c;
          let cls = "sudoku-cell";
          if (isGiven) cls += " clue";
          else if (b[r][c] !== 0) cls += " solved";
          if (isCurr) cls += " current-test";
          if (c === 2 || c === 5) cls += " box-right";
          if (r === 2 || r === 5) cls += " box-bottom";

          html += `<div class="${cls}">${b[r][c] !== 0 ? b[r][c] : ''}</div>`;
        }
      }
      html += `</div>`;
      stage.innerHTML = html;
    }
  },

  {
    id: "n_queens",
    name: "N-Queens Problem",
    category: "Backtracking",
    githubFile: "Assignment 12 - N queens/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Assignment%2012%20-%20N%20queens/Main.java`,
    concept: "Row-by-row backtracking placement ensuring no two queens share the same column or diagonal line of sight.",
    description: "The N-Queens problem asks how to place N non-attacking chess queens on an N x N chessboard. Because each row must have exactly one queen, the algorithm iterates row by row, testing column placements that avoid vertical and diagonal attacks.",
    steps: [
      "Start at row 0.",
      "For each column col from 0 to N - 1: check if placing a queen at (row, col) is safe.",
      "isSafe check: Ensure no previously placed queen shares column col or diagonal |queen[i] - col| == row - i.",
      "If safe, place queen at (row, col) and recurse to row + 1.",
      "If row == N, a valid solution is recorded. Backtrack to find all remaining solutions."
    ],
    complexity: { best: "O(N)", avg: "O(N!)", worst: "O(N!)", space: "O(N)" },
    defaultParams: {
      N: 4,
      solIdx: 0
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div class="btn-chips">
          <button class="btn-chip ${params.N === 4 ? 'active' : ''}" data-n="4">4x4 (2 solutions)</button>
          <button class="btn-chip ${params.N === 5 ? 'active' : ''}" data-n="5">5x5 (10 solutions)</button>
          <button class="btn-chip ${params.N === 6 ? 'active' : ''}" data-n="6">6x6 (4 solutions)</button>
          <button class="btn-chip ${params.N === 8 ? 'active' : ''}" data-n="8">8x8 (92 solutions)</button>
        </div>
      `;

      container.querySelectorAll('[data-n]').forEach(btn => {
        btn.onclick = () => onChange({ N: parseInt(btn.dataset.n), solIdx: 0 });
      });
    },
    computeSteps(params) {
      const N = params.N;
      const queen = Array(N).fill(-1);
      const steps = [];
      let solutionsCount = 0;

      function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
          if (queen[i] === col || Math.abs(queen[i] - col) === row - i) {
            return false;
          }
        }
        return true;
      }

      steps.push({
        queen: [...queen], N, row: -1, col: -1,
        log: `Step 1: Initialize ${N}x${N} chessboard. Place ${N} queens without mutual threats.`
      });

      let stepCap = 250;
      function solve(row) {
        if (row === N) {
          solutionsCount++;
          steps.push({
            queen: [...queen], N, complete: true, solNum: solutionsCount,
            log: `SUCCESS: Solution #${solutionsCount} found with all ${N} queens placed safely!`
          });
          return;
        }

        for (let col = 0; col < N; col++) {
          if (isSafe(row, col)) {
            queen[row] = col;
            if (steps.length < stepCap) {
              steps.push({
                queen: [...queen], N, row, col, status: "safe",
                log: `Row ${row + 1}: Place queen at column ${col + 1}. Column and diagonal lines are clear.`
              });
            }
            solve(row + 1);
            queen[row] = -1;
            if (steps.length < stepCap) {
              steps.push({
                queen: [...queen], N, row, col, status: "backtrack",
                log: `Backtracking from row ${row + 1}, column ${col + 1}. Remove queen and test next column.`
              });
            }
          }
        }
      }

      solve(0);
      return steps;
    },
    renderStep(stage, step) {
      const N = step.N;
      const queen = step.queen;
      const cellSize = Math.min(42, Math.floor(290 / N));
      let html = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <div class="chessboard" style="grid-template-columns: repeat(${N}, ${cellSize}px); grid-template-rows: repeat(${N}, ${cellSize}px);">
      `;
      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          const isDark = (r + c) % 2 === 1;
          const hasQueen = queen[r] === c;
          let cls = `chess-cell ${isDark ? 'dark' : 'light'}`;
          if (hasQueen) cls += " has-queen";
          html += `<div class="${cls}">${hasQueen ? '♛' : ''}</div>`;
        }
      }
      html += `
          </div>
          <div style="font-size: 13px; font-weight: 700; color: var(--color-primary);">
            Queens placed: ${queen.filter(x => x !== -1).length} of ${N}
          </div>
        </div>
      `;
      stage.innerHTML = html;
    }
  }
];

// App Controller
class App {
  constructor() {
    this.currentAlgo = ALGORITHMS[0];
    this.params = { ...this.currentAlgo.defaultParams };
    this.steps = [];
    this.currentStepIdx = 0;
    this.isPlaying = false;
    this.playTimer = null;

    this.dom = {
      sidebarCategories: document.getElementById('sidebar-categories'),
      searchBox: document.getElementById('search-box'),
      breadcrumbText: document.getElementById('breadcrumb-text'),
      algoTitle: document.getElementById('algo-title'),
      categoryPill: document.getElementById('algo-category-pill'),
      complexityPill: document.getElementById('algo-complexity-pill'),
      theoryCallout: document.getElementById('theory-callout'),
      theoryDesc: document.getElementById('theory-desc'),
      theorySteps: document.getElementById('theory-steps'),
      valBest: document.getElementById('val-best'),
      valAvg: document.getElementById('val-avg'),
      valWorst: document.getElementById('val-worst'),
      valSpace: document.getElementById('val-space'),
      algoControls: document.getElementById('algo-controls'),
      timelineSlider: document.getElementById('timeline-slider'),
      stepBadge: document.getElementById('step-badge'),
      stepLogText: document.getElementById('step-log-text'),
      stageCanvas: document.getElementById('stage-canvas'),
      btnRestart: document.getElementById('btn-restart'),
      btnBack: document.getElementById('btn-back'),
      btnPlayPause: document.getElementById('btn-play-pause'),
      btnNext: document.getElementById('btn-next'),
      btnJumpEnd: document.getElementById('btn-jump-end'),
      btnCopyCode: document.getElementById('btn-copy-code'),
      codeFileLabel: document.getElementById('code-file-label'),
      codeTabName: document.getElementById('code-tab-name'),
      sourceCodeDisplay: document.getElementById('source-code-display')
    };

    this.init();
  }

  init() {
    this.renderSidebar();
    this.bindEvents();
    this.loadAlgo(ALGORITHMS[0].id);
  }

  renderSidebar(filterQuery = "") {
    const q = filterQuery.toLowerCase().trim();
    let html = "";

    CATEGORIES.forEach(cat => {
      const filteredItems = cat.items
        .map(id => ALGORITHMS.find(a => a.id === id))
        .filter(a => a && (a.name.toLowerCase().includes(q) || cat.name.toLowerCase().includes(q)));

      if (filteredItems.length > 0) {
        html += `
          <div class="sidebar-section-title">${cat.name}</div>
          <ul class="sidebar-menu">
            ${filteredItems.map(a => `
              <li class="sidebar-item ${a.id === this.currentAlgo.id ? 'active' : ''}" data-id="${a.id}">
                <span>${a.name}</span>
                <span class="sidebar-item-badge">${a.complexity.avg}</span>
              </li>
            `).join('')}
          </ul>
        `;
      }
    });

    this.dom.sidebarCategories.innerHTML = html;
    this.dom.sidebarCategories.querySelectorAll('.sidebar-item').forEach(item => {
      item.onclick = () => this.loadAlgo(item.dataset.id);
    });
  }

  bindEvents() {
    this.dom.searchBox.oninput = (e) => {
      this.renderSidebar(e.target.value);
    };

    this.dom.timelineSlider.oninput = (e) => {
      this.pause();
      this.currentStepIdx = parseInt(e.target.value) || 0;
      this.updateStepView();
    };

    this.dom.btnRestart.onclick = () => {
      this.pause();
      this.currentStepIdx = 0;
      this.updateStepView();
    };

    this.dom.btnBack.onclick = () => {
      this.pause();
      if (this.currentStepIdx > 0) {
        this.currentStepIdx--;
        this.updateStepView();
      }
    };

    this.dom.btnNext.onclick = () => {
      this.pause();
      if (this.currentStepIdx < this.steps.length - 1) {
        this.currentStepIdx++;
        this.updateStepView();
      }
    };

    this.dom.btnJumpEnd.onclick = () => {
      this.pause();
      this.currentStepIdx = this.steps.length - 1;
      this.updateStepView();
    };

    this.dom.btnPlayPause.onclick = () => this.togglePlay();

    this.dom.btnCopyCode.onclick = () => {
      const code = this.dom.sourceCodeDisplay.textContent;
      navigator.clipboard.writeText(code).then(() => {
        const orig = this.dom.btnCopyCode.innerHTML;
        this.dom.btnCopyCode.innerHTML = "<span>✅ Copied!</span>";
        setTimeout(() => this.dom.btnCopyCode.innerHTML = orig, 1800);
      });
    };
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (this.currentStepIdx >= this.steps.length - 1) {
      this.currentStepIdx = 0;
    }
    this.isPlaying = true;
    this.dom.btnPlayPause.textContent = '⏸ Pause';
    this.dom.btnPlayPause.classList.add('playing');

    this.playTimer = setInterval(() => {
      if (this.currentStepIdx < this.steps.length - 1) {
        this.currentStepIdx++;
        this.updateStepView();
      } else {
        this.pause();
      }
    }, 850);
  }

  pause() {
    this.isPlaying = false;
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
    }
    this.dom.btnPlayPause.textContent = '▶ Play';
    this.dom.btnPlayPause.classList.remove('playing');
  }

  loadAlgo(id) {
    this.pause();
    this.currentAlgo = ALGORITHMS.find(a => a.id === id) || ALGORITHMS[0];
    this.params = { ...this.currentAlgo.defaultParams };
    this.renderSidebar(this.dom.searchBox.value);

    // Header
    this.dom.breadcrumbText.textContent = `Algorithms > ${this.currentAlgo.category} > ${this.currentAlgo.name}`;
    this.dom.algoTitle.textContent = this.currentAlgo.name;
    this.dom.categoryPill.textContent = this.currentAlgo.category;
    this.dom.complexityPill.textContent = this.currentAlgo.complexity.avg;

    // Overview & Theory
    this.dom.theoryCallout.innerHTML = `<b>Core Principle:</b> ${this.currentAlgo.concept}`;
    this.dom.theoryDesc.textContent = this.currentAlgo.description;
    this.dom.theorySteps.innerHTML = this.currentAlgo.steps.map(s => `<li>${s}</li>`).join('');

    this.dom.valBest.textContent = this.currentAlgo.complexity.best;
    this.dom.valAvg.textContent = this.currentAlgo.complexity.avg;
    this.dom.valWorst.textContent = this.currentAlgo.complexity.worst;
    this.dom.valSpace.textContent = this.currentAlgo.complexity.space;

    // Controls
    this.currentAlgo.renderControls(this.dom.algoControls, this.params, (newParams) => {
      this.params = newParams;
      this.recompute();
    });

    // Code
    const path = this.currentAlgo.githubFile;
    const rawCode = REPO_CODES[path] || "// Source code not found.";
    this.dom.codeFileLabel.textContent = `File: ${path} (from viraj-des/DAA-Lab-TY)`;
    this.dom.codeTabName.textContent = path.split('/').pop();
    this.dom.sourceCodeDisplay.textContent = rawCode;

    this.recompute();
  }

  recompute() {
    this.pause();
    this.steps = this.currentAlgo.computeSteps(this.params);
    this.dom.timelineSlider.max = Math.max(0, this.steps.length - 1);
    this.currentStepIdx = 0;
    this.updateStepView();
  }

  updateStepView() {
    const step = this.steps[this.currentStepIdx] || { log: "No steps to display." };
    this.dom.timelineSlider.value = this.currentStepIdx;
    this.dom.stepBadge.textContent = `Step ${this.currentStepIdx + 1} of ${this.steps.length}`;
    this.dom.stepLogText.textContent = step.log || "";

    this.currentAlgo.renderStep(this.dom.stageCanvas, step, this.params);
  }
}

// Boot on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
'''

final_js = template.replace('__REPO_CODES__', json.dumps(codes, indent=2))
with open('app.js', 'w') as f:
    f.write(final_js)

print("Generated clean modern app.js, size:", len(final_js), "bytes")
