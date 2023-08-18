"use client";
import { useMemo } from "react";
import QUESTIONS from "../../public/questions.json";
import { useQuery } from "@triplit/react";
import { useSession } from "next-auth/react";
import { useClient } from "@/hooks/use-triplit-client";

export default function Question({ id }: { id: string }) {
  const session = useSession();
  const questionData = useMemo(() => QUESTIONS.find((q) => q.id === id), [id]);
  const client = useClient();
  const { results } = useQuery(
    client,
    client?.query("answers").where([["questionId", "=", id]])
  );

  const answerId = `${id}|${session?.data?.user?.name}`;

  const hasSelectedAnswer = results && results.has(answerId);
  const isAnswerCorrect =
    questionData &&
    hasSelectedAnswer &&
    results.get(answerId).pick === questionData.correctAnswer;

  if (!questionData) return <div>Could not load question</div>;
  return (
    <div>
      <span className="text-sm uppercase">Question</span>{" "}
      <h3 className="text-xl italic mb-3">{questionData.prompt}</h3>
      {hasSelectedAnswer && (
        <div className="p-2">
          {isAnswerCorrect ? (
            <div className="text-green-500">Correct!</div>
          ) : (
            <div className="text-red-500">Not quite! Try again.</div>
          )}
        </div>
      )}
      <div className="p-2 gap-2 flex flex-col">
        {questionData.answers.map((answer, i) => (
          <button
            className={`p-3 w-[500px] text-left rounded bg-purple-900/20 hover:scale-105 hover:bg-purple-900/30 border ${
              hasSelectedAnswer && results.get(answerId)?.pick === i
                ? isAnswerCorrect
                  ? "border-green-500"
                  : "border-red-500"
                : "border-purple-800/20"
            }`}
            key={i}
            onClick={async () => {
              if (!session?.data?.user?.name) return;
              await client?.insert(
                "answers",
                {
                  pick: i,
                  questionId: id,
                  userId: session?.data?.user?.name,
                },
                answerId
              );
            }}
          >
            <span className="uppercase opacity-50 mr-2">
              {String.fromCharCode(97 + i)}
            </span>{" "}
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
