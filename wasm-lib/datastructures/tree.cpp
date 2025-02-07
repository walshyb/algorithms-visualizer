#include <emscripten.h>
#include <deque>
#include "tree.h"

using namespace std;

// TODO:
// maybe convert this constructor to a func for binary_search trees specifically
// 
// Initialize new tree of nodes, root, from int array
Tree::Tree(int* input, int inputSize) {
  if (!root) {
    root = new Node(0, input[0]);
  }

  for (int i = 1; i < inputSize; i++) {
    int num = input[i];

    deque<Node*> bfs = { root };

    while (bfs.size()) {
      Node* current = bfs.front();
      bfs.pop_front();

      if (current->children.size() < 2) {
        if (num == INT_MIN) {
          current->children.push_back(nullptr);
        } else {
          current->children.push_back(new Node(i, num));
        }
        break;
      }

      // Add children to BFS queue
      for (Node* child : current->children) {
        bfs.push_back(child);
      }
    }
  }
}

Tree::~Tree() {
  delete root;
}
