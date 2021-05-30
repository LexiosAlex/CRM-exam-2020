export interface IChartData {
  name: string;
  value: number;
  textColor?: string;
}

export interface IAllTimeData {
  activities: number;
  volunteers: number;
  totalHours: number;
}

export type TimeChartData = IChartData[];
