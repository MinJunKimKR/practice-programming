//refer : https://programmers.co.kr/learn/courses/30/lessons/43164?language=javascript
/**
 * 
 * 주어진 항공권을 모두 이용하여 여행경로를 짜려고 합니다. 항상 "ICN" 공항에서 출발합니다.

항공권 정보가 담긴 2차원 배열 tickets가 매개변수로 주어질 때, 방문하는 공항 경로를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

제한사항
모든 공항은 알파벳 대문자 3글자로 이루어집니다.
주어진 공항 수는 3개 이상 10,000개 이하입니다.
tickets의 각 행 [a, b]는 a 공항에서 b 공항으로 가는 항공권이 있다는 의미입니다.
주어진 항공권은 모두 사용해야 합니다.
만일 가능한 경로가 2개 이상일 경우 알파벳 순서가 앞서는 경로를 return 합니다.
모든 도시를 방문할 수 없는 경우는 주어지지 않습니다.
입출력 예 설명
예제 #1

["ICN", "JFK", "HND", "IAD"] 순으로 방문할 수 있습니다.

예제 #2

["ICN", "SFO", "ATL", "ICN", "ATL", "SFO"] 순으로 방문할 수도 있지만 
["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"] 가 알파벳 순으로 앞섭니다.
 * 
 */
const test = {
  1: {
    input: [
      ["ICN", "JFK"],
      ["HND", "IAD"],
      ["JFK", "HND"],
    ],
    output: ["ICN", "JFK", "HND", "IAD"],
  },
  2: {
    input: [
      ["ICN", "SFO"],
      ["ICN", "ATL"],
      ["SFO", "ATL"],
      ["ATL", "ICN"],
      ["ATL", "SFO"],
    ],
    output: ["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"],
  },
  3: {
    input: [
      ["ICN", "ABC"],
      ["ICN", "BBC"],
      ["BBC", "ICN"],
    ],

    output: ["ICN", "BBC", "ICN", "ABC"],
  },
};

function solution(tickets) {
  var answer = [];
  const findRoute = (destination, remainTickets, route) => {
    if (remainTickets.length === 0) {
      //티켓을 다썼다면 정답.
      answer = [...route, destination];
      return;
    }
    const nextTicketIndexes = [];
    remainTickets.forEach((remainTicket, index) => {
      //다음에갈 표가 있는지 검사
      if (remainTicket[0] === destination) nextTicketIndexes.push(index);
    });

    if (nextTicketIndexes.length > 1) {
      nextTicketIndexes.sort((a, b) => {
        //다음 티켓 알파벳 순서로 재배열
        if (remainTickets[a][1] > remainTickets[b][1]) return -1;
        if (remainTickets[a][1] == remainTickets[b][1]) return 0;
        if (remainTickets[a][1] < remainTickets[b][1]) return 1;
      });
    }
    if (nextTicketIndexes.length === 0) return; // 다음목적지가 없다면 잘못된 경로

    nextTicketIndexes.forEach((nextTicketIndex) => {
      const nextTicket = remainTickets[nextTicketIndex];
      const nextRemainTickets = remainTickets.filter(
        (ticket, index) => index !== nextTicketIndex
      );
      findRoute(nextTicket[1], nextRemainTickets, [...route, nextTicket[0]]);
    });
  };
  findRoute("ICN", tickets, []);
  return answer;
}

// function solution(tickets) {
//   var answer = [];
//   function findRoute(remainTickets, destination, route) {
//     const copyRoute = route.slice();
//     copyRoute.push(destination);
//     if (remainTickets.length === 0) {
//       answer.push(copyRoute);
//       return;
//     }

//     const nextTicket = remainTickets
//       .filter((ticket) => destination === ticket[0])
//       .sort((a, b) => {
//         return a[1] > b[1] ? 1 : -1;
//       });
//     if (nextTicket.length < 1) {
//       //이게 아님
//       return 0;
//     }
//     for (let i = 0; i < nextTicket.length; i++) {
//       const nextRemainTickets = remainTickets.filter(
//         (remainTicket) => remainTicket != nextTicket[i]
//       ); //다음 목적지를 가지고 있는 티켓가져오기(목적지에 해당하는 티켓을 제외)
//       findRoute(nextRemainTickets, nextTicket[i][1], copyRoute);
//     }
//   }
//   findRoute(tickets, "ICN", []);
//   return answer[0];
// }

// function findPath(remainTickets, tripRaoute) {
//   if (remainTickets.length === 0) return;
//   const whereAmI = tripRaoute[tripRaoute.length - 1];
//   const preDestinations = remainTickets.filter(
//     (tickets) => tickets[0] === whereAmI
//   );
//   console.log("remainTickets : ", remainTickets);
//   console.log("preDestinations : ", preDestinations);
//   if (preDestinations.length == 0) {
//     return;
//   }
//   const nextDesination = preDestinations.sort()[0];
//   console.log("nextDesination : ", nextDesination);
//   tripRaoute.push(nextDesination[1]);
//   const leftTickets = [];
//   remainTickets.map((tickets) => {
//     if (tickets != nextDesination) {
//       leftTickets.push(tickets);
//     }
//   });
//   findPath(leftTickets, tripRaoute);
// }

// function solution(tickets) {
//   var answer = ["ICN"];
//   findPath(tickets, answer);
//   return answer;
// }

console.log("result : ", solution(test[3].input));
