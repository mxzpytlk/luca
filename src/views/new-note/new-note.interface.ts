import { IComponent } from '@/core/interfaces/component.interface';
import { ISector } from '@/core/interfaces/sector.interface';

export interface INewNote extends IComponent {
  title: string;
  text: string;
  planedTime: number;
  errText: string;
  sectors: ISector[];
}
