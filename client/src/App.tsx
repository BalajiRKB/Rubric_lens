import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { RubricEditor } from './components/RubricEditor';
import { EvaluationResults } from './components/EvaluationResults';
import { LandingPage } from './components/LandingPage';
import { Loader2, GraduationCap, ArrowLeft } from 'lucide-react';
import { evaluateSubmission } from './lib/gemini';
import type { Rubric, EvaluationResult } from './types';
import toast from 'react-hot-toast';
import { motion } from "motion/react";

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rubric, setRubric] = useState<Rubric[]>([
    { id: '1', criteria: 'Visual clarity and organization', maxScore: 10 },
    { id: '2', criteria: 'Technical accuracy', maxScore: 10 },
    { id: '3', criteria: 'Completeness', maxScore: 10 }
  ]);
  const [results, setResults] = useState<EvaluationResult[] | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResults(null);
  };

  const handleEvaluate = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to evaluate');
      return;
    }

    if (rubric.length === 0) {
      toast.error('Please add at least one rubric criteria');
      return;
    }

    setIsEvaluating(true);
    try {
      let fileContent: string;
      
      // Handle different file types appropriately
      if (selectedFile.type.startsWith('image/') && !selectedFile.type.includes('svg')) {
        // For binary image formats (JPEG, PNG), read as base64 data URL
        fileContent = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });
      } else {
        // For SVG and other text-based formats, use text()
        fileContent = await selectedFile.text();
      }
      
      const evaluationResults = await evaluateSubmission(fileContent, rubric);
      setResults(evaluationResults);
      toast.success('Evaluation completed successfully');
    } catch (error) {
      console.error('Evaluation error:', error);
      toast.error('Failed to evaluate submission. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Show landing page
  if (showLandingPage) {
    return <LandingPage onGetStarted={() => setShowLandingPage(false)} />;
  }

  // Show main application
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 text-transparent bg-clip-text">
                Rubric-Lens
              </h1>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLandingPage(true)}
              className="flex items-center gap-2 text-gray-300 hover:text-white font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className={`${
          results
          ? 'flex flex-col lg:flex-row gap-8 items-start'
          : 'flex items-center justify-center min-h-screen'
        }`}>
          <div 
            className={`space-y-8 ${
              results ? 'flex-1' : 'max-w-3xl w-full px-4'
            }`}>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">Upload Submission</h2>
              <FileUpload onFileSelect={handleFileSelect} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Evaluation Criteria</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEvaluate}
                  disabled={isEvaluating || !selectedFile}
                  className={`px-6 py-2 rounded-lg font-medium text-white
                    ${isEvaluating || !selectedFile
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                    } transition-colors flex items-center gap-2`}
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    'Evaluate Submission'
                  )}
                </motion.button>
              </div>
              <RubricEditor rubric={rubric} onRubricChange={setRubric} />
            </motion.div>
          </div>
          
          {results && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 space-y-8"
            >
              <EvaluationResults results={results} rubric={rubric} />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;