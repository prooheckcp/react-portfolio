import {client} from '../client.js';

// @ts-ignore
import Skill from '../interfaces/Skill.ts';

const skillsQuery = '*[_type == "skills"]';
let skills : Map<string , Map<string, Skill>>  | undefined = undefined;

function parseSkillsData(data : Array<Skill>){
    const newSkills : Map<string , Map<string, Skill>> = new Map<string, Map<string, Skill>>([]);

    for(let index : number = 0; index < data.length; index++){
      let skill : Skill = data[index];

      if (!newSkills.get(skill.categories)){
        newSkills.set(skill.categories, new Map<string, Skill>());
      }

      newSkills.get(skill.categories)?.set(skill.name, skill);
    }

    return newSkills;
  }

client.fetch(skillsQuery).then(data=>{
    skills = parseSkillsData(data);
});

export function getSkill(type : string, id : string){
    return skills?.get(type)?.get(id);
}

export function getAllSkills(){
    return skills;
}