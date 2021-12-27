# https://programmers.co.kr/learn/courses/30/lessons/60057?language=python3
# 7:50 -> 8:20
# [FAIL]
# retry 8:30 -> 8:50 [8:45]

import sys
sys.stdin = open('/Users/minjunkim/Documents/Programming/practice-programming/algorithm/thisiscodingtest/previous question/Implementation_Bruteforce/zipString.txt', 'r')

S = list(input())
lenS = len(S)  # 입력받는 문자열의 길이
mid = lenS//2  # 몫/2
minLenght = lenS  # 최대압축

for i in range(1, mid+1):  # 몇글자씩 자를것인지
    zipString = ''  # 압축된 문자열
    preBlock = ''
    blocks = []
    start = 0
    end = 0
    count = 1
    for endIndex in range(i, lenS+1, i):  # 문자열 자르기
        start = end
        end = endIndex
        blocks.append(''.join(S[start:endIndex]))  # 0:1
    if end < lenS+1:
        blocks.append(''.join(S[end:]))

    for block in blocks:  # 잘라놓은 글자를 1개씩
        if preBlock == '':  # 최초 실행일때
            preBlock = block  # 초기화 작업
            zipString = block
            continue
        if preBlock == block:  # 이전것과 내가 같다면
            count += 1  # 압축
        else:  # 다르다면, 압출문자열에 추가
            zipString += ('' if count == 1 else str(count)) + block
            count = 1
            preBlock = block

    minLenght = min(minLenght, len(zipString))
print(minLenght)


# zipString = ''
# start = 0
# end = i
# preString = ''
# count = 1

# while end <= lenS:
#     now = ''.join(S[start:end])
#     if preString == '':
#         preString = now
#         start = end
#         end += i
#         continue
#     if preString == now:
#         count += 1
#     else:
#         zipString += str(count) if count > 1 else '' + preString
#         preString = now
#     start = end
#     end += i
#     if end > lenS:
#         end = lenS

# minLenght = min(minLenght, len(zipString))
