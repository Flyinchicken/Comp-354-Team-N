import { str, num, multiplyNumbers } from '../stnd/test.js'
import { MathFunctions } from '../functions/funcWrap.js'

const myFunctions = new MathFunctions();

var precision = 5;
export { precision };

//Attaching functions to their respective buttons post load dynamically
$(document).ready(function(){
    $("#button-addon2").click(inputProcessing);
    $("#madBtn").click(madBtnPress);
    $("#expBtn").click(expBtnPress);
    $("#logBtn").click(logBtnPress);
    $("#growthBtn").click(growthBtnPress);
    $("#stdBtn").click(stdBtnPress);
    $("#sinhBtn").click(sinhBtnPress);
    $("#arccosBtn").click(arccosBtnPress);
    $("#change-precision").click(precisionBtnPress);
    $("#confirmBtn").click(confirmBtnPress); 
    $("#cancelBtn").click(cancelBtnPress);

    setPrecisionUI();
});

/**
 * Functions that handle the pressing on the functions buttons on the pad.
 */
function madBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " mad(numbers... separate by ,)";
    $('#fullInput').val(newVal);
}

function expBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " exp(base,exponent)";
    $('#fullInput').val(newVal);
}

function logBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " log(x,base)";
    $('#fullInput').val(newVal);
}

function growthBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " growth(initialAmount,growthFactor,x)";
    $('#fullInput').val(newVal);
}

function stdBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " std(numbers... separate by ,)";
    $('#fullInput').val(newVal);
}

function sinhBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " sinh(x)";
    $('#fullInput').val(newVal);
}

function arccosBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " arccos(x)";
    $('#fullInput').val(newVal);
}

/**
 * Precision handling
 */

function setPrecisionUI(){
    $("#change-precision").html("Precision: " + precision + " <i class=\"bi bi-gear\"></i>");
    $("#modal-inner").text("Change your precision (Current = " + precision + ")");
}

function precisionBtnPress(){
    $("#myModal").css("display", "block");
}

function confirmBtnPress(){
    precision = $("#precisionInput").val();
    $("#precisionInput").val("");
    setPrecisionUI();
    $("#myModal").css("display", "none");
}

function cancelBtnPress(){
    $("#myModal").css("display", "none");
}

var modal = document.getElementById("myModal");
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/**
 * Function to process input and outputing it
 */
function inputProcessing(){
    var fullInput = $("#fullInput").val();
    //console.log(fullInput);
    var postfix = infixToPostfixConvert(fullInput);
    //console.log(postfix);
    var result = evaluateExpression(postfix);
    //console.log(result);

    $("#result").empty();
    $("#result").show();
    $("#result").text(fullInput + " = " + result);
    $("#historySec").prepend("<p>" + fullInput + " = " + result + "</p>");
}

/**
 * Converts a infix expression into a postfix expression to handle operation order better
 * @param {string} input Expression entered in the textbox
 * @returns {Array} Expression in postfix
 */
function infixToPostfixConvert(input) {

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
function evaluateExpression(postfix){
    var stack = [];
    
    //Iterates through the array returned by the postfix transformation
    for(let i = 0; i < postfix.length; i++){

        var next = postfix.at(i).trim();

        //If an operation is encountered, takes the two numbers on the stack and applies the operand
        if(next == "+" || next == "-" || next == "*" || next == "/"){
            var right = stack.pop();
            var left = stack.pop();
            var result = calculate(right, left, next);

            if(isNaN(result)){
                return "Invalid expression: " + left + " " + next + " " + right;
            }

            stack.push(result);
        }
        //If a function is encountered, it is treated as an individual number that needs to be processed
        else if(next.startsWith("sqrt") || next.startsWith("arccos") || next.startsWith("growth") || next.startsWith("exp") || next.startsWith("sinh") || next.startsWith("log") || next.startsWith("mad") || next.startsWith("std")){
            var parts = next.split("(");
            var result = calcSpecialFunc(parts[0], parts[1].slice(0, -1));
            
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
    return finalResult;
}

/**
 * Calculates a simple mathematical expression
 * @param {number} rightOp Number to the right of the operation 
 * @param {number} leftOp Number to the left of the operation
 * @param {char} operation Type of operation  
 * @returns {number} The result of the operation
 */
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

/**
 * Calculates the result of a special function
 * @param {string} funcName Function to be used on the inputs 
 * @param {string} inputs Input for the function in question
 * @returns {number} The result of the function
 */
function calcSpecialFunc(funcName, inputs){
    
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