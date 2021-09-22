import * as React from "react"

type Props = {
  saveTrack: (track: ITrack | any) => void
}

export const AddTrack: React.FC<Props> = ({ saveTrack }) => {
  const [track, setTrack] = React.useState<ITrack | {}>()

  const handleTrackData = (e: React.FormEvent<HTMLInputElement>) => {
    setTrack({
      ...track,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const addNewTrack = (e: React.FormEvent) => {
    e.preventDefault()
    saveTrack(track)
  }

  const handleUploadChange = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
		const name = e.target.name;
		if (!file) {
			return;
		}

		let formData = new FormData();
		formData.append('file', file);
		formData.append('id', form.id);
		formData.append('name', name);

		const res = await axios.post(Backend.URL + '/upload', formData, {
			withCredentials: true,
			headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'multipart/form-data' }
		});

		if (res.data.file) {
			let temp = form;
			if (name === 'featured_images' || name === 'free_blend' || name === 'pro_blend' || name === 'local_blend')
				temp[name] = res.data.file.split('|');
			else temp[name] = res.data.file;

			setForm({ ...temp });
			
			axios.post(Backend.URL + '/edit_product', form, {
					withCredentials: true,
					headers: { 'Access-Control-Allow-Origin': '*' }
				})
				.then(function (resp) {
					socket.emit('send-message', 'hey! please receive!');

					if (resp.data.id) {
						// props.history.push(`/apps/e-commerce/products/3`);
					} else {
						alert('failed');
					}
				})
				.catch(function (err) {
					console.log(err);
				});
		}
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