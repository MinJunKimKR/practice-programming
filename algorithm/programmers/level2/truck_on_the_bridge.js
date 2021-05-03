//refer : https://programmers.co.kr/learn/courses/30/lessons/42583?language=javascript



const test = {
    1 : {
        input : {
            bridge_length :2,
            weight : 10,
            truck_weights:[7,4,5,6]
        },
        output : 8
    },
    2 : {
        input : {
            bridge_length :100,
            weight : 100,
            truck_weights:[10]
        },
        output : 101
    },
    3 : {
        input : {
            bridge_length :100,
            weight : 100,
            truck_weights:[10,10,10,10,10,10,10,10,10,10]
        },
        output : 110
    },

}

function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    let onWeight = 0;
    const trucksOnBridge = [];
    while(truck_weights.length> 0){
        answer = answer+1;
        if(trucksOnBridge.length > 0){
            trucksOnBridge.map((truckInfo)=>{
                truckInfo[1] = truckInfo[1] - 1
                return truckInfo
            })
            if(trucksOnBridge[0][1] === 0 ){
                const arrivedTruck = trucksOnBridge.shift()
                onWeight = onWeight-arrivedTruck[0]
            }
        }
        if(onWeight+truck_weights[0] > weight) continue;
        const nextTruck = truck_weights.shift();
        onWeight = onWeight+nextTruck
        trucksOnBridge.push([nextTruck, bridge_length])
    }
    return answer + bridge_length;
}
const testCase = test["3"].input
console.log(solution(testCase.bridge_length, testCase.weight, testCase.truck_weights));