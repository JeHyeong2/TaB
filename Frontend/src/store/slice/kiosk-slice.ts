import { createSlice } from "@reduxjs/toolkit";



export type BusData = {
  busNo: string;
  eta: number;
  remainingStops: number;
  routeId: string;
  routeType: string;
  vehicleNo: string;
  vehicleType: string;
  stationId: string;
  stationName: string;
  stationOrder: number;
};

export type BusStoreData = BusData & {
  isStopHere: boolean;
  passengerNumber: number;
  isVulnerable: boolean;
};

type ErrorType = string | null;
type BusStopId = string | null;

export interface KioskState {
  citycode: number;
  busStopId: BusStopId;
  busData: BusStoreData[];
  nowCarouselPage: number;
  loading: boolean;
  error: ErrorType;
  masterkey: string;
}

const initialState: KioskState = {
  citycode: 22,
  busStopId: "DGB7001004100",
  masterkey: "123123123",
  busData: [],
  nowCarouselPage: 0,
  loading: false,
  error: null,
};

const kioskSlice = createSlice({
  name: "kiosk",
  initialState,
  reducers: {
    updateBusData(state, action) {
      state.busData = action.payload;
    },
    increasePassenger(state, action) {
      const vehicleNo = action.payload.vehicleNo;
      state.busData.forEach((el) => {
        if (el.vehicleNo == vehicleNo) {
          el.passengerNumber += 1;
          el.isStopHere = true;
          return;
        }
      });
      console.log(action.payload.vehicleNo);
    },
    syncCarouselPage(state, action) {
      state.nowCarouselPage = action.payload.now;
    },
    SetVulnerable(state, action) {
      const vehicleNo = action.payload.vehicleNo;
      state.busData.forEach((el) => {
        if (el.vehicleNo == vehicleNo) {
          el.isVulnerable = true;
          el.isStopHere = true;
          return;
        }
      });
    },
    checkMaster(state, action) {
      state.busStopId = action.payload;
      console.log(state.busStopId);
    },
  },
});

export const {
  updateBusData,
  increasePassenger,
  SetVulnerable,
  syncCarouselPage,
  checkMaster,
} = kioskSlice.actions;

export default kioskSlice;
