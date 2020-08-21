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
  collection: function() {
    return {
      tag: 'div',
      classes: ['collection'],
      children: [
        {
          tag: 'div',
          classes: ['folder-icon', 'new-doc-icon'],
          children: [
            {
              tag: 'div',
              children: [
                {
                  tag: 'i',
                  classes: ['fa', 'fa-plus']
                }
              ]
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
              tag: 'a',
              classes: ['back'],
              properties: {
                href: '#'
              },
              children: [
                {
                  tag: 'i',
                  classes: ['fa', 'fa-caret-square-left', obj.backDisabled ? 'disabled': 'fa']
                }
              ]
            }
          ]
        },
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