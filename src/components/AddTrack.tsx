import * as React from "react"

type Props = {
  saveTrack: (track: ITrack | any) => void
}

export const AddTrack: React.FC<Props> = ({ saveTrack }) => {
  const [track, setTrack] = React.useState<ITrack | {}>()

  const handleTrackData = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log('tttttt', e.currentTarget.value)
    setTrack({
      ...track,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const addNewTrack = (e: React.FormEvent) => {
    e.preventDefault()
    saveTrack(track)
  }

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const files = e.currentTarget.files || [];
    console.log(files[0])
		const name = e.currentTarget.name;
		if (!files[0]) {
			return;
		}
    
		let formData = new FormData();
		formData.append('file', files[0]);
		formData.append('name', name);

		// const res = await axios.post(Backend.URL + '/upload', formData, {
		// 	withCredentials: true,
		// 	headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'multipart/form-data' }
		// });

		// if (res.data.file) {
		// 	let temp = form;
		// 	if (name === 'featured_images' || name === 'free_blend' || name === 'pro_blend' || name === 'local_blend')
		// 		temp[name] = res.data.file.split('|');
		// 	else temp[name] = res.data.file;

		// 	setForm({ ...temp });
			
		// 	axios.post(Backend.URL + '/edit_product', form, {
		// 			withCredentials: true,
		// 			headers: { 'Access-Control-Allow-Origin': '*' }
		// 		})
		// 		.then(function (resp) {
		// 			socket.emit('send-message', 'hey! please receive!');

		// 			if (resp.data.id) {
		// 				// props.history.push(`/apps/e-commerce/products/3`);
		// 			} else {
		// 				alert('failed');
		// 			}
		// 		})
		// 		.catch(function (err) {
		// 			console.log(err);
		// 		});
		// }
    // setTrack({
    //   ...track,
    //   [e.currentTarget.id]: e.currentTarget.value,
    // })
  }

  return (
    <div>
      
      <form onSubmit={addNewTrack} className="Add-track">
        <input
          type="text"
          id="title"
          placeholder="Title"
          onChange={handleTrackData}
        />
        <input
          accept="image/*"
          className="hidden"
          id="button-file"
          type="file"
          name="featured_images"
          onChange={handleUploadChange}
        />
        <button disabled={track === undefined ? true : false}>
          Add track
        </button>
      </form>
      </div>
  )
}