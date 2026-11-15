import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import heroBg from '../assets/hero-bg.jpg';

const Hero: React.FC = () => {
    const { isAr } = useLanguage();
    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            padding: 'clamp(6rem, 15vh, 10rem) 1rem clamp(3rem, 10vh, 6rem) 1rem',
            overflow: 'hidden',
            backgroundImage: `linear-gradient(180deg, rgba(18, 42, 20, 0.62) 0%, rgba(25, 58, 26, 0.45) 50%, rgba(18, 42, 20, 0.72) 100%), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
        }}>
            {/* Decorative elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '300px',
                height: '300px',
                background: 'var(--primary)',
                filter: 'blur(150px)',
                opacity: 0.25,
                borderRadius: '50%',
                zIndex: 0
            }} />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ maxWidth: '1000px', zIndex: 1 }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.6rem 1.4rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255, 255, 255, 0.16)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(163, 230, 53, 0.55)',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: 'clamp(1rem, 4vw, 2rem)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#a3e635', boxShadow: '0 0 10px #a3e635' }} />
                    {isAr ? 'جودة ممتازة، طبيعي 100% وبيو' : 'Premium, Naturel & 100% Bio'}
                </motion.div>

                <h1 style={{
                    fontSize: 'clamp(2.2rem, 10vw, 5.5rem)',
                    marginBottom: '1rem',
                    lineHeight: isAr ? 1.25 : 1,
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: isAr ? '0' : '-0.03em',
                    textShadow: '0 4px 16px rgba(0,0,0,0.35)'
                }}>
                    {isAr ? 'جوهر ' : <>L'Essence de la <br /></>}
                    <span style={{
                        color: '#a3e635',
                        fontStyle: isAr ? 'normal' : 'italic',
                        position: 'relative',
                        display: 'inline-block',
                        textShadow: '0 4px 20px rgba(85, 139, 47, 0.45)'
                    }}>
                        {isAr ? 'الطبيعة' : 'Nature'}
                        <svg style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 100 12" preserveAspectRatio="none">
                            <path d="M0,10 Q50,0 100,10" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.85" />
                        </svg>
                    </span>
                    {" "}{isAr ? 'النقية' : 'Pure'}
                </h1>

                <p style={{
                    fontSize: 'clamp(1rem, 2.8vw, 1.3rem)',
                    marginBottom: 'clamp(2rem, 8vw, 3.5rem)',
                    color: 'rgba(255,255,255,0.96)',
                    maxWidth: '800px',
                    margin: '0 auto clamp(2rem, 8vw, 3.5rem) auto',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    textShadow: '0 2px 8px rgba(0,0,0,0.35)'
                }}>
                    {isAr
                        ? 'اكتشفوا تشكيلة استثنائية من زيت الزيتون الحر، العسل الطبيعي والمنتجات الطبيعية، المحصودة بعناية من قلب أجود الأراضي المغربية.'
                        : "Découvrez une sélection d'exception de miel pur, huiles et cosmétiques bio, récoltés avec respect au cœur des terroirs les plus préservés."}
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <motion.div
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/catalog"
                            className="btn btn-primary"
                            style={{
                                padding: '1.2rem 2.5rem',
                                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                background: 'linear-gradient(135deg, #558b2f 0%, #7cb342 100%)',
                                color: '#ffffff',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 10px 25px rgba(85, 139, 47, 0.45)',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem'
                            }}
                        >
                            {isAr ? 'تصفح المتجر' : 'Explorer la boutique'}
                            <ArrowRight size={22} style={{ transform: isAr ? 'rotate(180deg)' : 'none' }} />
                        </Link>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/about#notre-histoire"
                            className="btn btn-outline"
                            style={{
                                padding: '1.2rem 2.5rem',
                                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                background: 'rgba(255, 255, 255, 0.14)',
                                backdropFilter: 'blur(8px)',
                                color: '#ffffff',
                                borderColor: '#ffffff',
                                textDecoration: 'none',
                                display: 'inline-block'
                            }}
                        >
                            {isAr ? 'خبرتنا وأصالتنا' : 'Notre savoir-faire'}
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    bottom: '3rem',
                    color: 'white',
                    opacity: 0.6
                }}
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;
