import { RouterPath } from '../enums/router-path';

export interface IRouterViewPath {
  name: string;
  path: RouterPath;
}

export const viewPath: IRouterViewPath[] = [
  {
    name: 'Add note',
    path: RouterPath.MAIN,
  },
  {
    name: 'Main',
    path: RouterPath.MAIN,
  },
  {
    name: 'Statistics',
    path: RouterPath.MAIN,
  },
  {
    name: 'Delete sector',
    path: RouterPath.MAIN,
  },
  {
    name: 'Acount',
    path: RouterPath.MAIN,
  },
];
