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
  
    const differenceInTime : number = Math.abs(endDate - startDate);
    const differenceInDays : number = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)); 

    let differenceInYears : number = Math.floor(differenceInDays/365);
    let differenceInMonths : number = Math.ceil(differenceInDays/30) - differenceInYears * 12;
  
    if(differenceInYears > 0){
      let prefix : string = "";
      if(differenceInYears > 1)
        prefix = "s";
  
      duration = differenceInYears.toString()  + " year" + prefix + " and ";
    }
    
    if(differenceInMonths <= 0)
      differenceInMonths = 1;
  
    duration += differenceInMonths.toString() + " months";
  
    return {formated: startString + " - " + finalString + " · " + duration, start: startString, final: finalString, duration: duration};
}

export default getFormatedDateLength;