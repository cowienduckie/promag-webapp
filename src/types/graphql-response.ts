export interface GetListQueryResponse<TItem> {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  items: TItem[];
}
