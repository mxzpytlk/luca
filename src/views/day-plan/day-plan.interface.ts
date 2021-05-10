import { IComponent } from '@/core/interfaces/component.interface';
import { IRecord } from '@/core/interfaces/record.interface';

export interface IDayPlan extends IComponent {
  selectedRecords: IRecord[];
  recordsShow: IRecord[];
  errText: string;
  todayRecords: IRecord[];
}
