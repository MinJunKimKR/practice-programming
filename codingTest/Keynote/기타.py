# 실행시간 알고 싶을때
from itertools import combinations
import time
from string import ascii_lowercase
start_time = int(round(time.time() * 1000))
# some_func()
end_time = int(round(time.time() * 1000))
print('some_func()의 실행 시간 : %d(ms)' % (end_time - start_time))


arr = [1, 2, 3, 4, 5]


print(list(combinations(arr, 8)))  # 초과되면 빈배열을 리턴한다.
print(list(ascii_lowercase))
