export interface IQuestionProps<T>{
  question: string;
  responseSetter: (response: T) => void;
}
