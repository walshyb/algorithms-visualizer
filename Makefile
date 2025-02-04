# Compiler settings
CXX := em++
CXXFLAGS := -std=c++17 --bind
EM_FLAGS := -s EXPORTED_RUNTIME_METHODS=ccall,allocateUTF8,cwrap,addFunction -s EXPORTED_FUNCTIONS=_free,_binary_search_array,_binary_search_tree -s EXPORT_NAME="'AlgorithmsModule'" -s ALLOW_TABLE_GROWTH=1 -s ASYNCIFY=1

# Source directory
SRC_DIR := wasm-lib

# Output directory
OUT_DIR := public/

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

