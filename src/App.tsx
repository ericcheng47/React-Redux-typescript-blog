// export default App;
import * as React from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import "./styles.css"

import { Track } from "./components/Track"
import { AddTrack } from "./components/AddTrack"
import { addTrack, removeTrack } from "./store/actionCreators"
import { Dispatch } from "redux"

const App: React.FC = () => {
  const userInfo: IUser = useSelector(
    (state: TrackState) => state.user_info,
    shallowEqual
  )

  const tracks: readonly ITrack[] = useSelector(
    (state: TrackState) => state.tracks,
    shallowEqual
  )

  const dispatch: Dispatch<any> = useDispatch()

  const saveTrack = React.useCallback(
    (track: ITrack) => dispatch(addTrack(track)),
    [dispatch]
  )

  return (
    <main>
      <h1>My Audio Tracks</h1>
      <form className="Add-track">
        <p>First Name: <strong>{userInfo.first_name}</strong></p>
        <p>Last Name: <strong>{userInfo.last_name}</strong></p>
        <p>Date of Birth: <strong>{userInfo.date_birth}</strong></p>
      </form>
      {tracks.map((track: ITrack) => (
        <Track
        key={track.id}
        track={track}
        removeTrack={removeTrack}
        />
      ))}
      <AddTrack saveTrack={saveTrack} />
    </main>
  )
}

export default App