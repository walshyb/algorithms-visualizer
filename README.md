# Algorithms Visualizer

A simple algorithm visualizer built with React and C++, compiled via Emscripten into WebAssembly! The algorithm execution is written in C++ and rendering (the visualization) is done in React. I decided to write the algorithm logic in C++ because I wanted more practice with C++ and more practical experience with using WebAssembly (Wasm) modules.

This is still a work in progress! I will be adding more algorithms over time. It's not the most mobile-friendly currently; I'm focusing on speed and functionality right now, as I have a few projects that I'm working on in parallel.

## Requirements

- Node: `21.x.x`
- Emscripten: `^3.1.51`

## Running

```bash
# Install node deps
npm install

# Build wasm module (only needed if changes are made,
# as wasm module is checked to repo)
make

# Run the project locally, on port 3000 by default
npm run start
```

## Roadmap

- [x] Binary Search Array
- [x] Binary Search Tree
- [x] Depth First Search (DFS) Tree
- [x] Breadth First Search (BFS) Tree
- [ ] 2D Array Binary Search
- [ ] 2D Array DFS
- [ ] 2D Array BFS
- [ ] Dijkstra's
- [ ] A\* search

## Known Issues

- [ ] Input arrays can't be modified via input field
- [ ] Arrays exceed screenwidth on screens < 650px
- [ ] Trees exceed screenwidth on screens < 420px

## Deploying

This is hosted as a path on my main portfolio website, using GitHub pages. The static files are on the `deploy` branch.

The `.env.production` file updates the `PUBLIC_URL` in the build so all of this project's assets are referenced within the respective subpath.

```
npm run deploy
```
