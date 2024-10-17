import React from "react";

export default function TermsOfService() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 bg-white  rounded-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-[#146eb4]">
        Terms of Service
      </h1>

      <section className="text-gray-700 mb-8">
        <p className="text-lg font-semibold mb-4 text-center">
          <strong>
            These terms govern your use of the vehicle rental service provided
            by ‘WeRide’.
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
        <p className="text-lg font-semibold mb-4">
          <blockquote>
            <strong>Vehicle Rental Agreement</strong>
          </blockquote>
        </p>
        <p className="mb-4">
          <strong> Rental Duration:</strong> You as a rider agree to rent the
          vehicle for the duration agreed upon with the vehicle owner. Any
          extension of time will result in late fees charge levied on the rider
          (read late fees policy).
        </p>
        <p className="mb-4">
          <strong> Rental Fees:</strong> You agree to pay the hourly rental fee
          as set by the vehicle owner. The rental fee must be paid in full
          before the rental period begins.
        </p>
        <p className="mb-4">
          <strong> Petrol Refill Requirement:</strong> Riders must refill the
          vehicle to the petrol level specified by the owner (pre-decided)
          before returning the vehicle. Failure to do so will result in
          additional charges.
        </p>
      </section>

      <section className="text-gray-700 mb-8">
        <p className="text-lg font-semibold mb-4">
          <blockquote>
            <strong>Late Fee Policy</strong>
          </blockquote>
        </p>
        <p className="mb-4 ">
          <strong>Late Returns:</strong>
          <br></br>
          If a vehicle is not returned by the agreed-upon time, a late fee will
          be charged.<br></br>
          For the first late hour, <br></br>
          <strong>Late Fee = (2 * Rental Fee). </strong>
          <br></br>
          For each subsequent hour n, the late fee can be calculated as:
          <br></br>
          <strong>
            Late Fee (for hour n) = Previous Late Fee + 0.5 * Previous Late Fee.
          </strong>
        </p>
        <p className="mb-4 ">
          For example, if you rented a vehicle for two hours for rental fees of
          Rs.100 and returned it after five hours, the total extra cost (other
          than the rental fees) would be:<br></br>
          <strong>
            {" "}
            (2 * 100)[for 1st hr] + ((200 * 0.5) + 200) [for 2nd hr] + ((300 *
            0.5) + 300) [for 3rd hr] <br></br>= 200 + 300 + 450 = Rs. 950
          </strong>
        </p>
        <p className="mb-4">
          <strong>Grace Period:</strong> A 10-12 minute grace period may be
          provided before late fees are applied.
        </p>
      </section>

      <section className="text-gray-700 mb-8">
        <p className="text-lg font-semibold mb-4">
          <blockquote>
            <strong>Vehicle Condition</strong>
          </blockquote>
        </p>
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
        <p className="text-lg font-semibold mb-4">
          <blockquote>
            <strong>Reckless Driving Policy</strong>
          </blockquote>
        </p>
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
        <p className="mb-4">
          <blockquote>
            <strong>Consequences:</strong> While WeRide does not have direct
            control over the actions of users, any reports or evidence of
            reckless driving may result in immediate termination of the rental
            agreement, forfeiture of any deposits, and a permanent ban from our
            platform. Additionally, renters are fully responsible for any legal
            consequences, fines, penalties, or damages resulting from reckless
            driving.
          </blockquote>
        </p>
        <p className="mb-4">
          By using our service, you agree to adhere to all traffic laws and
          drive responsibly at all times.
        </p>
      </section>
    </main>
  );
}
