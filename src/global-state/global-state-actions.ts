import { TJoinProductionOptions } from "../components/production-line/types.ts";

export type TGlobalStateAction =
  | TPublishError
  | TProductionCreated
  | TProductionListFetched
  | TUpdateDevicesAction
  | TUpdateJoinProductionOptions
  | TDominantSpeaker
  | TAudioLevel
  | TMediaStream;

export type TPublishError = {
  type: "ERROR";
  payload: Error | null;
};

export type TDominantSpeaker = {
  type: "DOMINANT_SPEAKER";
  payload: string;
};

export type TProductionCreated = {
  type: "PRODUCTION_UPDATED";
};

export type TProductionListFetched = {
  type: "PRODUCTION_LIST_FETCHED";
};

export type TUpdateDevicesAction = {
  type: "DEVICES_UPDATED";
  payload: MediaDeviceInfo[];
};

export type TUpdateJoinProductionOptions = {
  type: "UPDATE_JOIN_PRODUCTION_OPTIONS";
  payload: TJoinProductionOptions | null;
};

export type TMediaStream = {
  type: "CONNECTED_MEDIASTREAM";
  payload: MediaStream | null;
};

export type TAudioLevel = {
  type: "AUDIO_LEVEL_ABOVE_THRESHOLD";
  payload: boolean;
};
