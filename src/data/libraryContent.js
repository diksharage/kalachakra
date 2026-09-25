export const libraryCategories = [
  { id: 'cat-civs', title: 'Ancient Civilizations', icon: '🏛️' },
  { id: 'cat-arch', title: 'Indian Architecture', icon: '🕍' },
  { id: 'cat-art', title: 'Art & Sculpture', icon: '🎨' },
  { id: 'cat-games', title: 'Traditional Games', icon: '🎲' },
  { id: 'cat-dance', title: 'Classical Dance', icon: '💃' },
  { id: 'cat-music', title: 'Indian Music', icon: '🎵' },
  { id: 'cat-lit', title: 'Literature', icon: '📖' },
  { id: 'cat-sci', title: 'Science & Technology', icon: '🔭' },
  { id: 'cat-fest', title: 'Festivals & Traditions', icon: '🪔' },
  { id: 'cat-food', title: 'Food Heritage', icon: '🍛' },
];

export const libraryBooks = [
  // Ancient Civilizations
  { id: 'book-ivc-life', categoryId: 'cat-civs', title: 'Life in the Indus Valley', author: 'Historical Archives', period: 'c. 2500 BCE', excerpt: 'Discover how ordinary people lived in one of the world\'s oldest urban societies.', content: 'The Indus Valley Civilization was remarkably egalitarian for its time. Homes were built with standardized fired bricks, many featuring private wells and bathing areas connected to covered street drains. Unlike other contemporary civilizations, there is a striking absence of grand palaces or massive temples, suggesting a society focused more on civic amenities and trade than on glorifying individual rulers.' },
  { id: 'book-ivc-trade', categoryId: 'cat-civs', title: 'Indus Trade Networks', author: 'Economic History', period: 'c. 2400 BCE', excerpt: 'How the Indus people dominated maritime trade.', content: 'Through the port of Lothal and coastal outposts, Indus merchants traded with Mesopotamia, Oman, and Central Asia. They exported carnelian beads, timber, copper, and ivory. Their standardized system of stone weights (based on multiples of 16) ensured fair trade across massive distances.' },
  
  // Architecture
  { id: 'book-arch-stupa', categoryId: 'cat-arch', title: 'Buddhist Stupas', author: 'Architectural Heritage', period: 'Mauryan', excerpt: 'The evolution of the Stupa from burial mound to architectural masterpiece.', content: 'Originally simple earthen mounds containing relics, stupas evolved under Ashoka into grand hemispherical structures of stone and brick. The Great Stupa at Sanchi features a solid dome (anda), representing the dome of heaven enclosing the earth, and is surrounded by a massive stone railing with four elaborately carved gateways (toranas) depicting the life of Buddha.' },
  { id: 'book-arch-dravidian', categoryId: 'cat-arch', title: 'Dravidian Architecture', author: 'Temple History', period: 'Chola', excerpt: 'The towering Vimanas of the South.', content: 'Dravidian temple architecture reached its peak under the Cholas. Characterized by pyramid-shaped towers (Vimanas) over the sanctum, massive gateway towers (Gopurams), and intricate pillared halls (Mandapas). The Brihadisvara Temple\'s Vimana stands 216 feet tall, capped by a monolithic stone cupola weighing over 80 tons.' },

  // Science & Tech
  { id: 'book-sci-math', categoryId: 'cat-sci', title: 'Mathematics in Ancient India', author: 'Science Archives', period: 'Gupta', excerpt: 'The invention of zero and early calculus.', content: 'Indian mathematicians made profound contributions to global mathematics. Aryabhata approximated Pi to four decimal places and understood the rotation of the earth. Brahmagupta laid the rules for computing with zero. Centuries later, the Kerala School of Astronomy and Mathematics developed infinite series and early calculus long before they were formulated in Europe.' },
  { id: 'book-sci-metal', categoryId: 'cat-sci', title: 'Advanced Metallurgy', author: 'Science Archives', period: 'Various', excerpt: 'From the Iron Pillar of Delhi to Wootz steel.', content: "Ancient Indian metallurgists produced the famous Iron Pillar of Delhi, which has resisted rusting for over 1,600 years due to a protective film of 'misawite'. India was also the birthplace of Wootz steel (the basis of Damascus steel), highly prized across the ancient world for its sharpness and durability." }
];
