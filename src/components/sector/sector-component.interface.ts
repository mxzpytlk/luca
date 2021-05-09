import { IRecord } from '@/core/interfaces/record.interface';
import { IComponent } from '../../core/interfaces/component.interface';

export interface ISectorComp extends IComponent {
  isRecords: boolean;
  highlightedRecords: IRecord[];
  activeRecord?: IRecord;
}
