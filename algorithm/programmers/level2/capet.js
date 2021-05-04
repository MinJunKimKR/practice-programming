//refer : https://programmers.co.kr/learn/courses/30/lessons/42842?language=javascript

const test = {
    1 : {
        brown : 10,
        yellow : 2
    },
    2 : {
        brown : 8,
        yellow : 1
    },
    3 : {
        brown : 24,
        yellow : 24
    }
}

function solution(brown, yellow) {
    let answer = [];
    
    //먼저 brown을 반띵 -1 만큼을 가로 길이로 잡는다.
    //즉, 가로는 brown -1 만큼이 되는것, 그리고 양쪽을 빼니 -2 가된다.
    //브라운의 가로가 4면, 양쪽의 1을 빼니까 2가 엘로우의 가로길이가 된는것.
    //브라운의 세로길이(블록) =  엘로우의 세로길이다.
    //이제, 엘로우의 세로길이를 1만큼 올리려면 브라운의 가로 -2 (=엘로 가로) 씩해준다.
    //그러면서 엘로 가로 (브라운 가로 -2) * 옐로 세로 가 엘로의 숫자와 일치할때
    //브라운의 가로길이와 세로길이를 구하면된다.
    let brownHoriz = (brown/2)-1
    let brownVerti = 3

    while(brownHoriz >= brownVerti){
        let yellowSize = (brownHoriz-2) * (brownVerti-2)
        if(yellowSize === yellow){
            return answer = [brownHoriz, brownVerti]
        }
        brownHoriz = brownHoriz-1;
        brownVerti = brownVerti + 1
    }

    // return answer.sort((a,b)=> Number(b) - Number(a));
}
const testCase = test["3"]
console.log(solution(testCase.brown, testCase.yellow));