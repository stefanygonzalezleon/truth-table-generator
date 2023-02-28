import React, { useState } from "react";
import "./App.css";

const TableGenerator = () => {
  const [expression, setExpression] = useState("");
  const [table, setTable] = useState([]);

  const handleExpressionChange = (event) => {
    setExpression(event.target.value);
    setTable([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Define the variables in the expression (e.g., "p" and "q")
    const variables = expression
      .split(/[^\w]/)
      .filter((v) => v)
      .filter((v, i, arr) => arr.indexOf(v) === i);

    // Generate all possible truth values for the variables
    const truthValues = generateTruthValues(variables.length);

    // Evaluate the expression for each truth value
    const results = truthValues.map((values) => ({
      values,
      result: evaluateExpression(expression, variables, values),
    }));

    // Store the results in the table state
    setTable(results);
  };

  // Helper function to generate all possible truth values for n variables
  const generateTruthValues = (n) => {
    const truthValues = [];
    for (let i = 0; i < Math.pow(2, n); i++) {
      const binary = i.toString(2).padStart(n, "0");
      truthValues.push(binary.split("").map((c) => c === "1"));
    }
    return truthValues;
  };

  // Helper function to evaluate an expression for a set of truth values
  const evaluateExpression = (expression, variables, values) => {
    const valuesMap = variables.reduce(
      (acc, v, i) => ({ ...acc, [v]: values[i] }),
      {}
    );
    const tokens = expression.split(/(\W)/).filter((t) => t !== " ");
    const stack = [];
    for (const token of tokens) {
      if (/\w/.test(token)) {
        stack.push(valuesMap[token]);
      } else if (token === "¬") {
        stack.push(!stack.pop());
      } else if (/[∧∨→↔]/.test(token)) {
        const [b, a] = [stack.pop(), stack.pop()];
        switch (token) {
          case "∧":
            stack.push(a && b);
            break;
          case "∨":
            stack.push(a || b);
            break;
          case "→":
            stack.push(!a || b);
            break;
          case "↔":
            stack.push(a === b);
            break;
        }
      }
    }
    return stack.pop();
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="mainDiv">
          <div className="container">
            <div className="leftRectangule">
              <h1 className="title">Truth Table Generator</h1>
              <form onSubmit={handleSubmit}>
                <input
                  className="buscar"
                  type="text"
                  value={expression}
                  onChange={handleExpressionChange}
                />
                <img
                  className="imagen5"
                  src="https://i.pinimg.com/originals/3b/78/47/3b7847675982776e5219e12a680ecd84.png"
                  alt="pokemon"
                />

                <button
                  className="negado"
                  type="button"
                  onClick={() => setExpression((e) => e + "¬")}
                >
                  ¬
                </button>
                <button
                  className="i"
                  type="button"
                  onClick={() => setExpression((e) => e + "∧")}
                >
                  ∧
                </button>
                <button
                  className="o"
                  type="button"
                  onClick={() => setExpression((e) => e + "∨")}
                >
                  ∨
                </button>
                <button
                  className="sientonces"
                  type="button"
                  onClick={() => setExpression((e) => e + "→")}
                >
                  →
                </button>
                <button
                  className="siysolosi"
                  type="button"
                  onClick={() => setExpression((e) => e + "↔")}
                >
                  ↔
                </button>
                <button
                  className="parentesis1"
                  type="button"
                  onClick={() => setExpression((e) => e + "(")}
                >
                  (
                </button>
                <button
                  className="parentesis2"
                  type="button"
                  onClick={() => setExpression((e) => e + ")")}
                >
                  )
                </button>
                <button
                  className="corchete1"
                  type="button"
                  onClick={() => setExpression((e) => e + "[")}
                >
                  [
                </button>
                <button
                  className="corchete2"
                  type="button"
                  onClick={() => setExpression((e) => e + "]")}
                >
                  ]
                </button>
                <button
                  className="llave1"
                  type="button"
                  onClick={() => setExpression((e) => e + "{")}
                >
                  {"{"}
                </button>
                <button
                  className="llave2"
                  type="button"
                  onClick={() => setExpression((e) => e + "}")}
                >
                  {"}"}
                </button>
                <button
                  className="p"
                  type="button"
                  onClick={() => setExpression((e) => e + "p")}
                >
                  p
                </button>
                <button
                  className="q"
                  type="button"
                  onClick={() => setExpression((e) => e + "q")}
                >
                  q
                </button>
                <button
                  className="r"
                  type="button"
                  onClick={() => setExpression((e) => e + "r")}
                >
                  r
                </button>
                <button
                  className="s"
                  type="button"
                  onClick={() => setExpression((e) => e + "s")}
                >
                  s
                </button>
                <button
                  className="t"
                  type="button"
                  onClick={() => setExpression((e) => e + "t")}
                >
                  t
                </button>
                <button
                  className="m"
                  type="button"
                  onClick={() => setExpression((e) => e + "m")}
                >
                  m
                </button>
                <button className="btnSubmit" type="submit">
                  Generate Table
                </button>
              </form>
            </div>
            <div className="rectangle37">
              <table>
                <thead>
                  <tr>
                    {table.length > 0 &&
                      expression
                        .split(/[∧∨→↔]/)
                        .map((variable) => (
                          <th key={variable}>{variable.charAt(0)}</th>
                        ))}
                    <th>{expression}</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row.values).map((value, j) => (
                        <td key={j}>{String(value)}</td>
                      ))}
                      <td>{String(row.result)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableGenerator;
