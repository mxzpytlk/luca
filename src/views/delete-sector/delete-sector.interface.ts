import { IComponent } from '@/core/interfaces/component.interface';
import { ISector } from '@/core/interfaces/sector.interface';

export interface IDeleteSector extends IComponent {
  removingSectors: Set<ISector>;
  key: number;
}
