# 11:11 -> 12:00
# FIXME: GG
# 12:05 -> 12:40 [success]
from itertools import combinations
from string import ascii_lowercase
import sys
sys_input = sys.stdin.readline
N, K = map(int, input().split())

words = []
if K < 5:
    print(0)
    exit(0)
leave_word = K-5
defalt_set = ['a', 'n', 't', 'c', 'i']
for _ in range(N):
    words.append(set(list(sys_input().strip())).difference(defalt_set))

remain_word = set([])

for word in words:
    # if len(word) > leave_word:
    #     continue
    remain_word.update(word)
if len(remain_word) == 0:
    print(N)
    exit(0)

target_alpa = set(list(ascii_lowercase)).difference(defalt_set)
combi = list(combinations(list(target_alpa), leave_word))
max_cnt = 0

for com in combi:
    com = set(com)
    cnt = 0
    for word in words:
        if len(word.difference(com)) == 0:
            cnt += 1
    max_cnt = max(max_cnt, cnt)
print(max_cnt)


# 2 10
# antabtica
# antabtica
