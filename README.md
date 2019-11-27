# Vue Storyblok Rich Text Renderer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
![Vue.js version][vue-version-src]

Vue.js plugin for rendering rich text content from [Storyblok CMS](https://www.storyblok.com/) without using Vue.js runtime compiler.

## Introduction
This plugin gives you a simple & fast way to render rich text content from Storyblok in Vue.js.
Currently Storyblok provides the [Rich Text Resolver](https://www.storyblok.com/docs/richtext-field#vue-js) for that but needs the [Vue.js Runtime Compiler](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only) for the [Inline Components](https://www.storyblok.com/docs/richtext-field#javascript-sdk).
Because I didn't want the bigger bundle size I wrote this plugin. So feel free to use it! :blush:

## Install
### yarn
```
yarn add @marvinrudolph/vue-storyblok-rich-text-renderer
```

### npm
```
npm install @marvinrudolph/vue-storyblok-rich-text-renderer --save
```

## Usage
```js
import RichTextRenderer from 'vue-storyblok-rich-text-renderer'

// Simple
Vue.use(RichTextRenderer)

// With options
Vue.use(RichTextRenderer, {
    // Options
})
```

If you don't use custom components in your rich text content everything should be good now. :ok_hand:

### Options

#### `nodeResolvers`
> Resolver definitions for each (block) element like `h2` or `p`. Will be merged with the default ones.

**Type**|**Default**
-----|-----
`Object`|[Default NodeResolvers]()

##### Example
```js
{
    // Simple tag
    [Blocks.PARAGRAPH]: {
        tag: 'custom-paragraph'
    },

    // Dynamic tag based on props of `node`
    [Blocks.HEADING]: {
        tag: (node) => {
            return node.attrs.level ? `h${node.attrs.level}` : 'h2'
        }
    },

    // Dynamic rendered element
    // Passes attributes like `src`, `title` or `alt` directly to the component
    [Blocks.IMAGE]: (node, key, h) => {
        return h('img', { key, attrs: node.attrs })
    }
}
```

#### `markResolvers`
> Resolver definitions for each text style like `strong` or `italic`. Will be merged with the default ones.

**Type**|**Default**
-----|-----
`Object`|[Default MarkResolvers]()

##### Example
```js
{
    // Custom strong
    // Renders `strong` as `<custom-strong>something</custom-strong>`
    [Marks.STRONG]: {
        tag: 'custom-strong'
    }
}
```

#### `componentResolvers`
> Resolver definitions for each custom component.

**Type**|**Default**
-----|-----
`Object`|`{}`

##### Example
```js
{
    // Renders Storyblok component with name `button`
    // as `<custom-button>`
    'button': {
        // Would be `CustomButton.vue`
        component: 'custom-button',

        // Pass data from Storyblok to component
        // Returns data object from Vue - `class`, `props`, `attrs` available
        data: (node) => {
            return {
                props: {
                    test: 'Some value'
                }
            }
        }
    }
}
```

### Default Resolvers
#### NodeResolvers

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@marvinrudolph/vue-storyblok-rich-text-renderer/latest.svg?style=flat-square
[npm-version-href]: https://www.npmjs.com/package/@marvinrudolph/vue-storyblok-rich-text-renderer

[npm-downloads-src]: https://img.shields.io/npm/dt/@marvinrudolph/vue-storyblok-rich-text-renderer.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@marvinrudolph/vue-storyblok-rich-text-renderer

[license-src]: https://img.shields.io/npm/l/@marvinrudolph/vue-storyblok-rich-text-renderer.svg?style=flat-square
[license-href]: https://npmjs.com/package/@marvinrudolph/vue-storyblok-rich-text-renderer

[vue-version-src]: https://img.shields.io/badge/dynamic/json.svg?label=vue.js&url=https%3A%2F%2Fraw.githubusercontent.com%2FMarvinRudolph%2Fstoryblok-rich-text-vue-renderer%2Fmaster%2Fpackage.json&query=dependencies.vue&colorB=blue&style=flat-square