n = 5
m = 5
data = [1, 2, 3, 2, 5]

count = 0
intervalSum = 0
end = 0

for start in range(n):
    while intervalSum < m and end < n:
        intervalSum += data[end]
        end += 1
    if intervalSum == m:
        count += 1
    intervalSum -= data[start]

print(count)
