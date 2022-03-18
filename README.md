# Component Workshop for local development.

In the storefront (design-system) repo:

```
cd component/ds-component
yalc publish --no-scripts

```

In workshop (consumer-tests) repo

```
yalc add @cagov/ds-component
npm run component-workshop
```

---

Yalc helpers:

```
#
yalc update

## Remove all yalc packages from the current project.
yalc remove --all

#
yalc installations clean my-package

## See everywhere yalc is used on your machine.
yalc installations show
```

Notes:

- Will only produce a workshop when there is a template.html file.
