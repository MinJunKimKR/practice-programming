# 7:35 => 8:55 [7:41]
# success
import sys
sys.stdin = open('/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/previous question/Implementation_Bruteforce/luckyStraight.txt', 'r')

N = list(map(int, input()))
mid = int((len(N)/2))
left = N[:mid]
right = N[mid:]

if sum(left) == sum(right):
    print('LUCKY')
else:
    print('READY')
