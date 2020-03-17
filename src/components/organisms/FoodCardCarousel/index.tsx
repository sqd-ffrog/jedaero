import React from "react";
import Swiper from "react-native-swiper";
import { FoodCard, LightColor } from "@sqd-ffrog/components";
import { ImageSourcePropType } from "react-native";
import styles from "./styles";

interface FoodCardDataProps {
  title: string;
  source: ImageSourcePropType;
}

const data: FoodCardDataProps[] = [
  {
    title: "백두관 식당",
    source: {
      uri:
        "https://github.com/sqd-ffrog/database/blob/master/foodbg/baekdu.jpg?raw=true"
    }
  },
  {
    title: "기숙사 식당",
    source: {
      uri:
        "https://github.com/sqd-ffrog/database/blob/master/foodbg/dormImage.jpg?raw=true"
    }
  }
];

function FoodCardCarousel() {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      activeDotColor={LightColor.mainColor}
    >
      {data.map(({ title, source }) => (
        <FoodCard key={title} source={source}>
          {title}
        </FoodCard>
      ))}
    </Swiper>
  );
}

export default FoodCardCarousel;
