
export type Survey = {
  id: number;
  title: string;
  description: string;
  status: "active" | "draft";
  responses: number;
  created: string;
  lastModified: string;
};
