export const COMMUNITY_DISCORD_URL = 'https://discord.gg/bdhQNf2Eev';

export const AVATARS = [
  { id: 'cat', emoji: '🐱', label_es: 'Gato', label_en: 'Cat' },
  { id: 'dog', emoji: '🐶', label_es: 'Perro', label_en: 'Dog' },
  { id: 'raccoon', emoji: '🦝', label_es: 'Mapache', label_en: 'Raccoon' },
  { id: 'fox', emoji: '🦊', label_es: 'Zorro', label_en: 'Fox' },
  { id: 'otter', emoji: '🦦', label_es: 'Nutria', label_en: 'Otter' },
  { id: 'bear', emoji: '🐻', label_es: 'Oso', label_en: 'Bear' },
  { id: 'owl', emoji: '🦉', label_es: 'Búho', label_en: 'Owl' },
  { id: 'penguin', emoji: '🐧', label_es: 'Pingüino', label_en: 'Penguin' }
];

export const ACHIEVEMENTS = [
  { id: 'first_catch', name_es: 'Primera Captura', name_en: 'First Catch', desc_es: 'Pesca tu primera criatura.', desc_en: 'Catch your first creature.', icon: '🎣', unlocked: true },
  { id: 'ten_fish', name_es: 'Pescador Novato', name_en: 'Rookie Angler', desc_es: 'Atrapa 10 peces.', desc_en: 'Catch 10 fish.', icon: '🐟', unlocked: true },
  { id: 'epic_catch', name_es: 'Caza Épica', name_en: 'Epic Catch', desc_es: 'Atrapa un pez de rareza Épica.', desc_en: 'Catch an Epic-rarity fish.', icon: '💎', unlocked: true },
  { id: 'fifty_fish', name_es: 'Maestro Pescador', name_en: 'Master Angler', desc_es: 'Atrapa 50 peces.', desc_en: 'Catch 50 fish.', icon: '🏅', unlocked: false },
  { id: 'full_dex', name_es: 'Fishdex Completo', name_en: 'Complete Fishdex', desc_es: 'Descubre todas las especies.', desc_en: 'Discover every species.', icon: '📖', unlocked: false },
  { id: 'night_owl', name_es: 'Pescador Nocturno', name_en: 'Night Owl', desc_es: 'Pesca después de medianoche.', desc_en: 'Fish after midnight.', icon: '🌙', unlocked: false }
];

// discovered queda en false para todos: el Fishdex arranca vacío/bloqueado
// hasta que el backend reporte capturas reales del jugador.
export const FISH = [
  { id: 'minnow', name_es: 'Pececillo', name_en: 'Minnow', rarity: 'COMMON', icon: '🐟', discovered: false, desc_es: 'Un pececillo curioso que abunda cerca de la orilla.', desc_en: 'A curious little fish common near the shore.' },
  { id: 'carp', name_es: 'Carpa', name_en: 'Carp', rarity: 'COMMON', icon: '🐠', discovered: false, desc_es: 'Un pez muy común en ríos y lagos.', desc_en: 'A very common fish found in rivers and lakes.' },
  { id: 'catfish', name_es: 'Bagre', name_en: 'Catfish', rarity: 'COMMON', icon: '🐡', discovered: false, desc_es: 'Se esconde en el fondo lodoso durante el día.', desc_en: 'Hides in the muddy bottom during the day.' },
  { id: 'trout', name_es: 'Trucha', name_en: 'Trout', rarity: 'UNCOMMON', icon: '🐟', discovered: false, desc_es: 'Prefiere aguas frías y corrientes rápidas.', desc_en: 'Prefers cold water and fast currents.' },
  { id: 'bass', name_es: 'Róbalo', name_en: 'Bass', rarity: 'UNCOMMON', icon: '🐠', discovered: false, desc_es: 'Un pez deportivo muy buscado por su fuerza.', desc_en: 'A sportfish prized for its fighting strength.' },
  { id: 'salmon', name_es: 'Salmón', name_en: 'Salmon', rarity: 'UNCOMMON', icon: '🐟', discovered: false, desc_es: 'Conocido por saltar contra la corriente.', desc_en: 'Known for leaping against the current.' },
  { id: 'eel', name_es: 'Anguila', name_en: 'Eel', rarity: 'UNCOMMON', icon: '🐍', discovered: false, desc_es: 'Escurridiza y activa sobre todo de noche.', desc_en: 'Slippery and mostly active at night.' },
  { id: 'golden_koi', name_es: 'Koi Dorado', name_en: 'Golden Koi', rarity: 'EPIC', icon: '🎏', discovered: false, desc_es: 'Un símbolo de buena fortuna, difícil de encontrar.', desc_en: 'A symbol of good fortune, hard to find.' },
  { id: 'shark', name_es: 'Tiburón', name_en: 'Shark', rarity: 'EPIC', icon: '🦈', discovered: false, desc_es: 'El depredador definitivo de los océanos.', desc_en: 'The ultimate predator of the oceans.' },
  { id: 'kraken', name_es: 'Kraken Diminuto', name_en: 'Tiny Kraken', rarity: 'EPIC', icon: '🐙', discovered: false, desc_es: 'Una leyenda de las profundidades, rarísimo.', desc_en: 'A legend of the deep, extremely rare.' }
];

// Nombres de usuario de muestra (estilo Norteamérica: EE. UU., México, Canadá)
// usados para generar un ranking temporal mientras no haya datos reales de backend.
export const LEADERBOARD_USERNAMES = [
  'ChevyAngler87', 'Guadalupe_Reyes', 'TorontoTrout', 'BassinBubba', 'MapleSyrupMike',
  'ElPescadorMx', 'CarlitosWay21', 'Saskatoon_Sam', 'ReelinRosie', 'TexasTackle',
  'JalapenoJess', 'NorthernPike_CA', 'ChicagoCasts', 'Fernanda_GDL', 'BC_Baitmaster',
  'CoyoteCreekKyle', 'MonterreyManny', 'LakeErieEddie', 'QuebecQuinn', 'DesertDuke_AZ',
  'HookedHannah', 'Winnipeg_Wade', 'Oaxaca_Omar', 'FloridaFinn', 'PacificoPaz',
  'RustyReelRick', 'YukonYolanda', 'ChiapasCatch', 'BrooklynBaitCo', 'AlbertaAlex',
  'SonoraSofia', 'GreatLakesGreg', 'NovaScotiaNat', 'TijuanaTravis', 'CarolinaCaleb',
  'ManitobaMaya', 'PueblaPaco', 'SeattleSage', 'OntarioOwen', 'VeracruzVale',
  'DenverDrew', 'CalgaryCole', 'YucatanYara', 'BayouBrett', 'SaltLakeSadie',
  'HalifaxHenry', 'ChihuahuaChuy', 'PortlandPiper', 'MazatlanMara', 'KingstonKai'
];

export const GALLERY = [
  { src: '/gameplay-1.jpg', alt: 'Captura de gameplay 1' },
  { src: '/gameplay-2.jpg', alt: 'Captura de gameplay 2' },
  { src: '/gameplay-3.jpg', alt: 'Captura de gameplay 3' },
  { src: '/hero-new.png', alt: 'Arte promocional de WebFisher' }
];
