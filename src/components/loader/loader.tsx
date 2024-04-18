import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";

const Loading = styled.div`
  border: 0.4rem solid rgba(0, 0, 0, 0.1);
  border-top: 0.4rem solid #333;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 1s linear infinite;
  margin: auto;

  &.create-production {
    position: absolute;
    top: 0.5rem;
    left: 6rem;
  }

  &.join-production {
    border: 0.4rem solid rgba(201, 201, 201, 0.1);
    border-top: 0.4rem solid #e2e2e2;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Text = styled.span`
  padding-left: 2rem;
  font-size: 1.8rem;
  &.active {
    color: #cdcdcd;
  }
  &.in-active {
    color: #242424;
  }
`;

const Dots = styled.span`
  padding-left: 0.2rem;
  font-size: 2rem;
  transform: translateY(-50%);
  &.active {
    color: #cdcdcd;
  }
  &.in-active {
    color: #242424;
  }
`;

const Pulse = styled.span`
  /* position: absolute;
  top: 1rem;
  left: 5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 0.4rem solid #6fd84f;
  margin: auto;
  animation: pulse 1s ease-in-out infinite alternate;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  } */
`;

type Props = { className: string };

export const Spinner: FC<Props> = ({ className }: Props) => {
  return <Loading className={className} />;
};

export const PulseLoader: FC = () => {
  return <Pulse />;
};

export const LoaderDots: FC<Props> = ({ className }: Props) => {
  const [dots, setDots] = useState<string>(".");

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDots((prevDots) => (prevDots.length > 2 ? "." : `${prevDots}.`));
    }, 300);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Text className={className}>refreshing</Text>
      <Dots className={className}>{dots}</Dots>
    </div>
  );
};
