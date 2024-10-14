import React from "react";

const FoodTypeFilter = ({ setSelectedFoodType }) => {
  return (
    <div className="flex justify-center mt-5 space-x-4">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
        onClick={() => setSelectedFoodType("ALL")}
      >
        All
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
        onClick={() => setSelectedFoodType("Veg")}
      >
        Veg
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
        onClick={() => setSelectedFoodType("Non-Veg")}
      >
        Non-Veg
      </button>
    </div>
  );
};

export default FoodTypeFilter;
