export type SkinRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'

export interface Skin {
  id: string
  name: string
  description: string
  image: string
  rarity: SkinRarity
  price: number
  featured?: boolean
  category: string
  releaseDate: string
}

export interface CartItem {
  skin: Skin
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerInfo: {
    email: string
    name: string
  }
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: string
}