from collections import defaultdict
word = input()
alpaZip = defaultdict(lambda: 0)

for i in word:

    alpaZip[i.upper()] += 1


# maxCnt = max(alpaZip.values())
# print(sorted(alpaZip.items(), key=lambda x: -x[1]))

# answer = []
# for key, val in alpaZip.items():
#     if val == maxCnt:
#         answer.append(key)


# if len(answer) > 1:
#     print('?')
# else:
#     print(answer[0])
