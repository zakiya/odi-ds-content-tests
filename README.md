# Component workshop for local development

## Development

### Get started

- Install dependencies: `npm install`
- Watch tools folder: `npm run watch`
- Build site and run in a broswer: `npm run workshop`

### Use a local repo for source

By default the workshop references the node_modules folder in the package root. To change source, the following lines to `src/index.js` under `const shed = new Shed(); `

```js
shed.directoryPath = "/local/path/to/repo/design-system/components/";
shed.source = "repo";
```

### Changing markup for demo purposes

1. Add file called `[component]/.js` to `src/tools` directory.

### Substituting a local package for a published one

1. In the storefront (design-system) repo:

   ```bash
   z design-system
   COMPONENT=page-alert
   cd components/$COMPONENT
   yalc publish --no-scripts
   ```

2. In workshop (consumer-tests) repo

   ```bash
   z odi-ds-content-tests
   yalc add @cagov/ds-$COMPONENT
   npm run workshop
   ```

## Misc

### Troubleshooting

- Script will only produce a demo page for components with a `template.html` file.

### Other scripts

- Rebuild demo site: `npm run build`
- Run the site in a broswer: `npm run serve`

### Yalc helpers

```bash
#
yalc update

## Remove all yalc packages from the current project.
yalc remove --all

#
yalc installations clean my-package

## See everywhere yalc is used on your machine.
yalc installations show
```
