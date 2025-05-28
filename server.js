'use strict';

import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () =>{
console.log(`[INFO] Server is online at http://localhost:${PORT}`);
});