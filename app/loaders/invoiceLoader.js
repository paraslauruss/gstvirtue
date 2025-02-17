import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

// Helper to read the HTML file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const invoiceLoader = async () => {
  const filePath = path.join(__dirname, "../../app/assets/standard.html");
  console.log("Reading file from:", filePath); // Debugging
  const file = await fs.readFile(filePath, "utf8");
  console.log("File content:", file); // Debugging
  return file;
};