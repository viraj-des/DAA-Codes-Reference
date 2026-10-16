// DAA Lab Windows 98 Suite
// Connected to github.com/viraj-des/DAA-Lab-TY

const REPO_URL = "https://github.com/viraj-des/DAA-Lab-TY";
const REPO_CODES = {
  "Assignment 10 - Sudoku/Main.java": "\nimport java.util.Scanner;\n\nclass Main {\n    static int[][] board = new int[9][9];\n\n    static boolean isSafe(int row, int col, int num) {\n        for (int i = 0; i < 9; i++) {\n            if (board[row][i] == num ||\n                board[i][col] == num) {\n                return false;\n            }\n        }\n\n        int startRow = row - row % 3;\n        int startCol = col - col % 3;\n\n        for (int i = startRow; i < startRow + 3; i++) {\n            for (int j = startCol; j < startCol + 3; j++) {\n                if (board[i][j] == num) {\n                    return false;\n                }\n            }\n        }\n\n        return true;\n    }\n\n    static boolean solveSudoku() {\n        for (int row = 0; row < 9; row++) {\n            for (int col = 0; col < 9; col++) {\n                if (board[row][col] == 0) {\n                    for (int num = 1; num <= 9; num++) {\n                        if (isSafe(row, col, num)) {\n                            board[row][col] = num;\n\n                            if (solveSudoku()) {\n                                return true;\n                            }\n\n                            board[row][col] = 0;\n                        }\n                    }\n\n                    return false;\n                }\n            }\n        }\n\n        return true;\n    }\n\n    static boolean validBoard() {\n        for (int row = 0; row < 9; row++) {\n            for (int col = 0; col < 9; col++) {\n                int num = board[row][col];\n\n                if (num != 0) {\n                    board[row][col] = 0;\n                    boolean safe = isSafe(row, col, num);\n                    board[row][col] = num;\n\n                    if (!safe) {\n                        return false;\n                    }\n                }\n            }\n        }\n\n        return true;\n    }\n\n    static void printBoard() {\n        for (int i = 0; i < 9; i++) {\n            for (int j = 0; j < 9; j++) {\n                System.out.print(board[i][j] + \" \");\n            }\n            System.out.println();\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.println(\"Enter Sudoku puzzle (0 for empty cells):\");\n\n        for (int i = 0; i < 9; i++) {\n            for (int j = 0; j < 9; j++) {\n                board[i][j] = sc.nextInt();\n\n                if (board[i][j] < 0 || board[i][j] > 9) {\n                    System.out.println(\"Invalid input.\");\n                    sc.close();\n                    return;\n                }\n            }\n        }\n\n        if (!validBoard()) {\n            System.out.println(\"Invalid Sudoku puzzle.\");\n        } else if (solveSudoku()) {\n            System.out.println(\"Solved Sudoku:\");\n            printBoard();\n        } else {\n            System.out.println(\"No solution exists.\");\n        }\n\n        sc.close();\n    }\n}\n",
  "Assignment 11 - Floyd-Warshall/Main.java": "\nimport java.util.Scanner;\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.print(\"Enter number of vertices: \");\n        int n = sc.nextInt();\n\n        if (n <= 0) {\n            System.out.println(\"Invalid number of vertices.\");\n            sc.close();\n            return;\n        }\n\n        int INF = 99999;\n        int[][] dist = new int[n][n];\n\n        System.out.println(\"Enter adjacency matrix (0 for no edge):\");\n\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                int value = sc.nextInt();\n\n                if (i != j && value == 0) {\n                    dist[i][j] = INF;\n                } else {\n                    dist[i][j] = value;\n                }\n            }\n        }\n\n        for (int k = 0; k < n; k++) {\n            for (int i = 0; i < n; i++) {\n                for (int j = 0; j < n; j++) {\n                    if (dist[i][k] != INF &&\n                        dist[k][j] != INF) {\n\n                        int newDistance =\n                            dist[i][k] + dist[k][j];\n\n                        if (newDistance < dist[i][j]) {\n                            dist[i][j] = newDistance;\n                        }\n                    }\n                }\n            }\n        }\n\n        System.out.println(\"Shortest distance matrix:\");\n\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                if (dist[i][j] == INF) {\n                    System.out.print(\"INF \");\n                } else {\n                    System.out.print(dist[i][j] + \" \");\n                }\n            }\n            System.out.println();\n        }\n\n        sc.close();\n    }\n}\n",
  "Assignment 12 - N queens/Main.java": "\nimport java.util.Scanner;\n\nclass Main {\n    static int n;\n    static int[] queen;\n    static int[] firstSolution;\n    static long solutions = 0;\n\n    static boolean isSafe(int row, int col) {\n        for (int i = 0; i < row; i++) {\n            if (queen[i] == col ||\n                Math.abs(queen[i] - col) == row - i) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    static void solve(int row) {\n        if (row == n) {\n            solutions++;\n\n            if (solutions == 1) {\n                for (int i = 0; i < n; i++) {\n                    firstSolution[i] = queen[i];\n                }\n            }\n            return;\n        }\n\n        for (int col = 0; col < n; col++) {\n            if (isSafe(row, col)) {\n                queen[row] = col;\n                solve(row + 1);\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.print(\"Enter number of queens: \");\n        n = sc.nextInt();\n\n        if (n <= 0) {\n            System.out.println(\"Enter a positive number.\");\n            sc.close();\n            return;\n        }\n\n        queen = new int[n];\n        firstSolution = new int[n];\n\n        solve(0);\n\n        if (solutions == 0) {\n            System.out.println(\"No solution exists.\");\n        } else {\n            System.out.println(\"One valid solution:\");\n\n            for (int i = 0; i < n; i++) {\n                for (int j = 0; j < n; j++) {\n                    if (firstSolution[i] == j) {\n                        System.out.print(\"Q \");\n                    } else {\n                        System.out.print(\". \");\n                    }\n                }\n                System.out.println();\n            }\n        }\n\n        System.out.println(\"Total number of solutions: \" + solutions);\n\n        sc.close();\n    }\n}\n",
  "Assignment 8 - Prims/Main.java": "import java.util.Arrays;\nimport java.util.Scanner;\n\nclass Edge implements Comparable<Edge> {\n    int u, v, weight;\n\n    Edge(int u, int v, int weight) {\n        this.u = u;\n        this.v = v;\n        this.weight = weight;\n    }\n\n    public int compareTo(Edge e) {\n        return Integer.compare(this.weight, e.weight);\n    }\n}\n\nclass MSTResult {\n    int[][] edges;\n    int count;\n    int totalWeight;\n    boolean connected;\n\n    MSTResult(int n) {\n        edges = new int[Math.max(0, n - 1)][3];\n        count = 0;\n        totalWeight = 0;\n        connected = false;\n    }\n}\n\nclass Main {\n    static int find(int[] parent, int x) {\n        if (parent[x] != x) {\n            parent[x] = find(parent, parent[x]);\n        }\n        return parent[x];\n    }\n\n    static MSTResult kruskal(int[][] graph, int n) {\n        MSTResult result = new MSTResult(n);\n\n        Edge[] edges = new Edge[n * (n - 1) / 2];\n        int edgeCount = 0;\n\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                if (graph[i][j] > 0) {\n                    edges[edgeCount++] =\n                        new Edge(i, j, graph[i][j]);\n                }\n            }\n        }\n\n        Arrays.sort(edges, 0, edgeCount);\n\n        int[] parent = new int[n];\n\n        for (int i = 0; i < n; i++) {\n            parent[i] = i;\n        }\n\n        for (int i = 0; i < edgeCount; i++) {\n            Edge e = edges[i];\n\n            int rootU = find(parent, e.u);\n            int rootV = find(parent, e.v);\n\n            if (rootU != rootV) {\n                result.edges[result.count][0] = e.u;\n                result.edges[result.count][1] = e.v;\n                result.edges[result.count][2] = e.weight;\n                result.count++;\n                result.totalWeight += e.weight;\n\n                parent[rootU] = rootV;\n\n                if (result.count == n - 1) {\n                    break;\n                }\n            }\n        }\n\n        result.connected = result.count == n - 1;\n        return result;\n    }\n\n    static MSTResult prim(int[][] graph, int n) {\n        MSTResult result = new MSTResult(n);\n\n        int[] key = new int[n];\n        int[] parent = new int[n];\n        boolean[] visited = new boolean[n];\n\n        for (int i = 0; i < n; i++) {\n            key[i] = Integer.MAX_VALUE;\n            parent[i] = -1;\n            visited[i] = false;\n        }\n\n        key[0] = 0;\n\n        for (int count = 0; count < n; count++) {\n            int u = -1;\n\n            for (int i = 0; i < n; i++) {\n                if (!visited[i] &&\n                    (u == -1 || key[i] < key[u])) {\n                    u = i;\n                }\n            }\n\n            if (u == -1 || key[u] == Integer.MAX_VALUE) {\n                break;\n            }\n\n            visited[u] = true;\n\n            for (int v = 0; v < n; v++) {\n                if (graph[u][v] > 0 &&\n                    !visited[v] &&\n                    graph[u][v] < key[v]) {\n\n                    key[v] = graph[u][v];\n                    parent[v] = u;\n                }\n            }\n        }\n\n        for (int i = 1; i < n; i++) {\n            if (parent[i] != -1) {\n                result.edges[result.count][0] = parent[i];\n                result.edges[result.count][1] = i;\n                result.edges[result.count][2] = graph[parent[i]][i];\n\n                result.totalWeight += graph[parent[i]][i];\n                result.count++;\n            }\n        }\n\n        result.connected = result.count == n - 1;\n        return result;\n    }\n\n    static void display(String name, MSTResult result,\n                        long time, int n) {\n        System.out.println(\"\\n\" + name);\n\n        if (!result.connected) {\n            System.out.println(\"Graph is disconnected.\");\n            System.out.println(\"Minimum spanning tree does not exist.\");\n            System.out.println(\"Execution time: \" + time + \" ns\");\n            return;\n        }\n\n        System.out.println(\"Selected edges:\");\n\n        for (int i = 0; i < result.count; i++) {\n            System.out.println(\n                result.edges[i][0] + \" - \" +\n                result.edges[i][1] + \" : \" +\n                result.edges[i][2]\n            );\n        }\n\n        System.out.println(\"Total weight: \" + result.totalWeight);\n        System.out.println(\"Execution time: \" + time + \" ns\");\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.print(\"Enter number of vertices: \");\n        int n = sc.nextInt();\n\n        if (n <= 0) {\n            System.out.println(\"Invalid number of vertices.\");\n            sc.close();\n            return;\n        }\n\n        int[][] graph = new int[n][n];\n\n        System.out.println(\n            \"Enter adjacency matrix (0 for no edge):\"\n        );\n\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                graph[i][j] = sc.nextInt();\n            }\n        }\n\n        long start = System.nanoTime();\n        MSTResult kResult = kruskal(graph, n);\n        long kTime = System.nanoTime() - start;\n\n        start = System.nanoTime();\n        MSTResult pResult = prim(graph, n);\n        long pTime = System.nanoTime() - start;\n\n        display(\"Kruskal's Algorithm\", kResult, kTime, n);\n        display(\"Prim's Algorithm\", pResult, pTime, n);\n\n        sc.close();\n    }\n}\n",
  "Assignment 9 - Djikstra/Main.java": "import java.util.Scanner;\n\nclass Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.print(\"Enter number of vertices: \");\n        int n = sc.nextInt();\n\n        int[][] graph = new int[n][n];\n\n        System.out.println(\"Enter adjacency matrix (0 for no edge):\");\n\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                graph[i][j] = sc.nextInt();\n            }\n        }\n\n        System.out.print(\"Enter source vertex (0 to \" + (n - 1) + \"): \");\n        int source = sc.nextInt();\n\n        int[] distance = new int[n];\n        boolean[] visited = new boolean[n];\n\n        for (int i = 0; i < n; i++) {\n            distance[i] = Integer.MAX_VALUE;\n            visited[i] = false;\n        }\n\n        distance[source] = 0;\n\n        for (int i = 0; i < n; i++) {\n            int u = -1;\n\n            for (int j = 0; j < n; j++) {\n                if (!visited[j] &&\n                    (u == -1 || distance[j] < distance[u])) {\n                    u = j;\n                }\n            }\n\n            if (u == -1 || distance[u] == Integer.MAX_VALUE) {\n                break;\n            }\n\n            visited[u] = true;\n\n            for (int v = 0; v < n; v++) {\n                if (graph[u][v] > 0 && !visited[v]) {\n                    int newDistance = distance[u] + graph[u][v];\n\n                    if (newDistance < distance[v]) {\n                        distance[v] = newDistance;\n                    }\n                }\n            }\n        }\n\n        System.out.println(\"Shortest distances from source \" + source + \":\");\n\n        for (int i = 0; i < n; i++) {\n            if (distance[i] == Integer.MAX_VALUE) {\n                System.out.println(\"Vertex \" + i + \": Unreachable\");\n            } else {\n                System.out.println(\"Vertex \" + i + \": \" + distance[i]);\n            }\n        }\n\n        sc.close();\n    }\n}\n",
  "Binary search/Main.java": "import java.util.Arrays;\nimport java.util.Scanner;\n\npublic class Main {\n    static int binarySearch(int[] arr, int key) {\n        int low = 0;\n        int high = arr.length - 1;\n\n        while (low <= high) {\n            int mid = (low + high) / 2;\n\n            if (arr[mid] == key) {\n                return mid;\n            } else if (key < arr[mid]) {\n                high = mid - 1;\n            } else {\n                low = mid + 1;\n            }\n        }\n\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.println(\"Binary Search Java Implementation\");\n\n        System.out.println(\"Enter the Number of Elements:\");\n        int n = sc.nextInt();\n\n        int[] arr = new int[n];\n\n        System.out.println(\"Enter the Elements:\");\n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n        }\n\n        System.out.println(\"Enter the Element to Search:\");\n        int key = sc.nextInt();\n\n        int[] sortedArr = arr.clone();\n        Arrays.sort(sortedArr);\n\n        long start = System.nanoTime();\n        int result = binarySearch(sortedArr, key);\n        long end = System.nanoTime();\n\n        System.out.println(\"Sorted Array:\");\n        for (int i = 0; i < n; i++) {\n            System.out.print(sortedArr[i] + \" \");\n        }\n\n        System.out.println();\n\n        if (result != -1) {\n            System.out.println(\"Element found at index: \" + result);\n        } else {\n            System.out.println(\"Element not found\");\n        }\n\n        System.out.println(\"Binary Search Time: \" + (end - start) + \" ns\");\n\n        long startSort = System.nanoTime();\n        Arrays.sort(arr);\n        binarySearch(arr, key);\n        long endSort = System.nanoTime();\n\n        System.out.println(\"Time for Unsorted Array including Sorting: \" + (endSort - startSort) + \" ns\");\n    }\n}",
  "Job sequencing/Main.java": "import java.util.Arrays;\nimport java.util.Comparator;\nimport java.util.Scanner;\n\nclass Job {\n    String id;\n    int deadline;\n    int profit;\n\n    Job(String id, int deadline, int profit) {\n        this.id = id;\n        this.deadline = deadline;\n        this.profit = profit;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.println(\"Job Sequencing using Greedy Method\");\n\n        System.out.println(\"Enter the Number of Jobs:\");\n        int n = sc.nextInt();\n\n        Job[] jobs = new Job[n];\n\n        for (int i = 0; i < n; i++) {\n            System.out.println(\"Enter Job ID, Deadline and Profit:\");\n            String id = sc.next();\n            int deadline = sc.nextInt();\n            int profit = sc.nextInt();\n\n            jobs[i] = new Job(id, deadline, profit);\n        }\n\n        Arrays.sort(jobs, Comparator.comparingInt((Job j) -> j.profit).reversed());\n\n        int maxDeadline = 0;\n\n        for (Job job : jobs) {\n            if (job.deadline > maxDeadline) {\n                maxDeadline = job.deadline;\n            }\n        }\n\n        String[] slot = new String[maxDeadline + 1];\n        int totalProfit = 0;\n\n        for (Job job : jobs) {\n            for (int j = job.deadline; j >= 1; j--) {\n                if (slot[j] == null) {\n                    slot[j] = job.id;\n                    totalProfit += job.profit;\n                    break;\n                }\n            }\n        }\n\n        System.out.println(\"Selected Jobs:\");\n\n        for (int i = 1; i <= maxDeadline; i++) {\n            if (slot[i] != null) {\n                System.out.print(slot[i] + \" \");\n            }\n        }\n\n        System.out.println();\n        System.out.println(\"Maximum Profit: \" + totalProfit);\n    }\n}",
  "Lab2-MergeSort/MergeSort.java": "import java.util.Arrays;\nimport java.util.Scanner;\nimport java.util.Random;\n\nclass MergeSort {\n    public static void main(String[] args) {\n\n        Scanner sc = new Scanner(System.in);\n        Random rand = new Random();\n        // 5, 50, 500, 5k -> time com\n        \n        int[] array = {};\n\n        System.out.print(\"How many elements do you want to enter? : \");\n        int numberOfElements = sc.nextInt();\n\n        if(numberOfElements <= 5){\n            array = new int[numberOfElements];\n\n            for(int i = 0; i < numberOfElements; i++){\n                System.out.print(\"Enter element \" + (i + 1) + \" : \");\n                array[i] = sc.nextInt();\n            }\n        } else if(numberOfElements == 50) {\n\n            array = new int[numberOfElements];\n\n            for (int i = 0; i < numberOfElements; i++) {\n                array[i] = rand.nextInt(50); \n            }\n        } else if(numberOfElements == 500) {\n            array = new int[numberOfElements];\n\n            for (int i = 0; i < numberOfElements; i++) {\n                array[i] = rand.nextInt(500);\n            }\n        } else if(numberOfElements == 5000) {\n            array = new int[numberOfElements];\n\n            for (int i = 0; i < numberOfElements; i++) {\n                array[i] = rand.nextInt(5000);\n            }\n        }\n        \n        System.out.println(\"Original Array to be sorted: \");\n        System.out.println(Arrays.toString(array));\n\n        long startTime = System.nanoTime();\n        \n        mergeSort(array, 0, array.length - 1);\n\n        long endTime = System.nanoTime();\n        \n        System.out.println(\"\\nSorted Array: \");\n        System.out.println(Arrays.toString(array));\n\n        long elapsedTime = endTime - startTime;\n\n        System.out.println(\"\\nTime Taken for sorting \" + numberOfElements + \" elements: \");\n        System.out.println(elapsedTime + \" nano seconds\");\n        \n        sc.close();\n\n    }\n    \n    public static void mergeSort(int[] array, int left, int right){\n\n        // start time \n        \n        if(left < right){\n            int middle = (left+right) / 2;\n            \n            mergeSort(array, left, middle);\n            \n            mergeSort(array, middle + 1, right);\n            \n            merge(array, left, middle, right);\n        }\n        \n        // end time \n        // var store time\n    }\n    \n    public static void merge(int[] array, int left, int middle, int right){\n        int sizeLeft = middle - left+1;\n        int sizeRight = right - middle;\n        \n        int[] leftArray = new int[sizeLeft];\n        int[] rightArray = new int[sizeRight];\n        \n        for (int i = 0; i < sizeLeft; ++i) {\n        leftArray[i] = array[left + i];\n        }\n        \n        for (int j = 0; j < sizeRight; ++j) {\n            rightArray[j] = array[middle + 1 + j];\n        }\n        \n        int i = 0;\n        int j = 0;\n        int k = left;\n        \n        while (i<sizeLeft && j<sizeRight){\n            if(leftArray[i] <= rightArray[j]){\n                array[k] = leftArray[i];\n                i++;\n            }\n            else{\n                array[k] = rightArray[j];\n                j++;\n            }\n            k++;\n        }\n        \n        while(i < sizeLeft){\n            array[k] = leftArray[i];\n            i++;\n            k++;\n        }\n        \n        while (j < sizeRight) {\n        array[k] = rightArray[j];\n        j++;\n        k++;\n    }\n    }\n\n}",
  "Quick sort/Main.java": "import java.util.Scanner;\n\npublic class Main {\n    static void quickSort(int[] arr, int low, int high) {\n        if (low < high) {\n            int p = partition(arr, low, high);\n            quickSort(arr, low, p - 1);\n            quickSort(arr, p + 1, high);\n        }\n    }\n\n    static int partition(int[] arr, int low, int high) {\n        int pivot = arr[high];\n        int i = low - 1;\n\n        for (int j = low; j < high; j++) {\n            if (arr[j] < pivot) {\n                i++;\n\n                int temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n\n        int temp = arr[i + 1];\n        arr[i + 1] = arr[high];\n        arr[high] = temp;\n\n        return i + 1;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        System.out.println(\"Quick Sort Java Implementation\");\n\n        System.out.println(\"Enter the Number of Elements: \");\n        int n = sc.nextInt();\n\n        int[] arr = new int[n];\n\n        System.out.println(\"Enter the Elements:\");\n        for (int i = 0; i < n; i++) {\n            arr[i] = sc.nextInt();\n        }\n\n        quickSort(arr, 0, n - 1);\n\n        System.out.println(\"Sorted Array:\");\n        for (int i = 0; i < n; i++) {\n            System.out.print(arr[i] + \" \");\n        }\n    }\n}"
};

