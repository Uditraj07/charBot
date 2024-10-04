// src/CityInfo.js

import React, { useState } from 'react';
import axios from 'axios';
import Modal from './modal';

const CityInfo = () => {
    const [cityName, setCityName] = useState('');
    const [cityData, setCityData] = useState(null);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Thanks for using us. Please enter your desired destination.' },
    ]);

    const handleInputChange = (event) => {
        setCityName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!cityName) return;

        setError('');
        setCityData(null);

        // Add user's message to the chat
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: cityName },
        ]);

        try {
            const response = await axios.post('http://localhost:5000/ask', {
                city: cityName,
            });
            setShowModal(true);
            setCityData(response.data);

            // Add bot's response to the chat
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: 'bot',
                    text: `Fetching information about ${cityName}...`,
                },
            ]);
        } catch (error) {
            setError('Error fetching city data');
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: 'Error fetching city data' },
            ]);
            console.error(error);
        }

        setCityName(''); // Clear the input field after submission
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl mb-4">City Information Chat</h1>
                <div className="border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto">
                    {/* Chat box area */}
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-2 p-2 rounded-lg ${
                                message.sender === 'user'
                                    ? 'bg-blue-100 text-right'
                                    : 'bg-gray-100'
                            }`}
                        >
                            <p className="text-sm">
                                {message.sender === 'user' ? 'You' : 'Bot'}:{' '}
                                {message.text}
                            </p>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-4 flex">
                    <input
                        type="text"
                        value={cityName}
                        onChange={handleInputChange}
                        placeholder="Type your destination"
                        className="border p-2 mr-2 flex-grow rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Send
                    </button>
                </form>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Modal */}
                {showModal && (
                    <Modal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        cityData={cityData}
                    />
                )}
            </div>
        </>
    );
};

export default CityInfo;
