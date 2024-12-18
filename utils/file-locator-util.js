/**
 * Recursively checks all files in the given folder and its subfolders
 * for any files with the given file extension, and returns the paths
 * to those files.
 * 
 * @param {string} folder The folder to search for files in
 * @param {string} fileExtension The file extension to search for
 * @returns {Array<string>} The paths to the found files
 */
module.exports = (folder, fileExtension) => {
  const fs = require("fs");
  const path = require("path");

  const files = fs.readdirSync(folder);
  let foundFiles = [];

  for (const file of files) {
    const filePath = path.join(folder, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      foundFiles = foundFiles.concat(module.exports(filePath, fileExtension));
    } else if (file.endsWith(fileExtension)) {
      foundFiles.push(filePath);
    }
  }

  return foundFiles;
}