import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Column<T> = {
  header: string;
  accessor: keyof T;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export function DataTable<T extends Record<string, string>>({
  columns,
  data,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.accessor)}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={`${row[columns[0].accessor]}-${index}`}>
              {columns.map((column) => (
                <TableCell key={String(column.accessor)}>
                  {row[column.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
