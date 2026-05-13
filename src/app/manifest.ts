import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VideoCompressorPro',
    short_name: 'VideoCompress',
    description: 'Compress videos online without losing quality. 100% private and secure.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfdff',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
