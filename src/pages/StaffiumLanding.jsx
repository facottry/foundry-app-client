import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Zap, Globe, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StaffiumLanding = () => {
    return (
        <div className="min-h-screen bg-white">
            <Helmet>
                <title>Staffium by Clicktory - AI Staffing Revolution</title>
                <meta name="description" content="Hire AI employees for your business. Staffium provides autonomous AI agents for sales, support, and operations." />
            </Helmet>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 text-white pt-32 pb-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 text-sm font-semibold mb-6">
                        🚀 New Product Launch
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        Hire Your First <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI Employee</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Staffium allows you to deploy autonomous AI agents that work 24/7.
                        Handle support, sales, and operations without increasing headcount.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="http://staffium.clicktory.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                        >
                            Visit Staffium <ArrowRight size={20} />
                        </a>
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-lg backdrop-blur-sm transition-all"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                <Bot size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Autonomous Agents</h3>
                            <p className="text-slate-600">
                                AI agents that understand context, execute tasks, and learn from feedback. Not just chatbots, but true workers.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600 mb-6">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Deployment</h3>
                            <p className="text-slate-600">
                                Spin up a new employee in minutes. No interviews, no training period, just immediate productivity.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Secure</h3>
                            <p className="text-slate-600">
                                Built with data privacy first. SOC2 compliant usage policies and isolated execution environments.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="py-24 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to scale your workforce?</h2>
                    <a
                        href="http://staffium.clicktory.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-700 text-lg hover:underline underline-offset-4"
                    >
                        Go to Staffium Platform <Globe size={20} />
                    </a>
                </div>
            </div>

            {/* Note: Navbar/Footer usually handled by Layout, but if this page is standalone in routing 
                we might need them. Assuming Layout wraps this in App.jsx.
            */}
        </div>
    );
};

export default StaffiumLanding;
