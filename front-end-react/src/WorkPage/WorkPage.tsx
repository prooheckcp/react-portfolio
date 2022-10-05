import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player';
import {useParams} from 'react-router-dom';
import './WorkPage.scss';
//@ts-ignore
import SkillContainer from '../components/SkillsContainer.tsx';
//@ts-ignore
import FetchSanityData from '../functions/FetchSanityData.ts';
import {client} from '../client';
import PictureGallery from '../components/PictureGallery.tsx';

const WorkPage = () => {
  const {workIndex} = useParams();
  const [skills, setSkills] = useState([]);
  const [skillsMap, setSkillsMap] = useState<Map<any, any> | null>(null);
  const [usedTech, setUsedTech] = useState<Array<any>>([]);
  const [usedLanguages, setUsedLanguages] = useState<Array<any>>([]);
  const [worksData, setWorksData] = useState<Map<any, any> | null>(null);

  useEffect(()=>{
    FetchSanityData("skills", setSkills);
  }, []);

  useEffect(()=>{
    let newMap = new Map();
    for(let index = 0; index < skills.length; index++){
      let skill = skills[index];
      
      if(!skill?.name)
        return;

      newMap.set(skill.name, skill);
      setSkillsMap(newMap);
    }
  }, [skills]);

  useEffect(()=>{
    if(!skillsMap)
      return;

    setUsedLanguages([skillsMap.get('Lua')]);
    setUsedTech([skillsMap.get('React'), skillsMap.get('React')]);
  }, [skillsMap])

  useEffect(()=>{
    const query = '*[_type == "works"]';
    client.fetch(query).then(data=>{ 
      let newMap = new Map();
      for(let index = 0; index < data.length; index++){
        newMap.set(data[index].id, data[index]);
      }
      setWorksData(newMap);
    });
  }, [])

  if(!worksData?.has(workIndex))
    return '404';

  const currentWork = worksData.get(workIndex);

  return (
    <>
      <div className="background">
        <div className="navbar-gap"/>
        <div className="project-info">
          <h1>
            Mizukura
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, sed excepturi. Illo ullam excepturi unde recusandae eligendi veniam commodi culpa corrupti, dicta consectetur ea! Ad, non at illo explicabo fugiat adipisci autem voluptates debitis beatae, eveniet incidunt porro earum vero praesentium, animi quidem totam sit! Ducimus asperiores fugit eveniet minima, totam dolor id! Odit quaerat quae saepe dolorum aut natus corporis doloremque, quisquam hic mollitia, at quasi error nostrum accusantium delectus fugiat. Magnam ullam nulla, in inventore debitis perspiciatis! Assumenda, magnam. Porro placeat, nostrum optio sequi molestiae corrupti. Nam quia ipsa fugiat, optio molestiae unde. Eum, sit magni repudiandae architecto autem laboriosam dolorum eaque repellat quaerat dolor! Animi est sed vel necessitatibus placeat similique vitae repellat illo obcaecati recusandae, ex porro reprehenderit, totam adipisci quasi quaerat voluptatibus quidem maxime aut expedita hic nobis. Iusto dolore voluptas quisquam nobis, et quas ullam facilis, eos repudiandae, illo optio? Corporis facere vel numquam, omnis facilis distinctio blanditiis unde quod eligendi, nam rem inventore molestiae aliquam sunt minus architecto nostrum recusandae excepturi? Asperiores debitis aliquid laboriosam unde placeat maiores dolor eveniet provident quod, molestiae repellendus numquam autem. Nesciunt accusamus a ratione officiis excepturi consectetur, officia fugit perferendis, quas saepe et cupiditate ducimus est nisi!
          </p>
        </div>

        <div className="buttonsContainers">
          <a href="">
            <div className="button-item">
              <img src="" alt="" />
            </div>            
          </a>
        </div>

        <div className="skills_container">
          <div className="languages info-container">
            <h2>Languages used</h2>
            <SkillContainer className="container" skillArray={usedLanguages} showCircle={false} toolTip={"name"}/>
          </div>
          <div className="tech info-container">
            <h2>Tech used</h2>
              <SkillContainer skillArray={usedTech} showCircle={false} toolTip={"name"}/>
          </div>
        </div>

        <div className="video-wrapper">
          <h1>Watch the project's <span>trailer</span> </h1>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=BUd3V0D5d_E}`}
            className="react-player"
            controls
          />        
        </div>
        <div className="picture-wrapper">
          <h1>Watch the project's <span>pictures</span> </h1>
          <div className="picture-gallery">
            <PictureGallery />
          </div>
        </div>        
      </div>
    </>

  )
}

export default WorkPage