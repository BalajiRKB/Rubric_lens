export interface Rubric {
  id: string;
  criteria: string;
  maxScore: number;
}

export interface EvaluationResult {
  criteriaId: string;
  score: number;
  feedback: string;
}

export interface FileWithPreview extends File {
  preview?: string;
}