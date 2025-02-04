#include <emscripten.h>
#include <deque>
#include "tree.h"
#include <iostream>

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

    deque<Node*> bfs = {root};

    while (bfs.size()) {
      Node* current = bfs.front();
      bfs.pop_front();

      if (current->children.size() < 2) {
        current->children.push_back(new Node(i, num));
      }
    }
  }
}

Tree::~Tree() {
  delete root;
}
