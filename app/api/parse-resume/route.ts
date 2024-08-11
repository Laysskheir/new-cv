import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import os from 'os';
import pdf from 'pdf-parse';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(os.tmpdir(), file.name);
    await writeFile(path, buffer);

    const dataBuffer = await readFile(path);
    const pdfData = await pdf(dataBuffer);

    // Here you would implement your own parsing logic based on the text content
    const parsedData = {
      text: pdfData.text,
      // Add more parsed fields as needed
    };

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', error: error.message }, { status: 500 });
  }
}