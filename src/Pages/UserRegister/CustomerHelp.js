import React, { useState } from 'react';
import './CustomerHelp.css';

const faqs = [
  {
    question: "How do I sign up as a customer?",
    answer: "Click the 'Sign Up' button on the homepage, enter your details, and you're ready to start booking services."
  },
  {
    question: "How do I book a service?",
    answer: "After logging in, browse available services, select a provider, choose a time, and click 'Book Now.' You’ll receive a confirmation email with the details."
  },
  {
    question: "What if I need to reschedule or cancel a booking?",
    answer: "Go to 'My Bookings,' select the booking you wish to change, and choose the option to either reschedule or cancel. Cancellations within 24 hours may incur a fee."
  },
  {
    question: "How do I pay for the service?",
    answer: "Payments can be made using a credit card, debit card, or UPI. You can pay securely at the time of booking or after the service is completed."
  },
  {
    question: "What should I do if the service provider is late or doesn't show up?",
    answer: "Contact customer support immediately. We will help you resolve the issue or arrange for a replacement."
  },
  {
    question: "How do I rate a service provider?",
    answer: "After the service is completed, go to 'My Bookings' and click on the job to leave a rating and feedback."
  }
];

const CustomerHelp = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="help-container">
      {/* Introduction Section */}
      <div className="title_h">
        <h1>Customer Help Page</h1>
        <p>Find answers and guidance for using Home Care Connect as a customer.</p>
      </div>

      {/* Introduction */}
      <div className="section_h">
        <h2>Introduction</h2>
        <p>
          Welcome to Home Care Connect, your platform for easily booking home services like cleaning, plumbing, and electrical work. We aim to make your experience seamless and reliable.
        </p>
      </div>

      {/* For Customers */}
      <div className="section_h">
        <h2>For Customers</h2>
        <p>
          <strong>How to Book a Service:</strong> Browse available services, select a provider, and book your service in just a few steps. A confirmation email will be sent once your booking is successful.
        </p>
        <p>
          <strong>Payment Process:</strong> We offer various secure payment options like credit/debit cards and UPI. You can pay during booking or after the service.
        </p>
        <p>
          <strong>Managing Bookings:</strong> Access the 'My Bookings' section to manage, reschedule, or cancel any upcoming bookings. Please note that cancellations made within 24 hours may incur a fee.
        </p>
        <p>
          <strong>Feedback and Ratings:</strong> After your service is completed, you can provide feedback and rate the service provider in the 'My Bookings' section.
        </p>
        <p>
          <strong>Support:</strong> If you need help, our customer support is here for you. You can reach out via email or phone, or find answers to common questions in the FAQ section below.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="faq-section_h">
        <h2>Frequently Asked Questions</h2>
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
          <strong>Login Issues:</strong> Ensure you’re using the correct credentials. If you’ve forgotten your password, use the 'Forgot Password' link to reset it.
        </p>
        <p>
          <strong>Booking Errors:</strong> If you encounter errors while booking, ensure your payment method is valid and your internet connection is stable.
        </p>
        <p>
          <strong>Payment Problems:</strong> If you don’t receive a payment confirmation or face issues, contact support for assistance.
        </p>
      </div>

      {/* Contact Information Section */}
      <div className="contact-section_h">
        <h2>Contact Information</h2>
        <p>
          For more assistance, reach out to us at:
          <br />
          <strong>Email:</strong> support@homecareconnect.com
          <br />
          <strong>Phone:</strong> +1 (800) 123-4567
          <br />
          <strong>Live Chat:</strong> Available on our website from 9 AM to 5 PM.
        </p>
        <p>
          You can also visit our <a href="/help-center">Help Center</a> for more detailed guides and support resources.
        </p>
      </div>
    </div>
  );
};

export default CustomerHelp;
