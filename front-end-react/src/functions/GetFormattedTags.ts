export default tags =>{
    let tagsText : string = "";
    let counter : number = 0;
    for(let index : number = 0; index < tags.length; index++){
      if(tags[index].toLowerCase().trim() == "all")
        continue;    
  
      if(counter > 0)
        tagsText += ", ";
  
      tagsText += tags[index];
      counter++;
    }

    return tagsText;
}