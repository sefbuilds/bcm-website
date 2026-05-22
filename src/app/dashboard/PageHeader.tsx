import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: Props) {
  return (
    <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
      <div>
        {eyebrow && (
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-terracotta" />
            <span className="text-[10px] font-medium tracking-[0.24em] uppercase text-terracotta">
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-pearl tracking-[-0.03em]">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-pearl-80 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
