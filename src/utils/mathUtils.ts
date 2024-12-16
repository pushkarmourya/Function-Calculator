export const evaluateEquation = (equation: string, value: number | string): number | string => {
  console.log(equation, value)
  try {
    const formatedEquation = equation.replace(/\^/g, "**")
      .replace(/x/g, `(${value})`)
      .replace(/(\d)(x|\()/g, "$1 * $2")
      .replace(/(x|\))(\d)/g, "$1 * $2");

    const result = new Function(`"use strict"; return (${formatedEquation});`)();

    if (!isFinite(result)) return "NA";

    console.log(result)
    return result;
  } catch (error: any) {
    console.error("Error evaluating equation:", error?.message);
    return "NA";
  }
}