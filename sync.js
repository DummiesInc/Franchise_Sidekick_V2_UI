// frontend/sync.js
import axios from 'axios';
import fs from 'fs';

// const BASE_URL = 'http://localhost:3001';
const BASE_URL = 'http://127.0.0.1:3001';

axios
  .get(`${BASE_URL}/camille/endpoints.ts`)
  .then((response) => {
    fs.writeFileSync('src/endpoints.ts', response.data);
  })
  .catch((error) => {
    console.log(error);
  });
