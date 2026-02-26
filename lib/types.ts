export type DocMeta = {
  title: string;
  description?: string;
  tags?: string[];
  date?: string;
  order?: number;
};

export type Doc = DocMeta & {
  slug: string;
  slugArray: string[];
  category: string;
  content: string;
  filePath: string;
};
