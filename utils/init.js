import fs from 'fs';

// Create files_manager directory if it doesn't exist
const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

console.log(`Files manager folder created at: ${folderPath}`);
