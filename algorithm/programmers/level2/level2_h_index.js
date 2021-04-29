// refer : https://programmers.co.kr/learn/courses/30/lessons/42747?language=javascript

/*
H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 
어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 
위키백과1에 따르면, H-Index는 다음과 같이 구합니다.

어떤 과학자가 발표한 논문 n편 중, h번 이상 인용된 논문이 h편 이상이고 나머지 논문이 h번 이하 인용되었다면 
h의 최댓값이 이 과학자의 H-Index입니다.

어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 
이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.

제한사항
과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
논문별 인용 횟수는 0회 이상 10,000회 이하입니다.
입출력 예
citations	return
[3, 0, 6, 1, 5]  3

입출력 예 설명
이 과학자가 발표한 논문의 수는 5편이고, 그중 3편의 논문은 3회 이상 인용되었습니다. 
그리고 나머지 2편의 논문은 3회 이하 인용되었기 때문에 이 과학자의 H-Index는 3입니다.

*/
const test = {
  1: {
    input: {
      citations: [3, 0, 6, 1, 5],
    },
    output: 3,
  },
  2: {
    input: {
      citations: [2, 2, 3, 2, 2],
    },
    output: 2,
  },
  3: {
    input: {
      citations: [1, 3, 5, 7, 9, 11],
    },
    output: 4,
  },
};

function solution(citations) {
  let answer = 0;
  let count = 0;
  const sortedCitations = citations.sort((a, b) => a - b);
  const maximumCitation = sortedCitations[sortedCitations.length - 1];
  while (count < maximumCitation) {
    count++;
    const hIndex = citations.filter((citation) => citation >= count).length;
    answer = hIndex >= count ? count : answer;
  }
  return answer;
}

const testCase = test["3"].input;
console.log(solution(testCase.citations));

// function solution(citations) {
//   let answer = 0;
//   const sortedCitations = citations.sort((a, b) => a - b);
//   const arrH = [...new Set(sortedCitations)];
//   console.log(arrH);
//   arrH.forEach((citation) => {
//     const index = sortedCitations.findIndex((index) => index >= citation);
//     const remain = sortedCitations
//       .slice()
//       .splice(index, sortedCitations.length);

//     if (remain.length >= citation) {
//       answer = citation;
//     }
//   });

//   console.log(citations);
//   return answer;
// }

// function solution(citations) {
//   let answer = 0;
//   citations
//     .sort((a, b) => a - b)
//     .forEach((citation, index) => {
//       //   console.log(citation);
//       const availiableCitations = citations
//         .slice()
//         .splice(index, citations.length);
//       //   console.log(availiableCitations);
//       if (availiableCitations.length >= citation) {
//         answer = citation;
//       }
//       //   const papers = citations.filter((count) => count >= citation);
//       //   if (papers.length >= citation && citation > answer) {
//       //     answer = citation;
//       //   }
//     });
//   console.log(citations);
//   return answer;
// }
// function solution(citations) {
//   let answer = 0;
//   citations
//     .sort((a, b) => a - b)
//     .forEach((citation, index) => {
//       const papers = citations.filter((count) => count >= citation);
//       if (papers.length >= citation && citation > answer) {
//         answer = citation;
//       }
//     });
//   console.log(citations);
//   return answer;
// }
