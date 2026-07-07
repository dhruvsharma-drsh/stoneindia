import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import { Search, Calendar, Clock, ArrowRight, User, Tag as TagIcon, ChevronRight, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';

const categories = [
  "Outdoor Landscaping",
  "Architecture",
  "Home Design",
  "Manufacturing",
  "Best Practices",
  "Export Quality",
  "Product Showcase"
];

const tags = [
  "Sandstone", "Marble", "Granite", "Gwalior Mint", "Sagar Black", "Facade", "Paving", "CNC Engraving", "Landscaping"
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const postsPerPage = 6;
  
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen font-sans text-[#111]">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden bg-white border-b border-[#EDEDE9]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#B8955D]/5 blur-[120px] rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-[-10%] w-1/3 h-1/2 bg-[#B8955D]/5 blur-[100px] rounded-tr-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EDEDE9] bg-white mb-6 shadow-sm animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-[#B8955D]"></div>
            <span className="text-[10px] tracking-[0.2em] text-[#B8955D] font-bold uppercase">
              Our Blog
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2D4A3E] tracking-tight mb-5 animate-fade-in-up animation-delay-200">
            Insights & Perspectives
          </h1>
          
          <p className="max-w-2xl text-base md:text-lg text-[#666] leading-relaxed animate-fade-in-up animation-delay-400">
            Explore technical articles, industry trends, and architectural inspirations from our core stone manufacturing experts.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Blog Grid (Left Side) */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentPosts.map((post, idx) => (
                <Link 
                  to={`/blog/${post.id}`}
                  key={post.id} 
                  className="bg-white rounded-2xl border border-[#EDEDE9] overflow-hidden group hover:shadow-[0_15px_30px_rgba(184,149,93,0.1)] transition-all duration-300 flex flex-col animate-fade-in-up block"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-[#B8955D] uppercase shadow-sm">
                      {post.tag}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-mono text-[#888] mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-[#B8955D]" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-[#B8955D]" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-[#B8955D] transition-colors line-clamp-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-[#666] text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="pt-4 border-t border-[#EDEDE9] flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#FAFAF8] flex items-center justify-center border border-[#EDEDE9]">
                          <User size={12} className="text-[#B8955D]" />
                        </div>
                        <span className="text-xs font-medium text-[#444]">{post.author}</span>
                      </div>
                      <button className="text-[#B8955D] p-2 rounded-full hover:bg-[#FAFAF8] transition-colors">
                         <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Dynamic Pagination */}
            {totalPages > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 rounded-lg font-medium flex items-center justify-center transition-colors ${
                      currentPage === i + 1 
                        ? "bg-[#B8955D] text-white shadow-md" 
                        : "bg-white border border-[#EDEDE9] text-[#666] hover:bg-[#FAFAF8]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                {currentPage < totalPages && (
                  <button 
                    onClick={() => {
                      setCurrentPage(prev => prev + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-10 h-10 rounded-lg bg-white border border-[#EDEDE9] text-[#666] font-medium flex items-center justify-center hover:bg-[#FAFAF8] transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar (Right Side) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-10">
            
            {/* Search */}
            <div className="bg-white p-6 rounded-2xl border border-[#EDEDE9] shadow-sm">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full bg-[#FAFAF8] border border-[#EDEDE9] rounded-xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:border-[#B8955D] transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888]" />
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white p-6 rounded-2xl border border-[#EDEDE9] shadow-sm">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#111] mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8955D]"></span>
                Recent Posts
              </h4>
              <div className="flex flex-col gap-5">
                {blogPosts.slice(0, 4).map(post => (
                  <Link to={`/blog/${post.id}`} key={`recent-${post.id}`} className="group flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#888] text-[10px] font-mono mb-1">{post.date}</span>
                      <h5 className="text-sm font-bold leading-tight group-hover:text-[#B8955D] transition-colors line-clamp-2">{post.title}</h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-2xl border border-[#EDEDE9] shadow-sm">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#111] mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8955D]"></span>
                Categories
              </h4>
              <ul className="flex flex-col gap-3">
                {categories.map((category, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-[#666] text-sm hover:text-[#B8955D] transition-colors flex items-center justify-between group">
                      <span>{category}</span>
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-[#B8955D]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags Widget */}
            <div className="bg-white p-6 rounded-2xl border border-[#EDEDE9] shadow-sm">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#111] mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8955D]"></span>
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <a href="#" key={idx} className="px-3 py-1.5 bg-[#FAFAF8] border border-[#EDEDE9] rounded-lg text-xs font-medium text-[#666] hover:border-[#B8955D] hover:text-[#B8955D] transition-colors">
                    {tag}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-[#EDEDE9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-md transition-shadow">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#FAFAF8] border border-[#EDEDE9] flex items-center justify-center group-hover:border-[#B8955D]/30 transition-colors">
              <Box size={24} className="text-[#B8955D]" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Build with Stone India</h3>
              <p className="text-[#666] text-sm">Join our network of architects and builders creating real-world masterpieces.</p>
            </div>
          </div>
          <button className="px-6 py-3 rounded-full bg-[#111] text-white font-medium text-sm hover:bg-[#B8955D] transition-colors whitespace-nowrap flex items-center gap-2">
            Get in Touch <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
