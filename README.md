# Baby Globe Browser Extension

For Wikipedia's 25th birthday, a cute mascot called Baby Globe was introduced.

I was saddened by the fact that the Baby Globe was no longer there after the birthday celebrations had concluded. So I created a tiny browser extension to bring Baby Globe to every website, and you can browse the whole World Wide Web with Baby Globe!

## TODOs

- [ ] Add more Baby Globes
- [ ] Add click animations to relevant Baby Globes
- [ ] Create a proper grownup browser extension
  - [ ] In progress: Submit the extension to Mozilla addons
- [ ] Make Baby Globe contextually thematically aware, appearing a certain way based on the website.
  - Example: Play music on a music site, read a book on a book webpage
- [ ] Make Baby Globe moveable with the mouse

## Installation

Currently, the only way to install the Baby Globe Extension is to [build](#building) the extension locally to get a zip file.

You can then go to Firefox's about:debugging page, and load it as a temporary extension.

## Building

Simply run `make` in the same directory as the README.md.

```
$ make
```

## Licenses

The Baby Globe graphics are licensed under the Creative Commons Attribution-Share Alike 4.0 International license.

For full attribution, please see: https://commons.wikimedia.org/wiki/Baby_Globe

The source code of this project is licensed using the GPL-3.0 license.

## Changelog

### v0.2

- Only include necessary files in the extension zip
- Add Book Baby Globe and Newspaper Baby Globe

### v0.1

- MVP; Initial browser extension version with Laptop Baby Globe
