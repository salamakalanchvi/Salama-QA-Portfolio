export function getProductSlug(productName: string): string {
  return productName.toLowerCase().replace(/\s+/g, '-');
}
