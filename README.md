# Portal Nuxt

![pre-release](https://github.com/digidem/edt-offline-portal/actions/workflows/pre-release.yml/badge.svg)

![release](https://github.com/digidem/edt-offline-portal/actions/workflows/release.yml/badge.svg)

[![Crowdin](https://badges.crowdin.net/edt-offline-portal/localized.svg)](https://crowdin.com/project/edt-offline-portal)

Using nuxt framework as a base of the community portal

## Install

`yarn`
or
`npm i`

## Dev mode

To get access to a running EDT Offline's API pass the `EDT_HOST` variable, for example:

`EDT_HOST=10.92.138.74 yarn dev`
or
`EDT_HOST=10.92.138.74 npm run dev`

## Usage

In the index.md frontmetter you can set your homepage.

## Docker

Run:
`docker run -p 3000:3000 -d communityfirst/edt-offline-portal`

The application should be running on: [http://localhost:3000](http://localhost:3000)

Use the `full` tag to get the portal with all the applications pre-downloaded. Ex.:

```
docker run -p 3000:3000 -d communityfirst/edt-offline-portal:full
```

## About the stack

### Nuxt framework

The nuxt documentation is [here](https://nuxtjs.org/docs) we decide use nuxt because is more clean and send just the html files without javascript. This is good thing for people with slow devices.

### Markdown

We use [content](https://content.nuxtjs.org/) as markdown implementations.

For write in markdown we can start with those [instructions](https://nuxtjs.org/blog/creating-blog-with-nuxt-content#adding-an-icon-to-our-headings-anchor)

### CSS

About styles and css we use [windcss](https://windicss.org/features/important-prefix.html) a simplification for [tailwindcss](https://tailwindcss.com/docs) where we can find the documentations about how can use this things.

### Local storage

https://github.com/nuxt-community/localforage-module

### PWA

https://pwa.nuxtjs.org/setup

---

# - [PT-BR]

## Instalar

`yarn`
ou
`npm i`

## Modo Dev

`yarn dev`
ou
`npm run dev`

## Primeiro passo

Editar index.md com as suas configurações

## Sobre a pilha

Utilizar o nuxt framework como base do portal comunitário

### Nuxt framework

A documentação nuxt é [aqui](https://nuxtjs.org/docs) decidimos usar nuxt porque é mais limpa e enviamos apenas os ficheiros html sem javascript. Isto é bom para pessoas com dispositivos lentos.

### Markdown

Utilizamos [conteúdo](https://content.nuxtjs.org/) como implementações de markdown.

Para escrever no markdown, podemos começar com essas [instruções](https://nuxtjs.org/blog/creating-blog-with-nuxt-content#adding-an-icon-to-our-headings-anchor)

### CSS

Sobre estilos e css usamos [windcss](https://windicss.org/features/important-prefix.html) uma simplificação para [tailwindcss](https://tailwindcss.com/docs) onde podemos encontrar a documentação sobre como usar estas coisas.
