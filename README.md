# DAA Lab Suite '98

A fast, zero-dependency, retro Windows 98-themed interactive learning platform for Design and Analysis of Algorithms (DAA), connected directly to the [viraj-des/DAA-Lab-TY](https://github.com/viraj-des/DAA-Lab-TY) GitHub repository.

## Features

- **Windows 98 Desktop Theme**: Authentic 3D beveled borders, classic titlebar, tab shelf, menu bar, and system status bar.
- **1-Line Conceptual Explanations**: Concise, distilled theoretical summaries for each algorithm.
- **Interactive Parameter Knobs**: Adjust inputs, randomize datasets, switch presets, and change problem sizes on the fly.
- **Programmatic Visualizer**: Instant visual output generated programmatically via Canvas/SVG/DOM with zero external framework overhead.
- **Instant Compute & Step Scrubber**: Drag the slider or step through algorithm execution transitions with live explanatory logs.
- **GitHub Ingestion & Notepad Viewer**: Integrated Notepad window to view the exact Java source code matching each assignment directly from `viraj-des/DAA-Lab-TY`.

## Algorithms Covered

1. **Binary Search** (`Binary search/Main.java`) — Divide-and-conquer interval halving ($O(\log n)$).
2. **Merge Sort** (`Lab2-MergeSort/MergeSort.java`) — Recursive divide and pairwise merge ($O(n \log n)$).
3. **Quick Sort** (`Quick sort/Main.java`) — Pivot partitioning and recursive ordering ($O(n \log n)$ avg).
4. **Job Sequencing with Deadlines** (`Job sequencing/Main.java`) — Greedy profit scheduling with latest deadline slots ($O(n^2)$).
5. **Prim's Algorithm (MST)** (`Assignment 8 - Prims/Main.java`) — Greedy growth of minimum spanning tree via cut edges ($O(V^2)$).
6. **Dijkstra's Algorithm** (`Assignment 9 - Djikstra/Main.java`) — Single-source shortest path relaxation ($O(V^2)$).
7. **Sudoku Solver** (`Assignment 10 - Sudoku/Main.java`) — Recursive depth-first backtracking search ($O(9^{N^2})$).
8. **Floyd-Warshall** (`Assignment 11 - Floyd-Warshall/Main.java`) — Dynamic programming all-pairs shortest paths via intermediate vertices ($O(V^3)$).
9. **N-Queens** (`Assignment 12 - N queens/Main.java`) — Row-by-row non-attacking queen backtracking ($O(N!)$).

## Quick Start

Open `index.html` directly in any web browser, or serve locally:

```bash
# Optional local HTTP server
python3 -m http.server 8080
```
Then visit `http://localhost:8080`.
