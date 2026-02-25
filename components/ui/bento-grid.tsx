import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 border border-[var(--card-border)] rounded-2xl group/bento hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out shadow-sm dark:shadow-none p-6 pb-0 bg-[var(--card-background)] justify-between flex flex-col space-y-4 overflow-hidden",
        "hover:border-neutral-300 dark:hover:border-neutral-700",
        className
      )}
    >
      <div className="group-hover/bento:translate-x-1 transition duration-300">
        <div className="flex items-center gap-2 mb-2">
            {icon}
            <div className="font-bold text-[var(--card-foreground)] tracking-tight">
              {title}
            </div>
        </div>
        <div className="font-normal text-[var(--card-muted)] text-sm leading-snug max-w-[240px]">
          {description}
        </div>
      </div>
      <div className="flex flex-1 w-full h-full min-h-[14rem] rounded-t-xl overflow-hidden bg-[var(--card-inner-background)] border-t border-x border-[var(--card-border)]">
        {header}
      </div>
    </div>
  )
};
