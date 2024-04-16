import styled from "@emotion/styled";
import MicMute from "./mic_off.svg";
import MicUnmute from "./mic_on.svg";

const Icon = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const MicMuted = () => <Icon src={MicMute} alt="off-microphone" />;

export const MicUnmuted = () => <Icon src={MicUnmute} alt="on-microphone" />;
