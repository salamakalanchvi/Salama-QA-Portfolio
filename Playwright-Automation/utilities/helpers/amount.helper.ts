export function extractAmount(
  text: string | null,
  label: string
): number {
  if (!text) {
    return 0;
  }

  return parseFloat(text.replace(label, '').trim());
}
