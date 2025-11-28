import { motion } from "motion/react";
import { GraduationCap, Upload, CheckSquare, BarChart2, Zap, ArrowRight, Mail, Github, Linkedin, ChevronRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
    onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white flex flex-col overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0 opacity-50">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
                </div>
            </div>
            
            {/* Hero Section */}
            <div className="relative z-10 flex-1">
                <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, y: 20 }} 
                            animate={{ opacity: 1, scale: 1, y: 0 }} 
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex justify-center mb-8"
                        >
                            <div className="relative">
                                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-3xl shadow-2xl">
                                    <GraduationCap className="w-16 h-16 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
                                <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 text-transparent bg-clip-text">
                                    Rubric-Lens
                                </span>
                                <span className="block text-4xl md:text-5xl mt-4 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 text-transparent bg-clip-text font-semibold">
                                    Intelligent Assessment
                                </span>
                            </h1>
                        </motion.div>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="max-w-3xl mx-auto text-xl text-neutral-300 mb-8 leading-relaxed"
                        >
                            Experience the future of educational assessment. Our AI-powered platform transforms how educators evaluate student work, 
                            providing <span className="text-cyan-400 font-semibold">instant, objective, and detailed feedback</span> that helps students learn and grow.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex justify-center gap-8 mb-12"
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">90%</div>
                                <div className="text-sm text-neutral-400">Time Saved</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-cyan-400">24/7</div>
                                <div className="text-sm text-neutral-400">Available</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400">Instant</div>
                                <div className="text-sm text-neutral-400">Results</div>
                            </div>
                        </motion.div>
                        
                        <motion.button
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)",
                                y: -2
                            }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            onClick={onGetStarted}
                            className="group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-5 px-10 rounded-2xl text-lg shadow-2xl flex items-center gap-3 mx-auto relative overflow-hidden"
                        >
                            <span className="relative z-10">Start Evaluating Now</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                className="relative z-10 py-24 bg-slate-800/50 backdrop-blur-sm"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-6">
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm font-medium text-cyan-300">How It Works</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                                Simple, Smart, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">Effective</span>
                            </h2>
                            <p className="mt-4 text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                                Four simple steps to revolutionize your assessment workflow and save hours of grading time
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Upload className="w-8 h-8" />,
                                title: "Upload & Scan",
                                description: "Drop your student submissions - images, PDFs, or documents. Our AI instantly processes them.",
                                color: "from-green-500 to-green-600",
                                delay: 0.1
                            },
                            {
                                icon: <CheckSquare className="w-8 h-8" />,
                                title: "Define Criteria",
                                description: "Create custom rubrics with flexible scoring. Set what matters most for your assessment.",
                                color: "from-cyan-500 to-blue-500",
                                delay: 0.3
                            },
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: "AI Analysis",
                                description: "Watch as our advanced AI evaluates work against your criteria in seconds, not hours.",
                                color: "from-amber-500 to-orange-500",
                                delay: 0.5
                            },
                            {
                                icon: <BarChart2 className="w-8 h-8" />,
                                title: "Detailed Results",
                                description: "Get comprehensive scores and feedback that you can share directly with students.",
                                color: "from-blue-500 to-blue-600",
                                delay: 0.7
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: feature.delay }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                viewport={{ once: true }}
                                className="group relative glass-card p-8 overflow-hidden"
                            >
                                {/* Background gradient on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                
                                <div className="relative z-10">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-neutral-300 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <div className="mt-6 flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                        Step {index + 1}
                                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-cyan-900/80 to-neutral-900/90 z-0"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="glass-card p-12 lg:p-16 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                        >
                            Ready to transform your grading?
                        </motion.h2>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-xl text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed"
                        >
                            Join educators who are saving hours each week with AI-powered rubric evaluation.
                            Get started today and focus more on teaching, less on grading.
                        </motion.p>
                        
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            onClick={onGetStarted}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold py-5 px-12 rounded-2xl text-xl shadow-xl flex items-center gap-3 mx-auto hover:from-cyan-700 hover:to-blue-700 transition-all"
                        >
                            Try Rubric-Lens Now
                            <ArrowRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <footer className="bg-neutral-950 text-neutral-400 py-16 mt-auto border-t border-neutral-800 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-2 rounded-lg">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Rubric-Lens</h3>
                            </div>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                Empowering educators with intelligent assessment tools that save time and improve learning outcomes.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                {['Home', 'Features', 'Documentation', 'Support'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-2 group">
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-6">Connect With Us</h3>
                            <div className="flex gap-4 mb-6">
                                {[
                                    { icon: <Github className="w-5 h-5" />, href: "https://github.com/Balaji-R-2007/Rubric_lens.git" },
                                    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/balaji-rkb/" },
                                    { icon: <Mail className="w-5 h-5" />, href: "mailto:balaji648balaji@gmail.com" }
                                ].map((social, index) => (
                                    <a 
                                        key={index}
                                        href={social.href} 
                                        className="bg-slate-800 hover:bg-violet-600 p-3 rounded-lg transition-all duration-300 hover:scale-110"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
                        <p>&copy; {new Date().getFullYear()} Rubric-Lens. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}