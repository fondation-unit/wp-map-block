interface BlockAttributes {
    spreadsheetId: string;
    sheetName: string;
}

interface BlockMetadata {
    name: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    keywords?: string[];
    attributes: Record<string, unknown>;
}
