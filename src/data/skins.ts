import { Skin } from '@/types/skin'

// Import images
import cyberWarrior from '@/assets/skins/cyber-warrior.jpg'
import mysticalMage from '@/assets/skins/mystical-mage.jpg'
import spaceSoldier from '@/assets/skins/space-soldier.jpg'
import streetNinja from '@/assets/skins/street-ninja.jpg'
import casualGamer from '@/assets/skins/casual-gamer.jpg'

export const skins: Skin[] = [
  {
    id: '1',
    name: 'Cyber Warrior',
    description: 'Un guerrier futuriste équipé d\'une armure high-tech et d\'armes énergétiques.',
    image: cyberWarrior,
    rarity: 'epic',
    price: 1500,
    featured: true,
    category: 'Futuriste',
    releaseDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Mystical Mage',
    description: 'Maître des arts mystiques avec un bâton magique et des pouvoirs surnaturels.',
    image: mysticalMage,
    rarity: 'legendary',
    price: 2000,
    featured: true,
    category: 'Fantasy',
    releaseDate: '2024-01-10'
  },
  {
    id: '3',
    name: 'Space Soldier',
    description: 'Soldat de l\'espace avec armure cosmique et équipement de combat avancé.',
    image: spaceSoldier,
    rarity: 'rare',
    price: 1200,
    category: 'Sci-Fi',
    releaseDate: '2024-01-20'
  },
  {
    id: '4',
    name: 'Street Ninja',
    description: 'Ninja urbain furtif avec équipement de camouflage et armes silencieuses.',
    image: streetNinja,
    rarity: 'uncommon',
    price: 800,
    category: 'Urban',
    releaseDate: '2024-01-25'
  },
  {
    id: '5',
    name: 'Casual Gamer',
    description: 'Look décontracté pour les sessions gaming avec style et confort.',
    image: casualGamer,
    rarity: 'common',
    price: 500,
    category: 'Casual',
    releaseDate: '2024-01-30'
  },
  {
    id: '6',
    name: 'Shadow Assassin',
    description: 'Assassin des ombres avec cape noire et lames empoisonnées.',
    image: streetNinja, // Réutilise l'image en attendant
    rarity: 'epic',
    price: 1800,
    category: 'Dark',
    releaseDate: '2024-02-01'
  },
  {
    id: '7',
    name: 'Neon Runner',
    description: 'Coureur cyberpunk avec combinaison néon et chaussures à réacteurs.',
    image: cyberWarrior,
    rarity: 'rare',
    price: 1300,
    category: 'Cyberpunk',
    releaseDate: '2024-02-05'
  },
  {
    id: '8',
    name: 'Galaxy Guardian',  
    description: 'Gardien galactique avec armure stellaire et pouvoirs cosmiques.',
    image: spaceSoldier,
    rarity: 'mythic',
    price: 2500,
    category: 'Cosmic',
    releaseDate: '2024-02-10'
  }
]

export const getFeaturedSkins = () => skins.filter(skin => skin.featured)
export const getSkinById = (id: string) => skins.find(skin => skin.id === id)
export const getSkinsByRarity = (rarity: string) => skins.filter(skin => skin.rarity === rarity)