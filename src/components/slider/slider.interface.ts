import { IPoint } from '@/core/utills/geometry.utills';

export interface ISlider {
  startPoint: IPoint;
  position: number;
  maxCount: number;
}
