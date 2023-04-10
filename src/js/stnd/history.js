export class HistoryHandler{

    constructor(divId, size){
        this.historyDiv = divId;
        this.size = size;
    }
  
    setHistory(){
        var history = $.parseJSON($.cookie("history"));
        $(this.historyDiv).html("");
        history.forEach(element => {
            $(this.historyDiv).prepend("<p>" + element + "</p>");
        });
    }
    
    clearHistory(){
        var temp = [];
        $.cookie("history", JSON.stringify(temp));
        this.setHistory();
    }

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