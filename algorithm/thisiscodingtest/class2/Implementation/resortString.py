# 2:25 -> 2:55
# isalpha => 알파벳인지
# indigit => 숫자인지

S = input()

sum = 0
result = []
for i in S:
    if i.isalpha():
        result.append(i)
        continue
    sum += int(i)

result.sort()
if sum != 0:
    result.append(str(sum))

print("".join(result))
