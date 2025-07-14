import { useState, useMemo } from 'react'
import { SkinCard } from '@/components/ui/skin-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { skins } from '@/data/skins'
import { useCart } from '@/contexts/CartContext'
import { SkinRarity } from '@/types/skin'
import { Search, Filter, Grid, List } from 'lucide-react'

const rarityFilters: { value: SkinRarity | 'all'; label: string; count: number }[] = [
  { value: 'all', label: 'Tous', count: skins.length },
  { value: 'common', label: 'Commun', count: skins.filter(s => s.rarity === 'common').length },
  { value: 'uncommon', label: 'Peu commun', count: skins.filter(s => s.rarity === 'uncommon').length },
  { value: 'rare', label: 'Rare', count: skins.filter(s => s.rarity === 'rare').length },
  { value: 'epic', label: 'Épique', count: skins.filter(s => s.rarity === 'epic').length },
  { value: 'legendary', label: 'Légendaire', count: skins.filter(s => s.rarity === 'legendary').length },
  { value: 'mythic', label: 'Mythique', count: skins.filter(s => s.rarity === 'mythic').length },
]

const sortOptions = [
  { value: 'name', label: 'Nom' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },  
  { value: 'rarity', label: 'Rareté' },
  { value: 'newest', label: 'Plus récent' },
]

export default function Shop() {
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRarity, setSelectedRarity] = useState<SkinRarity | 'all'>('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredAndSortedSkins = useMemo(() => {
    let filtered = skins

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(skin =>
        skin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skin.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by rarity
    if (selectedRarity !== 'all') {
      filtered = filtered.filter(skin => skin.rarity === selectedRarity)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case 'rarity':
        const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4, mythic: 5 }
        filtered = [...filtered].sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity])
        break
      case 'newest':
        filtered = [...filtered].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
        break
      default:
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [searchQuery, selectedRarity, sortBy])

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Boutique Fortnite
          </span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Découvrez notre collection complète de skins exclusifs
        </p>
      </div>

      {/* Filters and Search */}
      <div className="space-y-6 mb-8">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un skin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Rarity Filters */}
          <div className="flex flex-wrap gap-2">
            {rarityFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedRarity === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRarity(filter.value)}
                className={selectedRarity === filter.value ? "bg-gradient-primary" : ""}
              >
                {filter.label}
                <Badge variant="secondary" className="ml-2">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-md bg-background border border-border text-foreground"
          >
            <option value="">Trier par...</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 ml-auto">
            <Button
              variant={viewMode === 'grid' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredAndSortedSkins.length} skin{filteredAndSortedSkins.length > 1 ? 's' : ''} trouvé{filteredAndSortedSkins.length > 1 ? 's' : ''}
          {searchQuery && ` pour "${searchQuery}"`}
          {selectedRarity !== 'all' && ` (${selectedRarity})`}
        </p>
      </div>

      {/* Skins Grid */}
      {filteredAndSortedSkins.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }>
          {filteredAndSortedSkins.map((skin) => (
            <SkinCard
              key={skin.id}
              skin={skin}
              onAddToCart={addItem}
              className={viewMode === 'list' ? "flex-row max-w-none" : ""}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Aucun skin trouvé</h3>
          <p className="text-muted-foreground mb-4">
            Essayez de modifier vos filtres ou votre recherche
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('')
              setSelectedRarity('all')
              setSortBy('name')
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  )
}