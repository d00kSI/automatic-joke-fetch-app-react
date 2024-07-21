// useState is used to remember the current state of an element
import { useState } from 'react';

export default function JokeContainer() {
  // State variables to hold the joke data, category, and error message
  const [joke, setJOke] = useState('');
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const apiURL = 'https://v2.jokeapi.dev/joke/Any';

  // Function to populate the joke
  function populateJoke() {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Clears any previous error messages from the state variable
        setErrorMessage('');
        // Set the category and define the color
        const labelColor = defineColor(data.category);
        setCategory(data.category);

        // Handle different types of jokes
        if (data.type === 'single') {
          setJoke(data.joke);
        } else {
          setJoke(`${data.setup}<br>${data.delivery}`);
        }
      })
      .catch(error => {
        setErrorMessage("No jokes were found!");
        console.error(error);
      });
  }

  // Function to define the color based on the category
  function defineColor(category) {
    switch (category) {
      case 'Programming':
        return '#00008B';
      case 'Misc':
        return '#dc7d44';
      case 'Dark':
        return '#000000';
      case 'Spooky':
        return '#4B0082';
      case 'Christmas':
        return '#D6001C';
      case 'Pun':
        return '#3b3f54';
      default:
        // Default color if category is not matched - please adjust if needed
        return '#FFFFFF'; 
    }
  }

  return (
    <section>
      <div className="joke-container" id="joke-container">
        <div className="title">Automatic Joke</div>
        <div id="joke" className="joke"></div>
        <div id="label" className="category"></div>
        <p id="question" className="question"></p>
        <p id="text"></p>
      </div>
      <div id="errorMessage" className="error"></div>
    </section>
  );
}
