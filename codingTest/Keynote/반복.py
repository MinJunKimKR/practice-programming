
from itertools import cycle
# 배열 2씩증가
# for i in range(0, 10, 2):  # 0부터 2까지 증가시키며 10까지 반복
#     print(i)


# enumerate는 index와 함께 루프를 돌린다.
for i in enumerate(['A', 'B', 'C']):
    print(i)

for i, letter in enumerate(['A', 'B', 'C']):
    print(i, letter)

for i, letter in enumerate(['A', 'B', 'C'], start=1):
    print(i, letter)

print('======================')
# Cycle로 리스트 무한하게 늘리기
arr = [1, 2, 3, 4, 5]
infinityArr = cycle(arr)

for i in range(10):
    print(next(infinityArr), end='')  # next를 사용해서 무한히 출력할수 있다.
