# Development setup

This site uses [VuePress](https://vuepress.vuejs.org/) as static page generator.
It is a static page generator based on [vue.js](https://vuejs.org/) and created
to write the documentation of that framework.

Vuepress is based on markdown files. Each HTML-page on the site has a
corresponding markdown file in this repository.

# Setup / Commands

After cloning the repository you probaby want to run the following commands, to
install VuePress, build the website and run the VuePress dev server:

```sh
# install
yarn global add vuepress
# OR npm install -g vuepress
vuepress dev docs
```

## Differences between dev-server and production

The VuePress site is a Vue.js application. While the dev-server runs the whole
application in the browser, the production site is pre-rendered with subsequent
changes running in the browser.

Vue.js components that only work in the browser will work correctly in the
dev-server, but will fail in production.

See
[Browser API Access Restrictions](https://vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions)
for details.

A few notes on the site and the build processes.

- The site uses the Vuepress default-theme with a few custom styles.
- Markdown files in this repository automatically become HTML-files on the site.

## Files and directories

The `docs` folder contains all sources of the page. That includes

- `docs/**/*.md`: Markdown files, one for each HTML files containing the actual
  content.
- `docs/.vuepress/public/`: root directory for public files that are copied to
  the site as-is.

# Deployment

When the master branch is pushed to GitHub, a
[Travis-CI job](https://travis-ci.org/lavafeld/magma-guide) will build and
update the site. No setup is required.

The Travis-CI job uses the
[handlebars-site-bot](https://github.com/handlebars-site-bot) account to update
the github-pages of this repository.

Source:
[Handlebars documentation - Development setup](https://github.com/handlebars-lang/docs/blob/master/CONTRIBUTING.md)
