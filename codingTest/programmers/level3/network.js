function findDisconnect(computers, connection, stack, result) {
  const m_stack = [];
  const m_connection = [...connection];

  for (const i of stack) {
    // find stack and change connection
    for (let j in computers[i]) {
      if (computers[i][j]) {
        if (i !== j && !m_connection[j]) {
          m_stack.push(Number(j));
        }
        if (!m_connection[j]) {
          m_connection.splice(j, 1, true);
        }
      }
    }

    // 남은 stack로 findDisconnect 재실행
    if (m_stack.length > 0) {
      return findDisconnect(computers, m_connection, m_stack, result);
    }
  }

  const disconnectIdx = m_connection.indexOf(false);
  // search end
  if (disconnectIdx === -1) {
    return result;
  }

  // disconnect result + 1
  return findDisconnect(computers, m_connection, [disconnectIdx], result + 1);
}
function solution(n, computers) {
  const connection = Array.from({ length: n }, () => false),
    stack = connection.map((item, index) => index);
  return findDisconnect(computers, connection, stack, 1);
}
