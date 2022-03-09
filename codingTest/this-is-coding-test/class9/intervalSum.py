n = 5
data = [10, 20, 30, 40, 50]

sumValue = 0
prefixSum = [0]

for i in data:
    sumValue += i
    prefixSum.append(sumValue)

left = 3
right = 4

print(prefixSum[right]-prefixSum[left-1])
