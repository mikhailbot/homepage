---
title: Building Apps with Electron
date: 2015-11-12
description: Taking a break from working with Meteor, I decided to give Electron a try. Electron is a framework for building desktop applications using HTML, CSS, and Javascript. It powers both the Atom text editor, and the popular chat service Slack.
---

Taking a break from working with Meteor, I decided to give [Electron](https://electron.atom.io/) a try. Electron is a framework for building desktop applications using HTML, CSS, and Javascript. It powers both the [Atom](https://atom.io/) text editor, and the popular chat service [Slack](https://slack.com/).

For testing I thought I’d work on something super simple; a pomodoro timer! Refer to this [wiki article](https://en.wikipedia.org/wiki/Pomodoro_Technique) if you’re unfamilar with the productivity technique. I was going to build a simple countdown timer that would notify you once completed. Typically, you also have options for different lengths of breaks, but I was trying to keep things simple so just stuck with the default 25 minutes timer.

![Tiny Pomodoro screenshot](/images/tiny_pomodoro.png)

You can see the completed app above. I originally had a progress bar (straight line and a circular one) but settled on making use of [FlipClock.js](http://flipclockjs.com/) because why not? Plus it saved some time doing something from scratch!

While creating the app and testing it things went smooth. The documentation isn’t bad, just lacking examples in certain areas. Plus you have to get used to the two process, main and rendered, as communicating between them requires some forethought.

Besides a few nuances such as loading JS libraries, things are pretty standard affair.

```js
$ = window.jQuery = require('jquery');
```

The only issue arouse when it came to packaging. Now if I had used one of the more thorough boilerplates it may have been easier, but the listed way seems silly. You download the default Electron.app binary. You then move your app into an **Electron.app/Contents/Resources/app** folder inside the existing app. After changing some config files so that the app name and such is corrrect, you can now run it using Electron.app or whatever you changed it to. This .app is now your finished app and can be distributed and such.

The above process seems somewhat silly, even though it did work. There has to be a better way than messing with config files inside a pre-existing app. The biggest take away though, I think next time I may just try and do things natively. XCode is pretty great and the experience would most likely be more enjoyable all around.
