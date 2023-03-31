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