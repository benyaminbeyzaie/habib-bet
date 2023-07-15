import Question from "./question";

interface Contest {
  id: number;
  name: string;
  start: Date;
  end: Date;
  user_count: number;
  questions: Question[];
  question_count: number;
  registered: boolean;
}

export default Contest;
