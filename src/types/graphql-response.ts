export interface GetListQueryResponse<TItem> {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  totalCount: number;
  items: TItem[];
}
