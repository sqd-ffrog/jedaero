import React from "react";
import { ScrollView, FoodCardCarousel } from "@sqd-ffrog/components";

function Food() {
  return (
    <ScrollView title="뭐먹을까">
      <FoodCardCarousel />
    </ScrollView>
  );
}

export default Food;
