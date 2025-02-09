#include <vector>
#include <array>
using namespace std;

class Graph {
  private:
    vector<array<int, 2>> adjacencyList;
  public:
    Graph(int** edges, int edgeCount) {
      for (int i = 0; i < edgeCount; i++) {
        adjacencyList.push_back({ edges[i][0], edges[i][1] });
      }
    }
};
