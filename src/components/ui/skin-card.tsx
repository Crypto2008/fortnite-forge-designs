import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skin } from '@/types/skin'
import { cn } from '@/lib/utils'
import { Coins, ShoppingCart } from 'lucide-react'

interface SkinCardProps {
  skin: Skin
  onAddToCart?: (skin: Skin) => void
  className?: string
}

const rarityConfig = {
  common: {
    bg: 'bg-slate-500/20',
    border: 'border-slate-400',
    text: 'text-slate-300',
    glow: 'hover:shadow-[0_0_20px_rgba(148,163,184,0.3)]'
  },
  uncommon: {
    bg: 'bg-green-500/20',
    border: 'border-green-400',
    text: 'text-green-300',
    glow: 'hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]'
  },
  rare: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-400',
    text: 'text-blue-300',
    glow: 'hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]'
  },
  epic: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-400',
    text: 'text-purple-300',
    glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'
  },
  legendary: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-400',
    text: 'text-yellow-300',
    glow: 'hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]'
  },
  mythic: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-400',
    text: 'text-orange-300',
    glow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]'
  }
}

export function SkinCard({ skin, onAddToCart, className }: SkinCardProps) {
  const rarity = rarityConfig[skin.rarity]

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:scale-105",
      rarity.glow,
      className
    )}>
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        rarity.bg
      )} />
      
      <CardContent className="p-0 relative z-10">
        {/* Skin Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={skin.image}
            alt={skin.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          
          {/* Rarity Badge */}
          <Badge 
            className={cn(
              "absolute top-3 left-3 border-2",
              rarity.border,
              rarity.text,
              rarity.bg
            )}
          >
            {skin.rarity.toUpperCase()}
          </Badge>

          {/* Featured Badge */}
          {skin.featured && (
            <Badge className="absolute top-3 right-3 bg-gradient-primary text-primary-foreground animate-pulse">
              VEDETTE
            </Badge>
          )}
        </div>

        {/* Skin Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">
            {skin.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {skin.description}
          </p>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span className="font-bold text-lg text-foreground">
                {skin.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">V-Bucks</span>
            </div>

            <Button
              size="sm"
              onClick={() => onAddToCart?.(skin)}
              className="bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}