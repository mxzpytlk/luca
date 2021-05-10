import { IInterval, IRecord } from '../interfaces/record.interface';
import { hoursBetweenDates, hoursToMilisecrond } from '../utills/date-time.utills';

export class Record implements IRecord {
  constructor(
    public id: string,
    public text: string,
    public executionPlanTime: number,
    public executionIntervals: IInterval[],
    public executionDate?: Date,
  ) {}

  public get executionTime(): number {
    return this.executionIntervals
      .map((interval) => hoursBetweenDates(interval.start, interval.end || new Date()))
      .reduce((prev, cur) => prev + cur, 0);
  }

  public set executionTime(executionTime: number) {
    const end = new Date();
    const start = new Date(Date.now() - hoursToMilisecrond(executionTime));
    this.executionIntervals.push( { start, end } );
  }
}
