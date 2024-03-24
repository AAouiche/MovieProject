export type SortField = 'date' | 'rating' | 'upvotes';
export type SortOrder = 'asc' | 'desc';

export type SortCriteria = {
    field: SortField;
    order: SortOrder;
};