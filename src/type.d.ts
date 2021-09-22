interface IUser {
    first_name: string
    last_name: string
    date_birth: string
}

interface ITrack {
    id: number
    title: string
    file_path: string
}

type TrackState = {
    tracks: ITrack[],
    user_info: IUser
}

type TrackAction = {
    type: string
    track: ITrack
}

type DispatchType = (args: TrackAction) => TrackAction