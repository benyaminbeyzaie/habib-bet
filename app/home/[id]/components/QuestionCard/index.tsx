import Button from "@/app/components/Button";
import Question from "@/lib/types/question";
import React, { useState } from "react";
import QuestionCardSkeleton from "./QuestionCardSkeleton";
import { submitAnswer } from "@/lib/api";
import classNames from "classnames";

interface Props {
  question: Question | null;
  reload: () => void;
  isFetching: boolean;
  isHistory: boolean;
}

function QuestionCard(props: Props) {
  const { question, reload, isFetching, isHistory } = props;
  const [loading, setLoading] = useState<boolean>(false);

  if (!question) {
    return <QuestionCardSkeleton />;
  }
  const submit = async (option: "A" | "B") => {
    try {
      console.log("dd");
      setLoading(true);
      await submitAnswer(question.id, option);
      reload();
    } finally {
      setLoading(false);
    }
  };

  const loadingAnswer = loading || isFetching;

  return (
    <section className="pt-5">
      <div className="relative items-center w-full py-3 mx-auto">
        <div
          className={classNames(
            "w-full p-4 mx-auto text-left align-bottom transition-all transform bg-gray-100 sm:align-middle sm:p-8 rounded-2xl",
            {
              "bg-green-200":
                isHistory && question.user_answer === question.answer,
              "bg-red-200":
                isHistory && question.user_answer !== question.answer,
            }
          )}
        >
          <div className="w-full mb-4">
            {
              <p>{`Your selected answer: ${
                loadingAnswer ? "LOADING..." : question.user_answer
              }`}</p>
            }
            {isHistory && (
              <>
                <p>{`A: ${question.option_a}`} </p>
                <p>{`B: ${question.option_b}`} </p>
              </>
            )}

            {!isHistory && (
              <>
                <p>Choose an option:</p>

                <div className="flex flex-row my-5 gap-5">
                  <Button
                    disabled={loadingAnswer}
                    className="w-full"
                    label={question.option_a}
                    onClick={() => submit("A")}
                  />
                  <Button
                    disabled={loadingAnswer}
                    className="w-full"
                    label={question.option_b}
                    onClick={() => submit("B")}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuestionCard;
