import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export interface UserReviewData {
    username: string;
    rating: number;
    comment: string;
  }
const UserReview: React.FC<UserReviewData> = ({ username, rating, comment }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className={`text-${index < rating ? "[#385A64]" : "gray-400"}`}
    />
  ));

  return (
    <div className="bg-white px-4 py-2 rounded-lg shadow-md ">
      <div className="flex items-center mb-2">
        <div className="text-xl font-semibold mr-2">{username}</div>
        <div className="flex text-indigo-500">{stars}</div>
      </div>
      <p className="text-gray-600">{comment}</p>
    </div>
  );
};

export default UserReview;
