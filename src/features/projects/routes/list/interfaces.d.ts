import { ISimplifiedProject } from '../../types';

export interface LoaderData {
  projects: ISimplifiedProject[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}
