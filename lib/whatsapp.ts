export const WHATSAPP_NUMBER = "919553059468";

export function getWhatsAppUrl(message?: string, customPhone?: string): string {
  const defaultMessage =
    "Hi Nexera, I'd like to know more about your services.";

  const phone = (customPhone || WHATSAPP_NUMBER).replace(/[^0-9]/g, "");
  const text = encodeURIComponent(message ?? defaultMessage);
  return `https://wa.me/${phone}?text=${text}`;
}
