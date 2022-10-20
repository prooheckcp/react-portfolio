import {client} from '../client';

// @ts-ignore
import Skill from '../interfaces/Skill.ts';

const skillsQuery = '*[_type == "skills"]';
let skills : Map<string , Map<string, Skill>>  | undefined = undefined;

function parseSkillsData(data : Array<Skill>){
    const newSkills : Map<string , Map<string, Skill>> = new Map<string, Map<string, Skill>>([
      ["language", new Map<string, Skill>()],
      ["tech", new Map<string, Skill>()],
      ["tool", new Map<string, Skill>()]
    ]);
    
    for(let index : number = 0; index < data.length; index++){
      let skill : Skill = data[index];
      newSkills.get(skill.section)?.set(skill.name, skill);
    }
  
    return newSkills;
  }

client.fetch(skillsQuery).then(data=>{
    skills = parseSkillsData(data);
});

export default (type : string, id : string) =>{
    return skills?.get(type)?.get(id);
}