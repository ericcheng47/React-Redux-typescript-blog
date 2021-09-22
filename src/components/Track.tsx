import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

type Props = {
  track: ITrack
  removeTrack: (track: ITrack) => void
}

export const Track: React.FC<Props> = ({ track, removeTrack }) => {
  const dispatch: Dispatch<any> = useDispatch()

  const deleteTrack = React.useCallback(
    (track: ITrack) => dispatch(removeTrack(track)),
    [dispatch, removeTrack]
  )

  const playTrack = React.useCallback(
    (track: ITrack) => dispatch(removeTrack(track)),
    [dispatch, removeTrack]
  )

  return (
    <div className="Track">
      <div>
        <h1>{track.title}</h1>
      </div>
      <div>
        <button className="Play-track" onClick={() => playTrack(track)}>Play</button>
        <button className="Delete-track" onClick={() => deleteTrack(track)}>Delete</button>
      </div>
    </div>
  )
}