#include <emscripten.h>
#include <set>
#include <vector>

using namespace std;

extern "C" {
  /**
   * Binary searches an integer array to look for a target.
   *
   * Calls JS func that highlights current index
   *
   * @returns 0 if no errors
   */
  int binary_search_array(int target, int* input, int inputSize, void (*updateIndicies)(int,int,int)) {
    int low = 0;
    int high = inputSize - 1;
    updateIndicies(low, high, -1);

    while (low <= high) {
      // sleep for 1 second in between iterations 
      // so frontend can update and have changes visible to user
      emscripten_sleep(1000);

      int mid = low + (high-low) / 2;
      int num = input[mid];
      updateIndicies(low, high, mid);

      if (num == target) {
        free(input);
        return 0;
      } else if (num < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }

      updateIndicies(low, high, mid);
    }


    updateIndicies(low, high, -1);
    free(input);
    return -1;
  }

  /**
   * Search a 2D array via DFS
   *
   * @param target
   * @param input 2D array of numbers
   * @return 1 if found, 0 if not
   */
  int dfs_array(
      int target,
      int* input,
      void (*updateSelectedIndex)(int),
      void (*setSearchResult)(int)) {
    set<int> seen;
  }
}
