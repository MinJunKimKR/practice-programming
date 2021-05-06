// refer : https://programmers.co.kr/learn/courses/30/lessons/42883?language=javascript

const test = {
    1 :{
        input : {
            number : "1924",
            k:3
        },
        output : "94"
    },
    2 :{
        input : {
            number : "1231234",
            k:3
        },
        output : "3234"
    },
    3 :{
        input : {
            number : "4177252841",
            k:4
        },
        output : "775841"
    },
    4 :{
        input : {
            number : "1598751",
            k:3
        },
        output : "9875"
    }
}


// function solution(number, k) {
//     //k 만큼 loop를 돈다
//     //number에서 1개씩 빼면서 최대의 크기를 구한다
//     //number의 마지막까지 진행한다음에 나온 최대의 값을 다시 number에 넣는다
//     //반복
//     let maximumNum = 0
//     let arrNumber = number.split("");
//     for (let i = 0; i < k; i++) {
//         arrNumber.forEach((number, index) => {
//             const tempNumber = arrNumber.slice();
//             // console.log('index : ', index);
//             tempNumber.splice(index,1)
//             // console.log('tempNumber : ', Number(tempNumber.join("")));
//             maximumNum = maximumNum >= Number(tempNumber.join("")) ? maximumNum : Number(tempNumber.join(""));
//         });
//         // console.log("maximumNum : ", maximumNum);
//         arrNumber = maximumNum.toString().split("")
//         maximumNum = 0
//     } 
//     return arrNumber.join("");
// }

// function solution(number, k) {
//     let arrNumber = number.split("");
//     console.log('arrNumber : ', arrNumber);
//     for (let i = 0; i < k; i++) {
//         for (let j = 0; j < arrNumber.length-1; j++) {
//             if(arrNumber[j]<arrNumber[j+1]){
//                 arrNumber.splice(j, 1);
//                 // console.log(arrNumber);
//                 break;
//             };
//             if(j+1 >= arrNumber.length-1){
//                 arrNumber.splice(j+1, 1);
//                 break;
//             }
//         }
//     // console.log('arrNumber : ', arrNumber);
//     }
//     // console.log('arrNumber : ', arrNumber);
//     return arrNumber.join("")
// }

// function solution(number, k) {
//     let arrNumber = number.split("").map(number => [number,true]);
//     // arrNumber[2][1] = false;
//     // arrNumber[4][1] = false;
//     // console.log(arrNumber);
//     // console.log(arrNumber.sort((a,b)=>{
//     //     if(a[1] && !b[1]) return -1;
//     //     if(!a[1] && b[1]) return 1;
//     //     return 0;
//     // }))
//     for (let i = 0; i < k; i++) { 
//         for (let j = 0; j < arrNumber.length-1; j++) {
//             if(arrNumber[j]<arrNumber[j+1]){
//                 arrNumber[j][1] = false;
//                 break;
//             };
//             if(j+1 >= arrNumber.length-1){
//                 arrNumber[j+1][1] = false;
//                 break;
//             }
//         }
//         arrNumber.sort((a,b)=>{
//             if(a[1] && !b[1]) return -1;
//             if(!a[1] && b[1]) return 1;
//             return 0;
//         })
//         arrNumber.pop()
//     }
//     // console.log('arrNumber : ', arrNumber.filter((info)=>info[1]).map((info)=>info[0]).join(""));

//     return arrNumber.filter((info)=>info[1]).map((info)=>info[0]).join("")
// }

function solution(number, k) {
    const splitedNumber = number.split("");
    const stack = []
    for (let i = 0; i < splitedNumber.length; i++) {
        const thisNumber = number[i];
        // console.log('thisNumber : ', thisNumber);
        if(stack.length === 0 || k == 0) {
            stack.push(thisNumber)
            continue;
        }
        while(k>0 && stack[stack.length-1]<thisNumber &&  stack.length >0){
            stack.pop();
            k--;
        }
        stack.push(thisNumber)
    }
    if(k>0){
        stack.splice(stack.length-k, k)
    }
    return stack.join("")
}
const testCase = test["4"].input
console.log(solution(testCase.number, testCase.k));