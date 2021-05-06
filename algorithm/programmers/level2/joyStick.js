//refer : https://programmers.co.kr/learn/courses/30/lessons/42860?language=javascript

const test = {
    1: {
        input : "JEROEN",
        output : 56
    },
    2: {
        input : "JAN",
        output : 23
    }
}

function solution(name) {
    let answer = 0;
    const splitedName = name.split("");
    console.log(splitedName);
    let defaultName = name.split("").map(a =>"A")
    console.log(defaultName);
    let cusorPosition = 0;
    const asciiA = "A".charCodeAt();
    const asciiZ = "Z".charCodeAt();

    console.log("J".charCodeAt()-"A".charCodeAt())
    console.log("Z".charCodeAt()-"J".charCodeAt() +1)
    
    while(defaultName.join("") !== name){
        const asciiThisAlpa = splitedName[cusorPosition].charCodeAt()
        answer = answer + (asciiThisAlpa - asciiA) <= (asciiZ - asciiThisAlpa + 1 ) ? asciiThisAlpa - asciiA : asciiZ - asciiThisAlpa + 1
        defaultName[cusorPosition] = splitedName[cusorPosition]
        
    }
    
    
    
    //알파벳이 N보다 작을경우, 앞에서 부터 카운트,
    // 아니면 뒤에서 부터 카운트 해준다.
    return answer;
}

const testCase = test["1"].input
console.log(solution(testCase));