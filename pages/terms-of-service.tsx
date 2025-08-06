import React from 'react'
import Layout from '../components/layout/Layout'

const TermsOfService: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Luxury Hotel. These terms and conditions outline the rules and regulations for the use of our website and services.
            </p>
            <p className="mb-4">
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Luxury Hotel's website if you do not accept all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">2. Booking and Reservations</h2>
            <p className="mb-4">
              When making a reservation through our website, you agree to provide accurate, current, and complete information. You are responsible for all charges, fees, duties, taxes, and assessments arising out of your use of our services.
            </p>
            <p className="mb-4">
              Confirmation of your reservation depends upon your agreement to the following terms:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">You guarantee that you are at least 18 years of age and possess the legal authority to enter into this agreement.</li>
              <li className="mb-2">You agree to abide by all terms and conditions of purchase, including payment of all amounts when due.</li>
              <li className="mb-2">You understand that any violation of these terms and conditions may result in cancellation of your reservation, denial of access, or termination of your stay.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">3. Cancellation and Refund Policy</h2>
            <p className="mb-4">
              Cancellation policies vary depending on the room type and rate plan selected. Please review the specific cancellation policy provided at the time of booking. Generally, our policies are as follows:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Cancellations made more than 48 hours prior to check-in: Full refund minus processing fees.</li>
              <li className="mb-2">Cancellations made within 48 hours of check-in: No refund unless otherwise specified in your booking terms.</li>
              <li className="mb-2">No-shows: Full charge for the entire stay.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">4. Check-in and Check-out</h2>
            <p className="mb-4">
              Standard check-in time is 3:00 PM, and check-out time is 11:00 AM. Early check-in or late check-out may be available upon request but cannot be guaranteed and may incur additional charges.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">5. Hotel Rules and Regulations</h2>
            <p className="mb-4">
              During your stay, you agree to comply with all hotel rules and regulations, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">No smoking in non-smoking rooms or areas.</li>
              <li className="mb-2">No pets unless explicitly permitted in pet-friendly rooms.</li>
              <li className="mb-2">Maintaining appropriate noise levels, especially during quiet hours (10:00 PM to 7:00 AM).</li>
              <li className="mb-2">Proper use of hotel facilities and amenities.</li>
              <li className="mb-2">Respecting other guests and hotel staff.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">6. Liability</h2>
            <p className="mb-4">
              The hotel is not responsible for any loss, damage, or theft of personal belongings left in guest rooms or public areas. We recommend using the in-room safe for valuables. The hotel's liability for any claims is limited to the amount paid for your reservation.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">7. Privacy</h2>
            <p className="mb-4">
              Your use of our services is also governed by our Privacy Policy, which can be found <a href="/privacy-policy" className="text-blue-600 hover:underline">here</a>.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">8. Modifications to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after any changes indicates your acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mb-4">
              Email: legal@luxuryhotel.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Luxury Avenue, City Center
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TermsOfService