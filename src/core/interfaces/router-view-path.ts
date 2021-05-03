import { RouterPath } from '../enums/router-path';

export interface IRouterViewPath {
  name: string;
  path: RouterPath;
  fullPath?: RouterPath[];
}

export const viewPath: IRouterViewPath[] = [
  {
    name: 'add_note',
    path: RouterPath.NEW_NOTE,
    fullPath: [RouterPath.MAIN, RouterPath.NEW_NOTE],
  },
  {
    name: 'main',
    path: RouterPath.MAIN,
  },
  {
    name: 'statistics',
    path: RouterPath.MAIN,
  },
  {
    name: 'delete_sector',
    path: RouterPath.DELETE_SECTOR,
    fullPath: [RouterPath.MAIN, RouterPath.DELETE_SECTOR],
  },
  {
    name: 'acount',
    path: RouterPath.ACOUNT,
    fullPath: [RouterPath.MAIN, RouterPath.ACOUNT],
  },
];
