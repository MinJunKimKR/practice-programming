function solution(s) {
  const answer = s
    .split(" ")
    .map((word) => {
      return word
        .split("")
        .map((letter, index) => {
          if (index % 2 === 0) {
            return letter.toUpperCase();
          }
          return letter.toLowerCase();
        })
        .join("");
    })
    .join(" ");
  return answer;
}
const problem = "try hello world";

console.log(solution(problem));
