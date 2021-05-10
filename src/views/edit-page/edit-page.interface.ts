import { IComponent } from '@/core/interfaces/component.interface';
import { IRecord } from '@/core/interfaces/record.interface';

export interface IEditPage extends IComponent {
  editableText: string;
  editableTime: number;
  editableDate: Date;
  record: IRecord;
  executionEnd: { value: Date };
  text: string;
  executionTime: number;
}
