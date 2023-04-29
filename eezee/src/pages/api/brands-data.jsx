import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  // Find the absolute path of the json file
  const jsonFilePath = path.join(process.cwd(), 'src', 'assets', 'brands.json');
  // Read the json file contents
  const fileContents = await fs.readFile(jsonFilePath, 'utf8');
  // Set the response headers and return the content of the data file in json format
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(JSON.parse(fileContents));
}
