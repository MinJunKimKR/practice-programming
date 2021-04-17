const skillTree = ["BACDE", "CBADF", "AECB", "BDA", "AEF", "ZJW"];
const skill = "CBD";
class Stack {
    constructor(items){
        this._arr = []
        const arrItems = items.split('')
        for (let i = arrItems.length - 1; i > -1; i--) {
            this._arr.push(arrItems[i]);
        }
 }
 getLength(){
     return this._arr.length
 }
 push(item){
    this._arr.push(item);
 }
 pop(){
    return this._arr.pop()
 }
 peek(){
    return this._arr[this._arr.length-1]
 }
}
const isInSkillStep = (skill,skillPeek) =>{
    return skill.split('').indexOf(skillPeek) > -1
}
const isNextSkillStep = (skillStepStack, skillPeek) =>{
    return skillStepStack.pop() === skillPeek
}

function solution(skill, skill_trees) {
    const results  = skill_trees.map(skillTree =>{
        const skillStepStack = new Stack(skill);
        const skillPeeks = skillTree.split('');

        for (const index in skillPeeks) {
            if (Object.hasOwnProperty.call(skillPeeks, index)) { 
                const skillPeek = skillPeeks[index];
                if (!isInSkillStep(skill,skillPeek)){
                    if (index == skillPeeks.length - 1) {
                        return true
                    }
                    continue 
                }
                if (!isNextSkillStep(skillStepStack, skillPeek)) {
                    return false
                }
                if (skillStepStack.getLength() === 0){
                    return true
                }
                if (index == skillPeeks.length - 1) {
                    return true
                }
                
            }
        }
    })
    return results.filter( result => result == true).length;//정상적인 스킬트리의 숫자
}

console.log(solution(skill, skillTree))//answer = 4