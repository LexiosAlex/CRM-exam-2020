export interface IChartData {
  name: string;
  value: number;
  textColor?: string;
}

export interface IAllTimeData {
  activities: number;
  volunteers: number;
  earn: number;
  paid: number;
  profit: number;
}

export type TimeChartData = IChartData[];
