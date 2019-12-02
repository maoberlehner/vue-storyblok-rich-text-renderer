# Vue Storyblok Rich Text Renderer

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
![Vue.js version][vue-version-src]

Vue.js plugin for rendering rich text content from [Storyblok CMS](https://www.storyblok.com/) without using Vue.js runtime compiler.

## :bookmark_tabs: Table of contents

- [Introduction](#introduction)
- [Install](#install)
  - [yarn](#yarn)
  - [npm](#npm)
- [Usage](#usage)
- [Resolvers](#resolvers)
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
import RichTextRenderer from 'vue-storyblok-rich-text-renderer'

// Simple
Vue.use(RichTextRenderer)

// With options
Vue.use(RichTextRenderer, {
    // Options
})
```

If you don't use custom components in your rich text content you should be good now. :ok_hand:

## :wrench: Options

## Resolvers

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

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@marvinrudolph/vue-storyblok-rich-text-renderer/latest.svg?style=flat-square
[npm-version-href]: https://www.npmjs.com/package/@marvinrudolph/vue-storyblok-rich-text-renderer

[npm-downloads-src]: https://img.shields.io/npm/dt/@marvinrudolph/vue-storyblok-rich-text-renderer.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@marvinrudolph/vue-storyblok-rich-text-renderer

[license-src]: https://img.shields.io/npm/l/@marvinrudolph/vue-storyblok-rich-text-renderer.svg?style=flat-square
[license-href]: https://npmjs.com/package/@marvinrudolph/vue-storyblok-rich-text-renderer

[vue-version-src]: https://img.shields.io/badge/dynamic/json.svg?label=vue.js&url=https%3A%2F%2Fraw.githubusercontent.com%2FMarvinRudolph%2Fvue-storyblok-rich-text-renderer%2Fmaster%2Fpackage.json&query=dependencies.vue&colorB=blue&style=flat-square