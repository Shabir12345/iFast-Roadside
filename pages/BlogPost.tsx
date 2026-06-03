import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, ArrowLeft, ChevronDown, Calendar, ArrowRight, PhoneCall } from 'lucide-react';
import { BLOG_POSTS, getBlogPost } from '../data/blogContent';
import { PHONE_NUMBER } from '../constants';
import { trackPhoneCall } from '../utils/analytics';

const categoryColors: Record<string, string> = {
  'Emergency Tips': 'bg-red-100 text-red-700',
  'Seasonal Guide': 'bg-blue-100 text-blue-700',
  "Buyer's Guide": 'bg-purple-100 text-purple-700',
  'Pricing Guide': 'bg-green-100 text-green-700',
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 pt-20">
        <h1 className="text-3xl font-bold text-brand-dark mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find that article.</p>
        <Link to="/blog" className="text-brand-yellow font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={20} /> Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    image: `https://ifastroadside.ca${post.heroImage}`,
    datePublished: post.publishDate,
    author: {
      '@type': 'Organization',
      name: 'iFAST Roadside & Mobile Tires',
    },
    publisher: {
      '@type': 'LocalBusiness',
      name: 'iFAST Roadside & Mobile Tires',
      telephone: PHONE_NUMBER,
      url: 'https://ifastroadside.ca',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ifastroadside.ca/blog/${post.slug}`,
    },
    keywords: post.keywords,
  };

  const faqJsonLd = post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div className="bg-white min-h-screen pt-24 pb-0 font-sans">
      <Helmet>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={`https://ifastroadside.ca/blog/${post.slug}`} />
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:image" content={`https://ifastroadside.ca${post.heroImage}`} />
        <meta property="og:url" content={`https://ifastroadside.ca/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {faqJsonLd && <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>}
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider flex-wrap">
          <Link to="/" className="hover:text-brand-dark transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-brand-dark transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-brand-yellow truncate max-w-xs">{post.category}</span>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Post header */}
          <div className="mb-10">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-700'}`}>
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-400 mb-8">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.publishDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
              <span className="text-gray-300">·</span>
              <span className="text-brand-dark">iFAST Roadside Team</span>
            </div>

            {/* Hero image */}
            <div className="relative rounded-3xl overflow-hidden h-72 md:h-[440px] bg-gray-100 mb-10">
              <img
                src={post.heroImage}
                alt={post.heroImageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent"></div>
              {/* Sticky call badge on hero */}
              <div className="absolute bottom-6 right-6">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  onClick={() => trackPhoneCall(`blog_post_hero_${post.slug}`)}
                  className="flex items-center gap-2 bg-brand-yellow text-white px-4 py-2.5 rounded-xl font-black text-sm shadow-lg hover:bg-brand-yellowHover transition-colors"
                >
                  <PhoneCall size={16} fill="currentColor" />
                  Need Help Now?
                </a>
              </div>
            </div>
          </div>

          {/* Article body */}
          <article className="prose prose-lg max-w-none">
            {post.sections.map((section, idx) => (
              <div key={idx} className="mb-10">
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-black text-brand-dark mb-5 tracking-tight relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1.5 after:bg-brand-yellow after:rounded-full">
                    {section.heading}
                  </h2>
                )}
                <div className="text-gray-700 leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </article>

          {/* FAQ Section */}
          {post.faqs.length > 0 && (
            <div className="bg-brand-dark text-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(11,30,54,0.15)] mb-16 relative overflow-hidden mt-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow opacity-10 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow opacity-5 rounded-full blur-[80px]"></div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-8 text-center relative z-10">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3 relative z-10">
                {post.faqs.map((faq, index) => (
                  <div key={index} className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
                    <button
                      className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/10 transition-colors focus:outline-none"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      type="button"
                    >
                      <span className="font-bold text-base pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`text-brand-yellow transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
                        size={22}
                      />
                    </button>
                    <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                      <p className="text-white/70 leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-black text-brand-dark mb-6 tracking-tight">More Guides</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {relatedPosts.map(related => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className="group flex gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-brand-yellow/40 hover:bg-white hover:shadow-md transition-all"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                      <img src={related.heroImage} alt={related.heroImageAlt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full w-fit mb-1.5 ${categoryColors[related.category] ?? 'bg-gray-100 text-gray-700'}`}>{related.category}</span>
                      <p className="text-sm font-bold text-brand-dark group-hover:text-brand-yellow transition-colors leading-snug line-clamp-2">{related.title}</p>
                      <span className="flex items-center gap-1 text-xs text-brand-yellow font-bold mt-1.5 group-hover:gap-2 transition-all">Read <ArrowRight size={12} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-brand-dark py-20 relative overflow-hidden border-t-8 border-brand-yellow">
        <div className="absolute inset-0 opacity-[0.03] background-pattern"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-yellow rounded-full blur-[100px] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-brand-yellow font-bold text-sm tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
            Available 24/7 — East GTA
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Stranded Right Now?</h2>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto font-medium">
            Skip the Googling. One call deploys the nearest iFAST unit to your location. Average arrival: 15–30 minutes.
          </p>
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => trackPhoneCall(`blog_post_footer_${post.slug}`)}
            className="inline-flex items-center justify-center gap-4 bg-brand-yellow hover:bg-brand-yellowHover text-white px-10 py-6 rounded-2xl font-black text-2xl md:text-4xl transition-all duration-300 shadow-[0_10px_35px_rgba(255,90,31,0.4)] hover:-translate-y-1"
          >
            <PhoneCall size={32} fill="currentColor" />
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
