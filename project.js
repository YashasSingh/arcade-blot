/*
@title: quote generator
@author: Scott C
@snapshot: snapshot01.png
*/

// Generative Quote Generator (quotes are changable)

const Quotes = [
  "The best way to predict the future is to invent it.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "The only way to do great work is to love what you do.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "Your time is limited, don't waste it living someone else's life."
];

const Padding = 12;
const LetterPadding = 1.5;
const Width = 210;
const Height = 297;

// ============================ Text Engine ============================
// instructions.ts
var ParseCoords = (cstr, multScale = 1) => {
  const coordArray = [];
  for (const x of cstr.split(":")) {
    if (parseFloat(x)) {
      coordArray.push(parseFloat(x));
    }
  }
  return coordArray;
};
var RunInstructions = (inst, org, scale = 1) => {
  const turtle = new bt.Turtle();
  turtle.jump(org)
  for (const x of inst.split(",")) {
    const cmd = x.split("$")[0];
    const args = x.split("$")[1];
    let data;
    switch (cmd) {
      case "u":
        turtle.up();
        break;
      case "d":
        turtle.down();
        break;
      case "f":
        turtle.forward(parseFloat(args) * scale);
        break;
      case "arc":
        data = ParseCoords(args);
        turtle.arc(-data[0], data[1] * scale);
        break;
      case "jmp":
        data = ParseCoords(args);
        turtle.jump(data);
        break;
      case "sa":
        turtle.setAngle(parseFloat(args));
        break;
      case "l":
        turtle.left(parseFloat(args));
        break;
      case "r":
        turtle.right(parseFloat(args));
        break;
      default:
        break;
    }
  }
  drawLines(turtle.lines());
  return turtle.position;
