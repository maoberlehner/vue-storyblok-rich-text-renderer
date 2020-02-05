# Vue Storyblok Rich Text Renderer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
![Vue.js version][vue-version-src]

Vue.js plugin for rendering rich text content from [Storyblok CMS](https://www.storyblok.com/) without using Vue.js runtime compiler.

## :bookmark_tabs: Table of contents

- [Introduction](#loudspeaker-introduction)
- [Install](#rocket-install)
  - [yarn](#yarn)
  - [npm](#npm)
- [Usage](#pencil2-usage)
  - [With Nuxt.js](#green_heart-with-nuxtjs)
- [Options](#wrench-options)
  - [nodeResolvers](#node-resolvers)
  - [markResolvers](#mark-resolvers)
  - [componentResolvers](#component-resolvers)
- [Resolvers](#electric_plug-resolvers)
  - [Blocks](#blocks)
    - [HEADING](#heading)
    - [PARAGRAPH](#paragraph)
    - [QUOTE](#quote)
    - [OL_LIST](#ol_list)
    - [UL_LIST](#ul_list)
    - [LIST_ITEM](#list_item)
    - [CODE_BLOCK](#code_block)
    - [HR](#hr)
    - [BR](#br)
    - [IMAGE](#image)
    - [COMPONENT](#component)
  - [Marks](#marks)
    - [BOLD](#bold)
    - [STRONG](#strong)
    - [STRIKE](#strike)
    - [UNDERLINE](#underline)
    - [ITALIC](#italic)
    - [CODE](#code)
- [Definitions](#straight_ruler-definitions)
  - [NodeResolver](#node-resolver)
  - [MarkResolver](#mark-resolver)
  - [ComponentResolver](#component-resolver)
- [License](#ticket-license)

## :loudspeaker: Introduction

This plugin gives you a simple & fast way to render rich text content from Storyblok in Vue.js.
Currently Storyblok provides the [Rich Text Resolver](https://www.storyblok.com/docs/richtext-field#vue-js) for that but needs the [Vue.js Runtime Compiler](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only) for the [Inline Components](https://www.storyblok.com/docs/richtext-field#javascript-sdk).
Because I didn't want the bigger bundle size I wrote this plugin. So feel free to use it! :blush:

## :rocket: Install

### yarn

```bash
yarn add @marvinrudolph/vue-storyblok-rich-text-renderer
```

### npm

```bash
npm install @marvinrudolph/vue-storyblok-rich-text-renderer --save
```

## :pencil2: Usage

```ts
import Vue from 'vue'
import RichTextRenderer from 'vue-storyblok-rich-text-renderer'

// Simple
Vue.use(RichTextRenderer)

// With options
Vue.use(RichTextRenderer, {
    // Options
})
```

In your `<template>`:

```html
<!-- `document` is the object from Storyblok with `type` "doc" -->
<rich-text-renderer v-if="document" :document="document" />
```

> For available properties see [Options](#wrench-options).

If you don't use custom components in your rich text content you should be good now. :ok_hand:

### :green_heart: With Nuxt.js

You can use and implement this plugin like every other Vue.js plugin in Nuxt.js with `Vue.use()`.
Read more about [Nuxt.js plugins](https://nuxtjs.org/guide/plugins).

1. Create a file named `rich-text-renderer.js` in `plugins/` with the contents from [above](#pencil2-usage)
2. Add it to the `plugins` property in your `nuxt.config.js`

> If you use TypeScript don't forget to change `.js` to `.ts`. :blush:

```ts
// nuxt.config.js
{
    // [...] other config
    plugins: [
        '~/plugins/rich-text-renderer.js'
    ]
}
```

**Congrats! :tada: You have successfully implemented the plugin and you can now use the `<rich-text-renderer />` component.**

## :wrench: Options

### `nodeResolvers`

**Type:** `object` with [`NodeResolver`](#node-resolver) definitions

**Default:** See default [blocks](#blocks)

**Example:**

```ts
{
    [Blocks.PARAGRAPH]: 'custom-paragraph',
    [Blocks.QUOTE]: 'custom-quote'
}
```

### `markResolvers`

**Type:** `object` with [`MarkResolver`](#mark-resolver) definitions

**Default:** See default [marks](#marks)

**Example:**

```ts
{
    [Marks.STRONG]: 'custom-strong',
    [Marks.UNDERLINE]: 'custom-underline'
}
```

### `componentResolvers`

**Type:** `object` with [`ComponentResolver`](#component-resolver) definitions

**Default:** `{}`

**Example:**

```ts
componentResolvers: {
    // Key resolves to technical name of your component created in Storyblok
    button: {
        component: 'custom-button',
        children: (node, key, h) => {
            return h('div', { key: `${key}-0` }, 'children')
        },
        data: (node) => {
            return {
                props: {
                    test: node.title
                }
            }
        }
    }
}
```

## :straight_ruler: Definitions

### `NodeResolver`

**Type:** `string` | `function`

**Variants:**

#### 1. Simple `string` with tag as value e.g. `'p'` or `'div'`

#### 2. Function which returns a render function. You can be more dynamically here and pass additional props for example

Available parameters:

Name | Type | Description
--- | --- | ---
`node` | `object` | The node/data from Storyblok
`key` | `string` | Auto-generated key. Is automatically incremented with a number. => `RichText-{i}`
`h` | `function` | Render function from Vue (`'createElement'`)
`next` | `function` | Renders next nodes inside the current element. You'll need it if you have an element with any content (child nodes or text). **Void elements like `<img />` don't need it.**
`componentRenderers` | `object` | Component renderers auto-generated from `componentResolvers`. **You probably won't need this outside of the `[Blocks.COMPONENT]`.**

**Hint for `next` function: You need to pass `node.content`, `key`, `h` and the `next` itself.**
**Example:**

```ts
// Example usage
next(node.content, key, h, next)
```

### `MarkResolver`

**Type:** `string` | `function`

**Variants:**

#### 1. Simple `string` with tag as value e.g. `'strong'` or `'u'`

#### 2. Function which returns a render function. You can be more dynamically here and pass additional props for example

Available parameters:

Name | Type | Description
--- | --- | ---
`node` | `object` | The node/data from Storyblok
`key` | `string` | Auto-generated key. Is automatically incremented with a number. => `RichText-{i}`
`h` | `function` | Render function from Vue (`'createElement'`)
`text` | `string` | Text content of the mark

### `ComponentResolver`

**Type:** `object`

**Properties:**

Name | Type | Description
--- | --- | ---
`component` | `string` | Name of your custom component
`children` | `function` | Function with `node`, `key` & `h`(`createElement` function) as parameters. Returns `VNodeChildren` so it can be e.g a simple `string`, `VNode` or an array of `VNode`. Children can then be accessed with `$slots`/`$slots.default` in your component or in your template with `<slot />`. See [example](#component-resolvers) for that.
`data` | `function` | Access to your current Storyblok `node` as parameter. Returns [Data Object](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) of Vue.js which will be passed to the component.

## :electric_plug: Resolvers

### Blocks

#### `HEADING`

**Default:**

```ts
[Blocks.HEADING]: (node, key, h, next) => {
    const tag = node.attrs.level ? `h${node.attrs.level}` : 'h2'
    return h(tag, { key }, next(node.content, key, h, next))
}
```

#### `PARAGRAPH`

**Default:**

```ts
[Blocks.PARAGRAPH]: 'p'
```

**Example output:**

```html
<p>Some text</p>
```

#### `QUOTE`

**Default:**

```ts
[Blocks.QUOTE]: 'blockquote'
```

**Example output:**

```html
<blockquote>Some quote</blockquote>
```

#### `OL_LIST`

**Default:**

```ts
[Blocks.OL_LIST]: 'ol'
```

**Example output:**

```html
<ol>
    ...
</ol>
```

#### `UL_LIST`

**Default:**

```ts
[Blocks.UL_LIST]: 'ul'
```

**Example output:**

```html
<ul>
    ...
</ul>
```

#### `LIST_ITEM`

**Default:**

```ts
[Blocks.LIST_ITEM]: 'li'
```

**Example output:**

```html
<li>Item</li>
```

#### `CODE_BLOCK`

**Default:**

```ts
[Blocks.CODE_BLOCK]: (node, key, h, next) => {
    return h('code', { key, attrs: node.attrs }, next(node.content, key, h, next))
}
```

**Example output:**

```html
<code class="language-javascript">Code</code>
```

#### `HR`

**Default:**

```ts
[Blocks.HR]: 'hr'
```

**Example output:**

```html
<hr />
```

#### `BR`

**Default:**

```ts
[Blocks.BR]: 'br'
```

**Example output:**

```html
<br />
```

#### `IMAGE`

**Default:**

```ts
[Blocks.IMAGE]: (node, key, h) => {
    return h('img', { key, attrs: node.attrs })
}
```

**Example output:**

```html
<img src="//a.storyblok.com/f/91847/400x303/fn28dnj213/image.png" alt="Alternative" title="My image" />
```

#### `COMPONENT`

**Default:**

```ts
[Blocks.COMPONENT]: (node, key, h, next, componentRenderers) => {
    const resolvers: VNode[] = []

    node.attrs.body.forEach((item: RichTextNode, i: number) => {
        const scopedKey = `${key}-${i}`
        const resolvedComponent = componentRenderers[item.component]
        resolvers.push(resolvedComponent ? resolvedComponent(item, scopedKey, h) : defaultComponentResolver(item, scopedKey, h))
    })

    return resolvers
}
```

**Example output:**

```html
<custom-component :my-prop="Prop from Storyblok" />
```

### Marks

#### `BOLD`

**Default:**

```ts
[Marks.BOLD]: 'strong'
```

**Example output:**

```html
<strong>Bold</strong>
```

#### `STRONG`

**Default:**

```ts
[Marks.STRONG]: 'strong'
```

**Example output:**

```html
<strong>Bold</strong>
```

#### `STRIKE`

**Default:**

```ts
[Marks.STRIKE]: 's'
```

**Example output:**

```html
<s>Striked</s>
```

#### `UNDERLINE`

**Default:**

```ts
[Marks.UNDERLINE]: 'u'
```

**Example output:**

```html
<u>Underlined</u>
```

#### `ITALIC`

**Default:**

```ts
[Marks.ITALIC]: 'i'
```

**Example output:**

```html
<i>Italic</i>
```

#### `CODE`

**Default:**

```ts
[Marks.CODE]: 'code'
```

**Example output:**

```html
<code>Inline code</code>
```

## :ticket: License

[MIT License](./LICENSE)

Copyright (c) Marvin Rudolph [info@marvin-rudolph.de](mailto:info@marvin-rudolph.de)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@marvinrudolph/vue-storyblok-rich-text-renderer/latest.svg?style=flat-square
[npm-version-href]: https://www.npmjs.com/package/@marvinrudolph/vue-storyblok-rich-text-renderer

[npm-downloads-src]: https://img.shields.io/npm/dt/@marvinrudolph/vue-storyblok-rich-text-renderer.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@marvinrudolph/vue-storyblok-rich-text-renderer

[license-src]: https://img.shields.io/npm/l/@marvinrudolph/vue-storyblok-rich-text-renderer.svg?style=flat-square
[license-href]: https://npmjs.com/package/@marvinrudolph/vue-storyblok-rich-text-renderer

[vue-version-src]: https://img.shields.io/badge/dynamic/json.svg?label=vue.js&url=https%3A%2F%2Fraw.githubusercontent.com%2FMarvinRudolph%2Fvue-storyblok-rich-text-renderer%2Fmaster%2Fpackage.json&query=dependencies.vue&colorB=blue&style=flat-square