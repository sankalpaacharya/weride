import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-12 bg-white shadow-md rounded-lg">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-[#146eb4]">Privacy Policy</h1>
            
            <section className="text-gray-700 mb-8">
                <p className="text-lg font-semibold mb-4">
                    <strong>1. Information We Collect</strong>
                </p>
                <p className="mb-4">
                    <strong>1.1. Personal Information:</strong> We collect personal information such as your name, contact information, and payment details when you register or use our service.
                </p>
                <p className="mb-4">
                    <strong>1.2. Vehicle Data:</strong> We may collect data about the vehicles you rent or provide for rent, including but not limited to location, usage, and condition.
                </p>
            </section>
            
            <section className="text-gray-700 mb-8">
                <p className="text-lg font-semibold mb-4">
                    <strong>2. How We Use Your Information</strong>
                </p>
                <p className="mb-4">
                    <strong>2.1. Service Provision:</strong> We use your personal information to provide and improve our services, including facilitating vehicle rentals and processing payments.
                </p>
                <p className="mb-4">
                    <strong>2.2. Communication:</strong> We may use your contact information to send you service-related notifications and updates.
                </p>
                <p className="mb-4">
                    <strong>2.3. Legal Compliance:</strong> We may disclose your information to comply with legal obligations or to protect our rights.
                </p>
            </section>

            <section className="text-gray-700 mb-8">
                <p className="text-lg font-semibold mb-4">
                    <strong>3. Data Security</strong>
                </p>
                <p className="mb-4">
                    We take reasonable steps to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
                </p>
            </section>

            <section className="text-gray-700 mb-8">
                <p className="text-lg font-semibold mb-4">
                    <strong>4. Data Sharing</strong>
                </p>
                <p className="mb-4">
                    <strong>4.1. With Vehicle Owners/Riders:</strong> Your personal information may be shared with the vehicle owner or rider to facilitate the rental process.
                </p>
                <p className="mb-4">
                    <strong>4.2. With Third Parties:</strong> We do not sell or share your personal information with third parties for marketing purposes without your consent.
                </p>
            </section>

            <section className="text-gray-700 mb-8">
                <p className="text-lg font-semibold mb-4">
                    <strong>5. Your Rights</strong>
                </p>
                <p className="mb-4">
                    <strong>5.1. Access and Correction:</strong> You have the right to access and correct your personal information held by us.
                </p>
                <p className="mb-4">
                    <strong>5.2. Deletion:</strong> You may request the deletion of your personal information, subject to legal obligations.
                </p>
            </section>

            <div className="text-center mt-8">
                <Link href="/" className="inline-block px-6 py-2 text-white bg-[#146eb4] rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
