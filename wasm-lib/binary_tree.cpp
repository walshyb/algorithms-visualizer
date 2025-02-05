#include <emscripten.h>
#include "datastructures/tree.h"
#include <iostream>

using namespace std;

extern "C" {
  /**
   * Binary searches an integer array to look for a target.
   *
   * Calls JS func that highlights current index
   *
   * @returns 0 if no errors
   */
  int binary_search_tree(int target, int* input, int inputSize, void (*updateSelectedNode)(int)) {
    Tree *tree = new Tree(input, inputSize);
    Node* current = tree->root;

    while (current->children.size()) {
      updateSelectedNode(current->index);
      cout << current->value <<endl;

      if (current->value == target) {
        delete tree;
        return 0;
      }

      if (current->value < target) {
        current = current->children[1];
      } else {
        current = current->children[0];
      }

    }

    delete tree;
    updateSelectedNode(-1);
    return -1;
  }
}
