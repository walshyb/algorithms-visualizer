#include <vector>

class Node {
  public:
    int index;
    int value;
    std::vector<Node*> children;

    Node(int index, int value) : index(index), value(value) {}
    Node(int index, int value, std::vector<Node*> childNodes) : index(index), value(value), children(childNodes) {}


    void addChild(int idx, int val) {
      children.push_back(new Node(idx, val));
    }

    void addChild(Node* child) {
      children.push_back(child);
    }

    ~Node() {
      for (Node* child : children) {
        delete child;
      }
    }
};
