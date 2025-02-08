# Compiler settings
CXX := em++
CXXFLAGS := -std=c++17 --bind
EM_FLAGS := -g -gsource-map -s EXPORTED_RUNTIME_METHODS=ccall,addFunction -s EXPORTED_FUNCTIONS=_malloc,_free,_binary_search_array,_binary_search_tree,_depth_first_search_tree,_breadth_first_search_tree -s EXPORT_NAME="'AlgorithmsModule'" -s ALLOW_TABLE_GROWTH=1 -s ASYNCIFY=1 -s ENVIRONMENT=web -s EXPORT_ES6

# Source directory
SRC_DIR := wasm-lib

# Output directory
OUT_DIR := src/

# Get list of .cpp files
SRCS := $(shell find $(SRC_DIR) -name "*.cpp")

# Output file
OUT_FILE := $(OUT_DIR)/algorithms.js

# Main target
.PHONY: all
all:$(OUT_FILE)

# Rule to compile .cpp files to output file
$(OUT_FILE): $(SRCS)
	$(CXX) $^ -o $@ $(EM_FLAGS) $(CXXFLAGS)

