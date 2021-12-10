let sortedArray = [1, 2, 8, 7, 6, 4, 3, 5, 9];

const merge = (array, leftIndex, rightIndex) => {
  const middileIndex = Number.parseInt((leftIndex + rightIndex) / 2);
  const blockArray = [];
  let blockLeftIndex = leftIndex;
  let blockRightIndex = middileIndex + 1;
  while (blockLeftIndex <= middileIndex && blockRightIndex <= rightIndex) {
    if (array[blockLeftIndex] < array[blockRightIndex]) {
      blockArray.push(array[blockLeftIndex]);
      blockLeftIndex++;
    } else {
      blockArray.push(array[blockRightIndex]);
      blockRightIndex++;
    }
  }
  let fromRemainIndex = 0;
  let endRemainIndex = 0;
  if (blockLeftIndex > middileIndex) {
    fromRemainIndex = blockRightIndex;
    endRemainIndex = rightIndex;
  } else {
    fromRemainIndex = blockLeftIndex;
    endRemainIndex = middileIndex;
  }
  for (let i = fromRemainIndex; i < endRemainIndex + 1; i++) {
    blockArray.push(array[i]);
  }
  let originLeft = leftIndex;
  blockArray.forEach((value) => {
    sortedArray[originLeft] = value;
    originLeft++;
  });

  console.log("sortedArray : ", sortedArray);
};

const mergeSort = (array, leftIndex, rightIndex) => {
  //   console.log("array : ", array);
  if (leftIndex === rightIndex) return;
  //   console.log(`leftIndex : ${leftIndex} | rightIndex : ${rightIndex}`);
  const middileIndex = Number.parseInt((leftIndex + rightIndex) / 2);
  //   console.log("middileIndex : ", middileIndex);
  mergeSort(array, leftIndex, middileIndex);
  mergeSort(array, middileIndex + 1, rightIndex);
  merge(array, leftIndex, rightIndex);
};

mergeSort(sortedArray, 0, sortedArray.length - 1);
