export interface ICollection {
  collectionId: string;
  isPublic: boolean;
  itemCount: number;
  name: string;
}

export interface IItem {
  collectionId: string;
  itemId: string;
  name: string;
  price: number;
  stock: number;
}
