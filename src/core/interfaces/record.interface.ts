export interface IRecord {
  id: string;
  text: string;
  executionPlanTime: number;
  executionIntervals: Array<{ start: Date, end: Date}>;
  executionDate?: Date;
  executionTime?: number;
  _id?: string;
}
