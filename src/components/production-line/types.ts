// TODO split user settings from join production options
export type TJoinProductionOptions = {
  productionId: string;
  lineId: string;
  username: string;
  // Not all devices have input available
  audioinput?: string;
  // Not all devices allow choosing output
  audiooutput?: string;
};

export type Hotkeys = {
  muteHotkey: string;
  speakerHotkey: string;
  pushToTalkHotkey: string;
  increaseVolumeHotkey: string;
  decreaseVolumeHotkey: string;
  globalMuteHotkey: string;
};

export type TParticipant = {
  name: string;
  sessionId: string;
  endpointId: string;
  isActive: boolean;
};

export type TLine = {
  name: string;
  id: string;
  participants: TParticipant[];
};

export type TBasicProduction = {
  name: string;
  productionId: string;
};

export type TProduction = TBasicProduction & {
  lines: TLine[];
};
