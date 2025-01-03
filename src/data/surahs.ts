import { Surah, Verse } from '../types';

function splitVerses(arabic: string, tr: string, en: string): Verse[] {
  const arabicVerses = arabic.split('﴾').map(v => v.split('﴿')[0].trim()).filter(Boolean);
  const trVerses = tr.split('.').map(v => v.trim()).filter(Boolean);
  const enVerses = en.split('.').map(v => v.trim()).filter(Boolean);

  return arabicVerses.map((ar, index) => ({
    ar,
    tr: trVerses[index] || '',
    en: enVerses[index] || ''
  }));
}

export const surahs: Surah[] = [
  {
    id: 1,
    name: {
      ar: 'الفَاتِحَة',
      en: 'Al-Fatihah',
      tr: 'Fatiha'
    },
    verses: splitVerses(
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾',
      'Rahman ve Rahim olan Allah\'ın adıyla. Hamd, Alemlerin Rabbi Allah\'a mahsustur. O, Rahman ve Rahim\'dir. Din gününün sahibidir. (Allah\'ım!) Yalnız sana ibadet eder ve yalnız senden yardım dileriz. Bizi doğru yola, kendilerine nimet verdiklerinin yoluna ilet; gazaba uğrayanların ve sapıtmışların yoluna değil.',
      'In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds. The Entirely Merciful, the Especially Merciful. Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.'
    )
  },
  {
    id: 106,
    name: {
      ar: 'قُرَيْش',
      en: 'Quraysh',
      tr: 'Kureyş'
    },
    verses: splitVerses(
      'لِإِيلَافِ قُرَيْشٍ ﴿١﴾ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ ﴿٢﴾ فَلْيَعْبُدُوا رَبَّ هَٰذَا الْبَيْتِ ﴿٣﴾ الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ ﴿٤﴾',
      'Kureyş\'i ısındırıp alıştırdığı; onları kışın (Yemen\'e) ve yazın (Şam\'a) yaptıkları yolculuğa ısındırıp alıştırdığı için, Kureyş de, kendilerini besleyip açlıklarını gideren ve onları korkudan emin kılan bu evin (Kâbe\'nin) Rabbine kulluk etsin.',
      'For the accustomed security of the Quraysh. Their accustomed security [in] the caravan of winter and summer. Let them worship the Lord of this House. Who has fed them, [saving them] from hunger and made them safe, [saving them] from fear.'
    )
  },
  {
    id: 107,
    name: {
      ar: 'المَاعُون',
      en: 'Al-Ma\'un',
      tr: 'Maun'
    },
    verses: splitVerses(
      'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ ﴿١﴾ فَذَٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ ﴿٢﴾ وَلَا يَحُضُّ عَلَىٰ طَعَامِ الْمِسْكِينِ ﴿٣﴾ فَوَيْلٌ لِّلْمُصَلِّينَ ﴿٤﴾ الَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ ﴿٥﴾ الَّذِينَ هُمْ يُرَاءُونَ ﴿٦﴾ وَيَمْنَعُونَ الْمَاعُونَ ﴿٧﴾',
      'Dini yalanlayanı gördün mü? İşte o, yetimi itip kakar, yoksulu doyurmaya teşvik etmez. Yazıklar olsun o namaz kılanlara ki, onlar namazlarını ciddiye almazlar. Onlar gösteriş yaparlar. Ve en ufak bir yardıma bile engel olurlar.',
      'Have you seen the one who denies the Recompense? For that is the one who drives away the orphan. And does not encourage the feeding of the poor. So woe to those who pray. [But] who are heedless of their prayer. Those who make show [of their deeds]. And withhold [simple] assistance.'
    )
  },
  {
    id: 108,
    name: {
      ar: 'الكَوْثَر',
      en: 'Al-Kawthar',
      tr: 'Kevser'
    },
    verses: splitVerses(
      'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ﴿١﴾ فَصَلِّ لِرَبِّكَ وَانْحَرْ ﴿٢﴾ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ ﴿٣﴾',
      'Şüphesiz biz sana Kevser\'i verdik. O halde Rabbin için namaz kıl ve kurban kes. Doğrusu sana buğzeden, soyu kesik olanın ta kendisidir.',
      'Indeed, We have granted you, [O Muhammad], al-Kawthar. So pray to your Lord and sacrifice [to Him alone]. Indeed, your enemy is the one cut off.'
    )
  },
  {
    id: 109,
    name: {
      ar: 'الكَافِرُون',
      en: 'Al-Kafirun',
      tr: 'Kafirun'
    },
    verses: splitVerses(
      'قُلْ يَا أَيُّهَا الْكَافِرُونَ ﴿١﴾ لَا أَعْبُدُ مَا تَعْبُدُونَ ﴿٢﴾ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ﴿٣﴾ وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ ﴿٤﴾ وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ ﴿٥﴾ لَكُمْ دِينُكُمْ وَلِيَ دِينِ ﴿٦﴾',
      'De ki: "Ey kâfirler! Ben sizin kulluk ettiklerinize kulluk etmem. Siz de benim kulluk ettiğime kulluk edecek değilsiniz. Ben sizin kulluk ettiklerinize kulluk edecek değilim. Siz de benim kulluk ettiğime kulluk edecek değilsiniz. Sizin dininiz size, benim dinim de banadır."',
      'Say, "O disbelievers, I do not worship what you worship. Nor are you worshippers of what I worship. Nor will I be a worshipper of what you worship. Nor will you be worshippers of what I worship. For you is your religion, and for me is my religion."'
    )
  },
  {
    id: 110,
    name: {
      ar: 'النَّصْر',
      en: 'An-Nasr',
      tr: 'Nasr'
    },
    verses: splitVerses(
      'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ﴿١﴾ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا ﴿٢﴾ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا ﴿٣﴾',
      'Allah\'ın yardımı ve fetih (Mekke fethi) geldiğinde ve insanların Allah\'ın dinine dalga dalga girdiklerini gördüğünde, Rabbine hamd ederek tespihte bulun ve O\'ndan bağışlama dile. Çünkü O tövbeleri çok kabul edendir.',
      'When the victory of Allah has come and the conquest, And you see the people entering into the religion of Allah in multitudes, Then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.'
    )
  },
  {
    id: 111,
    name: {
      ar: 'المَسَد',
      en: 'Al-Masad',
      tr: 'Tebbet'
    },
    verses: splitVerses(
      'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ﴿١﴾ مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ ﴿٢﴾ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ ﴿٣﴾ وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ ﴿٤﴾ فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ ﴿٥﴾',
      'Ebû Leheb\'in iki eli kurusun! Kurudu da. Malı ve kazandıkları ona fayda vermedi. Alevli bir ateşte yanacak. Karısı da, boynunda hurma lifinden bir ip olduğu halde odun taşıyıcı olarak (ateşe girecek).',
      'May the hands of Abu Lahab be ruined, and ruined is he. His wealth will not avail him or that which he gained. He will [enter to] burn in a Fire of [blazing] flame. And his wife [as well] - the carrier of firewood. Around her neck is a rope of [twisted] fiber.'
    )
  },
  {
    id: 112,
    name: {
      ar: 'الإخْلَاص',
      en: 'Al-Ikhlas',
      tr: 'İhlas'
    },
    verses: splitVerses(
      'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾',
      'De ki: "O, Allah\'tır, bir tektir. Allah Samed\'dir. (Her şey O\'na muhtaçtır, o, hiçbir şeye muhtaç değildir.) O\'ndan çocuk olmamıştır (Kimsenin babası değildir). Kendisi de doğmamıştır (kimsenin çocuğu değildir). Hiçbir şey O\'na denk ve benzer değildir."',
      'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent."'
    )
  },
  {
    id: 113,
    name: {
      ar: 'الفَلَق',
      en: 'Al-Falaq',
      tr: 'Felak'
    },
    verses: splitVerses(
      'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾',
      'De ki: "Yarattığı şeylerin kötülüğünden, karanlığı çöktüğü zaman gecenin kötülüğünden, düğümlere üfleyenlerin kötülüğünden, haset ettiği zaman hasetçinin kötülüğünden, sabah aydınlığının Rabbine sığınırım."',
      'Say, "I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies."'
    )
  },
  {
    id: 114,
    name: {
      ar: 'النَّاس',
      en: 'An-Nas',
      tr: 'Nas'
    },
    verses: splitVerses(
      'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾',
      'De ki: "İnsanların Rabbine, insanların Melikine, insanların İlahına sığınırım. İnsanların göğüslerine vesvese veren, (Allah\'ın adı anıldığında) sinip gizlenen vesvesecinin şerrinden. O ki, insanların ve cinlerin içinden (vesvese verir)."',
      'Say, "I seek refuge in the Lord of mankind, The Sovereign of mankind, The God of mankind, From the evil of the retreating whisperer - Who whispers [evil] into the breasts of mankind - From among the jinn and mankind."'
    )
  }
];