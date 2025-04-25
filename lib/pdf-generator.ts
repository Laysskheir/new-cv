import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface PDFOptions {
    filename?: string;
    scale?: number;
}

class PDFGenerator {
    private static instance: PDFGenerator;

    private constructor() { }

    public static getInstance(): PDFGenerator {
        if (!PDFGenerator.instance) {
            PDFGenerator.instance = new PDFGenerator();
        }
        return PDFGenerator.instance;
    }

    public async generatePDF(element: HTMLElement, options: PDFOptions = {}): Promise<void> {
        const { filename = 'resume.pdf', scale = 2 } = options;

        // Capture the element using html2canvas
        const canvas = await html2canvas(element, {
            scale: scale,
            useCORS: true,
            logging: false,
            backgroundColor: '#FFFFFF'
        });

        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, imgWidth, imgHeight);

        // Save the PDF
        pdf.save(filename);
    }
}

export const pdfGenerator = PDFGenerator.getInstance();