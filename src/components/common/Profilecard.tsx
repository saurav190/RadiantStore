import React from 'react';

interface CardProps {
  imageSrc: string;
  name: string;
  role: string;
}

const Profilecard: React.FC<CardProps> = ({ imageSrc, name, role }) => {
  return (
    <div className="mb-24 md:mb-0">
      <div className="block h-full rounded-lg bg-gray-500 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-white hover:text">
        <div className="flex justify-center">
          <div className="flex justify-center -mt-[75px]  ">
            <img src={imageSrc} className="mx-auto rounded-full object-conver shadow-lg dark:shadow-black/20 w-[150px] h-[200px]" alt={`${name} Avatar`} />
          </div>
        </div>
        <div className="p-6 hover:text-black" >
          <h5 className="mb-4 text-lg font-bold">{name}</h5>
          <p className="mb-6">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profilecard;
