import * as actionTypes from "./actionTypes"

const initialState: TrackState = {
  tracks: [
    {
      id: 1,
      title: "post 1",
      file_path:
        "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi",
    },
    {
      id: 2,
      title: "post 2",
      file_path:
        "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
    },
  ],
  user_info:
  {
    first_name: 'Milan',
    last_name: 'Manigoda',
    date_birth: '1/41/888',
  }
}


const reducer = (
  state: TrackState = initialState,
  action: TrackAction
  ): TrackState => {
    switch (action.type) {
      case actionTypes.ADD_TRACK:
        const newTrack: ITrack = {
          id: Math.random(), // not really unique
          title: action.track.title,
          file_path: action.track.file_path,
        }
        return {
          ...state,
          tracks: state.tracks.concat(newTrack),
        }
      case actionTypes.REMOVE_TRACK:
        const updatedTracks: ITrack[] = state.tracks.filter(
          track => track.id !== action.track.id
        )
        return {
          ...state,
          tracks: updatedTracks,
        }
    }
    return state
  }
  
  export default reducer