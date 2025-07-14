import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Skin, CartItem } from '@/types/skin'
import { useToast } from '@/hooks/use-toast'

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Skin }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

interface CartContextType extends CartState {
  addItem: (skin: Skin) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.skin.id === action.payload.id)
      
      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map(item =>
          item.skin.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...state.items, { skin: action.payload, quantity: 1 }]
      }

      const total = newItems.reduce((sum, item) => sum + (item.skin.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.skin.id !== action.payload)
      const total = newItems.reduce((sum, item) => sum + (item.skin.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.skin.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0)

      const total = newItems.reduce((sum, item) => sum + (item.skin.price * item.quantity), 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 }

    default:
      return state
  }
}

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    total: 0, 
    itemCount: 0 
  })
  const { toast } = useToast()

  const addItem = (skin: Skin) => {
    dispatch({ type: 'ADD_ITEM', payload: skin })
    toast({
      title: "Ajouté au panier",
      description: `${skin.name} a été ajouté à votre panier.`,
    })
  }

  const removeItem = (id: string) => {
    const item = state.items.find(item => item.skin.id === id)
    dispatch({ type: 'REMOVE_ITEM', payload: id })
    if (item) {
      toast({
        title: "Retiré du panier",
        description: `${item.skin.name} a été retiré de votre panier.`,
      })
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    toast({
      title: "Panier vidé",
      description: "Tous les articles ont été retirés du panier.",
    })
  }

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}