# 10:10 -> 10:35
# 10:54 -> 11:20
# 11:27[success]
stack = []

baskets = list(input())

if baskets[0] == ')' or baskets[0] == ']':
    print(0)
    exit(0)

for basket in baskets:
    if basket == '(' or basket == '[':
        stack.append(basket)
    else:
        if basket == ')':
            if stack[-1] == '(':
                stack.pop()
                stack.append(2)
            else:
                total = 0
                while True:
                    if len(stack) == 0:
                        print(0)
                        exit(0)
                    last = stack.pop()
                    if last == '[':
                        print(0)
                        exit(0)
                    if last == '(':
                        total *= 2
                        stack.append(total)
                        break
                    total += last
        if basket == ']':
            if stack[-1] == '[':
                stack.pop()
                stack.append(3)
            else:
                total = 0
                while True:
                    if len(stack) == 0:
                        print(0)
                        exit(0)
                    last = stack.pop()
                    if last == '(':
                        print(0)
                        exit(0)
                    if last == '[':
                        total *= 3
                        stack.append(total)
                        break
                    total += last
ans = 0
for i in stack:
    if type(i) is str:
        print(0)
        exit(0)
    ans += i
print(ans)
