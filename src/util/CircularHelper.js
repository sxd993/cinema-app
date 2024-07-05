export const colorTransform = (rating) => {
    if (rating >= 70) {
        return 'green';
    } else if (rating >= 40) {
        return 'orange';
    } else {
        return 'red';
    }
};

export const formatRating = (rating) => {
    const newRating = (rating.toFixed(1) * 10)
    return newRating;
} 