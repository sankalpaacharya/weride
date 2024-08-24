import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-[#146eb4]">Privacy Policy</h1>

            <section className="text-gray-700 mb-8">
                <p className="text-lg font-semibold mb-4">
                    <strong>1. Information We Collect</strong>
                    <hr className="border-t border-gray-600 my-4" />

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
                    <hr className="border-t border-gray-600 my-4" />
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
                    <hr className="border-t border-gray-600 my-4" />
                </p>
                <p className="mb-4">
                    We take reasonable steps to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
                </p>
            </section>

            <section className="text-gray-700 mb-8">
                <p className="text-lg font-semibold mb-4">
                    <strong>4. Data Sharing</strong>
                    <hr className="border-t border-gray-600 my-4" />
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
                    <hr className="border-t border-gray-600 my-4" />
                </p>
                <p className="mb-4">
                    <strong>5.1. Access and Correction:</strong> You have the right to access and correct your personal information held by us.
                </p>
                <p className="mb-4">
                    <strong>5.2. Deletion:</strong> You may request the deletion of your personal information, subject to legal obligations.
                </p>
            </section>
            <br></br>
            <br></br>
            <section className="text-gray-700 mb-8">
                <p className="text-lg font-semibold mb-4">
                    <strong>Other Important Policies</strong>
                    <hr className="border-t border-gray-600 my-4" />
                </p>
                <p className="text-lg font-semibold mb-4">
                    <strong>1. Dispute Resolution</strong>
                </p>
                <p className="mb-4">
                    <strong> Disputes Between Users:</strong> In case of a dispute between a rider and a owner, both parties agree to attempt to resolve the issue amicably. If a resolution cannot be reached, WeRide may assist in mediating the dispute, but we are not responsible for the final outcome.
                </p>
                <p className="text-lg font-semibold mb-4">
                    <strong>2. User Conduct</strong>
                </p>
                <p className="mb-4">
                    <strong> Prohibited Activities:</strong> Users may not engage in any illegal activities or misuse the vehicles rented through our service. This includes, but is not limited to, reckless driving, unauthorized alterations, or using the vehicle for purposes other than agreed upon.
                </p>
                <p className="mb-4">
                    <strong> Reporting Violations:</strong> Users are encouraged to report any violations of these terms to WeRide at <a href="mailto:sankalpaacharya01@gmail.com." className="text-blue-600 hover:underline">
                        sankalpaacharya01@gmail.com
                    </a>
                </p>
                <p className="text-lg font-semibold mb-4">
                    <strong>3. Modifications to Terms</strong>
                </p>
                <p className="mb-4">
                    We reserve the right to modify these terms at any time. Users will be notified of any changes via email or through our platform. Continued use of the service after changes are made constitutes acceptance of the new terms.
                </p>
                <p className="text-lg font-semibold mb-4">
                    <strong>4. Termination</strong>
                </p>
                <p className="mb-4">
                    We reserve the right to terminate or suspend your access to the service for any violation of these terms or for any other reason at our discretion.
                </p>
            </section>

        </main>
    );
}
