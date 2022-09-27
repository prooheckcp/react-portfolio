/*
Given a type it fetches for data from sanity
*/

import {client} from '../client';

function FetchSanityData(type : string, setHook : any){
    const query = '*[_type == "'+type+'"]';
    client.fetch(query).then(data=>{ 
        setHook(data);
    });
}

export default FetchSanityData;