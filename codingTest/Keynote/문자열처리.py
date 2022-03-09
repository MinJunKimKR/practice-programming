
from collections import Counter

# Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1})
print(Counter('hello world'))
# 가장 수가 많은 글자 2개 #[('l', 3), ('o', 2)]
print(Counter('hello world').most_common(2))
# 데이터의 개수가 많은 순으로 정렬된 배열을 리턴하는 most_common이라는 메서드를 제공

print('======================')
# 배열의 차이만 떼어내기
participant = ["leo", "kiki", "eden"]
completion = ["eden", "kiki"]
answer = Counter(participant) - Counter(completion)
print(answer)  # Counter({'leo': 1})
print(list(answer.keys())[0])  # leo

print('======================')
# 아스키 코드로 변환
n = ord('A')
print(n)  # 65

# 아스키 코드 문자로 변환
print(chr(n))  # A

print('======================')
# 문자열 뒤집기
word = 'abcdefg'
print(word[::-1])  # gfedcba
