import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, ArrowRight, PhoneCall } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogContent';
import { PHONE_NUMBER } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

const categoryColors: Record<string, string> = {
  'Emergency Tips': 'bg-red-100 text-red-700',
  'Seasonal Guide': 'bg-blue-100 text-blue-700',
  "Buyer's Guide": 'bg-purple-100 text-purple-700',
  'Pricing Guide': 'bg-green-100 text-green-700',
};

const Blog: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'iFAST Roadside Blog',
    description: 'Expert roadside assistance tips, seasonal driving guides, and East GTA auto service advice from iFAST Roadside & Mobile Tires.',
    url: 'https://ifastroadside.ca/blog',
    publisher: {
      '@type': 'LocalBusiness',
      name: 'iFAST Roadside & Mobile Tires',
      telephone: PHONE_NUMBER,
    },
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-0 font-sans">
      <Helmet>
        <title>Roadside Tips & Guides | iFAST Roadside Blog — East GTA</title>
        <meta name="description" content="Expert roadside emergency guides, seasonal driving tips, and honest auto service advice from East GTA's fastest mobile roadside team. Serving Pickering, Ajax, Whitby, Oshawa, Scarborough." />
        <meta name="keywords" content="roadside tips East GTA, flat tire guide Ontario, winter car emergency, mobile mechanic advice, roadside assistance blog Pickering" />
        <link rel="canonical" href="https://ifastroadside.ca/blog" />
        <meta property="og:title" content="Roadside Tips & Guides | iFAST Roadside Blog" />
        <meta property="og:description" content="Expert roadside emergency guides and honest auto advice for East GTA drivers." />
        <meta property="og:url" content="https://ifastroadside.ca/blog" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <div className="bg-brand-dark py-16 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] background-pattern"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-yellow rounded-full blur-[120px] opacity-15"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
              East GTA Roadside Resource Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
              Driver Guides &<br />
              <span className="text-brand-yellow">Emergency Tips</span>
            </h1>
            <p className="text-white/70 text-lg font-medium max-w-xl">
              Real advice from the team that responds to roadside emergencies across Pickering, Ajax, Whitby, Oshawa, and Scarborough every day.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <Link to="/" className="hover:text-brand-dark transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-yellow">Blog</span>
        </div>

        {/* Featured post — first one large */}
        {BLOG_POSTS.length > 0 && (
          <div className="mb-12">
            <Link
              to={`/blog/${BLOG_POSTS[0].slug}`}
              className="group block bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(11,30,54,0.08)] border border-gray-100 hover:shadow-[0_20px_50px_rgba(11,30,54,0.12)] hover:border-brand-yellow/30 transition-all duration-300 flex flex-col lg:flex-row"
            >
              <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[420px] bg-gray-100 overflow-hidden">
                <img
                  src={BLOG_POSTS[0].heroImage}
                  alt={BLOG_POSTS[0].heroImageAlt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
                <div className="absolute top-5 left-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[BLOG_POSTS[0].category] ?? 'bg-gray-100 text-gray-700'}`}>
                    {BLOG_POSTS[0].category}
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                  <Clock size={13} />
                  <span>{BLOG_POSTS[0].readTime}</span>
                  <span>·</span>
                  <span>{new Date(BLOG_POSTS[0].publishDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-4 leading-snug group-hover:text-brand-yellow transition-colors">
                  {BLOG_POSTS[0].title}
                </h2>
                <p className="text-gray-500 mb-6 leading-relaxed text-sm line-clamp-3">
                  {BLOG_POSTS[0].excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-brand-yellow font-black text-sm group-hover:gap-3 transition-all">
                  Read Full Guide <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Remaining posts grid */}
        {BLOG_POSTS.length > 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {BLOG_POSTS.slice(1).map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-brand-yellow/30 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.heroImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    <Clock size={11} />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-black text-brand-dark mb-3 leading-snug group-hover:text-brand-yellow transition-colors flex-1">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-brand-yellow font-black text-sm group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Emergency CTA Banner */}
        <div className="bg-brand-dark rounded-[2rem] p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] background-pattern"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-yellow rounded-full blur-[100px] opacity-20"></div>
          <div className="relative z-10">
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-3">Need help right now?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Don't Google — Just Call.</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">iFAST responds across Pickering, Ajax, Whitby, Oshawa, and Scarborough. Average arrival: 15–30 min.</p>
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => trackPhoneCall('blog_index_cta')}
              className="inline-flex items-center justify-center gap-3 bg-brand-yellow hover:bg-brand-yellowHover text-white px-10 py-5 rounded-2xl font-black text-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(255,90,31,0.4)] hover:-translate-y-1"
            >
              <PhoneCall size={28} fill="currentColor" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
