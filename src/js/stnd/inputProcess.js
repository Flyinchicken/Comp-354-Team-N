import { MathFunctions } from '../functions/funcWrap.js'
import { precision } from "./main.js";

const myFunctions = new MathFunctions();

/**
 * Class that handles the processing of the calculations
 */
export class InputProcessing{

    /**
     * @param {string} inputDiv Id of the textBox that has the input we need
     * @param {string} outDiv Id of the div where we want to output the result
     * @constructor
     */
    constructor(inputDiv, outDiv){
        this.inputDiv = inputDiv;
        this.outDiv = outDiv;
    }

    /**
     * Take the input, relay the task to other functions and output it
     * @returns {string} final output including the input
     */
    processCalculation(){
        var fullInput = $(this.inputDiv).val();
        var postfix = this.infixToPostfixConvert(fullInput);
        var result = this.evaluateExpression(postfix);
    
        var output = fullInput + " = " + result;
        $(this.outDiv).empty();
        $(this.outDiv).show();
        $(this.outDiv).text(output);

        return output;
    }

    /**
     * Transforms the infix notation of the input into postfix
     * @param {string} input Input entered by the user
     * @returns {Array} Array of elements in postfix
     */
    infixToPostfixConvert(input) {
        var priority = 0;
        var postfixBuffer = "";
        var stack = [];
        var postfixArray = [];
    
        //Iterates through every character in the array.
        for (let i = 0; i < input.length; i++) {
            var ch = input.charAt(i);
            if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {
    
                //When a operator is encountered, puts the content of the buffer into the final array
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
                    
                    //Determines operation order
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
    
            // If these characters are encountered, they are treated like functions and skip until the closing parenthesis
            } else if(ch == 's' || ch == 'a' || ch == 'g' || ch == 'e' || ch == 'l' || ch == 'm'){
                var lastIndex = input.indexOf(')', i + 1);
                postfixBuffer += input.substring(i, lastIndex + 1).trim();
                i = i + (lastIndex - i);
            } 
            else {
                postfixBuffer += ch;
            }
        }
        
        //Takes the operations from the stack and puts them in the final array
        postfixArray.push(postfixBuffer.trim());
        var len = stack.length;
        for (let j = 0; j < len; j++)
            postfixArray.push(stack.pop());
    
        return postfixArray;
    }
    
    /**
     * Evaluates the postfix expression
     * @param {Array} postfix Array representing a postfix expression 
     * @returns {number} The result of the operations
     */
    evaluateExpression(postfix){
        var stack = [];
        
        //Iterates through the array returned by the postfix transformation
        for(let i = 0; i < postfix.length; i++){
    
            var next = postfix.at(i).trim();
    
            //If an operation is encountered, takes the two numbers on the stack and applies the operand
            if(next == "+" || next == "-" || next == "*" || next == "/"){
                var right = stack.pop();
                var left = stack.pop();
                var result = this.calculate(right, left, next);
    
                if(isNaN(result)){
                    return "Invalid expression: " + left + " " + next + " " + right;
                }
    
                stack.push(result);
            }
            //If a function is encountered, it is treated as an individual number that needs to be processed
            else if(next.startsWith("sqrt") || next.startsWith("arccos") || next.startsWith("growth") || next.startsWith("exp") || next.startsWith("sinh") || next.startsWith("log") || next.startsWith("mad") || next.startsWith("std")){
                var parts = next.split("(");
                var result = this.calcSpecialFunc(parts[0], parts[1].slice(0, -1));
                
                if(isNaN(result)){
                    return "Invalid function input";
                }
    
                stack.push(result);
            }else{
                stack.push(next);
            }
    
        }
        
        var finalResult = stack.pop();
        if(isNaN(finalResult) || typeof finalResult === 'string' || finalResult instanceof String){
            console.log("stupid");
            return "Invalid expression: " + finalResult;
        }
    
        //Returns the remaining number in the stack
        return finalResult.toFixed(precision);
    }
    
    /**
     * Calculates a simple mathematical expression
     * @param {number} rightOp Number to the right of the operation 
     * @param {number} leftOp Number to the left of the operation
     * @param {char} operation Type of operation  
     * @returns {number} The result of the operation
     */
    calculate(rightOp, leftOp, operation){
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
    
    /**
     * Calculates the result of a special function
     * @param {string} funcName Function to be used on the inputs 
     * @param {string} inputs Input for the function in question
     * @returns {number} The result of the function
     */
    calcSpecialFunc(funcName, inputs){
        
        switch(funcName) {
            
            case "sqrt":
                return myFunctions.squareRoot(inputs);
                break;
            
            case "arccos":
                return myFunctions.arccos(inputs);
                break;
            
            case "growth":
                var spread = inputs.split(",");
                return myFunctions.exponentialGrowth(spread[0], spread[1], spread[2]);
                break;
                
            case "exp":
                var spread = inputs.split(",");
                return myFunctions.exponentiation(spread[0], spread[1]);
                break;
            
            case "sinh":
                return myFunctions.hyperbolicSine(inputs);
                break;
            
            case "log":
                var spread = inputs.split(",");
                return myFunctions.log(spread[0], spread[1]);
                break;
            
            case "mad":
                return myFunctions.mad(inputs);
                break;
    
            case "std":
                return myFunctions.std(inputs.split(","));
                break;
    
            default:
                return "Unsupported function " + funcName;
          }
    }
}