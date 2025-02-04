#include <emscripten.h>
#include <emscripten/bind.h>
#include <unistd.h>

extern "C" {
  /**
   * Binary searches an integer array to look for a target.
   *
   * Calls JS func that highlights current index
   *
   * @returns 0 if no errors
   */
  int binary_search(int target, int* input, int inputSize, void (*updateLowIndex)(int), void (*updateHighIndex)(int), void (*updateMidIndex)(int) ) {
    int low = 0;
    int high = inputSize - 1;
    updateLowIndex(low);
    updateHighIndex(high);

    while (low <= high) {
      // sleep for 1 second in between iterations 
      // so frontend can update and have changes visible to user
      emscripten_sleep(1000);

      int mid = low + (high-low) / 2;
      int num = input[mid];
      updateMidIndex(mid);

      if (input[mid] == target) {
        return 0;
      }

      if (num < target) {
        low = mid + 1;
        updateLowIndex(low);
      } else {
        high = mid - 1;
        updateHighIndex(high);
      }
    }


    updateMidIndex(-1);
    return -1;
  }
}
