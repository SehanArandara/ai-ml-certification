import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { students } from '../data/students';
import { Award, FileCheck, Lock, UploadCloud, Send, ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import logoMain from '../assets/logo-main.png';

const SelectionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const student = students.find(s => s.id === id);
    const [showMotivation, setShowMotivation] = useState(false);
    const [showProjectDetails, setShowProjectDetails] = useState(false);

    if (!student) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Student Not Found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-blue-600 hover:underline"
                    >
                        Return to Validation
                    </button>
                </div>
            </div>
        );
    }

    const handleCourseCertificate = () => {
        navigate(`/certificate/${student.id}`);
    };

    const handleProjectCertificate = () => {
        if (student.isCompletedProject) {
            navigate(`/certificate/${student.id}?type=project`);
        } else {
            setShowMotivation(true);
        }
    };

    const HeroSection = () => (
        <div className="bg-slate-900 text-white pt-16 pb-32 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
                <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-purple-600 blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10 text-center">
                <div className="flex items-center justify-center mb-8">
                    <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm ring-1 ring-white/20 shadow-2xl">
                        <img src={logoMain} alt="SkyRek Logo" className="w-16 h-16 object-contain" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
                    Artificial Intelligence & <br className="hidden md:block" />
                    Machine Learning Certification
                </h1>

                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                    Validate your achievement and showcase your expertise in the cutting-edge world of AI.
                </p>
            </div>
        </div>
    );

    if (showMotivation) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <HeroSection />

                <div className="flex-grow px-4 -mt-24 relative z-20 pb-12">
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8">
                            <button onClick={() => setShowMotivation(false)} className="text-sm text-gray-500 hover:text-gray-800 flex items-center mb-6 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Selection
                            </button>

                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                                    <Award className="w-10 h-10 text-yellow-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Unlock Your Excellence</h2>
                                <p className="text-gray-600 max-w-lg mx-auto">
                                    The <strong>Certificate of Excellence</strong> is awarded to students who demonstrate practical mastery by building a complete AI product.
                                </p>
                            </div>

                            {/* Project Brief */}
                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
                                <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    Capstone Project: AI Product Development
                                </h3>
                                <p className="text-indigo-800 text-sm mb-4 leading-relaxed">
                                    Not just a model—build a complete end-to-end AI product. Ideate, process data, build an ML pipeline, wrap it in a backend API, and create a frontend UI.
                                </p>

                                <button
                                    onClick={() => setShowProjectDetails(!showProjectDetails)}
                                    className="text-sm font-semibold text-indigo-700 hover:text-indigo-900 flex items-center"
                                >
                                    {showProjectDetails ? 'Hide Details' : 'View Full Requirements'}
                                    <ArrowLeft className={`w-4 h-4 ml-1 transform transition-transform ${showProjectDetails ? '-rotate-90' : '-rotate-180'}`} />
                                </button>

                                {showProjectDetails && (
                                    <div className="mt-6 space-y-6 text-sm text-gray-700 border-t border-indigo-200 pt-6">
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">1. Phase 1: Ideation (Approval Required)</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Choose a problem (Health, E-commerce, Education, etc.).</li>
                                                <li>Submit a 1-page proposal: Problem, Dataset, Model, Tech Stack.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">2. Phase 2: Technical Core</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li><strong>ML Pipeline:</strong> Data ingestion, preprocessing, training, evaluation, saving model (.pkl/.h5).</li>
                                                <li><strong>Backend (Flask/FastAPI):</strong> Load model, expose `/predict` endpoint.</li>
                                                <li><strong>Frontend (React/HTML):</strong> User input surface, submit button, display prediction.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2">3. Phase 3: Deliverables</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Source Code (GitHub/Drive).</li>
                                                <li>README.md (Instructions, dataset link).</li>
                                                <li>Trained Model File.</li>
                                                <li>Report (Concept, Performance, Unit Tests).</li>
                                                <li><strong>Screenshots:</strong> UI before/after prediction, Evaluation metrics.</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submission Steps */}
                            <div className="bg-white border-2 border-slate-100 rounded-xl p-6 mb-8">
                                <h4 className="font-semibold text-gray-900 flex items-center mb-4">
                                    <UploadCloud className="w-5 h-5 mr-2 text-blue-600" />
                                    How to Submit
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">Host your Code</p>
                                            <p className="text-xs text-gray-500">Upload your complete project to GitHub or Google Drive.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">Prepare Screenshots</p>
                                            <p className="text-xs text-gray-500">Include UI states (before/after) and model metrics.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">Email Instructor</p>
                                            <p className="text-xs text-gray-500">Send your specific Student ID and project link.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <a 
                                href={`mailto:instructor@example.com?subject=Capstone Project Submission&body=Student ID: ${student.id}%0D%0AProject Link: [Insert Link Here]%0D%0A%0D%0APlease find my project submission attached.`}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center space-x-2 transform hover:scale-[1.01]"
                            >
                                <Send className="w-5 h-5" />
                                <span>Submit Project for Review</span>
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <HeroSection />

            <div className="flex-grow px-4 -mt-24 relative z-20 pb-12">
                <div className="max-w-4xl mx-auto w-full">
                    {/* Welcome Header - Overlapping */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Welcome, {student.name}</h1>
                        <p className="text-blue-100 font-medium">Select a certificate to claim to your collection</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 w-full mt-24">
                        {/* Course Certificate */}
                        <button
                            onClick={handleCourseCertificate}
                            className="relative bg-white p-8 rounded-2xl shadow-xl border-2 border-transparent hover:border-blue-500 transition-all group text-left overflow-hidden flex flex-col"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FileCheck className="w-32 h-32 text-blue-600 transform rotate-12" />
                            </div>

                            <div className="relative z-10 flex-grow">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <FileCheck className="w-7 h-7 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Course Completion</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    Awarded for completing all theoretical modules, quizzes, and standard coursework requirements.
                                </p>
                            </div>
                            <div className="relative z-10 flex items-center text-blue-600 font-semibold text-sm mt-auto">
                                Claim Certificate <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                            </div>
                        </button>

                        {/* Excellence Certificate */}
                        <button
                            onClick={handleProjectCertificate}
                            className={`relative p-8 rounded-2xl shadow-xl border-2 transition-all group text-left overflow-hidden flex flex-col ${student.isCompletedProject
                                ? 'bg-gradient-to-br from-white to-indigo-50 border-transparent hover:border-indigo-500'
                                : 'bg-gray-100 border-transparent opacity-90'
                                }`}
                        >
                            {!student.isCompletedProject && (
                                <div className="absolute top-4 right-4 bg-gray-200/50 backdrop-blur-sm p-2 rounded-lg">
                                    <Lock className="w-5 h-5 text-gray-500" />
                                </div>
                            )}

                            <div className="relative z-10 flex-grow">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${student.isCompletedProject ? 'bg-indigo-100' : 'bg-gray-200'
                                    }`}>
                                    <Award className={`w-7 h-7 ${student.isCompletedProject ? 'text-indigo-600' : 'text-gray-500'
                                        }`} />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">Certificate of Excellence</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    A prestigious credential for students who successfully build and deploy the AI Product Capstone Project.
                                </p>
                            </div>

                            <div className="relative z-10 mt-auto">
                                {student.isCompletedProject ? (
                                    <div className="flex items-center text-indigo-600 font-semibold text-sm">
                                        Claim Certificate <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                                    </div>
                                ) : (
                                    <div className="flex items-center text-gray-500 font-semibold text-sm">
                                        View Requirements <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                                    </div>
                                )}
                            </div>
                        </button>
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate('/')}
                            className="bg-white/10 hover:bg-white/20 text-slate-600 hover:text-slate-800 font-medium text-sm transition-all px-6 py-2 rounded-full backdrop-blur-sm border border-slate-200"
                        >
                            Log out / Verify another ID
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectionPage;
