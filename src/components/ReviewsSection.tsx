'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Star, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  MapPin, 
  Plus, 
  X, 
  ThumbsUp,
  ShieldCheck,
  Award
} from 'lucide-react';
import { REVIEWS_DATA, ReviewItem } from '@/lib/reviews-data';
import { Language, TRANSLATIONS } from '@/lib/translations';

interface ReviewsSectionProps {
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].reviews;
  const [filter, setFilter] = useState<'all' | 'family' | 'vip' | 'tour'>('all');
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newService, setNewService] = useState('Aeropuerto Cancún ➔ Riviera Maya');
  const [newComment, setNewComment] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const filteredReviews = reviews.filter(r => {
    if (filter === 'all') return true;
    return r.category === filter;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      country: newCountry.trim() || (language === 'es' ? 'México' : 'United States'),
      countryCode: '🌎',
      rating: newRating,
      date: language === 'es' ? 'Reciente' : 'Recent',
      serviceType: newService,
      serviceTypeEn: newService,
      category: 'family',
      title: {
        es: '¡Excelente experiencia con Americancun Transfer!',
        en: 'Outstanding experience with Americancun Transfer!'
      },
      comment: {
        es: newComment.trim(),
        en: newComment.trim()
      },
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewComment('');
    }, 2000);
  };

  return (
    <section id="resenas" className="py-20 bg-navy-950/90 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              {t.title} <span className="gold-gradient-text">{t.titleHighlight}</span>
            </h2>
            <p className="mt-2 text-gray-400 text-sm max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Action to leave review */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-gold-500/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>{t.leaveReviewBtn}</span>
            </button>
          </div>
        </div>

        {/* Aggregate Ratings Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          
          <div className="p-6 rounded-2xl glass-panel-gold border border-gold-500/30 flex flex-col items-center text-center justify-center">
            <span className="text-4xl font-extrabold text-gold-400 font-serif">4.9 / 5.0</span>
            <div className="flex gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
              ))}
            </div>
            <span className="text-xs text-gray-300 font-medium">{t.overallRating}</span>
            <span className="text-[10px] text-gray-400 mt-1">{t.basedOn}</span>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-base font-bold text-white">{t.punctualityStat}</span>
            <span className="text-xs text-gray-400 mt-1">{t.punctualityDesc}</span>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center mb-2">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-base font-bold text-white">{t.satisfactionStat}</span>
            <span className="text-xs text-gray-400 mt-1">{t.satisfactionDesc}</span>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/80 border border-gold-500/20 flex flex-col items-center text-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-base font-bold text-white">{t.safeFleetStat}</span>
            <span className="text-xs text-gray-400 mt-1">{t.safeFleetDesc}</span>
          </div>

        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-navy-900 border border-gold-500/20 rounded-2xl max-w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-gold-500 text-navy-950 shadow'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {t.filterAll} ({reviews.length})
          </button>
          <button
            onClick={() => setFilter('family')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'family'
                ? 'bg-gold-500 text-navy-950 shadow'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {t.filterFamily}
          </button>
          <button
            onClick={() => setFilter('vip')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'vip'
                ? 'bg-gold-500 text-navy-950 shadow'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {t.filterVip}
          </button>
          <button
            onClick={() => setFilter('tour')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === 'tour'
                ? 'bg-gold-500 text-navy-950 shadow'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {t.filterTours}
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel rounded-3xl p-6 border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-gold-500/10 group"
            >
              <div>
                {/* Author row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-gold-500/40">
                      <Image
                        src={rev.avatarUrl}
                        alt={rev.author}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-gold-400 transition-colors">
                        {rev.author}
                      </h4>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <span>{rev.countryCode}</span>
                        <span>{rev.country}</span>
                      </span>
                    </div>
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.verifiedTrip}</span>
                    </span>
                  )}
                </div>

                {/* Stars and date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-500">{rev.date}</span>
                </div>

                {/* Review Title & Comment */}
                <h5 className="text-sm font-bold text-gold-200 mb-2 leading-snug">
                  "{rev.title[language] || rev.title.es}"
                </h5>
                <p className="text-xs text-gray-300 leading-relaxed italic">
                  "{rev.comment[language] || rev.comment.es}"
                </p>
              </div>

              {/* Service route badge footer */}
              <div className="mt-5 pt-3 border-t border-navy-800 flex items-center gap-1.5 text-[11px] text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="truncate">{language === 'en' ? rev.serviceTypeEn : rev.serviceType}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Review Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-navy-900 border border-gold-500/30 rounded-3xl p-6 shadow-2xl shadow-navy-950">
            
            <div className="flex items-center justify-between pb-4 border-b border-navy-800 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
                <span>{language === 'es' ? 'Comparte tu Experiencia' : 'Share your Experience'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">
                  {language === 'es' ? '¡Muchas gracias por tu reseña!' : 'Thank you for your review!'}
                </h4>
                <p className="text-xs text-gray-400">
                  {language === 'es' ? 'Tu opinión ha sido añadida con éxito.' : 'Your feedback has been added successfully.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="text-gray-300 block mb-1">
                    {language === 'es' ? 'Tu Nombre Completo *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carlos Mendoza"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-300 block mb-1">
                      {language === 'es' ? 'Ciudad o País' : 'City or Country'}
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Chicago / Madrid"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="text-gray-300 block mb-1">
                      {language === 'es' ? 'Calificación' : 'Rating'}
                    </label>
                    <div className="flex gap-1.5 pt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newRating ? 'text-gold-400 fill-gold-400' : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">
                    {language === 'es' ? 'Servicio o Destino de tu viaje' : 'Service or Destination'}
                  </label>
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">
                    {language === 'es' ? 'Tus Comentarios *' : 'Your Comments *'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={language === 'es' ? 'Cuéntanos sobre la puntualidad, el chofer o el vehículo...' : 'Tell us about the punctuality, vehicle, or driver...'}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-navy-950 border border-gold-500/30 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold uppercase tracking-wider text-xs shadow-lg transition-colors"
                >
                  {language === 'es' ? 'Publicar Reseña' : 'Publish Review'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
