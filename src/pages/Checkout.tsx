import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, CreditCard, Shield, Coins } from 'lucide-react'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    epicGamesId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: 'France'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Commande confirmée !",
        description: "Vos skins ont été ajoutés à votre compte Epic Games.",
      })
      clearCart()
      navigate('/')
      setIsProcessing(false)
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold">Votre panier est vide</h1>
          <p className="text-muted-foreground text-lg">
            Vous devez ajouter des articles à votre panier avant de passer commande.
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-gradient-primary hover:bg-gradient-secondary">
              Retour à la boutique
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
        <Link to="/cart">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au panier
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Finaliser la commande</h1>
          <p className="text-muted-foreground">
            Complétez vos informations pour recevoir vos skins
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Informations du compte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="epicGamesId">Epic Games ID *</Label>
                  <Input
                    id="epicGamesId"
                    name="epicGamesId"
                    required
                    value={formData.epicGamesId}
                    onChange={handleInputChange}
                    placeholder="Votre nom d'utilisateur Epic Games"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Les skins seront envoyés directement sur ce compte
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Informations de paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Numéro de carte *</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Date d'expiration *</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      required
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle>Adresse de facturation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="billingAddress">Adresse *</Label>
                  <Input
                    id="billingAddress"
                    name="billingAddress"
                    required
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    placeholder="123 Rue de la Paix"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Paris"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Code postal *</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="75001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Pays *</Label>
                    <Input
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="France"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-primary hover:bg-gradient-secondary"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Traitement en cours...
                </div>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Confirmer et payer {total.toLocaleString()} V-Bucks
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.skin.id} className="flex gap-3">
                    <img
                      src={item.skin.image}
                      alt={item.skin.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.skin.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {item.skin.rarity} × {item.quantity}
                      </p>
                      <div className="flex items-center gap-1 text-sm">
                        <Coins className="h-3 w-3 text-yellow-500" />
                        <span>{(item.skin.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <div className="flex items-center gap-1">
                    <Coins className="h-5 w-5 text-yellow-500" />
                    <span>{total.toLocaleString()}</span>
                    <span className="text-sm font-normal">V-Bucks</span>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="text-xs text-muted-foreground space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span>Livraison instantanée</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span>Support 24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}