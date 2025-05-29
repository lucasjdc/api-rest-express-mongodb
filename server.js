'use strict';

import chalk from 'chalk';
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () =>{
console.log(chalk.green(`[INFO] Server is online at http://localhost:${PORT}`));
});