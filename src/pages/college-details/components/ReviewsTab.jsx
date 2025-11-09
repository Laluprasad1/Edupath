import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReviewsTab = ({ reviews, overallRating }) => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');
  const [showWriteReview, setShowWriteReview] = useState(false);

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'helpful', label: 'Most Helpful' },
    { value: 'rating-high', label: 'Highest Rating' },
    { value: 'rating-low', label: 'Lowest Rating' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const filteredReviews = reviews?.filter(review => {
    if (filterRating === 'all') return true;
    return review?.rating === parseInt(filterRating);
  });

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderStars = (rating, size = 16) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={size}
        className={i < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews?.length;

  return (
    <div className="space-y-6">
      {/* Overall Rating Summary */}
      <div className="glass-card rounded-lg border border-border/40 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Score */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
              <div className="text-4xl font-bold text-primary">{overallRating?.average}</div>
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(Math.floor(overallRating?.average), 20)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {totalReviews} reviews
                </p>
              </div>
            </div>
            
            {/* Category Ratings */}
            <div className="grid grid-cols-2 gap-4">
              {overallRating?.categories?.map((category) => (
                <div key={category?.name} className="text-center p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium text-foreground">{category?.name}</p>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {renderStars(Math.floor(category?.rating), 14)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{category?.rating}/5</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Distribution */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Rating Distribution</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1]?.map((rating) => {
                const count = ratingDistribution?.[rating];
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm">{rating}</span>
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-warning rounded-full h-2 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            label="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="w-full sm:w-48"
          />
          <Select
            label="Filter by rating"
            options={ratingOptions}
            value={filterRating}
            onChange={setFilterRating}
            className="w-full sm:w-48"
          />
        </div>
        <Button
          variant="default"
          iconName="PenTool"
          iconPosition="left"
          onClick={() => setShowWriteReview(!showWriteReview)}
        >
          Write Review
        </Button>
      </div>
      {/* Write Review Form */}
      {showWriteReview && (
        <div className="glass-card rounded-lg border border-border/40 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Write Your Review</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Your Name"
                type="text"
                placeholder="Enter your name"
              />
              <Input
                label="Course/Program"
                type="text"
                placeholder="Which program did you study?"
              />
            </div>
            
            {/* Rating Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Overall Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5]?.map((rating) => (
                  <button
                    key={rating}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Icon name="Star" size={24} className="text-muted-foreground hover:text-warning" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Review
              </label>
              <textarea
                className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                rows={4}
                placeholder="Share your experience about this college..."
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowWriteReview(false)}
              >
                Cancel
              </Button>
              <Button variant="default">
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews?.map((review) => (
          <div
            key={review?.id}
            className="glass-card rounded-lg border border-border/40 p-6"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {review?.author?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{review?.author}</h4>
                  <p className="text-sm text-muted-foreground">{review?.course}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(review?.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review?.date)}
                    </span>
                  </div>
                </div>
              </div>
              
              {review?.verified && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded-full text-xs">
                  <Icon name="Shield" size={12} />
                  <span>Verified</span>
                </div>
              )}
            </div>

            {/* Review Content */}
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">{review?.content}</p>
              
              {/* Pros and Cons */}
              {(review?.pros || review?.cons) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {review?.pros && (
                    <div>
                      <h5 className="font-medium text-success mb-2 flex items-center space-x-1">
                        <Icon name="ThumbsUp" size={16} />
                        <span>Pros</span>
                      </h5>
                      <ul className="space-y-1">
                        {review?.pros?.map((pro, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <Icon name="Plus" size={12} className="text-success mt-0.5" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {review?.cons && (
                    <div>
                      <h5 className="font-medium text-error mb-2 flex items-center space-x-1">
                        <Icon name="ThumbsDown" size={16} />
                        <span>Cons</span>
                      </h5>
                      <ul className="space-y-1">
                        {review?.cons?.map((con, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                            <Icon name="Minus" size={12} className="text-error mt-0.5" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-4">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="ThumbsUp" size={16} />
                  <span>Helpful ({review?.helpfulCount})</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="MessageCircle" size={16} />
                  <span>Reply</span>
                </button>
              </div>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Flag" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredReviews?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Reviews Found</h3>
          <p className="text-muted-foreground">Be the first to write a review for this college.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;