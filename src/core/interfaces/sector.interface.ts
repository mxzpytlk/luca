import { IRecord } from './record';

export interface ISector {
  id: string;
  title: string;
  records: IRecord[];
  _id?: string;
}
