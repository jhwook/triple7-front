import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export default function LoadingBar() {
  const duration = 0.24;
  const aniStep = 8;

  const loaderRef = useRef();
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (trigger) {
      setTimeout(
        () => {
          setTrigger(false);
        },
        duration * aniStep * 1000 + 400
      );
    } else {
      setTimeout(() => {
        setTrigger(true);
      }, 1000);
    }
  }, [trigger]);

  return (
    <LoadingBarBox duration={duration}>
      {trigger && (
        <ul className="loaderList" ref={loaderRef}>
          {new Array(4).fill('').map((v, i) => (
            <li key={i}>
              <span className="body" />
              <span className="bar" />
            </li>
          ))}
        </ul>
      )}
    </LoadingBarBox>
  );
}

const loaderAni = keyframes`
  0%{
    opacity: 0;
    transform: scale(1,0);
  }
  100%{
    opacity: 1;
    transform: scale(1,1)
  }
`;

const LoadingBarBox = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0a0e17;

  .loaderList {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10px;
      height: 49px;
      position: relative;

      span {
        display: inline-block;
        background: #f7ab1f;
        position: absolute;
        transform: scale(1, 0);

        &.body {
          border-radius: 1.6px;
          width: inherit;
        }

        &.bar {
          border-radius: 0.6px;
          width: 2px;
        }
      }

      &:nth-of-type(1) {
        span {
          &.body {
            height: 23px;
            top: 12px;
            animation: ${loaderAni} ${(props) => props.duration}s forwards
              linear;
          }

          &.bar {
            height: 39px;
            top: 0;
            animation: ${loaderAni} ${(props) => props.duration}s
              ${(props) => props.duration}s forwards linear;
          }
        }
      }

      &:nth-of-type(2) {
        span {
          &.body {
            height: 15px;
            bottom: 7px;
            animation: ${loaderAni} ${(props) => props.duration}s
              ${(props) => props.duration * 2}s forwards linear;
          }

          &.bar {
            height: 26px;
            bottom: 0;
            animation: ${loaderAni} ${(props) => props.duration}s
              ${(props) => props.duration * 3}s forwards linear;
          }
        }
      }

      &:nth-of-type(3) {
        span {
          &.body {
            height: 21px;
            bottom: 14px;
            animation: ${loaderAni} ${(props) => props.duration}s
              ${(props) => props.duration * 4}s forwards linear;
          }

          &.bar {
            height: 39px;
            bottom: 0;
            animation: ${loaderAni} ${(props) => props.duration}s
              ${(props) => props.duration * 5}s forwards linear;
          }
        }
      }

      &:nth-of-type(4) {
        span {
          &.body {
            height: 17px;
            top: 10px;
            animation: ${loaderAni} ${(props) => props.duration}s
              ${(props) => props.duration * 6}s forwards linear;
          }

          &.bar {
            height: 29px;
            top: 6px;
            animation: ${loaderAni} ${(props) => props.duration}s
              ${(props) => props.duration * 7}s forwards linear;
          }
        }
      }
    }
  }
`;
