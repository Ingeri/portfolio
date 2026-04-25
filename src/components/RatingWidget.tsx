'use client';

import React, { useState } from 'react';

interface RatingWidgetProps {
  itemId: string;
  itemType: 'project' | 'article';
  averageRating: number;
  totalRatings: number;
  userRatings?: any[];
}

export default function RatingWidget({
  itemId,
  itemType,
  averageRating,
  totalRatings,
  userRatings = [],
}: RatingWidgetProps) {
  const [hasRated, setHasRated] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRating = async () => {
    if (!selectedRating || !userName.trim()) {
      alert('Please select a rating and enter your name');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [itemType === 'project' ? 'projectId' : 'articleId']: itemId,
          score: selectedRating,
          userName,
          comment,
        }),
      });

      if (res.ok) {
        setHasRated(true);
        setShowForm(false);
        setSelectedRating(0);
        setUserName('');
        setComment('');
        // Reload page to show new rating
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg
      className={`w-5 h-5 ${filled ? 'fill-yellow-400' : 'fill-slate-300'}`}
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );

  return (
    <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <StarIcon key={rating} filled={rating <= Math.round(averageRating)} />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {averageRating > 0 ? averageRating.toFixed(1) : 'No ratings'} ({totalRatings})
            </span>
          </div>
        </div>
        {!hasRated && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            Rate
          </button>
        )}
      </div>

      {showForm && (
        <div className="mt-4 p-4 bg-white dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-600">
          <h4 className="font-semibold mb-3">Share your rating</h4>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <svg
                    className={`w-8 h-8 ${
                      rating <= (hoveredRating || selectedRating)
                        ? 'fill-yellow-400'
                        : 'fill-slate-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name *</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Optional comment..."
              disabled={isSubmitting}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50 resize-none"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmitRating}
              disabled={isSubmitting || !selectedRating || !userName.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded font-semibold transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setSelectedRating(0);
                setUserName('');
                setComment('');
              }}
              disabled={isSubmitting}
              className="px-4 py-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded font-semibold transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {userRatings && userRatings.length > 0 && (
        <div className="mt-4 space-y-3 border-t border-slate-200 dark:border-slate-700 pt-4">
          <h4 className="font-semibold text-sm">Recent ratings</h4>
          {userRatings.slice(0, 3).map((rating: any, idx) => (
            <div key={idx} className="text-sm bg-white dark:bg-slate-900 p-2 rounded">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <svg
                      key={r}
                      className={`w-3 h-3 ${
                        r <= rating.score ? 'fill-yellow-400' : 'fill-slate-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold">{rating.userName}</span>
              </div>
              {rating.comment && <p className="text-slate-600 dark:text-slate-400">{rating.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
