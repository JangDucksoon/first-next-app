import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';

import { SearchFilterType } from '@/type/post/searchFilter';

export default async function PostTable({ term }: SearchFilterType) {
    await new Promise<>((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`http://localhost:3000/data/posts.json`);
    const list = await response.json();

    const rows = term ? list.filter((data) => data.title.includes(term)) : list;
    return (
        <div>
            <Table hoverable>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>ID</TableHeadCell>
                        <TableHeadCell>Title</TableHeadCell>
                        <TableHeadCell>Contents</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y divide-gray-200">
                    {rows.map((row) => (
                        <TableRow key={row.id} className="cursor-pointer hover:bg-blue-100">
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.title}</TableCell>
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
        <div className="cursor-not-allowed">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>&nbsp;</TableHeadCell>
                        <TableHeadCell>&nbsp;</TableHeadCell>
                        <TableHeadCell>&nbsp;</TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody className="divide-y divide-gray-200">
                    {array.map((_, idx) => (
                        <TableRow key={idx} className="cursor-pointer hover:bg-blue-100">
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>&nbsp;</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
