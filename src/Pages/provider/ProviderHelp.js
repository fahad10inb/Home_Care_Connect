import React, { useState } from 'react';
import './ProviderHelp.css';

const faqs = [
  {
    question: "How do I become a registered service provider?",
    answer: "Click on the 'Join as Provider' link, fill in your details, and upload the necessary documents for verification. Once approved, you can start accepting jobs."
  },
  {
    question: "How do I update my availability?",
    answer: "Go to your profile, click on the 'Availability' tab, and update your schedule. Make sure to regularly update your availability to avoid job conflicts."
  },
  {
    question: "How do I accept or decline job requests?",
    answer: "Once a customer requests your service, you’ll receive a notification. You can either accept or decline the job from the job requests section in your dashboard."
  },
  {
    question: "How will I receive payments?",
    answer: "Payments will be credited to your registered account within 48 hours after the job is completed and approved by the customer."
  },
  {
    question: "What should I do if a customer cancels at the last minute?",
    answer: "Last-minute cancellations may incur a cancellation fee, which will be credited to your account. Check the cancellation policy for more details."
  }
];

const ProviderHelp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-container">
      {/* Introduction Section */}
      <div className="title_h">
        <h1>Provider Help Page</h1>
        <p>Find answers and guidance for using Home Care Connect as a provider.</p>
      </div>

      {/* Introduction */}
      <div className="section_h">
        <h2>Introduction</h2>
        <p>
          Home Care Connect is a platform that connects service providers with customers
          seeking home services like cleaning, plumbing, and electrical work. Our mission
          is to make it easy for customers to find reliable service professionals and for
          providers to grow their business by offering quality services.
        </p>
      </div>

      {/* For Service Providers */}
      <div className="section_h">
        <h2>For Service Providers</h2>
        <p>
          <strong>How to Register as a Provider:</strong> Sign up by filling out the
          registration form, create your profile, and verify your credentials to begin
          accepting jobs.
        </p>
        <p>
          <strong>Managing Availability:</strong> Update your availability by going to
          your profile and marking the dates and times you’re available for jobs.
        </p>
        <p>
          <strong>Handling Jobs:</strong> View job requests from the dashboard, communicate
          with customers, and mark jobs as completed after they’re done.
        </p>
        <p>
          <strong>Payment Process:</strong> Payments are processed within 48 hours of job
          completion. You can withdraw your earnings through your linked account.
        </p>
        <p>
          <strong>Feedback and Reviews:</strong> You can view customer feedback in your
          dashboard. Keep a high rating by providing excellent service and addressing
          any concerns promptly.
        </p>
        <p>
          <strong>Support:</strong> If you encounter any issues, feel free to reach out to
          our provider support team through the contact options below.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="faq-section_h">
        <h2>Frequently Asked Questions</h2> {/* Heading for FAQ section */}
        {faqs.map((faq, index) => (
          <div key={index}>
            <div
              className="faq-question_h"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>
            <div className={`faq-answer_h ${activeIndex === index ? 'active' : ''}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      {/* Troubleshooting Section */}
      <div className="section_h">
        <h2>Common Troubleshooting Tips</h2>
        <p>
          <strong>Login Issues:</strong> Ensure you’re using the correct credentials. If
          you've forgotten your password, use the 'Forgot Password' link to reset it.
        </p>
        <p>
          <strong>Booking Errors:</strong> Double-check the availability you’ve marked on
          your profile. If there’s a conflict, make sure your availability is up to date.
        </p>
        <p>
          <strong>Payment Problems:</strong> Payments can take up to 48 hours to process.
          If you haven’t received a payment after this time, contact support.
        </p>
      </div>

      {/* Contact Information Section */}
      <div className="contact-section_h">
        <h2>Contact Information</h2> {/* Changed h3 to h2 */}
        <p>
          For additional support, contact us at:
          <br />
          <strong>Email:</strong> support@homecareconnect.com
          <br />
          <strong>Phone:</strong> +1 (800) 123-4567
          <br />
          <strong>Live Chat:</strong> Available on our website from 9 AM to 5 PM.
        </p>
        <p>
          You can also visit our <a href="/help-center">Help Center</a> for more
          detailed guides and support resources.
        </p>
      </div>
    </div>
  );
};

export default ProviderHelp;
