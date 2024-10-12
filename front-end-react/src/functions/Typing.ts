import Wait from './Wait.ts';

const DELAY_BETWEEN_TITLE : number = 1.2;
const BAR_DELAY : number = 0.8;
const TYPING_DELAY : number = 0.1;
const AMOUNT_OF_BAR_LOOPS : number = 11;

const changeText = async (title : string, setHook : any) =>{
  let currentTitle : string = "";

  for (let i = 0; i < title.length; i++) {
    currentTitle += title[i];
    setHook(currentTitle + "|");
    await Wait(TYPING_DELAY)
  }

  for(let i = 0; i < AMOUNT_OF_BAR_LOOPS; i++){
    setHook(currentTitle+(i%2 === 0 ? "|" : ""));
    await Wait(BAR_DELAY)
  }
}

const clearText = async (title : string, setHook : any) =>{
  let currentTitle : string = title;
  for (let i = title.length; i >= 0; i--) {
    currentTitle = currentTitle.slice(0, i);
    setHook(currentTitle+"|");
    await Wait(TYPING_DELAY)
  }
}

const textLoop = async (titleList : Array<string>, textElement : string, setHook : any) =>{
  await clearText(textElement, setHook);
  await Wait(DELAY_BETWEEN_TITLE/2);
  for(let i = 0; i < titleList.length; i++){
    let title : string = titleList[i];

    await changeText(title, setHook);
    await Wait(DELAY_BETWEEN_TITLE);
    await clearText(textElement, setHook);
    await Wait(DELAY_BETWEEN_TITLE/2);      
  }

  textLoop(titleList, textElement, setHook);
}

function Typing(titleList : Array<string>, textElement : string, setHook : any){
  textLoop(titleList, textElement, setHook);
}

export default Typing;