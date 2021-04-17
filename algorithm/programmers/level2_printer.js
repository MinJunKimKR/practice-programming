//refer : https://programmers.co.kr/learn/courses/30/lessons/42587?language=javascript

const test = {
    1 : {
        input : {
            priorities: [2, 1, 3, 2],
            location : 2
        },
        output : 1
    },

    2: {
        input: {
            priorities: [1, 1, 9, 1, 1, 1],
            location: 0
        },
        output: 5
    },

    3: {
        input: {
            priorities: [1, 1, 6, 2, 3, 2],
            location: 3
        },
        output: 4
    }
}

function solution(priorities, location) {
    let answer = 0;


    while (priorities.length > 0) {
        console.log("----------------------------")
        console.log(priorities)
        console.log('location : ', location)
        const thisPriority = priorities.shift();
        console.log('thisPriority : ', thisPriority)
        location --;
        console.log('is not highest?',priorities.some((priority) => priority > thisPriority))
        if (priorities.some((priority)=> priority > thisPriority)){
            priorities.push(thisPriority);
            if (location<0){
                location = priorities.length-1
            }
            // console.log(priorities)
            continue;
        }
        console.log("==Print==")
        answer++;
        if (location<0){ //
            return answer
        }
        console.log('printCount : ', answer)
    }
}
// class Queue {
//     constructor(items){
//         if(items){
//             this.inbox = items
//             this.top = items.length
//         }{
//             this.inbox = []
//             this.top = 0;
//         }
//     }
//     enqueue(item){
//         this.inbox.push(item)
//         this.top++;
//     }
//     dequeue(){
//         this.top--;
//         return this.inbox.shift();
//     }
//     get(){
//         return this.inbox
//     }
//     getTop(){
//         return this.top
//     }
// }

// function solution(priorities, location) {
//     const markedPriorities = new Queue(priorities)
//     let printedItem = 0;
//     const priorityCount = {}
//     for (let i = 0; i < priorities.length; i++) {
//         const priority = priorities[i];
//         // console.log(priority)
//         markedPriorities.enqueue([priority, i===location?true:false])
//         priorityCount[priority]=(priorityCount[priority]||0)+1
//     }
//     const arrPriority = [...new Set(priorities)].sort()
//     let highestPriority = arrPriority.pop();
//     while (markedPriorities.get().length>0){
//         const thisPriority = markedPriorities.dequeue();
//         if (highestPriority == thisPriority[0]){
//             printedItem ++;
//             if (thisPriority[1]){
//                 return printedItem
//             }
//             if (priorityCount[thisPriority[0]] == 1 ){
//                 highestPriority = arrPriority.pop();
//             }
//             continue;
//         }
//         markedPriorities.enqueue(thisPriority)
//     }
// }
const num = 1
console.log(solution(test[num].input.priorities, test[num].input.location))