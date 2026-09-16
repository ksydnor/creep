// Fallback content, served until the CMS is seeded. Image files are named after
// the slide each one came from so a replacement is easy to match by eye.
const image = (src, alt, caption) => ({ src, alt, caption, type: "image" });

export const projects = [
  {
    index: "01",
    title: "Emotive GIFs",
    slug: "emotive-gifs",
    category: "Animated GIFs",
    course: "Dynamic Imagery",
    year: "2026",
    tools: ["Adobe Photoshop"],
    shortDescription: "Eight looping GIFs of one character, one for each emotion, made in Photoshop.",
    longDescription:
      "Eight GIFs for Dynamic Imagery: anger, confusion, excitement, sadness, fear, disgust, joy and surprise. One character carries all eight. Every loop keeps the same framing, so the emotion has to come from the eyes, the brows and the posture. The stills here are single frames from each loop; the finished pieces move.",
    coverImage: "/assets/projects/emotive-gifs/web-gif-anger.jpg",
    coverImageAlt: "A long-eared creature in a green sweater with its arms folded, the still for anger.",
    thumbnail: "/assets/projects/emotive-gifs/web-gif-surprise.jpg",
    thumbnailAlt: "The same creature with wide round eyes and raised brows, the still for surprise.",
    featured: false,
    accent: "#f7d64a",
    tone: "dark",
    layout: "grid",
    moduleEyebrow: "Eight emotions",
    moduleTitle: "One character, eight readings.",
    moduleBody: "Same framing every time. Anger folds its arms; the rest is done with the eyes and the brows.",
    media: [
      image("/assets/projects/emotive-gifs/web-gif-anger.jpg", "Still for anger: arms folded, brows down.", "Emotive GIFs / anger"),
      image("/assets/projects/emotive-gifs/web-gif-confusion.jpg", "Still for confusion: eyes off to one side, one brow raised.", "Emotive GIFs / confusion"),
      image("/assets/projects/emotive-gifs/web-gif-excitement.jpg", "Still for excitement: eyes wide, brows lifted.", "Emotive GIFs / excitement"),
      image("/assets/projects/emotive-gifs/web-gif-sadness.jpg", "Still for sadness: eyelids half closed.", "Emotive GIFs / sadness"),
      image("/assets/projects/emotive-gifs/web-gif-fear.jpg", "Still for fear: brows pinched up, eyes wide.", "Emotive GIFs / fear"),
      image("/assets/projects/emotive-gifs/web-gif-disgust.jpg", "Still for disgust: eyes turned away, brows knotted.", "Emotive GIFs / disgust"),
      image("/assets/projects/emotive-gifs/web-gif-joy.jpg", "Still for joy: eyes wide, brows lifted, head tilted.", "Emotive GIFs / joy"),
      image("/assets/projects/emotive-gifs/web-gif-surprise.jpg", "Still for surprise: round eyes, brows raised.", "Emotive GIFs / surprise")
    ],
    sections: [
      {
        title: "First four",
        body: "Anger, confusion, excitement and sadness.",
        image: "/assets/projects/emotive-gifs/web-gif-anger.jpg",
        alt: "Still for anger: arms folded, brows down."
      },
      {
        title: "Second four",
        body: "Fear, disgust, joy and surprise.",
        image: "/assets/projects/emotive-gifs/web-gif-fear.jpg",
        alt: "Still for fear: brows pinched up, eyes wide."
      }
    ]
  },
  {
    index: "02",
    title: "Type Specimen",
    slug: "type-specimen",
    category: "Typography",
    course: "Typography + Info",
    year: "2026",
    tools: ["Adobe Illustrator", "Clay", "Photography"],
    shortDescription: "A specimen for Alternate Gothic that starts from a lowercase g modelled in clay.",
    longDescription:
      "A type specimen for Alternate Gothic, made for Typography + Info. It started with one letter: I modelled the lowercase g in clay, photographed it, and drew from it in Illustrator. Those drawings became a set of black and white pattern studies, then a run of black and white magazine pages, and finally the specimen itself: a teen-magazine issue set entirely in Alternate Gothic, in pink, green and magenta.",
    coverImage: "/assets/projects/type-specimen/web-specimen-1.jpg",
    coverImageAlt: "Specimen page: a giant lime-green ampersand on pink, with a magenta and a yellow exclamation mark.",
    thumbnail: "/assets/projects/type-specimen/web-clay-1.jpg",
    thumbnailAlt: "Photograph of a lowercase g modelled in grey clay.",
    featured: true,
    accent: "#d758b3",
    tone: "dark",
    layout: "grid",
    moduleEyebrow: "One letter first",
    moduleTitle: "The g, in clay and in ink.",
    moduleBody: "The clay g was photographed and drawn before any page was set. The finished pages are the only part of the project in colour.",
    media: [
      image("/assets/projects/type-specimen/web-specimen-1.jpg", "Specimen page: a giant lime-green ampersand on pink, with a magenta and a yellow exclamation mark.", "Type Specimen / page 01"),
      image("/assets/projects/type-specimen/web-specimen-2.jpg", "Specimen page: magazine cover lines in Alternate Gothic on magenta and green.", "Type Specimen / page 02"),
      image("/assets/projects/type-specimen/web-specimen-3.jpg", "Specimen page: the words smashing in pink in dark maroon and pale pink on magenta, under white glyphs on lime green.", "Type Specimen / page 03"),
      image("/assets/projects/type-specimen/web-specimen-4.jpg", "Specimen page: numerals and the word crushes stacked in pink, green and yellow.", "Type Specimen / page 04"),
      image("/assets/projects/type-specimen/web-specimen-5.jpg", "Specimen page: sip the gossip drink till you choke, set inside a pink capsule.", "Type Specimen / page 05"),
      image("/assets/projects/type-specimen/web-specimen-6.jpg", "Specimen page: the character set and cover lines in yellow, magenta and pink.", "Type Specimen / page 06"),
      image("/assets/projects/type-specimen/web-clay-1.jpg", "Photograph of a lowercase g modelled in grey clay.", "Type Specimen / clay g 01"),
      image("/assets/projects/type-specimen/web-clay-2.jpg", "Clay g photographed over its drawn outline.", "Type Specimen / clay g 02"),
      image("/assets/projects/type-specimen/web-clay-3.jpg", "Clay g rings repeated across a white ground.", "Type Specimen / clay g 03"),
      image("/assets/projects/type-specimen/web-g-1.jpg", "Drawn g outlines nested inside capsule shapes.", "Type Specimen / g study 01"),
      image("/assets/projects/type-specimen/web-g-2.jpg", "Two drawn g shapes mirrored in black.", "Type Specimen / g study 02"),
      image("/assets/projects/type-specimen/web-g-3.jpg", "Overlapping black g shapes cut into a pattern.", "Type Specimen / g study 03"),
      image("/assets/projects/type-specimen/web-g-4.jpg", "Thin outline g shapes scattered across the page.", "Type Specimen / g study 04"),
      image("/assets/projects/type-specimen/web-bw-1.jpg", "Black and white magazine page: teen party, teen fashion.", "Type Specimen / black and white 01"),
      image("/assets/projects/type-specimen/web-bw-2.jpg", "Black and white page listing the Alternate Gothic weights from thin to black.", "Type Specimen / black and white 02"),
      image("/assets/projects/type-specimen/web-bw-3.jpg", "Black and white page: a grey ampersand and exclamation mark.", "Type Specimen / black and white 03")
    ],
    sections: [
      {
        title: "Clay g",
        body: "The lowercase g, built by hand and photographed.",
        image: "/assets/projects/type-specimen/web-clay-1.jpg",
        alt: "Photograph of a lowercase g modelled in grey clay."
      },
      {
        title: "Pattern studies",
        body: "The g drawn in Illustrator, repeated and cut into black and white patterns.",
        image: "/assets/projects/type-specimen/web-g-1.jpg",
        alt: "Drawn g outlines nested inside capsule shapes."
      },
      {
        title: "Final specimen",
        body: "Six magazine pages in pink, green and magenta.",
        image: "/assets/projects/type-specimen/web-specimen-2.jpg",
        alt: "Specimen page: magazine cover lines in Alternate Gothic on magenta and green."
      }
    ]
  },
  {
    index: "03",
    title: "Notes from Underground",
    slug: "chap-book",
    category: "Editorial / Print",
    course: "Typography + Info",
    year: "2026",
    tools: ["Adobe InDesign", "Adobe Illustrator"],
    shortDescription: "A chap book of Dostoyevsky's Notes from Underground, typeset in InDesign with artwork made in Illustrator.",
    longDescription:
      "A chap book for Typography + Info, setting Fyodor Dostoyevsky's Notes from Underground. The text was set first as a plain exercise called Invisible: two spreads where the typography stays out of the way. The finished book breaks that setting open. A second voice cuts across the prose in red and black, letters run off the page, and the type becomes part of the picture.",
    coverImage: "/assets/projects/chap-book/web-spread-1.jpg",
    coverImageAlt: "Chap book spread: a huge black G, the words goodbye in red and wait and bleed repeated in black.",
    thumbnail: "/assets/projects/chap-book/web-spread-4.jpg",
    thumbnailAlt: "Chap book spread: a black burst shape holding the line inside my shell I wait and bleed.",
    featured: true,
    accent: "#e42525",
    tone: "dark",
    layout: "grid",
    moduleEyebrow: "Setting, then book",
    moduleTitle: "Invisible, then loud.",
    moduleBody: "The first two spreads set the text quietly. The finished book lets a second voice in red run across it.",
    media: [
      image("/assets/projects/chap-book/web-book-cover.jpg", "Chap book cover: Notes from Underground in white on black with thin red stripes.", "Chap Book / cover"),
      image("/assets/projects/chap-book/web-spread-1.jpg", "Chap book spread: a huge black G, the words goodbye in red and wait and bleed repeated in black.", "Chap Book / spread 01"),
      image("/assets/projects/chap-book/web-spread-2.jpg", "Chap book spread: the prose with a red wall of tilted lettering across the right page.", "Chap Book / spread 02"),
      image("/assets/projects/chap-book/web-spread-3.jpg", "Chap book spread: giant black letters behind the columns, with wait and bleed in red.", "Chap Book / spread 03"),
      image("/assets/projects/chap-book/web-spread-4.jpg", "Chap book spread: a black burst shape holding the line inside my shell I wait and bleed.", "Chap Book / spread 04"),
      image("/assets/projects/chap-book/web-spread-5.jpg", "Chap book spread: black bars over the text with a line of red at the top of the right page.", "Chap Book / spread 05"),
      image("/assets/projects/chap-book/web-invisible-1.jpg", "Invisible type set: two pages of plain justified text.", "Chap Book / Invisible 01"),
      image("/assets/projects/chap-book/web-invisible-2.jpg", "Invisible type set: two more pages of plain justified text.", "Chap Book / Invisible 02")
    ],
    sections: [
      {
        title: "Invisible",
        body: "The text set plainly, before any image.",
        image: "/assets/projects/chap-book/web-invisible-1.jpg",
        alt: "Invisible type set: two pages of plain justified text."
      },
      {
        title: "The book",
        body: "Red and black spreads from the printed copy.",
        image: "/assets/projects/chap-book/web-spread-3.jpg",
        alt: "Chap book spread: giant black letters behind the columns, with wait and bleed in red."
      }
    ]
  },
  {
    index: "04",
    title: "First Scene",
    slug: "animation",
    category: "Animation / 3D",
    course: "Digital Prototyping",
    year: "2026",
    tools: ["Procreate", "Blender", "Adobe After Effects", "Adobe Photoshop"],
    shortDescription: "The opening scene of an animation: storyboarded in Procreate, an eye modelled in Blender, composited in After Effects.",
    longDescription:
      "The first scene of an animation, made for Digital Prototyping. The storyboard is six frames in Procreate: a clown in striped socks walks into a spotlight while a wall of mechanical eyes follows him. The eye was modelled and rendered in Blender so it could be turned and lit from any angle. The scene was assembled in After Effects with painted elements from Procreate and Photoshop.",
    coverImage: "/assets/projects/animation/web-scene.jpg",
    coverImageAlt: "Finished frame: striped socks and olive sneakers with orange laces on a wooden floor under a red light.",
    thumbnail: "/assets/projects/animation/web-object-1.jpg",
    thumbnailAlt: "Blender render of a pink eyeball held on a jointed metal stand.",
    featured: false,
    accent: "#ff4f2e",
    tone: "dark",
    layout: "progression",
    moduleEyebrow: "Three stages",
    moduleTitle: "Board, eye, scene.",
    moduleBody: "Six frames set the action. The eye was built once in Blender and reused for every angle.",
    media: [
      image("/assets/projects/animation/web-scene.jpg", "Finished frame: striped socks and olive sneakers with orange laces on a wooden floor under a red light.", "Animation / first scene"),
      image("/assets/projects/animation/web-storyboard-1.jpg", "Storyboard frame 1: red shoes stepping forward, shoes clicking.", "Animation / storyboard 01"),
      image("/assets/projects/animation/web-storyboard-2.jpg", "Storyboard frame 2: a red-haired clown beside a crowd of eyes.", "Animation / storyboard 02"),
      image("/assets/projects/animation/web-storyboard-3.jpg", "Storyboard frame 3: rows of mechanical eyes, eyes follow the clown.", "Animation / storyboard 03"),
      image("/assets/projects/animation/web-storyboard-4.jpg", "Storyboard frame 4: the eyes turn together.", "Animation / storyboard 04"),
      image("/assets/projects/animation/web-storyboard-5.jpg", "Storyboard frame 5: the clown in profile, walks out of frame.", "Animation / storyboard 05"),
      image("/assets/projects/animation/web-storyboard-6.jpg", "Storyboard frame 6: a figure in a spotlight between red stage curtains.", "Animation / storyboard 06"),
      image("/assets/projects/animation/web-object-1.jpg", "Blender render of a pink eyeball held on a jointed metal stand.", "Animation / Blender eye 01"),
      image("/assets/projects/animation/web-object-2.jpg", "Blender render of the eye from the side, held in a hexagonal frame.", "Animation / Blender eye 02"),
      image("/assets/projects/animation/web-object-3.jpg", "Blender render of the eye looking down from the top of its stand.", "Animation / Blender eye 03")
    ],
    sections: [
      {
        title: "Storyboard",
        body: "Six frames in Procreate, from the first step to the stage.",
        image: "/assets/projects/animation/web-storyboard-3.jpg",
        alt: "Storyboard frame 3: rows of mechanical eyes, eyes follow the clown."
      },
      {
        title: "3D object",
        body: "The eye, modelled and rendered in Blender.",
        image: "/assets/projects/animation/web-object-2.jpg",
        alt: "Blender render of the eye from the side, held in a hexagonal frame."
      },
      {
        title: "First scene",
        body: "The finished opening frame, composited in After Effects.",
        image: "/assets/projects/animation/web-scene.jpg",
        alt: "Finished frame: striped socks and olive sneakers with orange laces on a wooden floor under a red light."
      }
    ]
  },
  {
    index: "05",
    title: "Monster Deck",
    slug: "monster-deck",
    category: "Playing cards",
    course: "Process & Production",
    year: "2026",
    tools: ["Adobe Illustrator"],
    shortDescription: "A printed deck of playing cards with a different monster drawn on every face.",
    longDescription:
      "A deck of playing cards for Process & Production, drawn in Illustrator. Each card carries its own creature in black line over cream, red or purple, with the rank and suit in the corners. The back is a field of eyes. The deck was printed and boxed; the photographs show the finished cards.",
    coverImage: "/assets/projects/monster-deck/web-deck-1.jpg",
    coverImageAlt: "Printed cards fanned out over a purple card and the black box of the deck.",
    thumbnail: "/assets/projects/monster-deck/web-card-king-spades.jpg",
    thumbnailAlt: "King of spades: a horned creature drawn in black line on purple.",
    featured: false,
    accent: "#80ff72",
    tone: "dark",
    layout: "object",
    moduleEyebrow: "Deck",
    moduleTitle: "A monster on every face.",
    moduleBody: "Black line on three colours: cream, red and purple. The back is nothing but eyes.",
    media: [
      image("/assets/projects/monster-deck/web-deck-1.jpg", "Printed cards fanned out over a purple card and the black box of the deck.", "Monster Deck / printed deck 01"),
      image("/assets/projects/monster-deck/web-deck-2.jpg", "A stack of printed cards with the eye-pattern back on top.", "Monster Deck / printed deck 02"),
      image("/assets/projects/monster-deck/web-deck-3.jpg", "The open box with cards spilling out.", "Monster Deck / printed deck 03"),
      image("/assets/projects/monster-deck/web-box.jpg", "The closed black box of the deck.", "Monster Deck / box"),
      image("/assets/projects/monster-deck/web-card-back.jpg", "Card back: a dense pattern of eyes in black and cream.", "Monster Deck / back"),
      image("/assets/projects/monster-deck/web-card-jack-hearts.jpg", "Jack of hearts: a winged creature drawn in black line on red.", "Monster Deck / jack of hearts"),
      image("/assets/projects/monster-deck/web-card-joker.jpg", "Joker: a horned face inside a folded wing, black line on cream.", "Monster Deck / joker"),
      image("/assets/projects/monster-deck/web-card-king-spades.jpg", "King of spades: a horned creature drawn in black line on purple.", "Monster Deck / king of spades"),
      image("/assets/projects/monster-deck/web-card-ace-clubs.jpg", "Ace of clubs: a hunched figure with a purple club.", "Monster Deck / ace of clubs"),
      image("/assets/projects/monster-deck/web-card-queen-diamonds.jpg", "Queen of diamonds: a creature with wide antlers on red.", "Monster Deck / queen of diamonds"),
      image("/assets/projects/monster-deck/web-card-three-diamonds.jpg", "Three of diamonds: a bald figure with clawed hands on cream.", "Monster Deck / three of diamonds"),
      image("/assets/projects/monster-deck/web-card-seven-spades.jpg", "Seven of spades: a tangle of tentacles in purple on cream.", "Monster Deck / seven of spades")
    ],
    sections: [
      {
        title: "Card faces",
        body: "Each face drawn separately in Illustrator.",
        image: "/assets/projects/monster-deck/web-card-king-spades.jpg",
        alt: "King of spades: a horned creature drawn in black line on purple."
      },
      {
        title: "Printed deck",
        body: "The cards and the box after printing.",
        image: "/assets/projects/monster-deck/web-deck-3.jpg",
        alt: "The open box with cards spilling out."
      }
    ]
  },
  {
    index: "06",
    title: "Mothville Currency",
    slug: "currency",
    category: "Currency / Illustration",
    course: "Process & Production",
    year: "2026",
    tools: ["Adobe Illustrator"],
    shortDescription: "Three banknotes for the Central Republic of Mothville, each carrying a different moth.",
    longDescription:
      "A currency for Process & Production, drawn in Illustrator. Three notes for the Central Republic of Mothville: a 10, a 50 and a 100 in blue, pink and green. Each front carries a different moth over a fine-line ground with a star, a seal and a serial number; each back repeats the moth in reverse with a signature. The notes were printed and photographed.",
    coverImage: "/assets/projects/currency/web-notes-1.jpg",
    coverImageAlt: "The 10, 50 and 100 notes fanned out on a white surface.",
    thumbnail: "/assets/projects/currency/web-note-50.jpg",
    thumbnailAlt: "The pink 50 note, front and back, with a wide-winged moth.",
    featured: true,
    accent: "#ffb3d8",
    tone: "light",
    layout: "grid",
    moduleEyebrow: "One set",
    moduleTitle: "Three notes, three moths.",
    moduleBody: "The star, the seal and the serial repeat across the set. The moth and the colour change.",
    media: [
      image("/assets/projects/currency/web-notes-1.jpg", "The 10, 50 and 100 notes fanned out on a white surface.", "Currency / the set 01"),
      image("/assets/projects/currency/web-notes-2.jpg", "The blue 10, green 100 and pink 50 notes overlapping, the 50 on top.", "Currency / the set 02"),
      image("/assets/projects/currency/web-note-10.jpg", "The blue 10 note, front and back, with a dark, white-veined moth.", "Currency / 10"),
      image("/assets/projects/currency/web-note-50.jpg", "The pink 50 note, front and back, with a wide-winged moth.", "Currency / 50"),
      image("/assets/projects/currency/web-note-100.jpg", "The green 100 note, front and back, with a hawk moth.", "Currency / 100")
    ],
    sections: [
      {
        title: "The set",
        body: "The 10, the 50 and the 100 together.",
        image: "/assets/projects/currency/web-notes-1.jpg",
        alt: "The 10, 50 and 100 notes fanned out on a white surface."
      },
      {
        title: "Front and back",
        body: "Each note printed on both sides.",
        image: "/assets/projects/currency/web-note-100.jpg",
        alt: "The green 100 note, front and back, with a hawk moth."
      }
    ]
  },
  {
    index: "07",
    title: "Lenny's Cookbook",
    slug: "cookbook",
    category: "Editorial / Print",
    course: "Process & Production",
    year: "2026",
    tools: ["Adobe Illustrator", "Adobe InDesign"],
    shortDescription: "A Mediterranean cookbook set in InDesign and illustrated with one red octopus that reaches through every page.",
    longDescription:
      "A cookbook for Process & Production. Lenny's Cookbook collects Mediterranean recipes, set in InDesign and illustrated in Illustrator. One octopus is the only illustration: reversed out in white, it wraps the cover; inside, in red, it holds the bowls and reaches across the recipe pages. Each recipe carries hand-drawn icons for cooking time and serving size. The book was printed and photographed.",
    coverImage: "/assets/projects/cookbook/web-spread.jpg",
    coverImageAlt: "The printed cookbook open to the Ezme recipe, with an octopus curled around a bowl of salad.",
    thumbnail: "/assets/projects/cookbook/web-cover.jpg",
    thumbnailAlt: "The printed cookbook cover: a white octopus on dark red.",
    featured: false,
    accent: "#ffc857",
    tone: "light",
    layout: "grid",
    moduleEyebrow: "Spreads",
    moduleTitle: "One octopus, every page.",
    moduleBody: "Recipes on the left, the octopus on the right, hand-drawn timers and forks in between.",
    media: [
      image("/assets/projects/cookbook/web-cover.jpg", "The printed cookbook cover: a white octopus on dark red.", "Cookbook / cover"),
      image("/assets/projects/cookbook/web-spread.jpg", "The printed cookbook open to the Ezme recipe, with an octopus curled around a bowl of salad.", "Cookbook / spread"),
      image("/assets/projects/cookbook/web-page-1.jpg", "Recipe page: Ezme instructions with a timer, serves 4 and the words so fresh.", "Cookbook / page 01"),
      image("/assets/projects/cookbook/web-page-2.jpg", "Recipe page: Ezme Turkish salad ingredients, with octopus arms down the left.", "Cookbook / page 02"),
      image("/assets/projects/cookbook/web-page-3.jpg", "Recipe page: Toum garlic sauce with a bowl of the sauce at the top.", "Cookbook / page 03"),
      image("/assets/projects/cookbook/web-page-4.jpg", "Recipe page: cooking time and serving icons surrounded by octopus arms.", "Cookbook / page 04")
    ],
    sections: [
      {
        title: "Recipe pages",
        body: "Ezme, toum and the rest, set with hand-drawn icons.",
        image: "/assets/projects/cookbook/web-page-2.jpg",
        alt: "Recipe page: Ezme Turkish salad ingredients, with octopus arms down the left."
      },
      {
        title: "The printed book",
        body: "Cover and spread, after printing.",
        image: "/assets/projects/cookbook/web-cover.jpg",
        alt: "The printed cookbook cover: a white octopus on dark red."
      }
    ]
  },
  {
    index: "08",
    title: "When Dreams Turn on Us",
    slug: "exhibition-posters",
    category: "Posters / Exhibition",
    course: "Research, Analysis & Process",
    year: "2026",
    tools: ["Procreate", "Adobe Photoshop"],
    shortDescription: "Three posters for an exhibition on dreams and nightmares, built from four paintings made as research.",
    longDescription:
      "Three posters for Research, Analysis & Process. The research came first, as four paintings in Procreate: two nightmares, a scratched black and white room with something at the window and a girl asleep on a bed with impossibly tall legs, and two dreams, an open mouth full of teeth in pink and green and a pair of clasped hands. The posters were composed in Photoshop from those paintings and from photographed hands. Each one is vertical, gives the image most of the sheet, and carries one line of rough, distressed type: Are you dreaming right now? The absurd awaits your sleep. When dreams turn on us.",
    coverImage: "/assets/projects/exhibition-posters/web-dream-1.jpg",
    coverImageAlt: "Dream painting: an open mouth full of teeth in pink, green and purple.",
    thumbnail: "/assets/projects/exhibition-posters/web-poster-3.jpg",
    thumbnailAlt: "Poster: a girl asleep on a bed with impossibly tall legs, with the line when dreams turn on us.",
    featured: false,
    accent: "#e64b3c",
    tone: "dark",
    layout: "poster",
    moduleEyebrow: "Research first",
    moduleTitle: "Paint it, then set it.",
    moduleBody: "The nightmare and the dream were painted before a single poster was laid out.",
    media: [
      image("/assets/projects/exhibition-posters/web-poster-1.jpg", "Poster: two reaching hands over a dark pattern, with the line are you dreaming right now.", "Exhibition Posters / poster 01"),
      image("/assets/projects/exhibition-posters/web-poster-2.jpg", "Poster: teeth and a purple mouth in greyscale, with the line the absurd awaits your sleep.", "Exhibition Posters / poster 02"),
      image("/assets/projects/exhibition-posters/web-poster-3.jpg", "Poster: a girl asleep on a bed with impossibly tall legs, with the line when dreams turn on us.", "Exhibition Posters / poster 03"),
      image("/assets/projects/exhibition-posters/web-nightmare-1.jpg", "Nightmare painting: a scratched black and white room with a creature at the window.", "Exhibition Posters / nightmare research 01"),
      image("/assets/projects/exhibition-posters/web-nightmare-2.jpg", "Nightmare painting: a girl lying on a bed with very tall legs, in black line on white.", "Exhibition Posters / nightmare research 02"),
      image("/assets/projects/exhibition-posters/web-dream-1.jpg", "Dream painting: an open mouth full of teeth in pink, green and purple.", "Exhibition Posters / dream research 01"),
      image("/assets/projects/exhibition-posters/web-dream-2.jpg", "Dream painting: two hands clasped in black line with a grey wash and small red marks.", "Exhibition Posters / dream research 02")
    ],
    sections: [
      {
        title: "Nightmare",
        body: "Painted in Procreate during the research stage.",
        image: "/assets/projects/exhibition-posters/web-nightmare-1.jpg",
        alt: "Nightmare painting: a scratched black and white room with a creature at the window."
      },
      {
        title: "Dream",
        body: "The other half of the research, also painted in Procreate.",
        image: "/assets/projects/exhibition-posters/web-dream-1.jpg",
        alt: "Dream painting: an open mouth full of teeth in pink, green and purple."
      },
      {
        title: "Posters",
        body: "Three vertical posters, composed in Photoshop.",
        image: "/assets/projects/exhibition-posters/web-poster-1.jpg",
        alt: "Poster: two reaching hands over a dark pattern, with the line are you dreaming right now."
      }
    ]
  }
];
