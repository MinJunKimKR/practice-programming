# N = map(int, list(str(input())))
# N = map(int, list(input()))
# print(N)
# result = 0
# for i in N:
#     print(f' i : {i}')
#     if result == 0:
#         result = i
#         break
#     if i == 0:
#         result += i
#     else:
#         result *= i

N = input()
result = 0

for i in range(len(N)):  # range(1, len(N))
    number = int(N[i])
    if i == 0:
        result = number
        continue
    if N[i] == 0 or result == 0:
        result += number
    else:
        result *= number

print(f'result : {result}')
