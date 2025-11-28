import React, { useState } from 'react';
import { Plus, Trash2, FileText, List, Target, Award } from 'lucide-react';
import type { Rubric } from '../types';
import { motion, AnimatePresence } from "motion/react";

interface RubricEditorProps {
  rubric: Rubric[];
  onRubricChange: (rubric: Rubric[]) => void;
}

export function RubricEditor({ rubric, onRubricChange }: RubricEditorProps) {
  const [isTextMode, setIsTextMode] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState('');

  const addCriteria = () => {
    onRubricChange([
      ...rubric,
      { id: crypto.randomUUID(), criteria: '', maxScore: 10 }
    ]);
  };

  const removeCriteria = (id: string) => {
    onRubricChange(rubric.filter(r => r.id !== id));
  };

  const updateCriteria = (id: string, field: keyof Rubric, value: string | number) => {
    onRubricChange(
      rubric.map(r => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaContent(e.target.value);
    
    // Parse text area content into rubric items
    const lines = e.target.value.split('\n').filter(line => line.trim());
    const newRubric = lines.map(line => ({
      id: crypto.randomUUID(),
      criteria: line.trim(),
      maxScore: 10
    }));

    onRubricChange(newRubric);
  };

  const toggleMode = () => {
    if (!isTextMode) {
      // When switching to text mode, populate textarea with current rubric
      const text = rubric.map(r => r.criteria).join('\n');
      setTextAreaContent(text);
    }
    setIsTextMode(!isTextMode);
  };

  const getTotalScore = () => {
    return rubric.reduce((total, item) => total + item.maxScore, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-neutral-300">
              {rubric.length} {rubric.length === 1 ? 'Criterion' : 'Criteria'}
            </span>
          </div>
          <div className="w-px h-4 bg-neutral-600"></div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-neutral-300">
              {getTotalScore()} Total Points
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              isTextMode 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                : 'bg-neutral-700/50 text-neutral-300 border border-neutral-600/50 hover:border-neutral-500/50'
            }`}
          >
            {isTextMode ? <List className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            {isTextMode ? 'List Mode' : 'Bulk Edit'}
          </motion.button>

          <AnimatePresence>
            {!isTextMode && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(6, 182, 212, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                onClick={addCriteria}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Criterion
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isTextMode ? (
          <motion.div
            key="text-mode"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="glass-card p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Bulk Edit Criteria
                </label>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Enter each evaluation criterion on a new line. Each criterion will be assigned a default score of 10 points.
                </p>
              </div>
              
              <textarea
                value={textAreaContent}
                onChange={handleTextAreaChange}
                className="w-full h-48 input-field font-mono text-sm resize-none"
                placeholder={`Example criteria:
Content organization and clarity
Technical accuracy and depth  
Visual presentation quality
Use of evidence and sources
Grammar and writing mechanics`}
              />
              
              <div className="mt-3 text-xs text-neutral-500">
                {textAreaContent.split('\n').filter(line => line.trim()).length} criteria entered
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list-mode"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {rubric.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card p-12 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-700/50 flex items-center justify-center">
                    <Target className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No Criteria Yet</h3>
                  <p className="text-neutral-400 mb-6 max-w-md mx-auto leading-relaxed">
                    Add your first evaluation criterion to get started. You can always add more later.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addCriteria}
                    className="btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Criterion
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {rubric.map((criteria, index) => (
                    <motion.div
                      key={criteria.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group glass-card p-6 hover:bg-white/[0.12] transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                            <span className="text-sm font-semibold text-cyan-400">
                              {index + 1}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-neutral-400 mb-2">
                              Evaluation Criterion
                            </label>
                            <input
                              type="text"
                              value={criteria.criteria}
                              onChange={(e) => updateCriteria(criteria.id, 'criteria', e.target.value)}
                              placeholder="Describe what will be evaluated..."
                              className="w-full input-field text-base"
                            />
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-neutral-400 mb-2">
                                Maximum Score
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={criteria.maxScore}
                                  onChange={(e) => updateCriteria(criteria.id, 'maxScore', parseInt(e.target.value) || 1)}
                                  min="1"
                                  max="100"
                                  className="w-full input-field text-base pr-12"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
                                  pts
                                </div>
                              </div>
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeCriteria(criteria.id)}
                              className="mt-6 p-3 text-red-400 hover:text-red-300 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-200"
                              title="Remove criterion"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}