export default {
    name: 'works',
    title: 'Works',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
    
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'projectLink',
        title: 'Project Link',
        type: 'string',
      },
      {
        name: 'codeLink',
        title: 'Code Link',
        type: 'string',
      },
      {
        name: 'trailerLink',
        title: 'Trailer Link',
        type: 'string',
      },
      {
        name: 'robloxLink',
        title: 'Roblox ID for API',
        type: 'string',
      },
      {
        name: 'imgUrl',
        title: 'ImageUrl',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'languages',
        title: 'Languages used',
        type:'array',
        of: [
         {
           name:'language',
           title:'Language',
           type:'string'
         }
        ]
        },
      {
        name: 'techs',
        title: 'Tech used',
        type:'array',
        of: [
         {
           name:'tech',
           title:'Tech',
           type:'string'
         }
        ]
        },
      {
        name: 'images',
        title: 'Images',
        type:'array',
        of: [
         {
           name:'image',
           title:'Image',
           type:'image'
         }
        ]
        },
      {
        name: 'tags',
        title: 'Tags',
       type:'array',
       of: [
         {
           name:'tag',
           title:'Tag',
           type:'string'
         }
       ]
      },
    ],
  };