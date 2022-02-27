n = int(input())
count = 0
coins = [500, 100, 50, 10]


for i in coins:
    count += n // i
    n = n % i
    # n %= i

print(count)
