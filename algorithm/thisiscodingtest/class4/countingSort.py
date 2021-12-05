array = [1, 2, 8, 0, 4, 3, 2, 5, 7, 9, 8, 1, 6]

# countingArray = [0 for _ in range(max(array)+1)]
countingArray = [0] * (max(array) + 1)

sortArray = []

for i in array:
    countingArray[i] += 1
# for i in range(len(array)):
    # countingArray[array[i]] +=1

for i in range(len(countingArray)):
    for _ in range(countingArray[i]):
        sortArray.append(i)

print(sortArray)
