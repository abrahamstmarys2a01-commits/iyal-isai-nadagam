const initialEvents = [
  {
    _id: 'ev_1',
    title: 'Naadha Sangamam: Grand Carnatic Classical Jubilee',
    tamilTitle: 'நாத சங்கமம்: மகா கர்நாடக சங்கீத பெருவிழா',
    date: '2026-11-20',
    displayDate: 'November 20, 2026',
    time: '06:00 PM - 09:30 PM IST',
    venue: 'Narada Gana Sabha Main Auditorium, TTK Road, Alwarpet, Chennai',
    category: 'Carnatic Music',
    shortDesc: 'An auspicious evening of classical Carnatic vocal symphony featuring master vidwans celebrating saint-poet compositions with live percussion jugalbandi.',
    fullDesc: 'Naadha Sangamam brings together illustrious maestros of South Indian classical music for an uninterrupted three-hour spiritual journey. The concert features rare ragas, profound Saint Thyagaraja kritis, Dikshitar Navavarna compositions, and concludes with an electrifying Thani Avarthanam featuring Mridangam, Ghatam, and Kanjira in rhythmic unison.',
    poster: '/uploads/isai_vintage.jpg',
    featured: true,
    isPublished: true,
    troupe: 'Kalamanram Classical Music Wing & Guest Vidwans',
    artForm: 'Vocal, Violin & Laya Vinyasam',
    entry: 'Open to All / Reserved Seating Available',
    schedule: [
      { time: '06:00 PM', item: 'Mangala Isai & Lamp Lighting Ceremony' },
      { time: '06:30 PM', item: 'Vocal Recital: Pancharatna Kritis in Mayamalavagowla & Kalyani' },
      { time: '08:00 PM', item: 'Thani Avarthanam: Percussion Dialogue on Mridangam & Ghatam' },
      { time: '09:00 PM', item: 'Mangalam & Artist Felicitations' }
    ],
    gallery: [
      '/uploads/isai_vintage.jpg',
      '/uploads/iyal_isai_nadagam_hero.jpg'
    ]
  },
  {
    _id: 'ev_2',
    title: 'Margazhi Isai Vizha',
    tamilTitle: 'மார்கழி இசை விழா',
    date: '2026-11-12',
    displayDate: '12 Nov 2026',
    time: '06:00 PM - 09:00 PM IST',
    venue: 'Muthamizh Peravai Arangam, Chennai',
    category: 'Carnatic Music',
    shortDesc: 'MUSIC UNITES SOULS. A grand classical festival honoring saint composers and ancient devotional ragas.',
    fullDesc: 'A divine assembly of vocalists and instrumentalists performing devotional kritis, mangala isai, and rare classical compositions.',
    poster: '/uploads/isai_vintage.jpg',
    featured: true,
    isPublished: true,
    troupe: 'Kalamanram Carnatic Ensemble',
    artForm: 'Veena & Vocal Symphony',
    entry: 'Open to All',
    schedule: [
      { time: '06:00 PM', item: 'Inauguration' },
      { time: '07:00 PM', item: 'Main Katcheri' }
    ],
    gallery: [
      '/uploads/isai_vintage.jpg'
    ]
  },
  {
    _id: 'ev_8',
    title: 'Sangam Thamizh Iyal Peravai: Classical Literary Conclave',
    tamilTitle: 'சங்கத் தமிழ் இயல் பேரவை: முத்தமிழ் இலக்கிய மாநாடு',
    date: '2026-11-28',
    displayDate: 'November 28, 2026',
    time: '09:30 AM - 05:00 PM IST',
    venue: 'Madurai Tamizh Sangam Main Hall, Madurai',
    category: 'Literature',
    shortDesc: 'பழம்பெரும் சங்க இலக்கியக் கவிதைகள், திருக்குறள் நயவுரைகள் மற்றும் ஓலைச்சுவடி வரலாற்றுப் பெருவிழா.',
    fullDesc: 'செம்மொழித் தமிழின் பெருமை பேசும் சங்க இலக்கிய சொற்பொழிவுகள், சிலப்பதிகார கவியரங்கம் மற்றும் அரிய ஓலைச்சுவடிகள் காட்சி அரங்கம்.',
    poster: '/uploads/iyal_vintage.jpg',
    featured: true,
    isPublished: true,
    troupe: 'கலைமன்ற புலவர் பெருமக்கள்',
    artForm: 'இயல் இலக்கிய அரங்கம் & கவியரங்கம்',
    entry: 'அனைவருக்கும் அனுமதி இலவசம்',
    schedule: [
      { time: '09:30 AM', item: 'தமிழ்த்தாய் வாழ்த்து & மங்கல விளக்கேற்றுதல்' },
      { time: '10:30 AM', item: 'சங்க இலக்கிய கவியரங்கம்' },
      { time: '02:30 PM', item: 'ஓலைச்சுவடிகள் பாதுகாப்பு கருத்தரங்கம்' }
    ],
    gallery: [
      '/uploads/iyal_vintage.jpg',
      '/uploads/iyal_isai_nadagam_hero.jpg'
    ]
  },
  {
    _id: 'ev_4',
    title: 'Silambu Natyotsav: Bharatanatyam Dance Drama',
    tamilTitle: 'சிலம்பு நாட்டியோத்சவம்: சிலப்பதிகார நாட்டிய நாடகம்',
    date: '2026-12-15',
    displayDate: 'December 15, 2026',
    time: '05:30 PM - 09:00 PM IST',
    venue: 'Muthamizh Peravai TN Rajarathinam Kalai Arangam, Raja Annamalaipuram, Chennai',
    category: 'Bharatanatyam',
    shortDesc: 'A majestic theatrical dance ballet dramatizing the immortal Tamil epic Silappadikaram with 30 classical dancers and live nattuvangam.',
    fullDesc: 'Experience the poetic brilliance of Ilango Adigal brought to life through intricate Nritta, dynamic Abhinaya, and theatrical choreography.',
    poster: '/uploads/bharatanatyam_vintage.jpg',
    featured: true,
    isPublished: true,
    troupe: 'Iyal Isai Naadaga Repertory Dance Troupe',
    artForm: 'Classical Bharatanatyam Thematic Ballet',
    entry: 'Donor Passes & Student Entry',
    schedule: [],
    gallery: [
      '/uploads/bharatanatyam_vintage.jpg',
      '/uploads/iyal_isai_nadagam_hero.jpg'
    ]
  },
  {
    _id: 'ev_5',
    title: 'Gramiya Thiruvizha: Pongal Folk Arts Carnival',
    tamilTitle: 'கிராமியத் திருவிழா: பொங்கல் நாட்டுப்புறக் கலை சங்கமம்',
    date: '2027-01-14',
    displayDate: 'January 14, 2027',
    time: '04:00 PM - 10:00 PM IST',
    venue: 'DakshinaChitra Heritage Center Amphitheatre, Muttukadu, ECR, Chennai',
    category: 'Folk Dance',
    shortDesc: 'A high-spirited rural harvest festival featuring vibrant Karakattam, Oyilattam, Mayilattam, and pulsating Parai drums in an open-air arena.',
    fullDesc: 'Celebrating the bountiful harvest season of Pongal with traditional vigor. Over 50 folk dancers and percussionists gather to present authentic arts.',
    poster: '/uploads/karakattam_vintage.jpg',
    featured: false,
    isPublished: true,
    troupe: 'Tamil Nadu Janapada Kalai Kazhagam',
    artForm: 'Karakattam, Oyilattam, Parai & Kavadi',
    entry: 'Open Heritage Festival Pass',
    schedule: [],
    gallery: [
      '/uploads/karakattam_vintage.jpg'
    ]
  },
  {
    _id: 'ev_6',
    title: 'Karna Moksham: Traditional Therukoothu Heritage Drama',
    tamilTitle: 'கர்ண மோட்சம்: பாரம்பரிய தெருக்கூத்து நாடகம்',
    date: '2027-02-27',
    displayDate: 'February 27, 2027',
    time: '07:00 PM - 11:30 PM IST',
    venue: 'Raja Muthaiah Mandram Cultural Grounds, Madurai',
    category: 'Drama',
    shortDesc: 'The spellbinding traditional open-air Tamil folk drama portraying the valor and sacrifice of Karna with ornate face paint and song.',
    fullDesc: 'Therukoothu represents Tamil Nadu’s ancient theatrical idiom, blending high-pitch singing, stylized dialogues, martial spins, and profound philosophical debates.',
    poster: '/uploads/nadagam_vintage.jpg',
    featured: false,
    isPublished: true,
    troupe: 'Purisai Therukoothu Kalai Sangam',
    artForm: 'Therukoothu Folk Theatre',
    entry: 'Free Public Cultural Performance',
    schedule: [],
    gallery: [
      '/uploads/nadagam_vintage.jpg'
    ]
  },
  {
    _id: 'ev_7',
    title: 'Veena Nadhanjali: Divine Strings Recital',
    tamilTitle: 'வீணா நாதாஞ்சலி: தெய்வீக வீணை இசை சங்கமம்',
    date: '2026-08-12',
    displayDate: 'August 12, 2026',
    time: '06:00 PM - 08:45 PM IST',
    venue: 'Vani Mahal, G.N. Chetty Road, T. Nagar, Chennai',
    category: 'Carnatic Music',
    shortDesc: 'A transcendent Saraswathi Veena recital showcasing exquisite gamakas, classical ragas, and intricate taanam passages.',
    fullDesc: 'Celebrated as the national instrument of classical lore, the Saraswathi Veena represents the pinnacle of microtonal purity.',
    poster: '/uploads/isai_vintage.jpg',
    featured: false,
    isPublished: true,
    troupe: 'Saraswathi Veena Vadyalayam Troupe',
    artForm: 'Veena Solo & Percussion Accompaniment',
    entry: 'Completed Concert Offering',
    schedule: [],
    gallery: [
      '/uploads/isai_vintage.jpg'
    ]
  }
];

