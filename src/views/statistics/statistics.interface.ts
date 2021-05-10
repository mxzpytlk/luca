import { IComponent } from '@/core/interfaces/component.interface';
import { ISector } from '@/core/interfaces/sector.interface';

export interface IStatistics extends IComponent {
  textLookingFor: string;
  sectors: ISector[];
}
