const Templates = {
  docIcon: function(obj) {
    return {
      tag: 'div',
      id: obj.id,
      classes: ['doc-icon'],
      properties: {
        title: obj.name,
        tabIndex: 0
      },
      children: [
        {
          tag: 'div',
          classes: ['doc-icon-header'],
          children: [
            { tag: 'h3', content: obj.name }
          ]
        },
        {
          tag: 'p',
          content: obj.body
        }
      ]
    }
  },
  folderIcon: function(obj) {
    return {
      tag: 'div',
      id: 'folder-' + obj.id,
      classes: ['folder-icon', 'folder-color-' + obj.color],
      properties: {
        title: obj.name
      },
      children: [
        {
          tag: 'div',
          children: [
            {
              tag: 'i',
              classes: ['fa', 'fa-folder']
            },
            {
              tag: 'span',
              content: obj.name,
              classes: ['folder-name']
            }
          ]
        }
      ]
    }
  },
  navigatorControls: function(obj) {
    return {
      tag: 'div',
      classes: ['controls'],
      children: [
        {
          tag: 'div',
          classes: ['control'],
          children: [
            {
              tag: 'h2',
              content: obj.name
            }
          ]
        },
        {
          tag: 'div',
          classes: ['control'],
          children: [
            {
              tag: 'input',
              properties: {
                placeholder: 'Search Docs...'
              }
            }
          ]
        },
        {
          tag: 'div',
          classes: ['control'],
          id: 'docControls'
        }
      ]
    }
  }
}
