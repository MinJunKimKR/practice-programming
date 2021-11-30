ARRAY = [1, 4, 2, 3, 7, 8, 5, 9, 1, 6]


def sort(array):
    # while startIndex < len(array):
    for startIndex in range(len(array)):
        minIndex = startIndex
        for i in range(startIndex, len(array)):
            if array[minIndex] > array[i]:
                minIndex = i
        # temp = array[minIndex]
        # array[minIndex] = array[startIndex]
        # array[startIndex] = temp
        array[minIndex], array[startIndex] = array[startIndex], array[minIndex]
        # startIndex += 1
    return array


print(sort(ARRAY))
