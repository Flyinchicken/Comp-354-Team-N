/**
 * Class that handles the history area with cookies
 * Good standalone module
 */
export class HistoryHandler{

    /**
     * @param {string} divId Id of the div where we want to display the history
     * @param {number} size How many history elements we wish to display
     * @constructor
     */
    constructor(divId, size){
        this.historyDiv = divId;
        this.size = size;
    }
  
    /**
     * Displays the history on the Div
     */
    setHistory(){
        var history = $.parseJSON($.cookie("history"));
        $(this.historyDiv).html("");
        history.forEach(element => {
            $(this.historyDiv).prepend("<p>" + element + "</p>");
        });
    }
    
    /**
     * Clears the history and refreshes the Div
     */
    clearHistory(){
        var temp = [];
        $.cookie("history", JSON.stringify(temp));
        this.setHistory();
    }

    /**
     * Updates the cookie and shifts it in case the limit is reached
     * @param {string} output New element that we want to add to the history cookie
     */
    updateCookie(output){
        var history = $.parseJSON($.cookie("history"));
        if(history.length >= this.size){
            history.shift();
        }

        history.push(output);
        $.cookie("history", JSON.stringify(history));
        this.setHistory();
    }
}