import Question from "@/components/question";
import QUESTIONS from "../../../public/questions.json";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Lesson() {
  const router = useRouter();
  const lessonNum = parseInt(router.query.lessonNum);

  return (
    <main className="flex flex-col items-center p-24">
      <h1 className="text-4xl font-bold text-center">Lesson #{lessonNum}</h1>
      <div className="text-lg m-8 w-prose">
        <p>This is important info you should know</p>
        <p>...</p>
        <p>...</p>
        <p>...</p>
      </div>
      <hr />
      {QUESTIONS[lessonNum] && <Question id={QUESTIONS[lessonNum].id} />}
      <div className="flex justify-evenly gap-3 m-3 mt-10">
        {+lessonNum > 1 && (
          <Link href={`/lesson/${+lessonNum - 1}`}>
            <button>Prev Lesson</button>
          </Link>
        )}
        {+lessonNum <= 10 && (
          <Link href={`/lesson/${lessonNum + 1}`}>
            <button>Next Lesson</button>
          </Link>
        )}
      </div>
    </main>
  );
}
