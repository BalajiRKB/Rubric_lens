import React, { useState } from 'react';
import { Plus, Trash2, FileText, List } from 'lucide-react';
import type { Rubric } from '../types';
import { motion } from "motion/react";

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Evaluation Rubric</h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMode}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
          >
            {isTextMode ? <List className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            {isTextMode ? 'List Mode' : 'Text Mode'}
          </motion.button>
          {!isTextMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addCriteria}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Criteria
            </motion.button>
          )}
        </div>
      </div>
      
      {isTextMode ? (
        <div className="space-y-2">
          <p className="text-sm text-gray-300">Enter each rubric criteria on a new line:</p>
          <textarea
            value={textAreaContent}
            onChange={handleTextAreaChange}
            className="w-full h-48 p-3 border border-gray-600 rounded-lg font-mono text-sm bg-gray-700 text-white placeholder-gray-400"
            placeholder="Example:
Content organization and structure
Technical accuracy and depth
Visual presentation quality
References and citations"
          />
        </div>
      ) : (
        <div className="space-y-3">
          {rubric.map((criteria, index) => (
            <motion.div 
              key={criteria.id} 
              className="flex gap-4 items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <input
                type="text"
                value={criteria.criteria}
                onChange={(e) => updateCriteria(criteria.id, 'criteria', e.target.value)}
                placeholder="Enter criteria description"
                className="flex-1 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              />
              <input
                type="number"
                value={criteria.maxScore}
                onChange={(e) => updateCriteria(criteria.id, 'maxScore', parseInt(e.target.value))}
                min="1"
                max="100"
                className="w-24 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              />
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => removeCriteria(criteria.id)}
                className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}