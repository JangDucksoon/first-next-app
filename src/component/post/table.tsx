import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';

import { SearchFilterType } from '@/type/post/searchFilter';

export async function PostTable({ term }: SearchFilterType) {
    await new Promise<>((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`http://localhost:3000/data/posts.json`);
    const list = await response.json();

    const rows = term ? list.filter((data) => data.title.includes(term)) : list;
    return (
        <div>
            <Table hoverable>
                <TableHead>
                    <TableRow>
                        <TableHeadCell className="text-center">ID</TableHeadCell>
                        <TableHeadCell className="text-center">Title</TableHeadCell>
                        <TableHeadCell className="text-center">Contents</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y divide-gray-200">
                    {rows.map((row) => (
                        <TableRow key={row.id} className="cursor-pointer hover:bg-blue-100">
                            <TableCell className="text-center">{row.id}</TableCell>
                            <TableCell className="text-center">{row.title}</TableCell>
                            <TableCell>{row.content}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export function PostTableSkeleton() {
    const array = new Array(10).fill(null);
    return (
        <div>
            <Table hoverable={false}>
                <TableHead>
                    <TableRow className="text-center">
                        <TableHeadCell>ID</TableHeadCell>
                        <TableHeadCell>Title</TableHeadCell>
                        <TableHeadCell>Contents</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y divide-gray-200">
                    {array.map((_, idx) => (
                        <TableRow key={idx}>
                            <TableCell>
                                <PurseCell />
                            </TableCell>
                            <TableCell>
                                <PurseCell />
                            </TableCell>
                            <TableCell>
                                <PurseCell />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export function PurseCell() {
    return <div className="h-6 animate-pulse rounded bg-gray-300" />;
}
