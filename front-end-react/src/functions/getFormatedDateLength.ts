const MONTH_LIST : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getFormatedDateLength(startingDate : string, finalDate? : string){
    let startDate : Date = new Date(startingDate);
    let endDate : Date;
    let startString : string = "";
    let finalString : string = "";
    let duration : string = "";
  
    startString = MONTH_LIST[startDate.getMonth()] + " of " + startDate.getFullYear();
    if(finalDate){
      endDate = new Date(finalDate);
      finalString = MONTH_LIST[endDate.getMonth()] + " of " + endDate.getFullYear();
    }else{
      endDate = new Date();
      finalString = "now";
    }
  
    let differenceInYears : number = endDate.getFullYear() - startDate.getFullYear();
    let differenceInMonths : number = endDate.getMonth() - startDate.getMonth();
  
    if(differenceInYears > 0){
      let prefix : string = "";
      if(differenceInYears > 1)
        prefix = "s";
  
      duration = differenceInYears.toString()  + " year" + prefix + " and ";
    }
    
    if(differenceInMonths <= 0)
      differenceInMonths = 1;
  
    duration += differenceInMonths.toString() + " months";
  
    return {formated: startString + " - " + finalString + " · " + duration, start: startString, final: finalString};
}

export default getFormatedDateLength;