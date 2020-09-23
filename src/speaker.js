import React from "react"
import s from "./speaker.module.css"
import { Video } from "@code-hike/player"

export const SpeakerPanel = React.forwardRef(
  SpeakerPanelWithRef
)

function SpeakerPanelWithRef(
  {
    videoSteps,
    changeStep,
    onTimeChange,
    progressPercentage,
    caption,
  },
  playerRef
) {
  return (
    <div className={s.video}>
      <div style={{ height: 150, position: "relative" }}>
        <div
          style={{
            height: "100%",
          }}
        >
          <Video
            steps={videoSteps}
            containerStyle={{
              top: -44,
            }}
            style={{
              height: "100%",
              width: 362,
            }}
            onStepChange={changeStep}
            onTimeChange={onTimeChange}
            ref={playerRef}
          />
        </div>
        <div className={s.details}>
          <div>
            <span
              style={{
                fontSize: "1.2em",
                background: "#222",
                display: "inline-block",
                borderLeft: "2px solid #40eb22",
                padding: "0 4px",
              }}
            >
              Rodrigo Pombo
            </span>
          </div>
        </div>
      </div>
      <div className={s.progressContainer}>
        <div
          className={s.progress}
          style={{ width: progressPercentage + "%" }}
        />
      </div>
      <div className={s.captions}>
        <span
          style={{ background: "#111c", padding: "0 4px" }}
        >
          {caption}
        </span>
      </div>
    </div>
  )
}