const initialEnquiries = [
  {
    _id: 'enq_1',
    referenceId: 'KALAI-892401',
    customerName: 'Lakshmi Raman',
    phone: '98401 23456',
    email: 'lakshmi.raman@gmail.com',
    eventType: 'Bharatanatyam',
    selectedEvent: 'Silambu Natyotsav',
    eventDate: '12 Nov 2026',
    venue: 'Chennai Fine Arts Sabha',
    performanceCount: '1 Performance (Full Ensemble)',
    message: 'We require a 90-minute Bharatanatyam Margam with live Carnatic orchestra for our silver jubilee function.',
    status: 'Pending',
    createdAt: new Date('2026-10-28T09:30:00Z').toISOString()
  },
  {
    _id: 'enq_2',
    referenceId: 'KALAI-734892',
    customerName: 'Arun Kumar',
    phone: '98412 87654',
    email: 'arun.k@yahoo.com',
    eventType: 'Nadaswaram',
    selectedEvent: 'Wedding Mangala Isai',
    eventDate: '18 Nov 2026',
    venue: 'Mayor Ramanathan Mandapam, Chennai',
    performanceCount: '2 Sessions (Muhurtham & Reception)',
    message: 'Looking for a senior Nadaswaram & Thavil ensemble for family wedding.',
    status: 'Confirmed',
    createdAt: new Date('2026-10-26T14:15:00Z').toISOString()
  },
  {
    _id: 'enq_3',
    referenceId: 'KALAI-651290',
    customerName: 'Meera S',
    phone: '97890 45612',
    email: 'meera.s@outlook.com',
    eventType: 'Classical Dance',
    selectedEvent: 'Silambu Natyotsav',
    eventDate: '22 Nov 2026',
    venue: 'Raja Muthaiah Mandram, Madurai',
    performanceCount: '1 Performance (Full Ensemble)',
    message: 'Requesting availability and passes for 50 delegates attending from our cultural academy.',
    status: 'Contacted',
    createdAt: new Date('2026-10-25T11:45:00Z').toISOString()
  },
  {
    _id: 'enq_4',
    referenceId: 'KALAI-542198',
    customerName: 'Dr. R. Natarajan',
    phone: '94440 98765',
    email: 'dr.natarajan@gmail.com',
    eventType: 'Folk Dance',
    selectedEvent: 'Gramiya Thiruvizha',
    eventDate: '14 Jan 2027',
    venue: 'DakshinaChitra Grounds',
    performanceCount: 'Half-Day Cultural Showcase',
    message: 'Interested in booking Karakattam and Parai Isai troupes for community harvest celebration.',
    status: 'Pending',
    createdAt: new Date('2026-10-29T16:20:00Z').toISOString()
  }
];

