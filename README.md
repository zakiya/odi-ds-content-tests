Test Components

```bash
MACHINENAME=skip-to-content
PATHTOSAMPLEHTML=template.html 
PATHTOSCSS=src/index.scss
DSNAME=ds-$MACHINENAME
mkdir $DSNAME

## Install component.
npm install @cagov/$DSNAME@latest

## Get HTML.
cp node_modules/@cagov/$DSNAME/$PATHTOSAMPLEHTML $DSNAME/index.html

## Add css and js links to HTML.
code $DSNAME/index.html

<link rel="stylesheet" href="dist/styles.css">

## Generate CSS.
npm run sass ./node_modules/@cagov/$DSNAME/$PATHTOSCSS ./$DSNAME/dist/styles.css

# If CSS only, open in browser.
open -a google\ chrome $DSNAME/index.html
open -a safari $DSNAME/index.html


# ~~~ Else JS

# Get js.
cp node_modules/@cagov/$DSNAME/dist/scripts.js $DSNAME/dist/scripts.js

# Add js to HTML.
code $DSNAME/index.html

<script type="module" src='dist/scripts.js'></script>


## Run in browser
npm run serve -- --root-dir $DSNAME

open -a google\ chrome http://localhost:8000


```
