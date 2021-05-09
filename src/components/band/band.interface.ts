import { IRecord } from '@/core/interfaces/record.interface';
import { ISector } from '@/core/interfaces/sector.interface';
import { IComponent } from '../../core/interfaces/component.interface';

export interface IBand extends IComponent {
  activeRecord: IRecord;
  recordLookingFor: string;
  sectors: ISector[];
  allRecords: IRecord[];
}
