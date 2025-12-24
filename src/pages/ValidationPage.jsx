import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { students } from '../data/students';
import { Search, AlertCircle, ChevronRight } from 'lucide-react';
import logoMain from '../assets/logo-main.png';

const ValidationPage = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleValidate = (e) => {
        e.preventDefault();
        const student = students.find(s => s.id === code.trim());

        if (student) {
            navigate(`/select-certificate/${student.id}`);
        } else {
            setError('Invalid Certificate ID. Please check and try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
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

                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                        Validate your achievement and showcase your expertise in the cutting-edge world of AI.
                    </p>

                    {/* Instructor Details - Moved to Hero */}
                    <div className="inline-flex flex-col items-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-2xl mx-auto">
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Course Instructor</p>
                        <h3 className="text-white font-bold text-lg">Sehan Deemantha Arandara</h3>
                        <p className="text-sm text-gray-300 mt-1">Software Engineer</p>
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-lg">
                            Graduated from SLIIT - BSc (Hons) in Information Technology • Specialising in Software Engineering • AI ML Instructor
                        </p>
                    </div>
                </div>
            </div>

            {/* Validation Section - Overlapping Hero */}
            <div className="flex-grow px-4 -mt-16 relative z-20 pb-12">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Claim Your Certificate</h2>
                            <p className="text-gray-500 text-sm">
                                Enter your unique certificate ID below to verify and download your credential.
                            </p>
                        </div>

                        <form onSubmit={handleValidate} className="space-y-5">
                            <div>
                                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Certificate ID
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        id="code"
                                        value={code}
                                        onChange={(e) => {
                                            setCode(e.target.value);
                                            setError('');
                                        }}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-mono text-gray-800 placeholder-gray-400"
                                        placeholder="e.g. SKML000"
                                        required
                                    />
                                    <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                {error && (
                                    <div className="flex items-center mt-3 text-red-600 text-sm bg-red-50 p-2 rounded-lg animate-pulse">
                                        <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                        {error}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2"
                            >
                                <span>Verify & Claim</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-500">
                            Protected by SkyRek Verification System
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValidationPage;
