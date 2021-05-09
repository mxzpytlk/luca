export interface IPassInput {
  inputType: 'password' | 'text';
  key: number;
  changePassVisibility: () => void;
}
