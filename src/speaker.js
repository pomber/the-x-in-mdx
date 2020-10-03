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
      <div style={{ height: 182, position: "relative" }}>
        <div
          style={{
            height: "100%",
          }}
        >
          <Video
            steps={videoSteps}
            containerStyle={{
              top: -34,
            }}
            style={{
              height: "100%",
              width: 400,
            }}
            onStepChange={changeStep}
            onTimeChange={onTimeChange}
            ref={playerRef}
          />
        </div>
      </div>
      <div className={s.details}>
        <div className={s.captions}>{caption}</div>
      </div>
    </div>
  )
}
