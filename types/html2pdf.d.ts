declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
      windowWidth?: number;
      windowHeight?: number;
      scrollX?: number;
      scrollY?: number;
      width?: number;
      height?: number;
      backgroundColor?: string;
      emulateMedia?: string;
      logging?: boolean;
      letterRendering?: boolean;
    };
    jsPDF?: {
      unit?: string;
      format?: string | number[];
      orientation?: string;
      compress?: boolean;
    };
    enableLinks?: boolean;
    pagebreak?: { mode: string | string[] };
  }

  interface Html2PdfInstance {
    set(options: Html2PdfOptions): Html2PdfInstance;
    from(element: HTMLElement): Html2PdfInstance;
    save(): Promise<void>;
  }

  function html2pdf(): Html2PdfInstance;
  export = html2pdf;
}
