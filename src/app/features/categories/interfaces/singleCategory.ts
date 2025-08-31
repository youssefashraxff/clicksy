export interface singleCategoryData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface singleCategory {
  data: singleCategoryData;
}
