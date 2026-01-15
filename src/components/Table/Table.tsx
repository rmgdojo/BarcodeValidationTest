import { useState } from "react";
import StatusIndicator from "./statusIndicator";
import Pagination from "./pagination";
import "./table.css";

export type Row = {
  id: number;
  barcode: string;
  status: string;
};

type TableProps = {
  data: Row[];
  rowsPerPage?: number;
};

export default function Table({ data, rowsPerPage = 3 }: TableProps) {
  const [page, setPage] = useState(0);

  const start = page * rowsPerPage;
  const paginatedData = data.slice(start, start + rowsPerPage);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div>
      <table className="tableStyle">
        <thead>
          <tr>
            <th className="headingStyle">Barcode</th>
            <th className="headingStyle">Status</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id}>
              <td className="textStyle">{row.barcode}</td>
              <td className="textStyle">
                <StatusIndicator status={row.status} />
              </td>
            </tr>
          ))}

          {paginatedData.length === 0 && (
            <tr>
              <td colSpan={2} className="empty">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 0))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
      />
    </div>
  );
}
