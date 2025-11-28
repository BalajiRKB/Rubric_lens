import type { EvaluationResult, Rubric } from '../types';
import { motion } from "motion/react";
import { Trophy, Target, TrendingUp, CheckCircle, AlertCircle, Download, Share2, FileText } from 'lucide-react';

interface EvaluationResultsProps {
  results: EvaluationResult[];
  rubric: Rubric[];
}

export function EvaluationResults({ results, rubric }: EvaluationResultsProps) {
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);
  const maxPossibleScore = rubric.reduce((sum, criteria) => sum + criteria.maxScore, 0);
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'from-emerald-400 to-green-500';
    if (percentage >= 80) return 'from-blue-400 to-cyan-500';
    if (percentage >= 70) return 'from-yellow-400 to-orange-500';
    if (percentage >= 60) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-pink-500';
  };

  const getGradeLabel = (percentage: number) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Good';
    if (percentage >= 70) return 'Satisfactory';
    if (percentage >= 60) return 'Needs Improvement';
    return 'Poor';
  };

  const getScoreIcon = (score: number, maxScore: number) => {
    const scorePercentage = (score / maxScore) * 100;
    if (scorePercentage >= 80) return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    if (scorePercentage >= 60) return <Target className="w-5 h-5 text-yellow-400" />;
    return <AlertCircle className="w-5 h-5 text-orange-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header with overall score */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass-card p-8 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10"></div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center"
          >
            <Trophy className="w-10 h-10 text-cyan-400" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Evaluation Complete</h2>
          <p className="text-neutral-400 mb-6">Here's how the submission performed</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {totalScore}<span className="text-lg text-neutral-400">/{maxPossibleScore}</span>
              </div>
              <div className="text-sm font-medium text-neutral-400">Total Score</div>
            </div>
            
            <div className="text-center">
              <div className={`text-3xl font-bold bg-gradient-to-r ${getGradeColor(percentage)} text-transparent bg-clip-text mb-1`}>
                {percentage}%
              </div>
              <div className="text-sm font-medium text-neutral-400">Overall Score</div>
            </div>
            
            <div className="text-center">
              <div className={`text-lg font-bold bg-gradient-to-r ${getGradeColor(percentage)} text-transparent bg-clip-text mb-1`}>
                {getGradeLabel(percentage)}
              </div>
              <div className="text-sm font-medium text-neutral-400">Grade</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative w-full max-w-md mx-auto">
            <div className="w-full bg-neutral-700 rounded-full h-3 mb-4">
              <motion.div
                className={`h-3 rounded-full bg-gradient-to-r ${getGradeColor(percentage)}`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Download Report
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <Share2 className="w-4 h-4" />
              Share Results
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Detailed breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
          <h3 className="text-xl font-semibold text-white">Detailed Breakdown</h3>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => {
            const criteriaDetails = rubric.find(r => r.id === result.criteriaId);
            const scorePercentage = criteriaDetails ? (result.score / criteriaDetails.maxScore) * 100 : 0;
            
            return (
              <motion.div 
                key={result.criteriaId} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="group glass-card p-6 hover:bg-white/[0.12] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getScoreIcon(result.score, criteriaDetails?.maxScore || 1)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-white mb-2 leading-tight">
                        {criteriaDetails?.criteria}
                      </h4>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-white">{result.score}</span>
                          <span className="text-neutral-400">/ {criteriaDetails?.maxScore}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          scorePercentage >= 80 
                            ? 'bg-green-500/20 text-green-300' 
                            : scorePercentage >= 60 
                              ? 'bg-yellow-500/20 text-yellow-300'
                              : 'bg-orange-500/20 text-orange-300'
                        }`}>
                          {Math.round(scorePercentage)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar for individual criteria */}
                <div className="mb-4">
                  <div className="w-full bg-neutral-700/50 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        scorePercentage >= 80 
                          ? 'bg-gradient-to-r from-green-400 to-green-500' 
                          : scorePercentage >= 60 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                            : 'bg-gradient-to-r from-orange-400 to-red-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${scorePercentage}%` }}
                      transition={{ duration: 1, delay: 0.3 + (index * 0.1) }}
                    />
                  </div>
                </div>

                {/* Feedback */}
                <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm font-medium text-neutral-400">AI Feedback</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    {result.feedback}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Summary insights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Key Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-neutral-800/50 rounded-lg p-4 border border-green-500/20">
            <h4 className="font-medium text-green-300 mb-2">Strengths</h4>
            <p className="text-sm text-neutral-300">
              {results.filter(r => {
                const criteria = rubric.find(c => c.id === r.criteriaId);
                return criteria && (r.score / criteria.maxScore) >= 0.8;
              }).length} criteria performed excellently
            </p>
          </div>
          
          <div className="bg-neutral-800/50 rounded-lg p-4 border border-orange-500/20">
            <h4 className="font-medium text-orange-300 mb-2">Areas for Improvement</h4>
            <p className="text-sm text-neutral-300">
              {results.filter(r => {
                const criteria = rubric.find(c => c.id === r.criteriaId);
                return criteria && (r.score / criteria.maxScore) < 0.6;
              }).length} criteria need attention
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}