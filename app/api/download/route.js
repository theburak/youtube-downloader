import ytdl from '@distube/ytdl-core'; // Import ytdl-core library

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Parse URL search parameters
  const url = searchParams.get('url'); // Get the 'url' parameter

  if (!url || !ytdl.validateURL(url)) {
    return new Response(
      JSON.stringify({ error: 'Geçerli bir YouTube URL\'si sağlayın.' }), // Return error if URL is invalid
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const info = await ytdl.getInfo(url); // Get video information
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, ''); // Sanitize video title

    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${videoTitle}.mp4"`); // Set download filename
    headers.set('Content-Type', 'video/mp4'); // Set content type

    const videoStream = ytdl(url, { quality: 'highestvideo', filter: 'videoandaudio' }); // Get video stream

    return new Response(videoStream, { headers }); // Return video stream as response
  } catch (error) {
    console.error('Hata:', error.message); // Log error
    return new Response(
      JSON.stringify({ error: `Video indirilemedi. Hata: ${error.message}` }), // Return error response
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
