import React from 'react';
import { motion } from "motion/react";
import { GraduationCap, Upload, CheckSquare, BarChart2, Zap, ArrowRight, Mail, Github, Linkedin, ChevronRight } from 'lucide-react';

interface LandingPageProps {
    onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-transparent z-0"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
                
                <div className="max-w-7xl mx-auto pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            transition={{ duration: 0.8 }}
                            className="flex justify-center mb-8"
                        >
                            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-2xl shadow-lg">
                                <GraduationCap className="w-16 h-16 text-white" />
                            </div>
                        </motion.div>
                        
                        <motion.h1 
                            className="text-5xl md:text-6xl font-bold tracking-tight mb-8 bg-gradient-to-r from-white via-purple-200 to-indigo-200 text-transparent bg-clip-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Rubric-Lens
                            <span className="block text-4xl md:text-5xl mt-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                                AI-Powered Evaluation
                            </span>
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="max-w-2xl mx-auto text-xl text-gray-300 mb-12"
                        >
                            Transform the way you evaluate student work with our intelligent 
                            assessment platform powered by cutting-edge generative AI.
                        </motion.p>
                        
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)" }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            onClick={onGetStarted}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-4 px-10 rounded-xl text-lg shadow-lg flex items-center gap-3 mx-auto"
                        >
                            Get Started Now
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="bg-gray-800 py-24"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-4 text-white">How Rubric-Lens Works</h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-6"></div>
                            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                                Save hours of grading time with our AI-powered assessment platform
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature cards - each with staggered animation */}
                        {[
                            {
                                icon: <Upload className="w-12 h-12" />,
                                title: "Upload Submissions",
                                description: "Upload images or PDF documents containing student work for evaluation.",
                                delay: 0.2
                            },
                            {
                                icon: <CheckSquare className="w-12 h-12" />,
                                title: "Customize Rubrics",
                                description: "Create evaluation criteria with flexible scoring scales to match your assessment needs.",
                                delay: 0.4
                            },
                            {
                                icon: <Zap className="w-12 h-12" />,
                                title: "AI Evaluation",
                                description: "Let our advanced AI analyze submissions against your rubric for objective assessment.",
                                delay: 0.6
                            },
                            {
                                icon: <BarChart2 className="w-12 h-12" />,
                                title: "Detailed Insights",
                                description: "Receive comprehensive feedback and scores for each rubric criteria to share with students.",
                                delay: 0.8
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: feature.delay }}
                                whileHover={{ translateY: -10 }}
                                viewport={{ once: true }}
                                className="bg-gray-700 border border-gray-600 rounded-xl p-8 shadow-xl hover:shadow-purple-900/20 transition-all duration-300"
                            >
                                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-lg inline-block mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-300">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative py-24 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-gray-900/90 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/70 rounded-2xl shadow-2xl p-12 lg:p-16">
                        <div className="text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-4xl font-bold text-white mb-6"
                            >
                                Ready to transform your grading process?
                            </motion.h2>
                            
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
                            >
                                Join educators who are saving hours each week with AI-powered rubric evaluation.
                                Get started today and focus more on teaching, less on grading.
                            </motion.p>
                            
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(147, 51, 234, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                onClick={onGetStarted}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-5 px-12 rounded-xl text-xl shadow-xl flex items-center gap-3 mx-auto"
                            >
                                Try Rubric-Lens Now
                                <ArrowRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <footer className="bg-gray-950 text-gray-400 py-16 mt-auto border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Rubric-Lens</h3>
                            </div>
                            <p className="text-gray-400 mb-6">
                                Simplifying assessment with AI-powered rubric evaluation for educators.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4" />
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4" />
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4" />
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4" />
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Connect With Us</h3>
                            <div className="flex gap-4 mb-6">
                                <a 
                                    href="https://github.com/Balaji-R-2007/Rubric_lens.git" 
                                    className="bg-gray-800 hover:bg-purple-600 p-3 rounded-lg transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a 
                                    href="https://www.linkedin.com/in/balaji-rkb/" 
                                    className="bg-gray-800 hover:bg-purple-600 p-3 rounded-lg transition-colors"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a 
                                    href="mailto:balaji648balaji@gmail.com" 
                                    className="bg-gray-800 hover:bg-purple-600 p-3 rounded-lg transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Rubric-Lens. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}