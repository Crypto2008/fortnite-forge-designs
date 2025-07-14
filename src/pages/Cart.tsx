import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCart } from '@/contexts/CartContext'
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, Coins } from 'lucide-react'

export default function Cart() {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold">Votre panier est vide</h1>
          <p className="text-muted-foreground text-lg">
            Découvrez notre collection de skins et trouvez celui qui vous correspond !
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-gradient-primary hover:bg-gradient-secondary">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Parcourir la boutique
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/shop">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la boutique
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Panier</h1>
          <p className="text-muted-foreground">
            {itemCount} article{itemCount > 1 ? 's' : ''} dans votre panier
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Clear Cart Button */}
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Vider le panier
            </Button>
          </div>

          {/* Items List */}
          {items.map((item) => (
            <Card key={item.skin.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Skin Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.skin.image}
                      alt={item.skin.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  </div>

                  {/* Skin Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.skin.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {item.skin.rarity} • {item.skin.category}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.skin.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {item.skin.description}
                    </p>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.skin.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-medium px-3">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.skin.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold">
                            {(item.skin.price * item.quantity).toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">V-Bucks</span>
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-muted-foreground">
                            {item.skin.price.toLocaleString()} × {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items Breakdown */}
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.skin.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.skin.name} × {item.quantity}
                    </span>
                    <span>{(item.skin.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <div className="flex items-center gap-1">
                    <Coins className="h-5 w-5 text-yellow-500" />
                    <span>{total.toLocaleString()}</span>
                    <span className="text-sm font-normal text-muted-foreground">V-Bucks</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Link to="/checkout" className="block">
                  <Button size="lg" className="w-full bg-gradient-primary hover:bg-gradient-secondary">
                    Passer commande
                  </Button>
                </Link>
                <Link to="/shop" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    Continuer mes achats
                  </Button>
                </Link>
              </div>

              {/* Security Info */}
              <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                🔒 Paiement 100% sécurisé
                <br />
                Livraison instantanée
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}