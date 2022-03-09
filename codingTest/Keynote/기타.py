# 실행시간 알고 싶을때

import time
start_time = int(round(time.time() * 1000))
# some_func()
end_time = int(round(time.time() * 1000))
print('some_func()의 실행 시간 : %d(ms)' % (end_time - start_time))
