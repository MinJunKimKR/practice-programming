//refer : https://programmers.co.kr/learn/courses/30/lessons/42840?language=javascript

/*

1번 : 1, 2, 3, 4, 5,
2번 : 2, 1, 2, 3, 2, 4, 2, 5, 
3번 : 3, 3, 1, 1, 2, 2, 4, 4, 5, 5
*/

const test = {
    1 : {
        input : [1,2,3,4,5],
        output : [1]
    },
    2 : {
        input :[1,3,2,4,2],
        output : [1,2,3]
    },
    3 : {
        input : [1,2,3,4,5,1,2,3,4,5],
        output : [1]
    },
}

function solution(answers) {
    const answer = [];
    const first = [[1, 2, 3, 4, 5],0]
    const second = [[2, 1, 2, 3, 2, 4, 2, 5],0]
    const third = [[3, 3, 1, 1, 2, 2, 4, 4, 5, 5],0]
    let highestScore = 0
    answers.forEach((answer,index) =>{
        if(first[0][index%first[0].length] === answer){
            first[1] = first[1] + 1
            highestScore = first[1] > highestScore ? first[1] : highestScore
        }
        if(second[0][index%second[0].length] === answer){
            second[1] = second[1] + 1
            highestScore = second[1] > highestScore ? second[1] : highestScore
        }
        if(third[0][index%third[0].length] === answer){
            third[1] = third[1] + 1
            highestScore = third[1] > highestScore ? third[1] : highestScore
        }
    })
    if(first[1]==highestScore) answer.push(1)
    if(second[1]==highestScore) answer.push(2)
    if(third[1]==highestScore) answer.push(3)
    return answer;
}


console.log(solution(test["2"].input));