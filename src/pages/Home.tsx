import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { SkinCard } from '@/components/ui/skin-card'
import { skins, getFeaturedSkins } from '@/data/skins'
import { useCart } from '@/contexts/CartContext'
import { ArrowRight, Zap, Shield, Users, Star } from 'lucide-react'
import heroBg from '@/assets/hero-bg.jpg'

export default function Home() {
  const { addItem } = useCart()
  const featuredSkins = getFeaturedSkins()
  const heroSkin = featuredSkins[0] // Premier skin vedette

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
        
        {/* Content */}
        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  FortShop
                </span>
                <br />
                <span className="text-foreground">
                  La boutique
                </span>
                <br />
                <span className="text-foreground">
                  Fortnite ultime
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Découvrez les skins les plus exclusifs et stylés pour Fortnite. 
                Des milliers de joueurs nous font confiance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button size="lg" className="bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground group">
                  Explorer la boutique
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                En savoir plus
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Skins disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Joueurs satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support client</div>
              </div>
            </div>
          </div>

          {/* Right side - Featured Skin */}
          {heroSkin && (
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 animate-pulse" />
                <SkinCard
                  skin={heroSkin}
                  onAddToCart={addItem}
                  className="max-w-sm transform hover:scale-105 transition-transform duration-300 animate-float"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir FortShop ?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La plateforme de confiance pour tous vos achats Fortnite
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-card hover:bg-gradient-card transition-all duration-300 hover:shadow-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sécurisé</h3>
              <p className="text-muted-foreground">
                Transactions 100% sécurisées avec protection des données personnelles
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card hover:bg-gradient-card transition-all duration-300 hover:shadow-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rapide</h3>
              <p className="text-muted-foreground">
                Livraison instantanée de vos skins directement dans votre inventaire
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card hover:bg-gradient-card transition-all duration-300 hover:shadow-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Communauté</h3>
              <p className="text-muted-foreground">
                Rejoignez une communauté de milliers de joueurs passionnés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skins Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Skins en vedette</h2>
              <p className="text-muted-foreground">Découvrez notre sélection exclusive</p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="group">
                Voir tout
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skins.slice(0, 4).map((skin) => (
              <SkinCard
                key={skin.id}
                skin={skin}
                onAddToCart={addItem}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <Star className="h-16 w-16 text-primary mx-auto animate-pulse" />
            <h2 className="text-3xl font-bold">Prêt à améliorer votre style ?</h2>
            <p className="text-xl text-muted-foreground">
              Rejoignez des milliers de joueurs qui ont déjà trouvé leur skin parfait
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground">
                Commencer à explorer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}