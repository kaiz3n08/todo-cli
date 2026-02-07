let aplhabet = "AQWSEDRFTGYHUJIKOLPMNBVCXZ1234567890aqswzxcderfvbgtyhnmjuiklop";
let Randstring: string = " ";
export function uid(length: number) {
  for (let i = 0; i <= length; i++) {
    Randstring += aplhabet.charAt(Math.floor(Math.random() * 50));
  }
  return Randstring
}
