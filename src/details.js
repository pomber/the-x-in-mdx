import React from "react"

export function Details({
  videoTime,
  totalSeconds,
  isPlaying,
  play,
  pause,
}) {
  return (
    <div
      style={{
        display: "flex",
        padding: "8px 16px",
        color: "white",
      }}
    >
      <button
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          height: 80,
          width: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "none",
          color: "white",
        }}
        onClick={isPlaying ? pause : play}
      >
        {isPlaying ? (
          <PauseIcon style={{ display: "block" }} />
        ) : (
          <PlayIcon
            style={{
              display: "block",
              marginLeft: "7px",
            }}
          />
        )}
      </button>
      <div style={{ marginLeft: "16px" }}>
        <h1 style={{ margin: "8px 0 4px" }}>
          The X in MDX
        </h1>
        <div>
          React Summit • <date>October 15-16, 2020</date>
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <div>
        {toTimeString(videoTime)} /{" "}
        {toTimeString(totalSeconds)}
      </div>
    </div>
  )
}

function toTimeString(seconds) {
  return new Date(1000 * seconds)
    .toISOString()
    .substr(14, 5)
}

function PauseIcon({ size = "2.5em", ...props }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
    </svg>
  )
}

function PlayIcon({ size = "2.5em", ...props }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
    </svg>
  )
}
