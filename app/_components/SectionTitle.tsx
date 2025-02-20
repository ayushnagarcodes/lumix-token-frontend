interface SectionTitleProps {
  title: string;
  children: React.ReactNode;
}

function SectionTitle({ title, children }: SectionTitleProps) {
  return (
    <>
      <div className="bg-slate-600 text-white rounded-lg p-3 flex items-center justify-center">
        {children}
      </div>

      <h2 className="text-xl font-medium">{title}</h2>
    </>
  );
}

export default SectionTitle;
