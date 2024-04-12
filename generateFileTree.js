import { readFileSync, readdirSync, appendFileSync, existsSync} from 'fs';
import { basename, relative, join } from 'path';
import { minimatch } from 'minimatch';

// Get command line arguments
const [, , folderPath, ...excludeList] = process.argv;

// Function to check if a file is binary
function isBinaryFile(filePath) {
  const buffer = readFileSync(filePath);
  const isBinary = buffer.some((byte) => byte === 0);
  return { isBinary, buffer: isBinary ? null : buffer };
}


// Function to generate the file tree
function generateFileTree(folderPath, excludeList) {
  const folderName = basename(folderPath);
  let outputFileName = `${folderName}.txt`;

  // Recursive function to traverse the folder structure
  function traverseFolder(currentPath, depth = 0) {
    const entries = readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const relativePath = relative(folderPath, join(currentPath, entry.name));

      const isExcluded = excludeList.some((pattern) => minimatch(entry.name, pattern));

      if (isExcluded) {
        console.log(`Skipping excluded file: ${entry.name}`);
        continue;
      }

      if (entry.isDirectory()) {
        traverseFolder(join(currentPath, entry.name), depth + 1);
      } else if (entry.isFile()) {
        const { isBinary, buffer } = isBinaryFile(join(currentPath, entry.name));
        if (isBinary) {
          console.log(`Skipping binary file: ${entry.name}`);
        } 
        else {
          console.log(`Appending ${entry.name} contents to ${outputFileName}...`);
          appendFileSync(outputFileName, `${relativePath}\\${entry.name}\n`);
          appendFileSync(outputFileName, `${buffer.toString()}\n`);
        }
      }
    }
  }

  // Start traversing from the given folder path
  // If the file exists we ask to overwrite it or make a new file ending with a number
  if (existsSync(outputFileName)) {
    console.log(`The file ${outputFileName} already exists`);
    let i = 1;
    while (existsSync(`${folderName}(${i}).txt`)) {  i++; }
    outputFileName = `${folderName}(${i}).txt`;
    console.log(`Creating file ${outputFileName}`);
  }

  traverseFolder(folderPath);

  console.log(`File tree generated successfully: ${outputFileName}`);
}

// Check if the required arguments are provided
if (!folderPath ) {
  console.log('Usage: node generateFileTree.js <folderPath> [excludeList...]');
  process.exit(1);
}

// Generate the file tree
generateFileTree(folderPath, excludeList);
