import React from "react"
import s from "./cake.module.css"
import { MiniEditor } from "@code-hike/mini-editor"
import { MiniBrowser } from "@code-hike/mini-browser"
import { useTimeData } from "@code-hike/player"
import { useSpring } from "use-spring"
import { sim } from "@code-hike/sim-user"
import { SpeakerPanel } from "./speaker"
import { Details } from "./details"

export function CakeLayout({
  videoSteps,
  browserSteps,
  editorSteps,
  captionSteps,
}) {
  const [stepIndex, changeStep] = React.useState(0)
  const playerRef = React.useRef()
  const browserRef = React.useRef()
  const [videoTime, setVideoTime] = React.useState(
    videoSteps[0].start
  )
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress] = useSpring(stepIndex, {
    decimals: 3,
    stiffness: 80,
    damping: 48,
    mass: 8,
  })
  const backward = stepIndex < progress

  const { currentSeconds, totalSeconds } = useTimeData({
    steps: videoSteps,
    stepIndex,
    videoTime,
  })

  const caption = useCaption(
    captionSteps,
    stepIndex,
    videoTime
  )

  const play = () => {
    playerRef.current.play()
    setIsPlaying(true)
  }
  const pause = () => {
    playerRef.current.pause()
    setIsPlaying(false)
  }

  const onTimeChange = (newTime, oldTime) => {
    // currentStep.actions
    const browserStep = browserSteps[stepIndex]
    const actions = browserStep.actions || []
    const action = actions.find(
      a => oldTime < a.on && a.on <= newTime
    )

    if (action) {
      const document =
        browserRef.current.contentWindow.document
      sim(action, document)
    }

    setVideoTime(newTime)
  }

  return (
    <div className={s.page}>
      <style global jsx>{`
        html,
        body,
        div#__next {
          height: 100%;
          margin: 0;
        }
        .ch-frame .ch-editor-body {
          padding: 0;
        }

        @media screen and (max-width: 767px) and (orientation: portrait) {
          html {
            transform: rotate(-90deg);
            transform-origin: left top;
            width: 100vh;
            height: 100vw;
            overflow-x: hidden;
            position: absolute;
            top: 100%;
            left: 0;
          }
        }
      `}</style>
      <Fit className={s.main}>
        <div className={s.grid}>
          <div className={s.div1}>
            <MiniEditor
              style={{ height: "100%" }}
              steps={editorSteps}
              progress={progress}
              backward={backward}
            />
          </div>
          <div className={s.div2}>
            <MiniBrowser
              style={{ height: "100%" }}
              steps={browserSteps}
              progress={progress}
              backward={backward}
              prependOrigin={true}
              ref={browserRef}
            />
          </div>
          <div className={s.div3}>
            <SpeakerPanel
              ref={playerRef}
              videoSteps={videoSteps}
              changeStep={changeStep}
              onTimeChange={onTimeChange}
              caption={caption}
              progressPercentage={
                (100 * currentSeconds) / totalSeconds
              }
            />
          </div>
        </div>
        <Details
          videoTime={videoTime}
          totalSeconds={totalSeconds}
          isPlaying={isPlaying}
          play={play}
          pause={pause}
        />
      </Fit>
    </div>
  )
}

function useCaption(captionSteps, stepIndex, videoTime) {
  const stepCaptions = captionSteps[stepIndex]

  if (!stepCaptions) return null

  const caption = stepCaptions.find(
    ({ start, end }) =>
      start <= videoTime && videoTime < end
  )

  return caption ? caption.text : null
}

//

function Fit({
  children,
  width = 1024,
  height = 576,
  ...props
}) {
  return (
    <main
      {...props}
      style={{
        width,
        height,
        minWidth: width,
        minHeight: height,
        transform: "scale(var(--scale))",
      }}
    >
      <GenerateScaleVar width={width} height={height} />
      {children}
    </main>
  )
}

function GenerateScaleVar({
  width,
  height,
  minZoom = 0,
  maxZoom = 1,
}) {
  const js = `
(function() {
  console.log('script')
  window.rsrtvScale = function resetScale() {
    const root = document.documentElement;
    const scale = Math.max(
      ${minZoom},
      Math.min(${maxZoom}, root.clientWidth / ${width}, root.clientHeight / ${height})
      );
    console.log("reset", scale)
    root.style.setProperty('--scale', scale.toString());
  }
  window.rsrtvScale()
  window.addEventListener('resize', window.rsrtvScale)
})()`
  React.useLayoutEffect(() => {
    window.rsrtvScale = function resetScale() {
      const root = document.documentElement

      let vWidth = root.clientWidth
      let vHeight = root.clientHeight
      if (
        vWidth < 768 &&
        window.matchMedia("(orientation: portrait)").matches
      ) {
        vWidth = root.clientHeight
        vHeight = root.clientWidth
      }
      const scale = Math.max(
        minZoom,
        Math.min(maxZoom, vWidth / width, vHeight / height)
      )
      root.style.setProperty("--scale", scale.toString())
    }
    window.rsrtvScale()

    window.addEventListener("resize", window.rsrtvScale)
  }, [])
  return <script dangerouslySetInnerHTML={{ __html: js }} />
}
