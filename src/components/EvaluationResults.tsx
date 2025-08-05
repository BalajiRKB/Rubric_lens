import type { EvaluationResult, Rubric } from '../types';
import { motion } from "motion/react";

interface EvaluationResultsProps {
  results: EvaluationResult[];
  rubric: Rubric[];
}

export function EvaluationResults({ results, rubric }: EvaluationResultsProps) {
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);
  const maxPossibleScore = rubric.reduce((sum, criteria) => sum + criteria.maxScore, 0);
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Evaluation Results</h2>
        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600">
          <div>
            <p className="text-gray-300">Total Score</p>
            <p className="text-3xl font-bold text-white">{totalScore}/{maxPossibleScore}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-300">Percentage</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">{percentage}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => {
          const criteriaDetails = rubric.find(r => r.id === result.criteriaId);
          return (
            <motion.div 
              key={result.criteriaId} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-600 rounded-lg p-4 bg-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-white">
                  {criteriaDetails?.criteria}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-white">{result.score}</span>
                  <span className="text-gray-400">/ {criteriaDetails?.maxScore}</span>
                </div>
              </div>
              <p className="text-gray-300">{result.feedback}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}