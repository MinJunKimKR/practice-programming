
ARRAY = [1, 4, 2, 3, 7, 8, 5, 9, 1, 6]


def sort(array):
    for i in range(len(array)):
        for j in range(i, 0, -1):
            if array[j] < array[j-1]:
                array[j], array[j-1] = array[j-1], array[j]
            else:
                break
    return array


print(sort(ARRAY))
