N = int(input())

time = [0, 0, 0]

count = 0

while True:
    time[2] += 1
    if time[0] == N and time[1] == 59 and time[2] == 59:
        break
    if time[2] > 59:
        time[1] += 1
        time[2] = 0
    if time[1] > 59:
        time[0] += 1
        time[1] = 0

    strTime = ''.join(map(str, time))
    if strTime.find('3') > -1:
        count += 1


print(f'count : {count}')
