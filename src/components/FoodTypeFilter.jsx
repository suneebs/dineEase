import React from "react";

const FoodTypeFilter = ({ setSelectedFoodType }) => {
  return (
    <div className="flex justify-center mt-5 space-x-4 font-playfair font-semibold">
      <button
        className="px-4 py-2 hover:bg-slate-400 rounded-lg border "
        onClick={() => setSelectedFoodType("ALL")}
      >
        All
      </button>
      <button
        className="px-4 py-2 hover:bg-green-500  rounded-lg border "
        onClick={() => setSelectedFoodType("Veg")}
      >
        Veg
      </button>
      <button
        className="px-4 py-2 hover:bg-red-500  rounded-lg border "
        onClick={() => setSelectedFoodType("Non-Veg")}
      >
        Non-Veg
      </button>
    </div>
  );
};

export default FoodTypeFilter;
