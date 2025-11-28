import { useState } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/20 to-purple-900/40"></div>
      </div>
      
      <header className="relative z-10 border-b border-white/20 bg-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-3 rounded-2xl shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 text-transparent bg-clip-text">
                  Rubric-Lens
                </h1>
                <p className="text-sm text-cyan-200 font-medium">Professional Assessment Platform</p>
              </div>
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.02, x: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => setShowLandingPage(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className={`${
          results
          ? 'grid grid-cols-1 xl:grid-cols-2 gap-8 items-start'
          : 'flex items-start justify-center min-h-[calc(100vh-200px)]'
        }`}>
          
          <div className={`space-y-6 ${results ? 'w-full' : 'max-w-2xl w-full'}`}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="glass-card p-8 floating-element"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-white">Upload Your Submission</h2>
              </div>
              <FileUpload onFileSelect={handleFileSelect} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="glass-card p-8 floating-element"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-white">Evaluation Criteria</h2>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEvaluate}
                  disabled={isEvaluating || !selectedFile}
                  className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center gap-3 shadow-lg
                    ${isEvaluating || !selectedFile
                      ? 'bg-gray-500/50 cursor-not-allowed opacity-60'
                      : 'btn-success hover:shadow-green-500/25'
                    }`}
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Evaluation</span>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </>
                  )}
                </motion.button>
              </div>
              
              <RubricEditor rubric={rubric} onRubricChange={setRubric} />
            </motion.div>
          </div>
          
          {results && (
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full space-y-6"
            >
              <EvaluationResults results={results} rubric={rubric} />
            </motion.div>
          )}
          
          {!results && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center max-w-md mx-auto mt-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center border border-violet-500/30">
                <GraduationCap className="w-12 h-12 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Ready to Begin</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Upload your submission and set your evaluation criteria to get started with AI-powered assessment.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;