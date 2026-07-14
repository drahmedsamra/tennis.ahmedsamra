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
      <div className="space-y-10">
  
        <section>
  
          <h3 className="text-2xl font-bold">
            المدرب
          </h3>
  
          <p className="mt-3 text-xl">
            {coach}
          </p>
  
        </section>
  
        <hr />
  
        <section>
  
          <h3 className="text-2xl font-bold">
            الملاحظات
          </h3>
  
          <div className="mt-6 space-y-5">
  
            {content.map((item) => (
              <p key={item} className="text-xl leading-10">
                {item}
              </p>
            ))}
  
          </div>
  
        </section>
  
        <hr />
  
        <section>
  
          <h3 className="text-2xl font-bold">
            أهداف الأسبوع القادم
          </h3>
  
          <ul className="mt-6 space-y-4">
  
            {goals.map((goal) => (
              <li key={goal} className="text-xl">
                  ✅ {goal}
              </li>
            ))}
  
          </ul>
  
        </section>
  
      </div>
    );
  }