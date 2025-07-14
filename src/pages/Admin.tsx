import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { skins } from '@/data/skins'
import { Skin, SkinRarity } from '@/types/skin'
import { useToast } from '@/hooks/use-toast'
import { Plus, Edit, Trash2, Upload, Save, X } from 'lucide-react'

export default function Admin() {
  const { toast } = useToast()
  const [skinsList, setSkinsList] = useState(skins)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingSkin, setEditingSkin] = useState<string | null>(null)
  const [newSkin, setNewSkin] = useState<Partial<Skin>>({
    name: '',
    description: '',
    image: '',
    rarity: 'common',
    price: 500,
    category: '',
    featured: false
  })

  const rarityOptions: SkinRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic']

  const handleAddSkin = () => {
    if (!newSkin.name || !newSkin.description || !newSkin.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      })
      return
    }

    const skin: Skin = {
      id: Date.now().toString(),
      name: newSkin.name!,
      description: newSkin.description!,
      image: newSkin.image || '/placeholder-skin.jpg',
      rarity: newSkin.rarity as SkinRarity,
      price: newSkin.price || 500,
      category: newSkin.category!,
      featured: newSkin.featured || false,
      releaseDate: new Date().toISOString()
    }

    setSkinsList(prev => [...prev, skin])
    setNewSkin({
      name: '',
      description: '',
      image: '',
      rarity: 'common',
      price: 500,
      category: '',
      featured: false
    })
    setIsAddingNew(false)

    toast({
      title: "Skin ajouté",
      description: `${skin.name} a été ajouté avec succès.`,
    })
  }

  const handleDeleteSkin = (id: string) => {
    const skin = skinsList.find(s => s.id === id)
    setSkinsList(prev => prev.filter(s => s.id !== id))
    
    toast({
      title: "Skin supprimé",
      description: `${skin?.name} a été supprimé.`,
    })
  }

  const handleToggleFeatured = (id: string) => {
    setSkinsList(prev => prev.map(skin => 
      skin.id === id ? { ...skin, featured: !skin.featured } : skin
    ))

    const skin = skinsList.find(s => s.id === id)
    toast({
      title: skin?.featured ? "Retiré des vedettes" : "Ajouté aux vedettes",
      description: `${skin?.name} ${skin?.featured ? 'n\'est plus' : 'est maintenant'} en vedette.`,
    })
  }

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord Admin</h1>
          <p className="text-muted-foreground">
            Gérez votre collection de skins Fortnite
          </p>
        </div>
        <Button
          onClick={() => setIsAddingNew(true)}
          className="bg-gradient-primary hover:bg-gradient-secondary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un skin
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{skinsList.length}</div>
            <p className="text-xs text-muted-foreground">Total des skins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{skinsList.filter(s => s.featured).length}</div>
            <p className="text-xs text-muted-foreground">Skins en vedette</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {Math.round(skinsList.reduce((sum, s) => sum + s.price, 0) / skinsList.length)}
            </div>
            <p className="text-xs text-muted-foreground">Prix moyen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {skinsList.filter(s => s.rarity === 'legendary' || s.rarity === 'mythic').length}
            </div>
            <p className="text-xs text-muted-foreground">Skins rares</p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Skin Form */}
      {isAddingNew && (
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ajouter un nouveau skin</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddingNew(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom du skin *</Label>
                <Input
                  id="name"
                  value={newSkin.name || ''}
                  onChange={(e) => setNewSkin(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nom du skin"
                />
              </div>
              <div>
                <Label htmlFor="category">Catégorie *</Label>
                <Input
                  id="category"
                  value={newSkin.category || ''}
                  onChange={(e) => setNewSkin(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Futuriste, Fantasy, etc."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={newSkin.description || ''}
                onChange={(e) => setNewSkin(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description du skin"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rarity">Rareté</Label>
                <select
                  id="rarity"
                  value={newSkin.rarity}
                  onChange={(e) => setNewSkin(prev => ({ ...prev, rarity: e.target.value as SkinRarity }))}
                  className="w-full px-3 py-2 rounded-md bg-background border border-border"
                >
                  {rarityOptions.map(rarity => (
                    <option key={rarity} value={rarity}>
                      {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="price">Prix (V-Bucks)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newSkin.price || ''}
                  onChange={(e) => setNewSkin(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                  placeholder="500"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newSkin.featured || false}
                  onChange={(e) => setNewSkin(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="featured">Skin en vedette</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="image">URL de l'image</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  value={newSkin.image || ''}
                  onChange={(e) => setNewSkin(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/skin-image.jpg"
                />
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddSkin} className="bg-gradient-primary">
                <Save className="mr-2 h-4 w-4" />
                Ajouter le skin
              </Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skins Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gestion des skins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skinsList.map((skin) => (
              <div key={skin.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img
                  src={skin.image}
                  alt={skin.name}
                  className="w-16 h-16 rounded object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{skin.name}</h3>
                    <Badge variant={skin.featured ? "default" : "secondary"}>
                      {skin.rarity}
                    </Badge>
                    {skin.featured && (
                      <Badge className="bg-gradient-primary">Vedette</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {skin.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span>{skin.category}</span>
                    <span>{skin.price.toLocaleString()} V-Bucks</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFeatured(skin.id)}
                  >
                    {skin.featured ? 'Retirer vedette' : 'Mettre en vedette'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingSkin(skin.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSkin(skin.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}