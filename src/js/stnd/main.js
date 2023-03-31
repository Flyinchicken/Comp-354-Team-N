import { str, num, multiplyNumbers } from '../stnd/test.js'
import { squareRoot, arccos, arcsin, exponentialGrowth, exponentiation, hyperbolicSine, log, mad, std } from '../functions/funcWrap.js'

$(document).ready(function(){
    $("#button-addon2").click(inputProcessing)
});

function inputProcessing(){
    var fullInput = $("#fullInput").val();
    console.log(fullInput);
    var postfix = infixToPostfixConvert(fullInput);
    console.log(postfix);
    var result = evaluateExpression(postfix);
    console.log(result);

    $("#historyDiv").append("<p>" + result + "</p>")
}

function infixToPostfixConvert(input) {

    var priority = 0;
    var postfixBuffer = "";
    var stack = [];
    var postfixArray = [];

    for (let i = 0; i < input.length; i++) {
        var ch = input.charAt(i);
        if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {

            if (postfixBuffer.length > 0) {
                postfixArray.push(postfixBuffer.trim());
            }
            postfixBuffer = "";
            // check the precedence
            if (stack.length <= 0)
                stack.push(ch);
            else {
                var chTop = stack.at(-1);
                
                if (chTop == '*' || chTop == '/')
                    priority = 1;
                else
                    priority = 0;
                
                
                if (priority == 1) {
                    if (ch == '+' || ch == '-') {
                        postfixArray.push(stack.pop().trim());
                        i--;
                    } else { // Same
                        postfixArray.push(stack.pop().trim());
                        i--;
                    }
                } else {
                    if (ch == '+' || ch == '-') {
                        postfixArray.push(stack.pop().trim());
                        stack.push(ch);
                    } else
                        stack.push(ch);
                }
            }
        } else {
            postfixBuffer += ch;
        }
    }
    
    
    postfixArray.push(postfixBuffer);
    var len = stack.length;
    for (let j = 0; j < len; j++)
        postfixArray.push(stack.pop());

    return postfixArray;
}

function evaluateExpression(postfix){
    var stack = [];
    
    for(let i = 0; i < postfix.length; i++){

        var next = postfix.at(i);

        if(next == "+" || next == "-" || next == "*" || next == "/"){
            var right = stack.pop();
            var left = stack.pop();
            var result = calculate(right, left, next);
            console.log(result);
            stack.push(result);
        }
        else if(next.startsWith("sqrt") || next.startsWith("arccos") || next.startsWith("growth") || next.startsWith("exp") || next.startsWith("sinh") || next.startsWith("log") || next.startsWith("mad") || next.startsWith("std")){
            var parts = next.split("(");
            var result = calcSpecialFunc(parts[0], parts[1].slice(0, -1));
            stack.push(result);
        }else{
            stack.push(next);
        }

    }

    return stack.pop();
}

function calculate(rightOp, leftOp, operation){
    rightOp = parseFloat(rightOp);
    leftOp = parseFloat(leftOp);
    
    switch(operation) {
        case "+":
            return leftOp + rightOp;
            break;
        case "-":
            return leftOp - rightOp;
            break;
        case "/":
            return leftOp / rightOp;
            break;
        case "*":
            return leftOp * rightOp;
            break;

        default:
            return NaN;
      }
}

function calcSpecialFunc(funcName, inputs){
    switch(funcName) {
        
        case "sqrt":
            return squareRoot(inputs);
            break;
        
        case "arccos":
            return arccos(inputs);
            break;
        
        case "growth":
            var spread = inputs.split(",");
            return exponentialGrowth(spread[0], spread[1], spread[2], 10);
            break;
            
        case "exp":
            var spread = inputs.split(",");
            return exponentiation(spread[0], spread[1]);
            break;
        
        case "sinh":
            return hyperbolicSine(inputs);
            break;
        
        case "log":
            var spread = inputs.split(",");
            return log(spread[0], spread[1]);
            break;
        
        case "mad":
            return mad(inputs);
            break;

        case "std":
            return std(inputs.split(","));
            break;

        default:
            return NaN;
      }
}