import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  coach: string;
  content: string;
  goals: string[];
};

export default function ReportContent({
  coach,
  content,
  goals,
}: Props) {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-10">
      {/* المدرب */}
      <section className="text-center">
        <h3 className="mb-2 text-xl font-bold text-slate-900">
          👨‍🏫 المدرب
        </h3>

        <p className="text-lg text-slate-600">
          {coach}
        </p>
      </section>

      <hr className="border-slate-200" />

      {/* التقرير */}
      <section>
        <h3 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          📝 التقرير الفني
        </h3>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-8 text-center text-3xl font-bold text-slate-900 md:text-4xl">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <div className="mt-10 mb-6 rounded-xl bg-green-50 border border-green-200 px-5 py-3">
                  <h2 className="text-2xl font-bold text-green-700">
                    {children}
                  </h2>
                </div>
              ),

              h3: ({ children }) => (
                <h3 className="mt-8 mb-4 text-xl font-semibold text-slate-900">
                  {children}
                </h3>
              ),

              p: ({ children }) => (
                <p className="mb-5 text-right text-lg leading-8 text-slate-700">
                  {children}
                </p>
              ),

              ul: ({ children }) => (
                <ul className="mb-6 space-y-3 pr-6 marker:text-green-600 list-disc">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="mb-6 space-y-3 pr-6 marker:text-green-600 list-decimal">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="text-right text-lg leading-8 text-slate-700">
                  {children}
                </li>
              ),

              strong: ({ children }) => (
                <strong className="font-bold text-slate-900">
                  {children}
                </strong>
              ),

              hr: () => (
                <div className="my-10 border-t border-slate-200" />
              ),

              blockquote: ({ children }) => (
                <blockquote className="my-8 rounded-2xl border-r-4 border-green-600 bg-green-50 p-6 text-right text-lg italic leading-8 text-green-800">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </section>

      {goals.length > 0 && (
        <>
          <hr className="border-slate-200" />

          <section>
            <h3 className="mb-6 text-center text-2xl font-bold text-slate-900">
              🎯 أهداف الأسبوع القادم
            </h3>

            <div className="space-y-4">
              {goals.map((goal) => (
                <div
                  key={goal}
                  className="rounded-2xl border border-green-200 bg-green-50 p-5 text-right text-lg text-slate-700 shadow-sm"
                >
                  ✅ {goal}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}