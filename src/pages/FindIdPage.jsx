
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { students } from '../data/students';
import { Search, ChevronRight, Copy, Check } from 'lucide-react';
import logoMain from '../assets/logo-main.png';

const FindIdPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState(null);
    const navigate = useNavigate();

    // Filter students based on search term
    const filteredStudents = searchTerm.trim() === ''
        ? []
        : students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleCopy = (id) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white pt-16 pb-24 px-4 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600 blur-3xl"></div>
                    <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-purple-600 blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm ring-1 ring-white/20 shadow-2xl click-cursor cursor-pointer" onClick={() => navigate('/')}>
                            <img src={logoMain} alt="Logo" className="w-12 h-12 object-contain" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
                        Find Your Student ID
                    </h1>

                    <p className="text-gray-300 max-w-xl mx-auto mb-8">
                        Enter your name below to retrieve your unique Certificate ID.
                    </p>

                    {/* Search Input */}
                    <div className="max-w-md mx-auto relative group">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all outline-none text-lg shadow-xl"
                            placeholder="Search by your name..."
                            autoFocus
                        />
                        <Search className="absolute left-4 top-4.5 h-6 w-6 text-gray-400 group-focus-within:text-blue-300 transition-colors" />
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="flex-grow px-4 -mt-10 relative z-20 pb-12">
                <div className="max-w-2xl mx-auto">
                    {/* Empty State */}
                    {searchTerm && filteredStudents.length === 0 && (
                        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No students found</h3>
                            <p className="text-gray-500">We couldn't find anyone matching "{searchTerm}".</p>
                        </div>
                    )}

                    {/* Results List */}
                    {filteredStudents.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {filteredStudents.length} Result{filteredStudents.length !== 1 ? 's' : ''} Found
                                </span>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {filteredStudents.map((student) => (
                                    <div key={student.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{student.name}</h3>
                                            <p className="text-sm text-gray-500 font-mono mt-0.5 text-blue-600">{student.id}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleCopy(student.id)}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                title="Copy ID"
                                            >
                                                {copiedId === student.id ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={() => navigate(`/select-certificate/${student.id}`)}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                title="Go to Certificate"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Welcome / Initial State */}
                    {!searchTerm && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-sm">Start typing to search for your details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindIdPage;
