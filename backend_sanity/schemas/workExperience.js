export default {
    name:'workExperience',
    title:'Work Experience',
    type:'document',
    fields:[
           {name:'name',
               title:'name',
               type:'string'
            },
            {
                name:'company',
                title:'Company',
                type:'string'
            },
            {
                name:'startingDate',
                title:'Starting Date',
                type: 'date'
            },
            {
                name:'leaveDate',
                title:'Leaving Date',
                type: 'date'
            },
            {
                name:'imgUrl',
                title:'ImgUrl',
                type: 'image',
                options: {
                  hotspot: true,
                },
            },
            {
                name:'desc',
                title:'Desc',
                type:'text'
            },
            {
                name: 'toolsUsed',
                title: 'Tools Used',
               type:'array',
               of: [
                 {
                   name:'tool',
                   title:'Tool',
                   type:'string'
                 }
               ]
              },
    ]
}