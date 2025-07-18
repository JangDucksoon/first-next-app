export type SearchFilterType = {
    helperText?: string;
    term?: string;
    helperType?: string;
};

export type PostType = {
    id?: number;
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
