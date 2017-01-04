# new-marko-app

To get started, install the command line tool globally.  This will be used to start a new application.

```
npm install new-marko-app --global
```

## Creating a new app

First, call `new-marko-app` and pass the name of the application that you want to create.

```
new-marko-app test-app
```

This creates a new directory and bootstraps your application inside of it.  To start the app, change into the app directory and run `npm start`.

```
cd test-app
npm start
```

## Adding pages

Adding a page to your application simply requires adding a new directory under the `src/pages` directory.  Inside this directory, you can put either an `index.marko` template or an `index.js` file that exports a `handler` method.

> **Example scenario:**
>
> Given a directory structure like this:
>
> ```
> ⤷ src/
>    ⤷ pages/
>       ⤷ my-page/
>          ⤷ index.marko
> ```
>
> Hitting `/my-page` will render `index.marko`.

### Template entry

If using an `index.marko` entry template for the route, the data passed to the template will be any values in the url query string and url parameters (see custom routes and params).  

> **Example scenario:**
>
> Given a route:
> ```
> /people/:name
> ```
>
> And a template:
> ```html
> <ul>
>     <li>${data.name}</li>
>     <li>${data.age}</li>
</ul>
> ```
>
> When you hit the following url:
> ```
> /people/frank?age=27
> ```
>
> The rendered output would be:
> ```html
> <ul>
>     <li>frank</li>
>     <li>27</li>
> </ul>
> ```

### Handler entry

If you need more control over the data passed to the template, you can define a custom `handler` function in your `index.js` file.

```js
import template from './template.marko';

export const handler = (req, res) => {
    res.marko(template, {});
}
```

### Custom routes and params

By default, the route for a page is determined by the page's directory name, but you can also define a custom route for your page.  This route can include custom express-style url parameters.

```js
import template from './template.marko';

export const route = '/people/:name';

export const handler = (req, res) => {
    res.marko(template, { name:req.params.name });
}
```

## Adding components

To add a component, simply create a new directory under the `src/components` directory.  The directory name will be used as the component name.

> **Example scenario:**
>
> Given a directory structure like this:
>
> ```
> ⤷ src/
>    ⤷ components/
>       ⤷ my-component/
>          ⤷ index.marko
> ```
>
> You will be able to use your component in any other component template or page template:
> ```html
> <my-component foo=123/>
> ```

### Page specific components

You can create a `components` directory under a page directory and those components will only be available to that page.

> **Example scenario:**
>
> Given a directory structure like this:
>
> ```
> ⤷ src/
>    ⤷ pages/
>       ⤷ my-page/
>          ⤷ components/
>             ⤷ my-component/
>                ⤷ index.marko
>          ⤷ index.marko
> ```
>
> You will only be able to use your component in from the `my-page/index.marko` template or other components defined under `my-page/components`.

### Subcomponents

You can also create a `components` directory under another component and those components will only be available to the parent component.

## Building a static site

Generating a static site is simple:

```
npm run build
```

The build tool will hit all your page routes and generate the resulting html files and assets in a `build` directory at your project root.  You can then take this build directory and host it on any provider that provides static hosting.

### Dynamic routes

If you have routes that have custom parameters, the build tool needs to know which parameters can be passed.  You can export a `params` array from the `index.js` file for a page.

```js
import template from './template.marko';

export const route = '/people/:name';

export const params = [
    { name:'reyna' },
    { name:'dakota' },
    { name:'jordan' },
];

export const handler = (req, res) => {
    res.marko(template, { name:req.params.name });
}
```

`params` may be programmatically generated and may also be a `Promise`.

## Ejecting

If you need to do something that is not supported by `new-marko-app`, you can run:

```
npm run eject
```

This will uninstall `new-marko-app` and install a bunch of other modules, and add some additional files to your project which you can then fully customize.

**Beware:** This is a one way operation, if you want to undo it, you better be using `git` or some other form of version control.