import { useState, useEffect } from "react";
import TreeFromArray from "../datastructures/Tree";
import "./BinarySearchTree.scss";

export default function BinarySearchTree({ module }) {
  const data = [13, 10, 17, 4, 11, 15, 28, 99, 99, 99, 99, 99, 99, 99, 99];
  return (
    <div>
      <h2>Binary Search Tree</h2>

      <TreeFromArray array={data} />
    </div>
  );
}
