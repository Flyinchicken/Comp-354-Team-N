import { HistoryHandler } from './history.js';
import { InputProcessing } from './inputProcess.js';

const historyHandler = new HistoryHandler("#historySec", 10);
const myProcessor = new InputProcessing("#fullInput", "#result")

var precision = 5;
export { precision };

/**
 * Attaching functions to their respective buttons post load dynamically
 */
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
    $("#clearBtn").click(function(){
        historyHandler.clearHistory();
    });

    //Set up enter as a command to calculate
    $("#fullInput").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#button-addon2").click();
        }
    });

    setPrecisionUI();

    //History Cookie Set Up
    var peak = $.cookie("history");
    if(peak == "null" || peak == null){
        historyHandler.clearHistory();
    }
    else{
        historyHandler.setHistory();
    }
});

/**
 * Functions that handle the pressing on the functions buttons on the pad.
 */
function madBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " mad(numbers... separate by ,)";
    $('#fullInput').val(newVal);
    $('#fullInput').focus();
}

function expBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " exp(base,exponent)";
    $('#fullInput').val(newVal);
    $('#fullInput').focus();
}

function logBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " log(x,base)";
    $('#fullInput').val(newVal);
    $('#fullInput').focus();
}

function growthBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " growth(initialAmount,growthFactor,x)";
    $('#fullInput').val(newVal);
    $('#fullInput').focus();
}

function stdBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " std(numbers... separate by ,)";
    $('#fullInput').val(newVal);
    $('#fullInput').focus();
}

function sinhBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " sinh(x)";
    $('#fullInput').val(newVal);
    $('#fullInput').focus();
}

function arccosBtnPress(){
    var currentVal = $('#fullInput').val();
    var newVal = currentVal + " arccos(x)";
    $('#fullInput').val(newVal);
    $('#fullInput').focus();
}

/**
 * Precision handling
 */

function setPrecisionUI(){
    $("#change-precision-value").html(precision);
    $("#modal-inner").text(precision);
}

function precisionBtnPress(){
    $("#myModal").css("display", "block");
    $('#precisionInput').focus();
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

//When clicking anywhere outside the modal, it closes the modal
var modal = document.getElementById("myModal");
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/**
 * Calls the handlers from other classes to process the computation and update the history
 */
function inputProcessing(){
    var output = myProcessor.processCalculation();
    historyHandler.updateCookie(output);
}