// Helper to parse student array input gracefully (accepts commas, spaces, or tabs)
function parseNumbers(str) {
  return str
    .replace(/,/g, ' ')
    .trim()
    .split(/\s+/)
    .map(x => parseInt(x))
    .filter(x => !isNaN(x));
}

// Algorithm Definitions
const ALGORITHMS = [
  {
    id: "binary_search",
    name: "Binary Search",
    assignment: "Lab 1",
    githubFile: "Binary search/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Binary%20search/Main.java`,
    concept: "Looks at the middle box each time: if the target is smaller, throws away the right half; if larger, throws away the left half (O(log n)).",
    complexity: { best: "O(1) [Found in middle on 1st try]", avg: "O(log n)", worst: "O(log n)", space: "O(1)" },
    defaultParams: {
      arr: [4, 9, 15, 23, 38, 45, 56, 67, 72, 89, 94],
      key: 45
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div style="margin-bottom: 6px;">
          <label style="font-weight: bold;">Enter Numbers (separated by commas or spaces):</label>
          <input type="text" id="bs-arr-input" class="win-input" style="width: 100%; margin-top: 3px;" value="${params.arr.join(', ')}">
        </div>
        <div class="preset-chips">
          <button class="preset-chip" id="bs-pre-rand">🎲 Random (10)</button>
          <button class="preset-chip" id="bs-pre-simple">🔢 10 to 90</button>
          <button class="preset-chip" id="bs-pre-sort">📈 Auto-Sort List</button>
        </div>
        <div style="margin-top: 8px;">
          <div style="font-weight: bold; margin-bottom: 3px;">Click a number to search for it:</div>
          <div style="display: flex; flex-wrap: wrap; gap: 4px;" id="bs-key-pills">
            ${params.arr.map(num => `<span class="clickable-num-pill ${num === params.key ? 'active' : ''}" data-val="${num}">${num}</span>`).join('')}
            <span class="clickable-num-pill" data-val="999" title="Test a missing number" style="background: #ffe0e0; border-color: #880000; color: #880000;">Missing (999)</span>
          </div>
        </div>
        <div class="control-row" style="margin-top: 8px;">
          <label><b>Or type any target key:</b></label>
          <input type="number" id="bs-key-input" class="win-input" style="width: 70px;" value="${params.key}">
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

      container.querySelectorAll('.clickable-num-pill').forEach(pill => {
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
        log: `Step 1 of Search: We are searching for ${key} in a sorted list of ${arr.length} numbers. Start range is [Index 0] to [Index ${arr.length - 1}].`
      });

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const val = arr[mid];
        const stepNum = steps.length + 1;

        if (val === key) {
          steps.push({
            low, high, mid, key, found: true,
            log: `Step ${stepNum}: Middle box [Index ${mid}] contains ${val}. Exact match found! Search is complete!`
          });
          return steps;
        } else if (key < val) {
          steps.push({
            low, high, mid, key, found: false,
            log: `Step ${stepNum}: Look at middle box [Index ${mid}] which has ${val}. Since target ${key} is smaller, throw away the right side and search left!`
          });
          high = mid - 1;
        } else {
          steps.push({
            low, high, mid, key, found: false,
            log: `Step ${stepNum}: Look at middle box [Index ${mid}] which has ${val}. Since target ${key} is larger, throw away the left side and search right!`
          });
          low = mid + 1;
        }
      }

      steps.push({
        low, high, mid: -1, key, found: false, notFound: true,
        log: `Search Finished: We ran out of boxes to check (low passed high). Number ${key} is NOT in this array!`
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
            <div class="bs-idx">Box ${idx}</div>
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
    assignment: "Lab 2",
    githubFile: "Lab2-MergeSort/MergeSort.java",
    githubUrl: `${REPO_URL}/blob/main/Lab2-MergeSort/MergeSort.java`,
    concept: "Splits the array into smaller halves until each is just 1 number, then merges them back together in perfect sorted order (O(n log n)).",
    complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n) [Requires extra merge memory]" },
    defaultParams: {
      arr: [38, 27, 43, 3, 9, 82, 10, 19]
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div style="margin-bottom: 6px;">
          <label style="font-weight: bold;">Enter Array (separated by commas or spaces):</label>
          <input type="text" id="ms-arr-input" class="win-input" style="width: 100%; margin-top: 3px;" value="${params.arr.join(', ')}">
        </div>
        <div class="preset-chips">
          <button class="preset-chip" id="ms-pre-rand">🎲 Random (8)</button>
          <button class="preset-chip" id="ms-pre-rev">📉 Reversed (Worst)</button>
          <button class="preset-chip" id="ms-pre-sorted">📈 Already Sorted</button>
          <button class="preset-chip" id="ms-pre-small">🧼 Simple (5)</button>
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
        log: `Step 1: Start with ${arr.length} numbers: [${arr.join(', ')}]. We will break this into smaller pieces, sort each piece, and merge them back.`
      });

      function mergeSort(a, l, r) {
        if (l < r) {
          const m = Math.floor((l + r) / 2);
          steps.push({
            arr: [...a], left: l, right: r, mid: m, phase: "divide",
            log: `Step ${steps.length + 1} (Split): Cut section [${l}..${r}] in half at middle. Left piece is [${l}..${m}], Right piece is [${m+1}..${r}].`
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
            log: `Step ${steps.length + 1} (Compare): Look at Left (${L[i]}) vs Right (${R[j]}). Take the smaller one (${Math.min(L[i], R[j])}) and put it into place!`
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
          log: `Step ${steps.length + 1} (Merged): Section [${l}..${r}] is now merged into sorted order: [${a.slice(l, r + 1).join(', ')}].`
        });
      }

      mergeSort(arr, 0, arr.length - 1);
      steps.push({
        arr: [...arr], complete: true,
        log: `Done! All sections are merged. Entire array is now completely sorted: [${arr.join(', ')}].`
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
            <span style="font-size: 10px; margin-top: 4px; color: #333; font-weight: bold;">[${idx}]</span>
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
    assignment: "Lab 3",
    githubFile: "Quick sort/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Quick%20sort/Main.java`,
    concept: "Picks a benchmark number (pivot), moves all smaller numbers to its left and larger numbers to its right, then repeats on both sides (O(n log n) avg).",
    complexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n^2) [When already sorted]", space: "O(log n)" },
    defaultParams: {
      arr: [48, 12, 75, 33, 90, 24, 60, 15]
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div style="margin-bottom: 6px;">
          <label style="font-weight: bold;">Enter Array (separated by commas or spaces):</label>
          <input type="text" id="qs-arr-input" class="win-input" style="width: 100%; margin-top: 3px;" value="${params.arr.join(', ')}">
        </div>
        <div class="preset-chips">
          <button class="preset-chip" id="qs-pre-rand">🎲 Random (8)</button>
          <button class="preset-chip" id="qs-pre-sorted">⚠️ Sorted (Shows Worst Case)</button>
          <button class="preset-chip" id="qs-pre-small">🧼 Simple (5)</button>
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
        log: `Step 1: Start Quick Sort on [${arr.join(', ')}]. Following your Java lab code, the last element of each section is chosen as the Pivot.`
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
          log: `Step ${steps.length + 1}: In section [${low}..${high}], the Pivot is ${pivot} (in Red). Scan through elements to compare against ${pivot}.`
        });

        for (let j = low; j < high; j++) {
          if (a[j] < pivot) {
            i++;
            const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
            steps.push({
              arr: [...a], low, high, pivotIdx: high, i, j, swap: [i, j],
              finalized: Array.from(finalized),
              log: `Step ${steps.length + 1}: Box [${j}] has ${a[i]} which is smaller than pivot ${pivot}. Swap it to the left side (Box [${i}])!`
            });
          } else {
            steps.push({
              arr: [...a], low, high, pivotIdx: high, i, j,
              finalized: Array.from(finalized),
              log: `Step ${steps.length + 1}: Box [${j}] has ${a[j]} which is bigger or equal to pivot ${pivot}. Leave it where it is and keep scanning.`
            });
          }
        }

        const tmp = a[i + 1]; a[i + 1] = a[high]; a[high] = tmp;
        finalized.add(i + 1);
        steps.push({
          arr: [...a], low, high, pivotIdx: i + 1, placed: true,
          finalized: Array.from(finalized),
          log: `Step ${steps.length + 1}: Place pivot ${a[i + 1]} into its final position at Box [${i + 1}]. Everything to its left is smaller, everything to its right is bigger!`
        });
        return i + 1;
      }

      quickSort(arr, 0, arr.length - 1);
      for (let i = 0; i < arr.length; i++) finalized.add(i);
      steps.push({
        arr: [...arr], complete: true, finalized: Array.from(finalized),
        log: `Done! Every number is in its correct place: [${arr.join(', ')}].`
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
            <span style="font-size: 10px; margin-top: 4px; color: #333; font-weight: bold;">[${idx}]</span>
          </div>
        `;
      });
      html += `</div>`;
      stage.innerHTML = html;
    }
  },

  {
    id: "job_sequencing",
    name: "Job Sequencing",
    assignment: "Lab 4",
    githubFile: "Job sequencing/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Job%20sequencing/Main.java`,
    concept: "Greedy strategy: sorts jobs from highest profit to lowest, and books each job at the very last free hour before its deadline (O(n^2)).",
    complexity: { best: "O(n log n)", avg: "O(n^2)", worst: "O(n^2)", space: "O(d) [Slots table]" },
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
        <div style="font-weight: bold; margin-bottom: 4px;">Select a Preset:</div>
        <div class="preset-chips">
          <button class="preset-chip" id="js-pre-1">💼 5-Job Lab Assignment</button>
          <button class="preset-chip" id="js-pre-2">⚡ 4-Job Quick Test</button>
        </div>
        <div style="margin-top: 8px; font-weight: bold; margin-bottom: 4px;">Job List (ID, Deadline, Profit):</div>
        <div id="js-job-table" style="max-height: 120px; overflow-y: auto; background: #fff; border: 1px solid #808080; padding: 4px;">
          ${params.jobs.map((j, idx) => `
            <div class="control-row" style="margin-bottom: 3px;">
              <span style="font-weight: bold; width: 25px;">#${idx+1}</span>
              <input type="text" class="win-input j-id" style="width: 45px;" value="${j.id}">
              <span>Deadline:</span><input type="number" class="win-input j-dl" style="width: 40px;" min="1" max="6" value="${j.deadline}">
              <span>Profit $:</span><input type="number" class="win-input j-pr" style="width: 50px;" min="1" value="${j.profit}">
            </div>
          `).join('')}
        </div>
        <div style="display: flex; gap: 4px; margin-top: 6px;">
          <button id="js-add-btn" class="win-btn small">+ Add Job</button>
          <button id="js-apply-btn" class="win-btn small">Apply Changes</button>
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
        log: `Step 1: Sort all jobs by profit (highest first): [${jobs.map(j => `${j.id} ($${j.profit})`).join(', ')}]. We have ${maxDeadline} available time slots.`
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
            log: `Step ${steps.length + 1}: Job ${job.id} pays $${job.profit} and is due at time ${job.deadline}. Slot ${assignedSlot} is free, so we schedule it there! Total profit is now $${totalProfit}.`
          });
        } else {
          steps.push({
            jobs: [...jobs], slots: [...slots], totalProfit, currentJob: job, slot: null, rejected: true,
            log: `Step ${steps.length + 1}: Job ${job.id} pays $${job.profit}, but all slots up to deadline ${job.deadline} are already taken. Skip this job!`
          });
        }
      }

      steps.push({
        jobs: [...jobs], slots: [...slots], totalProfit, complete: true,
        log: `Complete! All jobs evaluated. Maximum possible profit earned is $${totalProfit}!`
      });
      return steps;
    },
    renderStep(stage, step) {
      const slots = step.slots;
      const maxSlots = slots.length - 1;
      let html = `
        <div class="gantt-grid">
          <div style="font-weight: bold; font-size: 11.5px; margin-bottom: 4px;">Time Slots on Schedule (Hour 1 to ${maxSlots}):</div>
          <div class="gantt-slots-row">
      `;
      for (let s = 1; s <= maxSlots; s++) {
        const j = slots[s];
        html += `
          <div class="gantt-slot ${j ? 'filled' : ''}">
            <span class="gantt-slot-num">Slot ${s}</span>
            ${j ? `<span class="gantt-job-name">${j.id}</span><span class="gantt-job-profit">+$${j.profit}</span>` : '<span style="color:#aaa;">Available</span>'}
          </div>
        `;
      }
      html += `
          </div>
          <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center; background: #ffffd0; padding: 8px; border: 1px solid #888;">
            <span><b>Total Money Earned:</b> <span style="font-size: 15px; color: #008000; font-weight: bold;">$${step.totalProfit}</span></span>
            <span><b>Currently Considering:</b> ${step.currentJob ? `<span style="font-weight: bold; color: #000080;">${step.currentJob.id} (Profit: $${step.currentJob.profit}, Due: Slot ${step.currentJob.deadline})</span>` : 'None'}</span>
          </div>
        </div>
      `;
      stage.innerHTML = html;
    }
  },

  {
    id: "prims_mst",
    name: "Prim's Algorithm (MST)",
    assignment: "Assignment 8",
    githubFile: "Assignment 8 - Prims/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Assignment%208%20-%20Prims/Main.java`,
    concept: "Starts at one city, then keeps adding the cheapest available road that connects an unvisited city to the network (O(V^2)).",
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
        <div style="font-weight: bold; margin-bottom: 4px;">Choose Graph Layout:</div>
        <div class="preset-chips">
          <button class="preset-chip" id="pm-pre-5">🏙️ 5-City Network</button>
          <button class="preset-chip" id="pm-pre-4">🔺 4-City Loop</button>
          <button class="preset-chip" id="pm-pre-6">🌐 6-City Web</button>
        </div>
        <div style="margin-top: 8px;">
          <label><b>Start City:</b></label>
          <div style="display: flex; gap: 4px; margin-top: 3px;">
            ${Array.from({length: params.numVertices}, (_, i) => `
              <button class="preset-chip ${i === params.startNode ? 'active' : ''}" style="${i === params.startNode ? 'background: #000080; color: #fff;' : ''}" data-node="${i}">Node ${i}</button>
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
        log: `Step 1: Start at Node ${start}. Currently connected nodes: [${start}]. Look for the cheapest road to any new node.`
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
          log: `Step ${steps.length + 1}: The cheapest road connects Node ${bestU} to new Node ${bestV} with weight ${minWeight}. Add it to our tree! Total tree cost: ${totalCost}.`
        });
      }

      steps.push({
        visited: Array.from(visited), mstEdges: [...mstEdges], totalCost, complete: true,
        log: `Done! All ${V} nodes are now connected with the absolute minimum total road weight of ${totalCost}!`
      });
      return steps;
    },
    renderStep(stage, step, params) {
      const V = params.numVertices;
      const mat = params.matrix;
      const cx = 170, cy = 150, r = 110;
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
              <rect x="${mx - 9}" y="${my - 8}" width="18" height="15" fill="#ffffff" stroke="#999" rx="2" />
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
        <div style="display: flex; gap: 12px; width: 100%; align-items: center; justify-content: space-around; flex-wrap: wrap;">
          <svg class="graph-svg" viewBox="0 0 340 300" style="max-width: 340px; height: 300px;">
            ${edgesSvg}
            ${nodesSvg}
          </svg>
          <div style="min-width: 200px; background: #e8e8e8; border: 2px inset #808080; padding: 8px; font-size: 11px;">
            <div style="font-weight: bold; color: #000080; margin-bottom: 4px;">Connected Network:</div>
            <div><b>Visited Nodes:</b> [${step.visited.join(', ')}]</div>
            <div><b>Roads Built:</b> ${step.mstEdges.length} of ${V - 1}</div>
            <div style="margin-top: 4px;"><b>Roads in Spanning Tree:</b></div>
            <ul style="margin-left: 14px; font-family: var(--font-mono); font-size: 10.5px;">
              ${step.mstEdges.map(e => `<li>(${e.u} <-> ${e.v}) cost: ${e.w}</li>`).join('') || '<li>(None yet)</li>'}
            </ul>
            <div style="margin-top: 6px; font-weight: bold; color: #008000; font-size: 12px;">Total Cost: ${step.totalCost}</div>
          </div>
        </div>
      `;
    }
  },

  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    assignment: "Assignment 9",
    githubFile: "Assignment 9 - Djikstra/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Assignment%209%20-%20Djikstra/Main.java`,
    concept: "Finds the shortest driving route from a starting point to every other point, greedily locking in the closest unvisited point next (O(V^2)).",
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
        <div style="font-weight: bold; margin-bottom: 4px;">Select Network Preset:</div>
        <div class="preset-chips">
          <button class="preset-chip" id="dj-pre-5">🏙️ 5-City Map</button>
          <button class="preset-chip" id="dj-pre-4">🔷 4-City Diamond</button>
        </div>
        <div style="margin-top: 8px;">
          <label><b>Choose Starting Node:</b></label>
          <div style="display: flex; gap: 4px; margin-top: 3px;">
            ${Array.from({length: params.numVertices}, (_, i) => `
              <button class="preset-chip" style="${i === params.source ? 'background: #000080; color: #fff;' : ''}" data-src="${i}">Node ${i}</button>
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
        log: `Step 1: Distance to starting Node ${src} is 0. All other nodes set to Infinity (unknown).`
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
          log: `Step ${steps.length + 1}: Pick the closest unvisited node: Node ${u} with shortest known distance of ${dist[u]}. Lock it in as visited!`
        });

        for (let v = 0; v < V; v++) {
          const weight = mat[u][v];
          if (!visited[v] && weight > 0 && dist[u] + weight < dist[v]) {
            dist[v] = dist[u] + weight;
            prev[v] = u;
            steps.push({
              dist: [...dist], visited: [...visited], prev: [...prev], u, relaxedV: v,
              log: `Step ${steps.length + 1}: Found a faster shortcut to Node ${v} via Node ${u}! New shortest distance is ${dist[v]} (was ${dist[v] === Infinity ? 'INF' : 'longer'}).`
            });
          }
        }
      }

      steps.push({
        dist: [...dist], visited: [...visited], prev: [...prev], complete: true,
        log: `Done! Shortest possible path to every single node from Node ${src} is computed!`
      });
      return steps;
    },
    renderStep(stage, step, params) {
      const V = params.numVertices;
      const mat = params.matrix;
      const cx = 170, cy = 150, r = 110;
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
              <rect x="${mx - 9}" y="${my - 8}" width="18" height="15" fill="#ffffff" stroke="#999" rx="2" />
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
        <div style="display: flex; gap: 12px; width: 100%; align-items: center; justify-content: space-around; flex-wrap: wrap;">
          <svg class="graph-svg" viewBox="0 0 340 300" style="max-width: 340px; height: 300px;">
            ${edgesSvg}
            ${nodesSvg}
          </svg>
          <div style="min-width: 220px; background: #e8e8e8; border: 2px inset #808080; padding: 8px; font-size: 11px;">
            <div style="font-weight: bold; color: #000080; margin-bottom: 6px;">Shortest Distances from Node ${params.source}:</div>
            <table class="matrix-table" style="width: 100%; margin: 0;">
              <thead>
                <tr><th>Destination</th><th>Distance</th><th>Previous Stop</th></tr>
              </thead>
              <tbody>
                ${step.dist.map((d, idx) => `
                  <tr style="${step.visited[idx] ? 'background: #eef8ee;' : ''}">
                    <td><b>Node ${idx}</b></td>
                    <td style="font-weight: bold; color: ${d === Infinity ? '#999' : '#000080'}">${d === Infinity ? 'Unreachable' : d}</td>
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
    id: "sudoku",
    name: "Sudoku Solver",
    assignment: "Assignment 10",
    githubFile: "Assignment 10 - Sudoku/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Assignment%2010%20-%20Sudoku/Main.java`,
    concept: "Fills empty cells by guessing digits 1 to 9; if it hits an impossible dead end, it erases the guess and backtracks (O(9^(N^2))).",
    complexity: { best: "O(1)", avg: "O(9^m)", worst: "O(9^(N*N))", space: "O(N*N) [Grid memory]" },
    defaultParams: {
      preset: "easy"
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 4px;">Choose Puzzle:</div>
        <div class="preset-chips">
          <button class="preset-chip" id="sd-pre-easy">🌟 Easy Demo (Fast)</button>
          <button class="preset-chip" id="sd-pre-med">🧩 Classic Puzzle</button>
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
        log: `Step 1: Loaded starting clues (in Blue). We will test numbers 1 to 9 in the empty spaces.`
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
                      log: `Step ${steps.length + 1}: Try placing ${num} at Row ${row+1}, Column ${col+1}. No clashes with row, column or box!`
                    });
                  }
                  if (solve(b)) return true;
                  b[row][col] = 0;
                  if (steps.length < stepCap) {
                    steps.push({
                      board: b.map(r => [...r]), initial, r: row, c: col, val: 0, backtrack: true,
                      log: `Step ${steps.length + 1} (Backtrack): Dead end reached later! Erase ${num} from Row ${row+1}, Column ${col+1} and try next option.`
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
        log: `Solved! Every row, column, and 3x3 box has numbers 1 to 9 with zero conflicts!`
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
    id: "floyd_warshall",
    name: "Floyd-Warshall",
    assignment: "Assignment 11",
    githubFile: "Assignment 11 - Floyd-Warshall/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Assignment%2011%20-%20Floyd-Warshall/Main.java`,
    concept: "Checks every pair of cities to see if stopping at an intermediate city (City K) makes the total trip shorter (O(V^3)).",
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
        <div style="font-weight: bold; margin-bottom: 4px;">Select Route Preset:</div>
        <div class="preset-chips">
          <button class="preset-chip" id="fw-pre-4">🗺️ 4-City Route Map</button>
          <button class="preset-chip" id="fw-pre-3">🔺 3-City Triangle</button>
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
        log: `Step 1: Starting distance table. Direct routes are filled in; INF means no direct path yet.`
      });

      for (let k = 0; k < V; k++) {
        steps.push({
          D: dist.map(r => [...r]), k, i: -1, j: -1, phaseStart: true,
          log: `Phase ${k + 1}: Try using City ${k} as a middle stopover for all pairs of cities.`
        });

        for (let i = 0; i < V; i++) {
          for (let j = 0; j < V; j++) {
            if (dist[i][k] !== 999 && dist[k][j] !== 999 && dist[i][k] + dist[k][j] < dist[i][j]) {
              const oldVal = dist[i][j];
              dist[i][j] = dist[i][k] + dist[k][j];
              steps.push({
                D: dist.map(r => [...r]), k, i, j, updated: true,
                log: `Shortcut found! Traveling from City ${i} to City ${j} by stopping at City ${k} takes only ${dist[i][j]} (was ${oldVal === 999 ? 'INF' : oldVal}).`
              });
            }
          }
        }
      }

      steps.push({
        D: dist.map(r => [...r]), k: V, complete: true,
        log: `Finished! The table now holds the absolute shortest travel distance between every pair of cities.`
      });
      return steps;
    },
    renderStep(stage, step, params) {
      const V = params.numVertices;
      const D = step.D;
      let html = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <div style="font-weight: bold; font-size: 11.5px;">
            ${step.k === -1 ? 'Initial Direct Distances' : `Middle Stopover City: Node ${step.k < V ? step.k : 'Complete'}`}
          </div>
          <table class="matrix-table">
            <thead>
              <tr><th>From / To</th>${Array.from({length: V}, (_, j) => `<th>City ${j}</th>`).join('')}</tr>
            </thead>
            <tbody>
      `;
      for (let i = 0; i < V; i++) {
        html += `<tr><th>City ${i}</th>`;
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
          <div style="font-size: 10.5px; color: #444;">Yellow = Row & Column of intermediate stopover City ${step.k !== -1 ? step.k : 'None'}, Green = Shorter route discovered!</div>
        </div>
      `;
      stage.innerHTML = html;
    }
  },

  {
    id: "n_queens",
    name: "N-Queens",
    assignment: "Assignment 12",
    githubFile: "Assignment 12 - N queens/Main.java",
    githubUrl: `${REPO_URL}/blob/main/Assignment%2012%20-%20N%20queens/Main.java`,
    concept: "Places Queens row-by-row on the board, ensuring no two queens share the same column or diagonal line of sight (O(N!)).",
    complexity: { best: "O(N)", avg: "O(N!)", worst: "O(N!)", space: "O(N)" },
    defaultParams: {
      N: 4,
      solIdx: 0
    },
    renderControls(container, params, onChange) {
      container.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 4px;">Select Board Size:</div>
        <div class="preset-chips">
          <button class="preset-chip" style="${params.N === 4 ? 'background: #000080; color: #fff;' : ''}" data-n="4">4x4 (2 solutions)</button>
          <button class="preset-chip" style="${params.N === 5 ? 'background: #000080; color: #fff;' : ''}" data-n="5">5x5 (10 solutions)</button>
          <button class="preset-chip" style="${params.N === 6 ? 'background: #000080; color: #fff;' : ''}" data-n="6">6x6 (4 solutions)</button>
          <button class="preset-chip" style="${params.N === 8 ? 'background: #000080; color: #fff;' : ''}" data-n="8">8x8 (92 solutions)</button>
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
        log: `Step 1: Board size is ${N}x${N}. Place ${N} queens so none can attack each other!`
      });

      let stepCap = 250;
      function solve(row) {
        if (row === N) {
          solutionsCount++;
          steps.push({
            queen: [...queen], N, complete: true, solNum: solutionsCount,
            log: `SUCCESS! Solution #${solutionsCount} found with all ${N} Queens placed safely!`
          });
          return;
        }

        for (let col = 0; col < N; col++) {
          if (isSafe(row, col)) {
            queen[row] = col;
            if (steps.length < stepCap) {
              steps.push({
                queen: [...queen], N, row, col, status: "safe",
                log: `Step ${steps.length + 1}: Place Queen for Row ${row + 1} at Column ${col + 1}. No horizontal, vertical, or diagonal threats!`
              });
            }
            solve(row + 1);
            queen[row] = -1;
            if (steps.length < stepCap) {
              steps.push({
                queen: [...queen], N, row, col, status: "backtrack",
                log: `Step ${steps.length + 1} (Backtrack): Can't place next queen peacefully. Pick up Queen from Row ${row + 1}, Column ${col + 1} and try next column.`
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
      const cellSize = Math.min(38, Math.floor(280 / N));
      let html = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
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
          <div style="font-size: 11.5px; font-weight: bold; color: #000080;">
            Queens safely placed: ${queen.filter(x => x !== -1).length} of ${N}
          </div>
        </div>
      `;
      stage.innerHTML = html;
    }
  }
];

// App Controller with Auto-Play & Friendly UX
class App {
  constructor() {
    this.currentAlgo = ALGORITHMS[0];
    this.params = { ...this.currentAlgo.defaultParams };
    this.steps = [];
    this.currentStepIdx = 0;
    this.isPlaying = false;
    this.playTimer = null;

    this.dom = {
      algoShelf: document.getElementById('algo-shelf'),
      conceptText: document.getElementById('concept-text'),
      controlsBox: document.getElementById('controls-box'),
      slider: document.getElementById('step-slider'),
      stepCount: document.getElementById('step-count'),
      logBox: document.getElementById('log-box'),
      stage: document.getElementById('canvas-stage'),
      btnFirst: document.getElementById('btn-first'),
      btnPrev: document.getElementById('btn-prev'),
      btnPlay: document.getElementById('btn-play'),
      btnNext: document.getElementById('btn-next'),
      btnLast: document.getElementById('btn-last'),
      btnCode: document.getElementById('btn-view-code'),
      codeModal: document.getElementById('code-modal'),
      codeContent: document.getElementById('code-content'),
      modalTitle: document.getElementById('modal-title'),
      modalClose: document.getElementById('modal-close'),
      statAlgo: document.getElementById('stat-algo'),
      statTime: document.getElementById('stat-time'),
      statSpace: document.getElementById('stat-space'),
      metricBest: document.getElementById('metric-best'),
      metricAvg: document.getElementById('metric-avg'),
      metricWorst: document.getElementById('metric-worst'),
      metricSpace: document.getElementById('metric-space'),
      btnGhLink: document.getElementById('btn-gh-link')
    };

    this.init();
  }

  init() {
    this.renderShelf();
    this.bindEvents();
    this.loadAlgo(ALGORITHMS[0].id);
  }

  renderShelf() {
    this.dom.algoShelf.innerHTML = ALGORITHMS.map(a => `
      <button class="win-btn algo-tab-btn ${a.id === this.currentAlgo.id ? 'active' : ''}" data-id="${a.id}">
        <span class="badge">${a.assignment}</span> ${a.name}
      </button>
    `).join('');

    this.dom.algoShelf.querySelectorAll('.algo-tab-btn').forEach(btn => {
      btn.onclick = () => this.loadAlgo(btn.dataset.id);
    });
  }

  bindEvents() {
    this.dom.slider.oninput = (e) => {
      this.pause();
      this.currentStepIdx = parseInt(e.target.value) || 0;
      this.updateStepView();
    };

    this.dom.btnFirst.onclick = () => {
      this.pause();
      this.currentStepIdx = 0;
      this.updateStepView();
    };

    this.dom.btnPrev.onclick = () => {
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

    this.dom.btnLast.onclick = () => {
      this.pause();
      this.currentStepIdx = this.steps.length - 1;
      this.updateStepView();
    };

    if (this.dom.btnPlay) {
      this.dom.btnPlay.onclick = () => this.togglePlay();
    }

    this.dom.btnCode.onclick = () => this.openCodeModal();
    this.dom.modalClose.onclick = () => this.closeCodeModal();
    this.dom.codeModal.onclick = (e) => {
      if (e.target === this.dom.codeModal) this.closeCodeModal();
    };

    if (this.dom.btnGhLink) {
      this.dom.btnGhLink.onclick = () => {
        window.open(this.currentAlgo.githubUrl, '_blank');
      };
    }
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
    if (this.dom.btnPlay) {
      this.dom.btnPlay.textContent = '⏸ Pause';
      this.dom.btnPlay.classList.add('playing');
    }
    this.playTimer = setInterval(() => {
      if (this.currentStepIdx < this.steps.length - 1) {
        this.currentStepIdx++;
        this.updateStepView();
      } else {
        this.pause();
      }
    }, 800);
  }

  pause() {
    this.isPlaying = false;
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
    }
    if (this.dom.btnPlay) {
      this.dom.btnPlay.textContent = '▶ Play';
      this.dom.btnPlay.classList.remove('playing');
    }
  }

  loadAlgo(id) {
    this.pause();
    this.currentAlgo = ALGORITHMS.find(a => a.id === id) || ALGORITHMS[0];
    this.params = { ...this.currentAlgo.defaultParams };
    this.renderShelf();

    this.dom.conceptText.textContent = this.currentAlgo.concept;
    this.dom.statAlgo.textContent = `${this.currentAlgo.name} (${this.currentAlgo.assignment})`;
    this.dom.statTime.textContent = `Time: ${this.currentAlgo.complexity.avg}`;
    this.dom.statSpace.textContent = `Space: ${this.currentAlgo.complexity.space}`;

    this.dom.metricBest.textContent = this.currentAlgo.complexity.best;
    this.dom.metricAvg.textContent = this.currentAlgo.complexity.avg;
    this.dom.metricWorst.textContent = this.currentAlgo.complexity.worst;
    this.dom.metricSpace.textContent = this.currentAlgo.complexity.space;

    this.currentAlgo.renderControls(this.dom.controlsBox, this.params, (newParams) => {
      this.params = newParams;
      this.recompute();
    });

    this.recompute();
  }

  recompute() {
    this.pause();
    this.steps = this.currentAlgo.computeSteps(this.params);
    this.dom.slider.max = Math.max(0, this.steps.length - 1);
    this.currentStepIdx = 0;
    this.updateStepView();
  }

  updateStepView() {
    const step = this.steps[this.currentStepIdx] || { log: "No steps to show" };
    this.dom.slider.value = this.currentStepIdx;
    this.dom.stepCount.textContent = `Step ${this.currentStepIdx + 1} of ${this.steps.length}`;
    this.dom.logBox.textContent = step.log || "";

    this.currentAlgo.renderStep(this.dom.stage, step, this.params);
  }

  openCodeModal() {
    const path = this.currentAlgo.githubFile;
    const code = REPO_CODES[path] || "// Source code not found.";
    this.dom.modalTitle.textContent = `Notepad - [${path}]`;
    this.dom.codeContent.textContent = code;
    this.dom.codeModal.classList.add('open');
  }

  closeCodeModal() {
    this.dom.codeModal.classList.remove('open');
  }
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
