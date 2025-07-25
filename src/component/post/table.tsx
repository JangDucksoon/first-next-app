import { HelperText, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import React from 'react';
import Link from 'next/link';

import { getAllPosts } from '@/lib/post-api';
import { SearchFilterType } from '@/type/post/postType';

export async function PostTable({ term }: SearchFilterType) {
    const rows = await getAllPosts(term || '');

    return (
        <>
            <div className="mb-6">
                <HelperText color={term ? 'success' : 'gray'}>{term ? 'Search completed successfully.' : 'Please enter a search term.'}</HelperText>
            </div>
            <div>
                <Table hoverable className="w-full table-fixed">
                    <colgroup>
                        <col className="w-1/12" />
                        <col className="w-4/12" />
                        <col className="w-7/12" />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="text-center">ID</TableHeadCell>
                            <TableHeadCell className="text-center">Title</TableHeadCell>
                            <TableHeadCell className="text-center">Contents</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y divide-gray-200">
                        {rows.map((row, idx) => (
                            <TableRow key={idx} className="hover:bg-blue-100">
                                <TableCell className="text-center">
                                    <span className="truncate">{row.id}</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Link href={`/post/${row.id}`} className="underline">
                                        <span className="block max-w-full truncate hover:animate-bounce">{row.title}</span>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <span className="block max-w-full truncate">{row.content}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export function PostTableSkeleton() {
    const array = new Array(10).fill(null);
    return (
        <>
            <div className="mb-6">
                <HelperText color="info">Searching...</HelperText>
            </div>
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
        </>
    );
}

export function PurseCell() {
    return <div className="h-6 animate-pulse rounded bg-gray-300" />;
}
