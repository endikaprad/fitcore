import axios from 'axios';

const OFF_BASE = 'https://world.openfoodfacts.org';

export interface OFFProduct {
  id: string;
  name: string;
  brand?: string;
  calories100: number;
  protein100: number;
  carbs100: number;
  fat100: number;
  fiber100?: number;
}

function parseProduct(p: any): OFFProduct {
  const n = p.nutriments ?? {};
  return {
    id: p.id ?? p.code,
    name: p.product_name ?? p.product_name_es ?? 'Desconocido',
    brand: p.brands,
    calories100: n['energy-kcal_100g'] ?? n.energy_100g ?? 0,
    protein100: n.proteins_100g ?? 0,
    carbs100: n.carbohydrates_100g ?? 0,
    fat100: n.fat_100g ?? 0,
    fiber100: n.fiber_100g,
  };
}

export async function searchFood(query: string): Promise<OFFProduct[]> {
  const res = await axios.get(`${OFF_BASE}/cgi/search.pl`, {
    params: { search_terms: query, json: 1, page_size: 20, lc: 'es' },
  });
  return (res.data.products ?? []).map(parseProduct);
}

export async function getFoodByBarcode(barcode: string): Promise<OFFProduct | null> {
  const res = await axios.get(`${OFF_BASE}/api/v0/product/${barcode}.json`);
  if (res.data.status !== 1) return null;
  return parseProduct(res.data.product);
}
