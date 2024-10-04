// src/Modal.js

import React from 'react';

const Modal = ({ showModal, setShowModal, cityData }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-4xl h-full overflow-y-auto">
                <button 
                    onClick={() => setShowModal(false)} 
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
                    Close
                </button>
                <h2 className="text-3xl mb-4">Details about {cityData.cityName}</h2>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Best Hotels:</h3>
                    <ul className="list-disc ml-5">
                        {cityData.bestHotels.map((hotel, index) => (
                            <li key={index}>{hotel}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Places to Visit:</h3>
                    <ul className="list-disc ml-5">
                        {cityData.placesToVisit.map((place, index) => (
                            <li key={index}>{place}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Best Season to Visit:</h3>
                    <p>{cityData.seasonToGo}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
