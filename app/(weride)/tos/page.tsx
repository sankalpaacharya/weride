import React from "react";

export default function TermsOfService() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 bg-white  rounded-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">
        Terms of Service
      </h1>

      <section className="text-gray-700 mb-8">
        <p className="text-lg font-semibold mb-4 text-center">
          <strong>
            These terms govern your use of the vehicle rental service provided
            by ‘Weride’.
          </strong>
        </p>
        <p className="mb-4">
          By accessing or using our service, you agree to these terms in full.
        </p>
        <p className="mb-4">
          You must be a registered user and at least{" "}
          <strong>18 years old</strong> to use this service. By using this
          service, you represent that you meet these eligibility requirements.
        </p>
        <p className="mb-4">
          You must possess a valid driving license for two-wheelers. By
          proceeding with the rental, you confirm that you hold a current and
          valid two-wheeler driving license and that you are legally permitted
          to operate the vehicle. Failure to present a valid license upon
          request or if found driving without one will result in immediate
          cancellation of the rental, potential legal action, and a permanent
          ban from our platform.
        </p>
        <p className="mb-4">
          Please ensure you have your <strong>driving license</strong> with you
          at all times during the rental period.
        </p>
      </section>

      <section className="text-gray-700 mb-8">
        <blockquote>
          <strong>1. Platform’s Role & Responsibilities</strong>
        </blockquote>
        <ul className="list-disc pl-6 mb-4">
          <li>
            WeRide is <strong>only an intermediary</strong> connecting vehicle
            owners with renters. We do not own, operate, or manage any vehicles.
          </li>
          <li>
            Vehicle availability is <strong>not guaranteed</strong>. Owners have
            the discretion to accept or reject rental requests.
          </li>
          <li>
            WeRide <strong>assumes no responsibility</strong> for the mechanical
            condition, safety, or reliability of any vehicle listed on the
            platform.
          </li>
        </ul>
      </section>

      <section className="text-gray-700 mb-8">
        <blockquote>
          <strong>2. Vehicle Rental Agreement</strong>
        </blockquote>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Rental Duration:</strong> Riders agree to rent the vehicle
            for the duration agreed upon with the owner. Extensions may incur
            late fees as per our Late Fees Policy.
          </li>
          <li>
            <strong>Rental Fees:</strong> Riders must pay the rental fee as set
            by the vehicle owner. The full amount is due at the end of the
            rental period.
          </li>
          <li>
            <strong>Petrol Refill Requirement:</strong> Riders are responsible
            for refueling as needed. Refill costs (backed by proof such as a
            receipt or fuel meter photo) will be deducted from the total rental
            cost.
          </li>
          <li>
            <strong>Damage Responsibility:</strong> Riders bear full
            responsibility for any damages incurred during the rental period.
          </li>
          <li>
            If a vehicle is damaged, the rider{" "}
            <strong>must compensate the owner</strong> for repairs or
            replacement.
          </li>
          <li>
            WeRide <strong>will not mediate disputes</strong> related to vehicle
            damages between owners and riders.
          </li>
        </ul>
      </section>

      <section className="text-gray-700 mb-8">
        <blockquote>
          <strong>3. Commitment to Users</strong>
        </blockquote>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>For Owners:</strong> WeRide strives to{" "}
            <strong>maximize rental assignments</strong> for available vehicles
            but does not guarantee a steady flow of bookings.
          </li>
          <li>
            <strong>For Riders:</strong> If the requested vehicle is
            unavailable, <strong>WeRide may suggest an alternative</strong>.
            However, final approval remains with both the rider and the new
            owner.
          </li>
        </ul>
      </section>

      <section className="text-gray-700 mb-8">
        <blockquote>
          <strong>4. Late Fee Policy</strong>
        </blockquote>
        <p className="mb-4">
          <strong>Late Returns:</strong>
          <br />
          If a vehicle is not returned by the agreed-upon time, a late fee will
          be charged. A grace period of <strong>15 minutes</strong> is provided
          before any late fees apply.
        </p>

        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>1st hour late:</strong> 1.25 × hourly rental fee
          </li>
          <li>
            <strong>2nd hour late:</strong> 1.5 × hourly rental fee
          </li>
          <li>
            <strong>3rd hour late:</strong> 1.75 × hourly rental fee
          </li>
          <li>
            <strong>4th hour & beyond (up to 6 hours):</strong> 2 × hourly
            rental fee per hour
          </li>
          <li>
            <strong>More than 6 hours late:</strong> A flat fine (₹X) set by the
            owner applies
          </li>
        </ul>

        <p className="mb-4">
          <strong>Example:</strong>
          <br />
          Suppose you rented a vehicle for two hours at Rs. 50 per hour and
          returned it after five hours (3 hours late). The total extra cost
          (other than the base rental fees) would be:
        </p>

        <p className="mb-4">
          <strong>
            (1.25 × 50) [for 1st hr] + (1.5 × 50) [for 2nd hr] + (1.75 × 50)
            [for 3rd hr]
            <br />= 62.5 + 75 + 87.5 = Rs. 225 (Late Fees)
          </strong>
        </p>

        <p className="mb-4">
          <strong>Additional Charges: </strong>
          Distance-based charges for the extra 3 hours will also apply as per
          the rental agreement. The final amount due will be calculated as:
          <strong>
            {" "}
            Base Rental Fee + Late Fees + Distance-Based Charges.
          </strong>
        </p>

        <p className="mb-4">
          If the vehicle is returned more than 6 hours late, a flat fine set by
          the owner (₹X) will be applied in addition to all other charges.
        </p>
      </section>

      <section className="text-gray-700 mb-8">
        <blockquote>
          <strong>5. Vehicle Condition</strong>
        </blockquote>
        <p className="mb-4">
          <strong> Inspection:</strong> Both the Rider and the Owner must
          inspect the vehicle before the rental period begins, noting any
          pre-existing damage.
        </p>
        <p className="mb-4">
          <strong> Damage or Loss:</strong> Riders are responsible for any
          damage or loss that occurs during the rental period. In case of any
          damage, the rider agrees to compensate the vehicle owner for the cost
          of repairs or replacement.
        </p>
        <p className="mb-4">
          <strong>Cleanliness:</strong> The vehicle must be returned in a clean
          condition. A cleaning fee of Rs 200 will be charged if the vehicle is
          returned excessively dirty.
        </p>
      </section>

      <section className="text-gray-700 mb-8">
        <blockquote>
          <strong>6. Reckless Driving Policy</strong>
        </blockquote>
        <p className="mb-4">
          Reckless driving is strictly prohibited while using any vehicle rented
          through our platform. Reckless driving includes, but is not limited
          to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Speeding excessively beyond legal limits.</li>
          <li>
            Aggressive driving, such as tailgating, weaving in and out of
            traffic, or improper passing.
          </li>
          <li>
            Operating the vehicle under the influence of alcohol, drugs, or any
            other substances that impair driving ability.
          </li>
          <li>Performing dangerous maneuvers, such as stunts or racing.</li>
          <li>
            Driving in a manner that endangers the safety of the driver,
            passengers, pedestrians, or other road users.
          </li>
        </ul>
        <blockquote>
          <strong>Consequences:</strong> While Weride does not have direct
          control over the actions of users, any reports or evidence of reckless
          driving may result in immediate termination of the rental agreement,
          forfeiture of any deposits, and a permanent ban from our platform.
          Additionally, renters are fully responsible for any legal
          consequences, fines, penalties, or damages resulting from reckless
          driving.
        </blockquote>
        <p className="mb-4">
          By using our service, you agree to adhere to all traffic laws and
          drive responsibly at all times.
        </p>
      </section>
    </main>
  );
}
