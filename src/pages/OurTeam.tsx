import React from 'react';
import Profilecard from '../components/common/Profilecard';
import img1 from "../assets/images/saurav.jpg";
import img2 from "../assets/images/jaydeep.jpg";
import img3 from "../assets/images/abhishek.jpeg";
import img4 from "../assets/images/sahil.jpg";
import img5 from "../assets/images/bharat.jpg";

const Ourteam: React.FC = () => {
  return (
    <div className="container my-24 mx-auto md:px-6">
      <section className="mb-32 text-center">
        <h2 className="mb-32 text-3xl font-bold uppercase">
         Our Team
        </h2>

        <div className="grid gap-x-4 md:grid-cols-5 lg:gap-x-12">
          {/* Team Member 1 */}
          <Profilecard
            imageSrc={img1}
            name="Saurav Rathod"
            role="Frontend Developer"
          />

          {/* Team Member 2 */}
          <Profilecard
            imageSrc={img2}
            name="Jaydeep Gadhavi"
            role="Frontend Developer"
          />

          {/* Team Member 3 */}
          <Profilecard
            imageSrc={img3}
            name="Abhishek Singh"
            role="Frontend Developer"
          />
          <Profilecard
            imageSrc={img4}
            name="Sahil Vaniya"
            role="Frontend Developer"
          />
          <Profilecard
            imageSrc={img5}
            name="Bharat Gareja"
            role="Frontend Developer"
          />
        </div>
      </section>
    </div>
  );
};

export default Ourteam;

