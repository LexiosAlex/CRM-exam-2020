export interface ICard {
  id: string;
  title: string;
  description: string;
  assignee?: string;
}

export interface IList {
  title: string;
  cards: ICard[];
}
