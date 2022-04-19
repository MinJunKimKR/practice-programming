import math
# you can write to stdout for debugging purposes, e.g.
# print("this is a debug message")

# dict에 값을 입력하기 위한 함수


def raise_dic_with_comments(dic, key):
    # key값이 존재하지 않다면, key값을 만들어준다.
    if dic.get(key) is None:
        dic[key] = 0
    # 1증가
    dic[key] += 1


def solution_with_comments(X, Y):
    # write your code in Python 3.6
    # 해답으로 사용될 dict
    arr_ans = {}
    # 구하려는겂
    ans = 0
    # X와 Y의 길이는 같기에, X의 길이를 기준으로 loop
    for i in range(len(X)):
        if X[i] == 0:
            # X가 0이라면, Y가 무슨 값이 오던 0이기에 key를 0으로 고정.
            # 이때, Y의 범위는 1부터기에 Y가 0인 케이스는 고려하지 않는다.
            key = '0'
        else:
            # X와 Y의 최대 공약수를 구한다.
            xy_gcd = math.gcd(X[i], Y[i])
            # 최대 공약수로 각각나눠서 더이상 나눌수 없는 '기준이되는'형태를 키값으로 고정
            key = str(X[i]//xy_gcd) + '/'+str(Y[i]//xy_gcd)
        # dict에 값을 증가 시킨다.
        raise_dic(arr_ans, key)

        # 만일, ans의 값보다 더 크다면, ans의 값을 변경한다.
        if ans < arr_ans[key]:
            ans = arr_ans[key]
    return ans


print(solution([10, 15, 30, 4, 0], [2, 3, 6, 8, 4]))
