type Props = {
  coach: string;
  content: string[];
  goals: string[];
};

export default function ReportContent({
  coach,
  content,
  goals,
}: Props) {
  return (
    <div className="space-y-12">

      {/* المدرب */}
      <section>
        <h3 className="mb-4 text-3xl font-bold text-gray-900">
          👨‍🏫 المدرب
        </h3>

        <p className="text-xl text-gray-700">
          {coach}
        </p>
      </section>

      <hr className="border-gray-200" />

      {/* التقرير */}
      <section>
        <h3 className="mb-6 text-3xl font-bold text-gray-900">
          📝 التقرير الفني
        </h3>

        <div className="rounded-2xl bg-gray-50 p-8 shadow-sm border border-gray-200">

          {content.map((item) => (
            <p
              key={item}
              className="whitespace-pre-wrap text-[22px] leading-[2.3] text-gray-800 text-right"
            >
              {item}
            </p>
          ))}

        </div>
      </section>

      {goals.length > 0 && (
        <>
          <hr className="border-gray-200" />

          <section>
            <h3 className="mb-6 text-3xl font-bold text-gray-900">
              🎯 أهداف الأسبوع القادم
            </h3>

            <ul className="space-y-4">

              {goals.map((goal) => (
                <li
                  key={goal}
                  className="rounded-xl bg-green-50 p-4 text-xl text-gray-800"
                >
                  ✅ {goal}
                </li>
              ))}

            </ul>
          </section>
        </>
      )}

    </div>
  );
}