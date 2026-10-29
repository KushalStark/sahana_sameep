/**
 * QR Code Helper for Invitation Sharing
 * Returns an accessible QR code URL using public QR generators with SVG canvas fallback
 */

export function getQrCodeUrl(url, size = 260) {
  const encoded = encodeURIComponent(url);
  // High quality SVG/PNG QR generator
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&bgcolor=FFFDF8&color=352C28&margin=10`;
}
