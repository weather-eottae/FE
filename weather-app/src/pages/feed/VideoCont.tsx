import React, { FC, useState, useRef } from "react";
import styled from "styled-components";
import {
  BsFillPlayFill,
  BsVolumeMuteFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";

const VideoCont: FC<{ src: string }> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <VideoContainer onClick={togglePlay}>
      {!isPlaying && <Overlay />}
      <video ref={videoRef} src={src} autoPlay muted={isMuted} loop />
      {!isPlaying && <BsFillPlayFill />}
      <VolumeIcon onClick={toggleMute}>
        {isMuted ? <BsVolumeMuteFill /> : <BsFillVolumeUpFill />}
      </VolumeIcon>
    </VideoContainer>
  );
};

export default VideoCont;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
    color: #5d6dbe;
    z-index: 3;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const VolumeIcon = styled.div`
  position: absolute;
  bottom: 23px;
  right: 23px;
  svg {
    font-size: 15px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    padding: 7px;
  }
`;
