import React from 'react';

//components
import Container from './general/Container'
import Heading from './general/Heading'

export default () => (
  <Container>
    <Heading>Help</Heading>
    <h2>How do I create a story?</h2>
    <p>Hit the green 'New Story' button in the top navigation bar</p>
    <p>Press the dice to get a random image</p>
    <p>Hover and click to move, drag sides and corners to change dimension</p>
    <p>You can have up to 10 drawings on each page of your story</p>
    <p>Edit the text content for the page at  the bottom of the screen</p>
    <p>Edit the title of the story at the top of the drawing canvas</p>
    <p>Clear all content on the page with the clear button at the bottom</p>
    <h2>How do I save my story?</h2>
    <p>You must be logged in to save stories</p>
    <p>To do so, press the green sae button at the bottom of the drawing screen</p>
    <h2>How do I load a saved story?</h2>
    <p>Head to 'My Stories', find the one you want to load, and hit the 'View/Edit' button</p>
  </Container>
);
