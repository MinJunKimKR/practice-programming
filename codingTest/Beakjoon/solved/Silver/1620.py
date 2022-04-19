# 10:17 -> 10:50
import sys
sys_input = sys.stdin.readline
M, N = map(int, input().split())
dic = {}

for i in range(1, M+1):
    name = sys_input().strip()
    dic[str(i)] = name
re_dic = dict(map(reversed, dic.items()))
for _ in range(N):
    q = sys_input().strip()
    if q.isdecimal():
        print(dic[q])
    else:
        print(re_dic[q])
