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
          content: obj.exerp
        },
        {
          tag: 'div',
          id: 'docControls',
          classes: ['doc-controls'],
          children: [
            {
              tag: 'button',
              classes: ['doc-control'],
              id: 'moveDoc',
              children: [
                {
                  tag: 'i',
                  classes: ['fa', 'fa-folder']
                }
              ]
            },
            {
              tag: 'button',
              classes: ['doc-control'],
              id: 'deleteDoc',
              children: [
                {
                  tag: 'i',
                  classes: ['fa', 'fa-trash']
                }
              ]
            }
          ]
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
        },
        {
          tag: 'div',
          id: 'folderControls',
          classes: ['folder-controls'],
          children: [
            {
              tag: 'button',
              classes: ['folder-control'],
              id: 'editFolder',
              children: [
                {
                  tag: 'i',
                  classes: ['fa', 'fa-pen']
                }
              ]
            },
            {
              tag: 'button',
              classes: ['folder-control'],
              id: 'deleteFolder',
              children: [
                {
                  tag: 'i',
                  classes: ['fa', 'fa-trash']
                }
              ]
            }
          ]
        }
      ]
    }
  },
  collection: function(id) {
    return {
      tag: 'div',
      classes: ['collection'],
      id: id,
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
          classes: ['control', 'search'],
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
          classes: ['control', 'filter'],
          id: 'filter',
          children: [
            {
              tag: 'span',
              content: 'Filter:'
            },
            {
              tag: 'button',
              id: 'all'
            },
            {
              tag: 'button',
              id: 'red'
            },
            {
              tag: 'button',
              id: 'blue'
            },
            {
              tag: 'button',
              id: 'green'
            },
            {
              tag: 'button',
              id: 'pink'
            }
          ]
        }
      ]
    }
  },
  empty: function(message = '') {
    return {
      tag: 'div',
      id: 'searchResults',
      classes: ['empty-collection'],
      children: [
        {
          tag: 'p',
          content: message
        }
      ]
    }
  },
  newFolderPopup: function() {
    return {
      tag: 'div',
      classes: ['popup'],
      id: 'newFolderPopup',
      children: [
        {
          tag: 'select',
          classes: ['fa'],
          properties: {
            name: 'color'
          },
          children: [
            {
              tag: 'option',
              classes: ['red', 'fa'],
              content: '',
              properties: {
                value: 'red'
              }
            },
            {
              tag: 'option',
              classes: ['blue', 'fa'],
              content: '',
              properties: {
                value: 'blue'
              }
            },
            {
              tag: 'option',
              classes: ['green', 'fa'],
              content: '',
              properties: {
                value: 'green'
              }
            },
            {
              tag: 'option',
              classes: ['pink', 'fa'],
              content: '',
              properties: {
                value: 'pink'
              }
            }
          ]
        },
        {
          tag: 'input',
          properties: {
            type: 'text',
            placeholder: 'New Folder',
            name: 'name'
          }
        },
        {
          tag: 'button',
          content: 'Create New Folder'
        }
      ]
    }
  },
  docControls: function(id) {
    return {
      tag: 'div',
      children: [
        {
          tag: 'button',
          classes: ['doc-control'],
          id: 'editDoc',
          children: [
            {
              tag: 'i',
              classes: ['fa', 'fa-pen']
            }
          ]
        },
        {
          tag: 'button',
          classes: ['doc-control'],
          id: 'deleteDoc',
          children: [
            {
              tag: 'i',
              classes: ['fa', 'fa-trash']
            }
          ]
        },
        {
          tag: 'button',
          classes: ['doc-control'],
          id: 'shareDoc',
          children: [
            {
              tag: 'i',
              classes: ['fa', 'fa-share']
            }
          ]
        },
        {
          tag: 'button',
          classes: ['doc-control'],
          id: 'moveDoc',
          children: [
            {
              tag: 'i',
              classes: ['fa', 'fa-folder']
            }
          ]
        }
      ]
    }
  },
  tabs: function() {
    return {
      tag: 'div',
      classes: ['tabs']
    }
  },
  tab: function(tab) {
    return {
      tag: 'div',
      classes: ['tab'],
      children: [
        {
          tag: 'span',
          content: tab.name,
        },
        {
          tag: 'button',
          children: [
            {
              tag: 'i',
              classes: ['fa', 'fa-times-circle']
            }
          ]
        }
      ]
    }
  },
  moveDoc: function(folders) {
    let options = []
    for (const folder of folders) {
      options.push({
        tag: 'option',
        content: folder.name,
        properties: {
          value: folder.id
        }
      })
    }
    return {
      tag: 'div',
      classes: ['popup'],
      id: 'moveDocPopup',
      children: [
        {
          tag: 'select',
          id: 'selectFolder',
          children: options
        },
        {
          tag: 'button',
          id: 'moveDocButton',
          content: 'Move Doc'
        }
      ]
    }
  }
}
