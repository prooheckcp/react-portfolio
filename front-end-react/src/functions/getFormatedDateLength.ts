const MONTH_LIST : Array<string> = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function pluralize(value : number, unit : string){
    return value.toString() + " " + unit + (value === 1 ? "" : "s");
}

function getFormatedDateLength(startingDate : string, finalDate? : string){
    let startDate : Date = new Date(startingDate);
    let endDate : Date;
    let startString : string = "";
    let finalString : string = "";

    startString = MONTH_LIST[startDate.getMonth()] + " of " + startDate.getFullYear();
    if(finalDate){
      endDate = new Date(finalDate);
      finalString = MONTH_LIST[endDate.getMonth()] + " of " + endDate.getFullYear();
    }else{
      endDate = new Date();
      finalString = "now";
    }

    // Walk the calendar instead of approximating with fixed-length years/months,
    // otherwise month lengths and leap years drift the total by several months.
    let years : number = endDate.getFullYear() - startDate.getFullYear();
    let months : number = endDate.getMonth() - startDate.getMonth();

    if(endDate.getDate() < startDate.getDate())
      months--;

    if(months < 0){
      years--;
      months += 12;
    }

    if(years < 0){
      years = 0;
      months = 0;
    }

    let duration : string = "";

    if(years > 0 && months > 0)
      duration = pluralize(years, "year") + " and " + pluralize(months, "month");
    else if(years > 0)
      duration = pluralize(years, "year");
    else
      duration = pluralize(Math.max(months, 1), "month");

    return {formated: startString + " - " + finalString + " · " + duration, start: startString, final: finalString, duration: duration};
}

export default getFormatedDateLength;
