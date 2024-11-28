async function fetchVideo(video_id: string) {
  const url = new URL("https://www.googleapis.com/youtube/v3/videos");
  url.searchParams.append("part", "snippet");
  url.searchParams.append("id", video_id);
  url.searchParams.append("key", "AIzaSyCce_rG-thyyggtRLDCwykCZWJqY6kJ2sE");

  const response = await fetch(url);
  const result = await response.json();
  const video = result.items[0];

  return video;
}

export default eventHandler(async (event) => {
  const query = getQuery(event)
  const video_id = query.video_id
  let result;
  let video;
  if (video_id) {
    video = await fetchVideo(video_id as string)
    result = {
      date: video.snippet.publishedAt,
      uid: `video_entry_uid_${video_id}`,
      title: video.snippet.title,
      video_id: video_id,
      description: video.snippet.description,
      image: video.snippet.thumbnails?.maxres?.url,
      tags: video.snippet.tags || [],
      subject: '',
      locale: "en-us",
      created_at: video.snippet.publishedAt,
      updated_at: video.snippet.publishedAt,
      content_type_uid: "video",
      publish_details: [
        {
          environment: "development",
          locale: "en-us",
          time: video.snippet.publishedAt,
        },
      ],
      ACL: {},
      _version: 1,
      _in_progress: false,
    }
  }
  else {
    result = "no video_id"
  }

  return result
})