# https://programmers.co.kr/learn/courses/30/lessons/42860?language=python3
# 1:50 -> 2:20 + 10min
# [Fail - timeout]
# 2:35 -> 2:55
# [Succeess]

name = "JEROEN"
name = "JAN"
name = "ABBAAAAAB"
name = "BABAAAAB"
name = "AAAAA"


def solution(name):
    answer = 0
    alpa = ['A'] * len(name)
    arrName = list(name)
    idx = 0
    # 종료조건 : alpa가 name과 동일할때.
    while ''.join(alpa) != name:
        # <=N -> 올리기, 아니면 꺼꾸로
        if alpa[idx] != arrName[idx]:
            answer += min((ord('Z')-ord(arrName[idx])+1),
                          ord(arrName[idx])-ord('A'))
            alpa[idx] = arrName[idx]
        else:
            up, down = 0, 0
            move = 0
            while alpa[up] == arrName[up] and alpa[down] == arrName[down]:
                move += 1
                up = idx+move if (idx +
                                  move) < len(name) else (len(name) - (idx+move))
                if alpa[up] != arrName[up]:
                    idx = up
                    break
                down = idx - \
                    move if (idx-move) >= 0 else (len(name) + (idx-move))
                if alpa[down] != arrName[down]:
                    idx = down
                    break
            answer += move
    return answer


print(solution(name))
