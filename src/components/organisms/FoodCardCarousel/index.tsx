import React from "react";
import Swiper from "react-native-swiper";
import { FoodCard, LightColor } from "@sqd-ffrog/components";
import { Source } from "react-native-fast-image";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

interface FoodCardDataProps {
  title: string;
  source: Source;
  routeName: string;
}

const data: FoodCardDataProps[] = [
  {
    title: "백두관 식당",
    source: {
      uri:
        "https://github.com/sqd-ffrog/database/blob/master/foodbg/baekdu.jpg?raw=true"
    },
    routeName: "Baekdu"
  },
  {
    title: "기숙사 식당",
    source: {
      uri:
        "https://github.com/sqd-ffrog/database/blob/master/foodbg/dormImage.jpg?raw=true"
    },
    routeName: "Dormitory"
  }
];

function FoodCardCarousel() {
  const navigation = useNavigation();
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      activeDotColor={LightColor.mainColor}
    >
      {data.map(({ title, source, routeName }) => (
        <FoodCard
          key={title}
          source={source}
          onPress={() => navigation.navigate(routeName)}
        >
          {title}
        </FoodCard>
      ))}
    </Swiper>
  );
}

export default FoodCardCarousel;
