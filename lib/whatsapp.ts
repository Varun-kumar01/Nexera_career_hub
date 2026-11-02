export const WHATSAPP_NUMBER = "919553059468";

export function getWhatsAppUrl(message?: string): string {
  const defaultMessage =
    "Hi Nexera, I'd like to know more about your services.";

  const text = encodeURIComponent(message ?? defaultMessage);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
