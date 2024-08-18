import Image from "next/image";
import { Montserrat } from "next/font/google";
import styles from "../styles/home.module.css";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import questionsJSON from "../json/question.json";

const inter = Montserrat({ subsets: ["latin"] });
let questions = questionsJSON;

export default function Home() {
  const trees = [
    "red_tree.jpg",
    "trees.avif",
    "wavy_tree.avif",
    "red_tree.jpg",
    "trees.avif",
    "wavy_tree.avif",
  ];
  const [treeCount, setTreeCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(0);
  const [answers, setAnswers] = useState(questions);
  const [result, setResult] = useState("");

  const submitAnswer = (questionIndex: number, answerindex: number) => {
    let tempQuestions = answers;
    let tempprogress = progress;
    let count = 0;

    tempQuestions[questionIndex].submittedAnswer = answerindex;
    tempQuestions[questionIndex].disabled = true;
    tempQuestions.map(({ disabled }) => {
      if (disabled === true) count += 1;
    });
    tempprogress = (count / answers.length) * 100;
    setTimeout(() => {
      setSelected(questionIndex + 1);
    }, 500);
    setProgress(tempprogress);
    setAnswers([...tempQuestions]);
    setTreeCount(treeCount + 1);
  };

  useEffect(() => {
    let count = 0;
    answers.map(({ answer, submittedAnswer }) => {
      if (answer === submittedAnswer) {
        count += 1;
      }
    });
    setResult(`${count}/${answers.length}`);
    if (selected === answers.length) {
      console.log("exam finished ");
    }
  }, [selected]);

  const displayQuestions = answers
    .map(
      (
        { question, choice, answer, disabled, submittedAnswer },
        index: number
      ) => {
        let tempIndivquestions: any = {
          question,
          choice,
          answer,
          disabled,
          submittedAnswer,
        };
        tempIndivquestions = JSON.stringify(tempIndivquestions);
        return (
          <div className={styles.questionContainer} key={index}>
            <p className={styles.question}>{question}</p>
            <div className={styles.choices}>
              <div className={styles.choice}>
                <span
                  className={styles.singleChoice}
                  onClick={() => submitAnswer(index, 0)}
                >
                  {choice[0]}{" "}
                  <span
                    className={styles.circle}
                    style={{
                      backgroundColor: submittedAnswer === 0 ? "black" : "",
                    }}
                  ></span>
                </span>
                <span
                  className={styles.singleChoice}
                  onClick={() => submitAnswer(index, 1)}
                >
                  {choice[1]}{" "}
                  <span
                    className={styles.circle}
                    style={{
                      backgroundColor: submittedAnswer === 1 ? "black" : "",
                    }}
                  ></span>
                </span>
              </div>
              <div className={styles.choice}>
                <span
                  className={styles.singleChoice}
                  onClick={() => submitAnswer(index, 2)}
                >
                  {choice[2]}{" "}
                  <span
                    className={styles.circle}
                    style={{
                      backgroundColor: submittedAnswer === 2 ? "black" : "",
                    }}
                  ></span>
                </span>
                <span
                  className={styles.singleChoice}
                  onClick={() => submitAnswer(index, 3)}
                >
                  {choice[3]}{" "}
                  <span
                    className={styles.circle}
                    style={{
                      backgroundColor: submittedAnswer === 3 ? "black" : "",
                    }}
                  ></span>
                </span>
              </div>
            </div>
          </div>
        );
      }
    )
    .slice(selected, selected + 1);

  return (
    <main className={inter.className}>
      <div className={styles.container}>
        {selected !== answers.length && (
          <>
            {" "}
            <div className={styles.imageContainer}>
              <Image
                src={`/trees/${trees[treeCount]}`}
                alt={trees[0]}
                className={styles.image}
                height={400}
                width={400}
              />
              {/* <div className={styles.progress}> */}
              {/* </div> */}
            </div>
            <div className={styles.textContainer}>
              <div></div>
              <div>{displayQuestions}</div>

              <Progress
                value={progress}
                style={{ width: "70%", border: "solid black 1px" }}
                color=""
              />
            </div>{" "}
          </>
        )}
        {selected === answers.length && (
          <div className={styles.result}>
            <span className={styles.innerResult}>{result}</span>
          </div>
        )}
      </div>
    </main>
  );
  // return <main>hello there this is me</main>;
}
