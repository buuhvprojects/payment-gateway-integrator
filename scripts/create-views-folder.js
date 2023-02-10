const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.join(process.cwd(), 'dist/views'))) {
    fs.mkdirSync(path.join(process.cwd(), 'dist/views'));
}