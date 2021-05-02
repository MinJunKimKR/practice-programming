//refer : https://programmers.co.kr/learn/courses/30/lessons/42627?language=javascript
// heap :https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%ED%9E%99-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
/*
각 작업에 대해 [작업이 요청되는 시점, 작업의 소요시간]을 담은 2차원 배열 jobs가 매개변수로 주어질 때, 작업의 요청부터 종료까지 걸린 시간의 평균을 가장 줄이는 방법으로 처리하면 평균이 얼마가 되는지 return 하도록 solution 함수를 작성해주세요. (단, 소수점 이하의 수는 버립니다)

제한 사항
jobs의 길이는 1 이상 500 이하입니다.
jobs의 각 행은 하나의 작업에 대한 [작업이 요청되는 시점, 작업의 소요시간] 입니다.
각 작업에 대해 작업이 요청되는 시간은 0 이상 1,000 이하입니다.
각 작업에 대해 작업의 소요시간은 1 이상 1,000 이하입니다.
하드디스크가 작업을 수행하고 있지 않을 때에는 먼저 요청이 들어온 작업부터 처리합니다.


*/

const test = {
  1: {
    input: [
      [0, 3],
      [1, 9],
      [2, 6],
    ],
    output: 9,
  },
  2: {
    input: [
      [0, 3],
      [5, 1],
      [5, 9],
    ],
    output: 4,
  },
  3: {
    input: [
      [0, 3],
      [5, 5],
      [5, 9],
      [10, 8],
    ],
    output: 4,
  },
  4: {
    input:[[0, 1], [1, 2], [500, 6]],
    output: 3,
  },
  5: {
    input:[[0, 10]],
    output: 10,
  },
  6: {
    input:[[0, 10], [4, 10], [15, 2], [5, 11]] ,
    output: 15,
  },
  7: {
    input:[[24, 10], [28, 39], [43, 20], [37, 5], [47, 22], [20, 47], [15, 34], [15, 2], [35, 43], [26, 1]],
    output: 72,
  },
};

function solution(jobs) {
  let processTime = 0;
  let totalReqTime = 0;
  const jobCount = jobs.length;
  while (jobs.length > 0) {
    console.log("----------------");
    console.log("jobs : ", jobs);
    console.log("processTime : ", processTime);
    console.log("totalReqTime : ", totalReqTime);
    jobs.sort((a, b) => {
      if(a[0] > processTime ) return 1
      if(b[0] > processTime ) return -1
      return a[1] - b[1];
    }); //정렬 알고리즘
    console.log("정렬된 jobs : ", jobs);
    if (jobs[0][0] > processTime) {
      processTime += 1;
      continue;
    }
    const thisJob = jobs.shift();
    console.log("thisJob : ", thisJob);
    processTime += thisJob[1]; //시간 흐름
    totalReqTime += processTime - thisJob[0];
  }
  console.log("totalReqTime : ", totalReqTime);
  return parseInt(totalReqTime / jobCount);
}

const testCase = test["7"].input;
console.log('result : ', solution(testCase));
