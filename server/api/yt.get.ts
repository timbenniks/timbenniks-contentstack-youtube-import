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

  if (!video_id) {
    return { message: "no video_id given" }
  }

  const video = await fetchVideo(video_id as string)
  const result = {
    date: video.snippet.publishedAt,
    uid: `video_entry_uid_${video_id}`,
    title: video.snippet.title,
    videoid: video_id,
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

  if (video) {
    return result
  }
  else {
    return { message: "Something went wrong" }
  }
})