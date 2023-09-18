import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
    <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">About Us</h2>

      <p className="mb-4">
        Welcome to Rediant Store, your trusted destination for high-quality products. We are more than just an online store; we are a team of passionate individuals dedicated to delivering exceptional experiences to our customers while making a positive impact on the world.
      </p>

      <h3 className="text-xl mt-4 mb-2">Our History</h3>
      <p>
        Rediant Store came into existence in 2023, driven by our collective vision for excellence. Our journey has been nothing short of remarkable, marked by unwavering commitment and a relentless pursuit of quality in everything we do.
      </p>

      <h3 className="text-xl mt-4 mb-2">Meet Our Team</h3>
      <p>
        Behind Rediant Store is a diverse team of dedicated professionals, each with their own unique expertise and a shared commitment to our mission. From design and technology to customer service, our team works tirelessly to bring you the best products and memorable shopping experiences.
      </p>

      <h3 className="text-xl mt-4 mb-2">Quality and Sustainability</h3>
      <p>
        Quality isn't just a goal for us; it's the very essence of our business. Every product we offer is meticulously curated to meet the highest standards of excellence. Beyond quality, we're champions of sustainability, actively taking steps to reduce our carbon footprint and source eco-friendly materials, because we believe in leaving a positive mark on the environment.
      </p>

      <h3 className="text-xl mt-4 mb-2">What Our Customers Say</h3>
      <p>
        Don't just take our word for it; hear from our valued customers about their experiences with Rediant Store:
      </p>
      <ul className="list-disc pl-4">
        <li>"Amazing products! I'm a lifelong customer."</li>
        <li>"Rediant Store sets a new standard for online shopping!"</li>
        <li>"Their commitment to quality and sustainability is impressive."</li>
      </ul>

      <h3 className="text-xl mt-4 mb-2">Contact Us</h3>
      <p>
        We're here to assist you in any way we can. Whether you have questions, feedback, or inquiries, please feel free to get in touch:
      </p>
      <p>
          Email: privacy@rediantstore.com<br />
          Phone: +1-123-456-7890
        </p>
    </div>
  </div>
  );
};

export default AboutUs;
