import React from 'react';

const CallYourDoctor = () => {
    const doctors = [
        { name: "General Hospital", phone: "1234567890" },
        { name: "Special Medicare", phone: "0987654321" },
        { name: "Police", phone: "1234567890" },
    ];

    return (
        <div className="bg-blue-700 py-2 px-4 w-full h-full rounded">
            <h1 className="text-red-500 text-2xl font-bold mb-4 text-center">Call Your Emergency services</h1>
            <ul className="text-center">
                {doctors.map((doctor, index) => (
                    <li key={index} className="mb-2">
                        <a href={`tel:${doctor.phone}`} className="text-white font-bold text-lg hover:underline">
                            {doctor.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CallYourDoctor;
