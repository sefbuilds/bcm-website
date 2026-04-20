import type { ReactNode } from "react";

type Column<T> = {
  header: string;
  key: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

type Props<T> = {
  rows: T[];
  columns: Column<T>[];
  empty?: ReactNode;
  getKey: (row: T) => string;
};

export default function DashboardTable<T>({
  rows,
  columns,
  empty,
  getKey,
}: Props<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl hairline bg-ink-2 px-6 py-14 text-center text-sm text-pearl-60">
        {empty ?? "Geen gegevens gevonden."}
      </div>
    );
  }

  return (
    <div className="rounded-xl hairline overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-2 text-left">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-[10px] font-medium tracking-[0.24em] uppercase text-pearl-60 ${col.className ?? ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={getKey(row)}
                className={`hairline-t ${i % 2 === 0 ? "bg-ink" : "bg-ink/60"}`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 align-top text-pearl ${col.className ?? ""}`}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
