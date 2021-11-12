// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N) {
    // write your code in JavaScript (Node.js 8.9.4)
    let maximumZero = 0;
    let zeroNumber = 0;
    
    const binaryN = N.toString(2);
    const binaryNArray = binaryN.split('');
    // console.log(binaryNArray)
    binaryNArray.forEach(value=>{
        if(value === '1') {
            // console.log(value)
            if( zeroNumber > maximumZero) {
                maximumZero = zeroNumber;
            }
            // console.log('maximumZero : ', maximumZero)
            zeroNumber = 0;
        }else{
            zeroNumber = zeroNumber +1;
        }
    })
    return maximumZero;