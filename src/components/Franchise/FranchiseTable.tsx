import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
// I'm using these components
// Show me the table filter setup similar to what's being shown in this page but with flowbite react
// https://flowbite.com/blocks/application/advanced-tables/
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
  TextInput,
  Spinner
} from 'flowbite-react';
//   import {
//     FranchiseData,
//     FranchiseFilter,
//     getFranchises
//   } from '@/src/utils/Services/FranchiseService';

import Link from 'next/link';
import endpoints, {
  GetFranchiseDto,
  RequestFranchisesDto
} from '@/src/endpoints';
import If from '../utils/If';

const columnHelper = createColumnHelper<GetFranchiseDto>();

const columns = [
  columnHelper.accessor('id', {
    header: 'Id',
    enableGlobalFilter: false,
    cell: (info) => (
      <Link
        href={`/franchises/${info.getValue()}`}
        className="text-blue-500 hover:underline"
      >
        {info.getValue()}
      </Link>
    )
  }),
  columnHelper.accessor('name', {
    header: 'Franchise Name',
    enableGlobalFilter: true
  })
];

const FranchiseTable = () => {
  const [data, setData] = useState<GetFranchiseDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        //   await getFranchises(
        //     currentPage,
        //     setCurrentPage,
        //     setTotalPages,
        //     setData,
        //     undefined
        //   );
        await endpoints.franchise.allFranchises({
          page: 0,
          perPage: 10,
          franchiseName: undefined
        });
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onPageChange = async (page: number) => {
    //   await getFranchises(
    //     page,
    //     setCurrentPage,
    //     setTotalPages,
    //     setData,
    //     undefined
    //   );
    const data = await endpoints.franchise.allFranchises({
      page: 0,
      perPage: 10,
      franchiseName: undefined
    });
    setCurrentPage(page);
    setTotalPages(data.totalPages ?? 0);
    setData(data.franchises ?? []);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualFiltering: true,
    state: {
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      globalFilter: 'search term'
    }
  });

  return (
    <div
      style={{
        width: '90%'
      }}
    >
      <div>
        <If condition={!isLoading}>
          <TextInput
            style={{
              marginBottom: 20
            }}
            placeholder={'Franchise name'}
            onChange={async (e) => {
              table.setGlobalFilter(String(e.target.value));
              const data = await endpoints.franchise.allFranchises({
                page: 0,
                perPage: 10,
                franchiseName: e.target.value
              });
              setCurrentPage(currentPage);
              setTotalPages(data.totalPages ?? 0);
              setData(data.franchises ?? []);
            }}
          />
        </If>
      </div>
      <If
        condition={isLoading}
        then={<Spinner />}
        else={
          <div>
            <Table striped>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHeadCell key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHeadCell>
                    ))}
                  </tr>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages ?? 1}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default FranchiseTable;
