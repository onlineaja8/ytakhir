// Hapus deklarasi runtime untuk page components
// export const runtime = "edge"

import Link from "next/link"
import { Music, Share2, Clock, Calendar, User, Heart, ExternalLink } from "lucide-react"
import config from "@/config/default/config"
import { getSongById, getRelatedSongs } from "@/lib/data"
import type { Metadata } from "next"
import FloatingMenu from "@/components/FloatingMenu"
import VideoPlayer from "@/components/VideoPlayer"
import ShareButtons from "@/components/ShareButtons"
import DownloadButton from "./DownloadButton"
import RelatedSongsSection from "./RelatedSongsSection"

type Props = {
  params: { id: string }
}

// Set cache control headers - cache forever
export const revalidate = false // This means the page will be cached indefinitely

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Hapus komentar tentang themeColor
  const { id } = await params // Await params before using its properties
  const song = await getSongById(id)

  if (!song) {
    return {
      title: "Song not found",
      description: "The requested song could not be found.",
    }
  }

  return {
    title: config.download_title.replace("%title%", song.title),
    description: config.download_description.replace(/%title%/g, song.title).replace("%size%", song.size || ""),
    robots: config.download_robots,
  }
}

export default async function DownloadPage({ params }: Props) {
  const { id } = await params // Await params before using its properties
  const song = await getSongById(id)
  const relatedSongs = await getRelatedSongs(id)

  if (!song) {
    return (
      <div className="container">
        <div className="text-center py-10">
          <Music size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Song not found</h1>
          <p>The requested song could not be found. It may have been removed or the URL is incorrect.</p>
          <Link href="/" className="btn btn-primary mt-4 inline-block">
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1
            className="video-details-title mb-6"
            dangerouslySetInnerHTML={{ __html: config.download_page_title.replace("%title%", song.title) }}
          />

          <VideoPlayer videoId={id} protected_embed={song.protected_embed} title={song.title} thumbnail={song.image} />

          <div className="video-details">
            <div className="video-details-meta">
              <div className="video-details-meta-item">
                <Clock size={16} />
                <span>{song.duration}</span>
              </div>
              <div className="video-details-meta-item">
                <Calendar size={16} />
                <span>{song.uploaded}</span>
              </div>
              {song.artist && (
                <div className="video-details-meta-item">
                  <User size={16} />
                  <span>{song.artist}</span>
                </div>
              )}
              <div className="video-details-meta-item">
                <Heart size={16} />
                <span>{song.views || "0"} likes</span>
              </div>
            </div>

            <p className="video-description">{song.description || "No description available."}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="download-section">
                <h3 className="download-section-title">
                  <Music size={18} />
                  MP3 Download
                </h3>
                <div className="download-buttons">
                  {["128kbps", "320kbps"].map((quality) => (
                    <DownloadButton
                      key={quality}
                      link={`https://lil.sounddownmp3.com/ea1.php?link=${song.id}`}
                      quality={quality}
                      type="mp3"
                    />
                  ))}
                </div>
              </div>

              <div className="download-section">
                <h3 className="download-section-title">
                  <ExternalLink size={18} />
                  Video Download
                </h3>
                <div className="download-buttons">
                  {["360p", "720p"].map((quality) => (
                    <DownloadButton
                      key={quality}
                      link={`https://apiku.mooo.com/dl6.php?vid=${song.id}`}
                      quality={quality}
                      type="video"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="share-section">
              <h3 className="share-title">
                <Share2 size={18} />
                Share
              </h3>
              <ShareButtons title={song.title} />
            </div>
          </div>
        </div>

        <div>
          <RelatedSongsSection relatedSongs={relatedSongs} />
        </div>
      </div>

      <FloatingMenu />
    </div>
  )
}
