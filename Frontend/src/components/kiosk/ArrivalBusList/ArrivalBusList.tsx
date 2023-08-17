import { FC, useState, useEffect } from "react";
import { ArrivalBusListProps } from ".";
import { ArrivalBusListItem } from "../ArrivalBusListItem";
import Carousel from "react-material-ui-carousel";
import "./ArrivalBusList.css";
import {
  BusStoreData,
  syncCarouselPage,
} from "../../../store/slice/kiosk-slice";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/joy";

export const ArrivalBusList: FC<ArrivalBusListProps> = ({ pages }) => {
  const dispatch = useDispatch();

  return (
    <div className="bus-list-container">
      <Carousel
        indicatorIconButtonProps={{
          style: {
            padding: "0px", // 1
            color: "red", // 3
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: "0px", // 5
            textAlign: "left", // 4
          },
        }}
        duration={500}
        cycleNavigation={true}
        swipe={true}
        animation="fade"
        height={1900}
        interval={100000}
        stopAutoPlayOnHover={true}
        navButtonsAlwaysVisible={true}
        index={1}
        className="carouselll"
        onChange={(now, prev): void => {
          dispatch(syncCarouselPage({ now: now }));
          return;
        }}
      >

      {pages.map((page) => {
        return page.map((item: BusStoreData, index: number) => {
          return <ArrivalBusListItem item={item} key={index} />;
        });
      })}
          
      </Carousel>
    </div>
  );
};
