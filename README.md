# ReactJS Piano -> Song predictor
![Piano image](/public/melodypiano.png)

## Description

This React.js application offers an interactive virtual piano interface, allowing users to play and record their musical creations. The app captures the user's input, organizing the notes into a 2D array of pitch arrays, representing the sequences of notes played over time. This structured musical data is then sent to a machine learning model, which analyzes the input and suggests songs that match the played patterns, offering users a unique way to explore music and discover new songs that fit their musical style.

## Features

- **Virtual Piano Interface**: A responsive piano keyboard that users can play using their keyboard or mouse.
- **Recording Functionality**: Users can record their sessions, capturing the sequence of notes played.
- **2D Array of Pitch Arrays**: The app organizes the notes into a structured format, suitable for analysis by the machine learning model.
- **Machine Learning Integration**: Sends recorded pitch arrays to a pre-trained model to analyze the musical input and suggest fitting songs.
- **Song Suggestions**: Provides a list of songs that fit the played pattern, including links to listen to them on popular music platforms.

## Installation

To run this app locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/react-virtual-piano.git
cd react-virtual-piano

2. **Install Dependencies**

npm install

3. **Start developmental server**

npm start
