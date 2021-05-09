import { IComponent } from '../../core/interfaces/component.interface';

export interface IAcount extends IComponent {
  showForm: boolean;
  errorText: string;
  passField: IPassField[];
}

interface IPassField {
  placeholder: string;
  pass: string;
}
