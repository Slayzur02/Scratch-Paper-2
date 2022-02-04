### Overview

This is a fast visualization app where users can write & draw their ideas on a single screen with 2 panels - similar to Scratch Paper in real life! However, I believe its even better: by allowing the embedding of drawings into documents, document exports, and stored draft: this application is more sharable, more convienient, and easier to manage & organize then your every-day paper.

### Instructions

1. Clone the project at: `https://github.com/Slayzur02/ScratchPaper`
2. Go into `./server` and install the dependencies.
3. Install mongodb and run it: https://docs.mongodb.com/manual/installation/ 
4. Run the server with `npm run devStart`
5. Go into `./client`, install the dependencies, and run: `npm run start`

There is also an available online client at: https://scratchpaper.netlify.app/

### Tech stack

The Writing: uses quilljs. 

The Drawing: uses Excalidraw (open source, amazing project). Npm available here: https://www.npmjs.com/package/@excalidraw/excalidraw 

Backend: uses node.js and MongoDB. I chose node due to relatively good experience with its websockets package. MongoDB was at first for simplicity, but turned out to be a great choice due to the structuring of the data of Excalidraw storage notes (which follows a heavy json-ish structure)

Frontend: uses Create-React-App, with Tailwind-CSS for styling, and the above Writing + Drawing apps to compose the app. 


