# https://programmers.co.kr/learn/courses/30/lessons/42840?language=python3
# 10:55 -> 11:15
# [success]
# 11: 47 [2nd success]
answers = [1, 2, 3, 4, 5]
answers = [1, 3, 2, 4, 2]


def solution(answers):
    answer = []
    students = [[1, 2, 3, 4, 5], [2, 1, 2, 3, 2, 4, 2, 5],
                [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]]
    studentScore = [0]*3
    for num, i in enumerate(answers):
        for idx, student in enumerate(students):
            answerIdx = num % len(student)
            if student[answerIdx] == i:
                studentScore[idx] += 1
    answer = [
        x[0]+1 for x in enumerate(studentScore) if x[1] == max(studentScore)]
    return answer


# def solution(answers):
#     answer = []
#     students = [[1, 2, 3, 4, 5], [2, 1, 2, 3, 2, 4, 2, 5],
#                 [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]]
#     studentsScore = [0, 0, 0]

#     for i in range(0, len(students)):
#         if len(answers) > len(students[i]):
#             students[i] = students[i] * ((len(answers) // len(students[i]))+1)

#     for i in range(0, len(answers)):
#         for j in range(0, len(students)):
#             if students[j][i] == answers[i]:
#                 studentsScore[j] += 1
#     maxScore = max(studentsScore)
#     for i in range(0, len(studentsScore)):
#         if studentsScore[i] == maxScore:
#             answer.append(i+1)
#     return sorted(answer)

print(solution(answers))
