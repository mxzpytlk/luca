import { IComponent } from '../../core/interfaces/component.interface';

export interface IAuthPage extends IComponent {
  name: string;
  pass: string;
  repeatPass: string;
  errText: string;
  isPassRegister: boolean;
}
