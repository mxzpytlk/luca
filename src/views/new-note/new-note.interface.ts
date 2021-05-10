import { IComponent } from '@/core/interfaces/component.interface';

export interface INewNote extends IComponent {
  title: string;
  text: string;
  planedTime: number;
  errText: string;
}
