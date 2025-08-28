import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FilterState {
  brand: string[];
  category: string;
  priceRange: [number, number];
  onSale: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onFiltersChange }) => {
  const brands = ['Nike', 'Adidas', 'Puma'];
  const categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'firm-ground', label: 'Terreno Firme' },
    { value: 'soft-ground', label: 'Terreno Blando' },
    { value: 'artificial-grass', label: 'Césped Artificial' },
    { value: 'indoor', label: 'Sala/Fútsal' }
  ];

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand];
    
    onFiltersChange({ ...filters, brand: newBrands });
  };

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category });
  };

  const handleOnSaleChange = () => {
    onFiltersChange({ ...filters, onSale: !filters.onSale });
  };

  const clearFilters = () => {
    onFiltersChange({
      brand: [],
      category: '',
      priceRange: [0, 500],
      onSale: false
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Filtros
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpiar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Marca</h3>
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brand.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Categoría</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category.value} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.value}
                  checked={filters.category === category.value}
                  onChange={() => handleCategoryChange(category.value)}
                  className="mr-2"
                />
                {category.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={handleOnSaleChange}
              className="mr-2"
            />
            Solo ofertas
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;