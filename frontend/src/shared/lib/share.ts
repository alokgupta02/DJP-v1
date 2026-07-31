export async function shareContent(title: string, url?: string) {
  const shareUrl = url || window.location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title, url: shareUrl });
    } catch (e) {
      if ((e as Error).name !== "AbortError") console.error(e);
    }
  } else {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  }
}
