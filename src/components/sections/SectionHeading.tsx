type SectionHeadingProps = {
  id: string;
  index: string;
  label: string;
  title: string;
  summary?: string;
};

export function SectionHeading({ id, index, label, title, summary }: SectionHeadingProps) {
  return (
    <div className="section-heading-row">
      <p className="section-index">{index} / {label}</p>
      <div>
        <h2 className="section-heading" id={id}>{title}</h2>
        {summary && <p className="section-summary">{summary}</p>}
      </div>
    </div>
  );
}
