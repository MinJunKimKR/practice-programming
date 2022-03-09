# 11:56 -> 12:26
# 12:09[Success]

import sys
sys_input = sys.stdin.readline

N = int(sys_input().strip())
a_num = list(map(int, sys_input().strip().split()))
a_num = sorted(a_num)


M = int(sys_input().strip())

m_num = list(map(int, sys_input().strip().split()))


def bi_search(start, end, num):
    if start > end:
        return False
    mid = (start+end)//2

    if a_num[mid] == num:
        return True
    if a_num[mid] > num:
        end = mid-1
        return bi_search(start, end, num)
    if a_num[mid] < num:
        start = mid+1
        return bi_search(start, end, num)


for this_num in m_num:
    if bi_search(0, N-1, this_num):
        print(1)
    else:
        print(0)
