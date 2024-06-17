# Earth Defenders Toolkit Offline Portal

![Pre-release](https://github.com/digidem/edt-offline-portal/actions/workflows/pre-release.yml/badge.svg)
![Release](https://github.com/digidem/edt-offline-portal/actions/workflows/release.yml/badge.svg)
[![Crowdin](https://badges.crowdin.net/edt-offline-portal/localized.svg)](https://crowdin.com/project/edt-offline-portal)

This project uses the Nuxt framework as the foundation for the community portal.

## Installation

Ensure you are using NodeJS version 14-19.

`yarn`
or
`npm i`

## Dev mode

To get access to a running EDT Offline's API pass the `EDT_HOST` variable, for example:

`EDT_HOST=demo.earthdefenderstoolkit.com yarn dev`
or
`EDT_HOST=demo.earthdefenderstoolkit.com npm run dev`

## Trainer mode

Trainer mode is a special mode designed for training purposes within the EDT Offline Portal. When activated, it configures the application to provide a tailored environment suitable for training sessions. This mode can be particularly useful for demonstrating features, conducting workshops, or onboarding new users.

To enable trainer mode, set the `TRAINER` environment variable to the desired training module. For example, to activate the Mapeo training module, use the following command:

`TRAINER=mapeo EDT_HOST=demo.earthdefenderstoolkit.com npm run dev`

In this mode, the application will automatically redirect to the training page for Mapeo, providing access to specific training resources and tools. This ensures that trainers and trainees have a focused and streamlined experience, with all necessary materials readily available.

## Usage

Set your homepage in the `index.md` frontmatter.

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
