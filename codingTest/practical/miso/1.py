# you can write to stdout for debugging purposes, e.g.
# print("this is a debug message")

def solution(S):
    # write your code in Python 3.6

    # BALLOON이라는 글자를 제거하려면 최소 7단어가 되야한다.
    # 즉, 제시된 글자가 7단어가 되지않는다면 1번도 제거가 불가능 하기에 0을 return
    if len(S) < 7:
        return 0
    # 무한대의 역할을 하는 수를 선언
    INF = int(1e9)
    # 해답을 무한대 값으로 초기화
    ans = INF
    # 삭제를 하기위한 기준 dict선언
    del_dict = {'A': 1, 'B': 1, 'N': 1, 'L': 2, 'O': 2}
    # 카운팅 하기위한 dict선언
    S_dict = {'A': 0, 'B': 0, 'N': 0, 'L': 0, 'O': 0}
    # 조건문에서 사용하기 위하여 key값을 배열로 선언
    key_dict = S_dict.keys()
    # 제시 글자 list화
    arr_S = list(S)
    # 글자의 1 단어씩 loop
    for s in arr_S:
        # 여기서, BALLOON에 해당하지 않는 글자는 카운팅 하지 않는다.
        if s in key_dict:
            S_dict[s] += 1
    for key in key_dict:
        # 1번이라도 제거를 하기위해선 BALLOON에 해당하는 글자가 전부 최소 1번에 해당하는 수보다 커야 가능하다.
        # 1글자라도 제시된 갯수보다 적으면 1번도 실행이 불가능 하기에 0을 return
        if S_dict[key] < del_dict[key]:
            return 0
        # 제거가 가능한 기준이 가중 수가 적은 글자임으로 min으로 ans를 구한다.
        ans = min(ans, S_dict[key]//del_dict[key])
    return ans


print(solution('BAONXXOLL'))
