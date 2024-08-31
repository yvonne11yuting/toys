export interface Vocabulary {
  question: string;
  answer: string;
}

export interface CommonState {
  vocabularies: Vocabulary[] | [];
}
