'use client';
import { DateTime } from 'luxon';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';
export const usePagination = () => {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  );
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );
  const [perPage, setPerPage] = useQueryState(
    'page_size',
    parseAsInteger.withDefault(20).withOptions({ clearOnDefault: true }),
  );
  const [uuid, setUUID] = useQueryState(
    'uuid',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  );

  const [fromDate, setFromDate] = useQueryState(
    'fromDate',
    parseAsString
      .withDefault(DateTime.now().minus({ days: 7 }).toFormat('yyyy-MM-dd'))
      .withOptions({ clearOnDefault: true }),
  );
  const [toDate, setToDate] = useQueryState(
    'toDate',
    parseAsString
      .withDefault(DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd'))
      .withOptions({ clearOnDefault: true }),
  );

  const [date, setDate] = useQueryState(
    'date',
    parseAsString.withOptions({ clearOnDefault: true }),
  );

  const query = useMemo(() => {
    return {
      search,
      page,
      perPage,
    };
  }, [search, page, perPage]);

  return {
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    query,
    uuid,
    setUUID,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    date,
    setDate,
  };
};
