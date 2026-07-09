import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, Sparkles } from 'lucide-react';

const FAQ_CATEGORIES = [
    {
        title: 'General',
        faqs: [
            {
                question: "Who is Stone India and what do you do?",
                answer: "With over 25 years of experience as Natural Stone processors and traders, STONE INDIA processes and exports a comprehensive range of Gwalior and Kota stones, including Sandstone, Limestone, Slate, and Granite to clients across the world."
            },
            {
                question: "What types of stone finishes do you offer?",
                answer: "Our stones are processed either by hand or by advanced machinery in various finishes such as natural, sawn, honed polished, sandblasted, tumbled, and calibrated. These are ideal for paving, flooring, walling, and cladding."
            },
            {
                question: "How do you ensure safe international transit?",
                answer: "We use secure, export-grade packaging and offer in-house factory stuffing at our yard. This ensures stones are carefully packed to minimize breakage during transportation, guaranteeing they reach you in pristine condition."
            },
            {
                question: "Do you offer custom branding on shipments?",
                answer: "Yes, for clients who require custom branding, we offer logo and name printing on crates at a nominal charge, helping businesses maintain their identity even during international shipment."
            }
        ]
    }
];

const theme = {
    border: 'border-black/[0.06]',
    hoverBorder: 'hover:border-[#B8955D]/40',
    activeBorder: 'border-[#B8955D]/40',
    shadow: 'shadow-[0_10px_35px_rgba(184,149,93,0.08)]',
    badgeBg: 'bg-[#FAF9F5]',
    badgeBorder: 'border-[#B8955D]/30',
    badgeText: 'text-[#B8955D]',
    questionText: 'text-[#1A1A1A] group-hover:text-[#B8955D]',
    activeQuestionText: 'text-[#B8955D]',
    iconBgActive: 'bg-[#B8955D]',
    iconTextActive: 'text-white',
    iconBgInactive: 'bg-[#FAF9F5]',
    iconBorderInactive: 'border-[#B8955D]/30',
    iconTextInactive: 'text-[#B8955D]',
};

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCategories = FAQ_CATEGORIES.map(cat => ({
        ...cat,
        faqs: cat.faqs.filter(
            faq =>
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.faqs.length > 0);

    return (
        <section className="bg-white py-20 relative z-30 overflow-hidden" id="faq">
            {/* Background Accents */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full blur-[120px] bg-[#B8955D]/[0.05] pointer-events-none" />
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #111 1px, transparent 0)`,
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="container mx-auto px-6 sm:px-10 lg:px-14 max-w-5xl relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3.5 mb-6">
                        <span className="font-sans text-xs sm:text-[13px] tracking-[0.28em] font-semibold text-[#B8955D] uppercase flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#B8955D]" /> Help Center
                        </span>
                    </div>

                    <h2 className="font-editorial text-4xl md:text-5xl lg:text-[4rem] text-[#1A1A1A] font-light leading-[1.1] tracking-tight mb-6">
                        Frequently Asked <br/><span className="italic text-[#B8955D]">Questions</span>
                    </h2>

                    <p className="font-sans text-sm sm:text-base md:text-[17px] text-[#6B6B6B] font-medium max-w-2xl mx-auto mb-10">
                        Everything you need to know about our premium stones, manufacturing process, and international shipping.
                    </p>

                    {/* Search */}
                    <div className="relative max-w-lg mx-auto">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8955D]/60" />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-full border border-black/[0.08] bg-[#FAF9F5] text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:border-[#B8955D]/50 focus:ring-2 focus:ring-[#B8955D]/20 transition-all shadow-sm font-sans text-sm sm:text-base"
                        />
                    </div>
                </div>

                {/* FAQ Content */}
                <div className="max-w-3xl mx-auto">
                    {filteredCategories.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="font-sans text-[#6B6B6B] text-lg">No questions match your search. Try different keywords.</p>
                        </div>
                    ) : (
                        filteredCategories.map((category) => (
                            <div key={category.title} className="mb-14">


                                <div className="space-y-4">
                                    {category.faqs.map((faq, index) => {
                                        const faqKey = `${category.title}-${index}`;
                                        const isActive = activeIndex === faqKey;

                                        return (
                                            <motion.div
                                                key={faqKey}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                                className={`rounded-[1.25rem] border transition-all duration-500 bg-white group ${theme.border} ${theme.hoverBorder} ${isActive ? `${theme.activeBorder} ${theme.shadow}` : 'hover:shadow-md'}`}
                                            >
                                                <button
                                                    onClick={() => setActiveIndex(isActive ? null : faqKey)}
                                                    className="w-full px-5 py-5 md:px-7 md:py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                                                >
                                                    <div className="flex items-center gap-4 md:gap-5">
                                                        <span className={`font-sans flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors duration-300 ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                                            {String(index + 1).padStart(2, '0')}
                                                        </span>
                                                        <span className={`font-sans text-[15px] md:text-[17px] font-medium leading-snug transition-colors duration-300 ${isActive ? theme.activeQuestionText : theme.questionText}`}>
                                                            {faq.question}
                                                        </span>
                                                    </div>
                                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border ${isActive ? `${theme.iconBgActive} ${theme.iconTextActive} border-transparent rotate-180 shadow-md` : `${theme.iconBgInactive} ${theme.iconTextInactive} ${theme.iconBorderInactive}`}`}>
                                                        {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                    </div>
                                                </button>

                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="font-sans px-5 pb-6 md:px-7 md:pb-7 pt-0 pl-[4.5rem] md:pl-[5.25rem] pr-6 md:pr-12 leading-relaxed text-[14px] md:text-[15px] text-[#6B6B6B]">
                                                                {faq.answer}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
