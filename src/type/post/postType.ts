export type SearchFilterType = {
    helperText?: string;
    term?: string;
    helperType?: string;
    view?: 'card' | 'table';
};

export type PostType = {
    id?: string;
    title?: string;
    summary?: string;
    author?: string;
    category?: string;
    createdAt?: string;
    views?: number;
    likes?: number;
    content?: string;
    imageSrc?: string;
};
