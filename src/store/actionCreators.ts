import * as actionTypes from "./actionTypes"

export function addTrack(track: ITrack) {
  const action: TrackAction = {
    type: actionTypes.ADD_TRACK,
    track,
  }

  return simulateHttpRequest(action)
}

export function removeTrack(track: ITrack) {
  const action: TrackAction = {
    type: actionTypes.REMOVE_TRACK,
    track,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: TrackAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}