const initialGallery = [
  {
    _id: 'gal_1',
    category: 'Literature',
    title: 'Sangam Tamil Iyal & Palm-Leaf Manuscripts',
    tamilTitle: 'இயல்: சங்கப் புலவர் & ஓலைச்சுவடி இலக்கிய மரபு',
    location: 'மதுரை தமிழ்ச் சங்க அரங்கம்',
    imageUrl: '/uploads/iyal_vintage.jpg',
    description: 'பழம்பெரும் தமிழ்ச் சங்க கால புலவர் ஓலைச்சுவடியில் எழுத்தாணி கொண்டு செம்மொழித் தமிழ் வரிகளை இயற்றும் அபூர்வ வரலாற்று காட்சி.',
    isPublished: true
  },
  {
    _id: 'gal_2',
    category: 'Music',
    title: 'Vintage Saraswathi Veena & Temple Concert',
    tamilTitle: 'இசை: பழங்கால சரஸ்வதி வீணை & கோவில் கச்சேரி',
    location: 'தஞ்சைப் பெருங்கோவில் நாட்டிய மண்டபம்',
    imageUrl: '/uploads/isai_vintage.jpg',
    description: 'குத்துவிளக்கின் மங்கல ஒளியில் மூத்த இசை மேதையின் சரஸ்வதி வீணை நாதமும், நாதஸ்வரம்-மிருதங்க சங்கமமும் இசைக்கும் ஆன்மீக இசை மாலை.',
    isPublished: true
  },
  {
    _id: 'gal_3',
    category: 'Drama',
    title: 'Historic Tamil Stage Drama & Royal Theatrics',
    tamilTitle: 'நாடகம்: வரலாற்று மேடை நாடகம் & மன்னர் வேடம்',
    location: 'முத்தமிழ்ப் பேரவை கலை அரங்கம், சென்னை',
    imageUrl: '/uploads/nadagam_vintage.jpg',
    description: 'பாரம்பரிய தங்க கிரீடம் அணிந்து உணர்ச்சி பொங்க வரலாற்று மன்னர் வேடத்தில் நடிக்கும் மூத்த தமிழ் நாடகக் கலைஞர்.',
    isPublished: true
  },
  {
    _id: 'gal_4',
    category: 'Bharatanatyam',
    title: 'Authentic Vintage Bharatanatyam Margam',
    tamilTitle: 'நாட்டியம்: பாரம்பரிய பரதநாட்டிய மார்க்கம்',
    location: 'கலாசேத்ரா நாட்டிய அரங்கம், சென்னை',
    imageUrl: '/uploads/bharatanatyam_vintage.jpg',
    description: 'செவ்வியல் பட்டு ஆடை, கெம்பு நகைகள் மற்றும் மல்லிகைப் பூ சூடி நடராஜர் சன்னதியில் மெய்ப்பாடுகளோடு ஆடும் செவ்வியல் நாட்டியம்.',
    isPublished: true
  },
  {
    _id: 'gal_5',
    category: 'Folk Dance',
    title: 'Heritage Karakattam & Mayilattam Ensemble',
    tamilTitle: 'கிராமியம்: மங்கல கரகாட்டம் & மயிலாட்டப் பெருவிழா',
    location: 'மதுரை சித்திரை திருவிழா மைதானம்',
    imageUrl: '/uploads/karakattam_vintage.jpg',
    description: 'தலையில் அலங்கரிக்கப்பட்ட பித்தளைக் கரகம் ஏந்தி, வண்ண மயிலிறகு ஆடைகளோடு தவில், பறை இசைக்கேற்ப ஆடும் தமிழ் கிராமியக் கலைகள்.',
    isPublished: true
  },
  {
    _id: 'gal_6',
    category: 'Muthamizh',
    title: 'Grand Tanjore Muthamizh Classical Jubilee',
    tamilTitle: 'முத்தமிழ்ச் சங்கமம்: இயல் இசை நாடகப் பெருவிழா',
    location: 'தஞ்சாவூர் அரண்மனை கலை அரங்கம்',
    imageUrl: '/uploads/iyal_isai_nadagam_hero.jpg',
    description: 'இயல், இசை, நாடகம் ஆகிய முத்தமிழின் முப்பெரும் கலைகளும் ஒரே மேடையில் சங்கமிக்கும் கம்பீரமான தஞ்சை வரலாற்று நிகழ்வு.',
    isPublished: true
  }
];

module.exports = {
  initialEvents,
  initialEnquiries,
  initialGallery
};
