/*
A project is "in development" when Sanity has no Final Date for it - that is the
same signal the timeline uses to print "now", so a project can never claim to be
finished in one place and ongoing in another.
*/

export function isInDevelopment(work : any) : boolean {
    return !work?.finalDate;
}

/*
Newest first, with the in-development projects ahead of everything else: those
are the ones worth seeing first, and they have no end date to sort by anyway.
Projects missing both dates sort last rather than jumping to the top.
*/
export function byFinalDateDesc(a : any, b : any) : number {
    const toTime = (value? : string) : number | null => {
        if(!value)
            return null;

        const time = new Date(value).getTime();

        return Number.isNaN(time) ? null : time;
    };

    const liveA : boolean = isInDevelopment(a);
    const liveB : boolean = isInDevelopment(b);

    if(liveA !== liveB)
        return liveA ? -1 : 1;

    // Both in development: the more recently started one leads.
    if(liveA && liveB){
        const startA = toTime(a?.startingDate);
        const startB = toTime(b?.startingDate);

        if(startA === null && startB === null) return 0;
        if(startA === null) return 1;
        if(startB === null) return -1;

        return startB - startA;
    }

    const timeA = toTime(a?.finalDate);
    const timeB = toTime(b?.finalDate);

    if(timeA === null && timeB === null) return 0;
    if(timeA === null) return 1;
    if(timeB === null) return -1;

    return timeB - timeA;
}
