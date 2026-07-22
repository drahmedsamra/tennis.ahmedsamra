
import {
    AssessmentCard,
    AssessmentStats,
    AssessmentSteps,
  } from ".";
  
  export function AssessmentSection() {
    return (
      <section
        id="assessment"
        className="bg-gradient-to-b from-background to-muted/30 py-16 lg:py-20"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <AssessmentCard />
  
          <div className="mt-10">
            <AssessmentStats />
          </div>
  
          <div className="mt-10">
            <AssessmentSteps />
          </div>
        </div>
      </section>
    );
  }