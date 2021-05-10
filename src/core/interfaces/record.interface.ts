export interface IRecord {
  id: string;
  text: string;
  executionPlanTime: number;
  executionIntervals: IInterval[];
  executionDate?: Date;
  executionTime: number;
  _id?: string;
}

export interface IInterval {
  start: Date;
  end?: Date;
}
