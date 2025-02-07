#include <emscripten.h>
#include "datastructures/tree.h"

using namespace std;

extern "C" {
  /**
   * Binary searches an integer array to look for a target.
   *
   * Calls JS func that highlights current index
   *
   * @returns 1 if found, 0 if not found
   */
  int binary_search_tree(int target, int* input, int inputSize, void (*updateSelectedNode)(int), void (*setSearchResult)(int)) {
    Tree *tree = new Tree(input, inputSize);
    Node* current = tree->root;

    while (current) {
      emscripten_sleep(1000);
      updateSelectedNode(current->index);

      if (current->value == target) {
        delete tree;
        setSearchResult(1);
        return 1;
      }

      if (current->value < target) {
        current = current->children[1];
      } else {
        current = current->children[0];
      }

    }
    emscripten_sleep(1000);
    updateSelectedNode(current->index);

    delete tree;
    setSearchResult(0);
    return 0;
  }
}
