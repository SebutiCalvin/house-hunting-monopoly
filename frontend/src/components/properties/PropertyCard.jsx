import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-green-500',
      rented: 'bg-red-500',
      maintenance: 'bg-yellow-500',
      pending: 'bg-blue-500',
      unavailable: 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusText = (status) => {
    const texts = {
      available: 'Available',
      rented: 'Rented',
      maintenance: 'Maintenance',
      pending: 'Pending',
      unavailable: 'Unavailable'
    };
    return texts[status] || status;
  };

  return (
    <Link to={`/property/${property._id}`} className="block group">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.featuredImage || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold ${getStatusColor(property.status)}`}>
            {getStatusText(property.status)}
          </div>
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg">
            <span className="font-bold">M {property.price?.toLocaleString()}</span>
            <span className="text-sm text-gray-300 ml-1">/mo</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">{property.title}</h3>
          <p className="text-gray-600 text-sm">ðŸ“ {property.location?.city}, Lesotho</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span>ðŸ›ï¸ {property.bedrooms || 0} beds</span>
            <span>ðŸ› {property.bathrooms || 0} baths</span>
            <span>ðŸ‘ï¸ {property.views || 0} views</span>
          </div>
          {property.interestedUsers && property.interestedUsers.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">â¤ï¸ {property.interestedUsers.length} interested</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;s
