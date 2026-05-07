/**
 * Maps doc page slugs (joined with "/") to their demo video filename.
 * Videos must be placed in: public/videos/<filename>
 *
 * Expected files:
 *   public/videos/create-server.mp4
 *   public/videos/starting-server.mp4
 *   public/videos/file-edit.mp4
 *   public/videos/plugins-mods.mp4
 *   public/videos/backups.mp4
 *   public/videos/properties.mp4
 *   public/videos/general-settings.mp4
 *   public/videos/theme-customization.mp4
 *   public/videos/proxy-setup.mp4
 */
export const DOC_VIDEOS: Record<string, string> = {
  'getting-started/server-creation': '/videos/create-server.mp4',
  'features/server-lifecycle': '/videos/starting-server.mp4',
  'features/file-manager': '/videos/file-edit.mp4',
  'features/plugins-mods': '/videos/plugins-mods.mp4',
  'features/backup-restore': '/videos/backups.mp4',
  'configuration/server-properties': '/videos/properties.mp4',
  'configuration/general-settings': '/videos/general-settings.mp4',
  'configuration/theme-customization': '/videos/theme-customization.mp4',
  'network-proxy/velocity-setup': '/videos/proxy-setup.mp4',
}

/** Returns the video URL for a given slug array, or null if none. */
export function getDocVideo(slugArray: string[]): string | null {
  const key = slugArray.join('/')
  return DOC_VIDEOS[key] ?? null
}
