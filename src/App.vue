<template>
  <div>
    <rich-text-renderer v-if="document" :document="document" />
  </div>
</template>

<script lang="ts">
import Vue, { CreateElement } from 'vue'
import { Marks } from './rich-text-types'

export default Vue.extend({
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Test: () => import('./Test.vue')
  },
  data () {
    return {
      document: {
        'type': 'doc',
        'content': [{
          'type': 'heading',
          'attrs': {
            'level': 1
          },
          'content': [{
            'text': 'Headline 1',
            'type': 'text'
          }]
        }, {
          'type': 'heading',
          'attrs': {
            'level': 2
          },
          'content': [{
            'text': 'Headline 2',
            'type': 'text'
          }]
        }, {
          'type': 'heading',
          'attrs': {
            'level': 3
          },
          'content': [{
            'text': 'Headline 3',
            'type': 'text'
          }]
        }, {
          'type': 'heading',
          'attrs': {
            'level': 4
          },
          'content': [{
            'text': 'Headline 4',
            'type': 'text'
          }]
        }, {
          'type': 'heading',
          'attrs': {
            'level': 5
          },
          'content': [{
            'text': 'Headline 5',
            'type': 'text'
          }]
        }, {
          'type': 'heading',
          'attrs': {
            'level': 6
          },
          'content': [{
            'text': 'Headline 6',
            'type': 'text'
          }]
        }, {
          'type': 'paragraph',
          'content': [{
            'text': 'Just a ',
            'type': 'text'
          }, {
            'text': 'bold ',
            'type': 'text',
            'marks': [{
              'type': 'bold'
            }]
          }, {
            'text': 'paragraph!',
            'type': 'text'
          }]
        }, {
          'type': 'paragraph',
          'content': [{
            'text': 'Just a ',
            'type': 'text'
          }, {
            'text': 'italic',
            'type': 'text',
            'marks': [{
              'type': 'italic'
            }]
          }, {
            'text': ' paragraph!',
            'type': 'text'
          }]
        }, {
          'type': 'paragraph',
          'content': [{
            'text': 'Just a ',
            'type': 'text'
          }, {
            'text': 'strike',
            'type': 'text',
            'marks': [{
              'type': 'strike'
            }]
          }, {
            'text': ' paragraph!',
            'type': 'text'
          }]
        }, {
          'type': 'paragraph',
          'content': [{
            'text': 'Awesome inline code',
            'type': 'text',
            'marks': [{
              'type': 'code'
            }]
          }]
        }, {
          'type': 'blockquote',
          'content': [{
            'type': 'paragraph',
            'content': [{
              'text': 'Awesome block with quote',
              'type': 'text'
            }]
          }]
        }, {
          'type': 'code_block',
          'attrs': {
            'class': 'language-javascript'
          },
          'content': [{
            'text': 'Code Block',
            'type': 'text'
          }]
        }, {
          'type': 'paragraph',
          'content': [{
            'type': 'image',
            'attrs': {
              'alt': '',
              'src': '//a.storyblok.com/f/67536/400x303/ccbe9ca7b3/nuxt-logo.png',
              'title': null
            }
          }]
        }, {
          'type': 'paragraph',
          'content': [{
            'text': 'Multi line',
            'type': 'text'
          }, {
            'type': 'hard_break'
          }, {
            'text': 'paragraph',
            'type': 'text'
          }, {
            'type': 'hard_break'
          }, {
            'text': 'with three lines',
            'type': 'text'
          }]
        }, {
          'type': 'bullet_list',
          'content': [{
            'type': 'list_item',
            'content': [{
              'type': 'paragraph',
              'content': [{
                'text': 'A normal',
                'type': 'text'
              }]
            }]
          }, {
            'type': 'list_item',
            'content': [{
              'type': 'paragraph',
              'content': [{
                'text': 'unordered',
                'type': 'text'
              }]
            }]
          }, {
            'type': 'list_item',
            'content': [{
              'type': 'paragraph',
              'content': [{
                'text': 'list',
                'type': 'text'
              }]
            }]
          }]
        }, {
          'type': 'ordered_list',
          'attrs': {
            'order': 1
          },
          'content': [{
            'type': 'list_item',
            'content': [{
              'type': 'paragraph',
              'content': [{
                'text': 'A simple',
                'type': 'text'
              }]
            }]
          }, {
            'type': 'list_item',
            'content': [{
              'type': 'paragraph',
              'content': [{
                'text': 'ordered',
                'type': 'text'
              }]
            }]
          }, {
            'type': 'list_item',
            'content': [{
              'type': 'paragraph',
              'content': [{
                'text': 'list',
                'type': 'text'
              }]
            }]
          }]
        }, {
          'type': 'horizontal_rule'
        }, {
          'type': 'blok',
          'attrs': {
            'id': '6e478617-50f0-4b8c-a7c7-3df98ecad470',
            'body': [{
              'sub': [],
              '_uid': 'i-f0be98ee-8d7e-4e0f-90c7-44f18f59163a',
              'title': 'gggihj',
              'component': 'button'
            }, {
              'sub': [],
              '_uid': 'i-40fffd20-3fd5-49f5-9b00-13a176615dc3',
              'title': 'Test',
              'component': 'button'
            }]
          }
        }]
      }
    }
  }
})
</script>
