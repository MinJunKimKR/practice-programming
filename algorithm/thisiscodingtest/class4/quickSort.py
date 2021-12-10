# [Fail]
# [Retry] 4:16 -> 4:40 [4:33]
array = [3, 1, 6, 4, 0, 5, 9, 8, 2, 7]


# def quickSort(array, startIdx, endIdx):
#     if startIdx > endIdx:
#         return
#     pivot = startIdx
#     left = startIdx+1
#     right = endIdx
#     while left <= right:
#         while array[left] <= array[pivot] and left < endIdx:
#             left += 1
#         while array[right] >= array[pivot] and right > startIdx:
#             right -= 1
#         if right > left:
#             array[right], array[left] = array[left],  array[right]
#         else:
#             array[right], array[pivot] = array[pivot],  array[right]
#     quickSort(array, pivot, right-1)
#     quickSort(array, right+1, endIdx)


# quickSort(array, 0, len(array)-1)
# print(array)


def quickSortShort(array):
    if len(array) <= 1:
        return array
    pivot = array[0]
    tail = array[1:]

    left = [x for x in tail if x <= pivot]
    right = [x for x in tail if x > pivot]

    return quickSortShort(left) + [pivot] + quickSortShort(right)


print(quickSortShort(array))
