# Robot dance off app

I tried to replicate my usual workflow and scaffolding with a couple of differences:

1. Using Pinia instead of Vuex
2. Using Fetch API instead of Axios
3. Did not include pre-commit linting and formating; Did not include use of env vars for relevant data such as API URL; Did not do any error handling; etc (time constraint)

Pinia's TS support seems fantastic and I liked being able to return promises in the store actions so as to be able to combine the action calls with the Suspence tags for async setup function components. 

I still think Axios is probably the way to go for most projects as it simply adds too many quality of life features to ignore but for this case I didn't miss them. The rest is very representative of my usual approach.

# Vue 3 + TypeScript + Vite

To run:

```shell
npm run dev
```

To build:

```shell
npm run build
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
