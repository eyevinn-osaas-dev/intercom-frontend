import styled from "@emotion/styled";
import { FC } from "react";
import {
  NoSoundIcon,
  FullSoundIcon,
  MinusIcon,
  PlusIcon,
} from "../../assets/icons/icon";
import { isMobile } from "../../bowser";
import { ActionButton } from "../landing-page/form-elements";

const SliderWrapper = styled.div`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const VolumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  padding: 0.5rem;
`;

const SliderTrack = styled.div`
  width: 80%;
  height: 0.4rem;
  background-color: #e0e0e0;
  border-radius: 0.2rem;
  position: relative;
`;

const SliderThumb = styled.div<{ position: number }>`
  width: 1.5rem;
  height: 1.5rem;
  background-color: #59cbe8;
  border-radius: 50%;
  position: absolute;
  top: -0.6rem;
  left: ${({ position }) => `${position}%`};
  transform: translateX(-50%);
  cursor: pointer;
`;

const VolumeButton = styled(ActionButton)`
  background-color: #32383b;
  width: 7rem;
  align-items: center;
  height: 4.5rem;
  padding: 1.5rem;
  cursor: pointer;
  margin-top: 1rem;
  border: 0.2rem solid #6d6d6d;
`;

const VolumeButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const VolumeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

type TVolumeSliderProps = {
  value: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolumeButtonClick: (type: "increase" | "decrease") => void;
};

export const VolumeSlider: FC<TVolumeSliderProps> = ({
  handleInputChange,
  value,
  handleVolumeButtonClick,
}) => {
  const thumbPosition = value * 100;

  return (
    <SliderWrapper>
      <VolumeWrapper>
        <VolumeContainer>
          <IconWrapper>
            <NoSoundIcon />
          </IconWrapper>
        </VolumeContainer>
        <SliderTrack>
          <SliderThumb position={thumbPosition} />
          <input
            id="volumeSlider"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={value}
            onChange={handleInputChange}
            style={{
              width: "100%",
              position: "absolute",
              top: 0,
              height: "0.4rem",
              opacity: 0,
              pointerEvents: "all",
            }}
          />
        </SliderTrack>
        <VolumeContainer>
          <IconWrapper>
            <FullSoundIcon />
          </IconWrapper>
        </VolumeContainer>
      </VolumeWrapper>
      {isMobile && (
        <VolumeButtonContainer>
          <VolumeButton onClick={() => handleVolumeButtonClick("decrease")}>
            <MinusIcon />
          </VolumeButton>
          <VolumeButton onClick={() => handleVolumeButtonClick("increase")}>
            <PlusIcon />
          </VolumeButton>
        </VolumeButtonContainer>
      )}
    </SliderWrapper>
  );
};
