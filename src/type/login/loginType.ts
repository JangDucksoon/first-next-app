export type LoginType = {
    id: string;
    password: string;
};

export type UserType = {
    authorCode: string;
    authorNm: string;
    email: string;
    id: string;
    ip: string | null;
    name: string;
    orgnztId: string | null;
    orgnztNm: string | null;
    picture: string | null;
    uniqId: string;
};
