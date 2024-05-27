import fs from 'fs/promises';

export async function getStoredNotes() {
  const rawFileContent = await fs.readFile('./app/notes.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function storeNotes(notes) {
  return fs.writeFile('./app/notes.json', JSON.stringify({ notes: notes || [] }));
}