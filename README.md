# storytime: Final Project @ GA sydney

storytime is an interactive writing prompt tool for the creation of online 'picture books'. It makes use of the publicly available [Google Quick, Draw! data](https://github.com/googlecreativelab/quickdraw-dataset).

Upon click of a button, a random image is served as an SVG, allowing vector-based manipulation of scale and aspect. The aim is to add as few or as many of these images as is desired, in order to provide a creative writing prompt. The copy text can be entered at the bottom of the screen.

The app supports stories with multiple pages, and user login in order to save and retrieve stories from the database.

In order to reduce database load and size, no complete SVG data is stored, instead SVGs are generated client-side from stored coordinates that comprise each 'stroke' of the drawing. This extends to complete stories: images are still not stored, they are fully defined by their own coordinates, the dimensions of each drawing, and their position in the page coordinate space.

Check out the deployed project on [Firebase](https://storytime-261823.firebaseapp.com)!

## Minimum Requirements set by GA
* Do something that excites you!

## Design objectives
* Simple UI and unsuprising functionality - primarily aimed at kids. Though, some of the drawings are so ridiculous that adults can have fun with this tool as well
* Fun colours. Maybe it's too garish?
* Dynamic SVG generation - I wanted to learn more about how vector graphics can be leveraged in web applications
* Multi-page stories
* Ability to resize and move images in each page's 'scene'
* User sign/up login with Google auth or email/password in order to save and retrieve stories
* Styled with CSS in JS

## Technologies Utilised
* React
* Firebase
* Key frontend modules:
  * [emotion.js](https://github.com/emotion-js/emotion) (styling, specifically @emotion/styled)
  * [moment.js](https://github.com/moment/moment) (datetime formatting)
  * [react-rnd](https://github.com/bokuweb/react-rnd) (resizable components)
  * [react-textarea-autosize](https://github.com/buildo/react-autosize-textarea) (helps textareas to behave well)
* [loading.io](https://loading.io) spinners
* [FontAwesome](https://fontawesome.com) icons

## Getting Started
* Demo on [Firebase](https://storytime-261823.firebaseapp.com)
* To deploy yourself, clone the repo, `npm i`, and [setup](https://console.firebase.google.com/) your own firebase project.
* Utilises firestore. Add own `config.js` to `/src/firebase:`
```js
export default {
  apiKey: "key here",
  authDomain: "domain.com",
  databaseURL: "projectid.firebaseio.com",
  projectId: "projectid",
  storageBucket: "projectid.appspot.com",
  messagingSenderId: "senderid",
  appId: "appid"
};
```

## Reflections on Development
* A bit of a learning curve to move from relational database strict schema and associations to loosey-goosey non-relational firebase/json style.
* I like how the data storage can be dictated from the front end to suit how it's needed
* SVGs are weird but cool once understood
* Initially I thought React would not suit working with SVGs, but now I see that it allows really powerful SVG control in the context of building them from the ground up as a React functional component

## Further Development
* Voting system
* Leaderboards
* Friends

## Source
* GA Sydney set the project task, albeit pretty open ended! I wanted to explore SVG graphics, big data management, and especially more advanced features of React like context, hooks, and higher order components. It was good to implement Firebase as backend (and frontend host) for the first time as well.
