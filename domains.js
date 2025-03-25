// List of domains to detect
const domainsList = [
  {
    "EspressoLab": [
      "https://espressolab.com.tr",
      "https://x.com/espressolabtr",
      "https://instagram.com/espressolabtr"
    ]
  },
  {
    "D&R": [
      "https://www.dr.com.tr",
      "https://x.com/DRdunyasi",
      "https://instagram.com/drdunyasi"
    ]
  },
  {
    "İdefix": [
      "https://www.idefix.com",
      "https://x.com/idefix",
      "https://instagram.com/idefixcom"
    ]
  },
  {
    "Demirören AVM": [
      "https://www.demiroren.com.tr",
      "https://x.com/demirorencity",
      "https://instagram.com/demirorencity"
    ]
  },
  {
    "Kilim Mobilya": [
      "https://www.kilimmobilya.com.tr",
      "https://x.com/kilimmobilya",
      "https://instagram.com/kilimmobilya"
    ]
  },
  {
    "Ülker": [
      "https://www.ulker.com.tr",
      "https://x.com/ulker",
      "https://instagram.com/ulker"
    ]
  },
  {
    "TRT": [
      "https://www.trt.net.tr",
      "https://x.com/trthaber",
      "https://instagram.com/trthaber"
    ]
  },
  {
    "CNN Türk": [
      "https://www.cnnturk.com",
      "https://x.com/cnnturk",
      "https://instagram.com/cnnturk"
    ]
  },
  {
    "Fanatik": [
      "https://www.fanatik.com.tr",
      "https://x.com/fanatikcomtr",
      "https://instagram.com/fanatikcomtr"
    ]
  },
  {
    "TGRT": [
      "https://www.tgrthaber.com.tr",
      "https://x.com/tgrthabertv",
      "https://instagram.com/tgrthabertv"
    ]
  },
  {
    "İhlas Ev Aletleri": [
      "https://www.arzum.com.tr",
      "https://x.com/arzumcomtr",
      "https://instagram.com/arzumcomtr"
    ]
  },
  {
    "Turkuaz Yayınevi": [
      "https://www.turkuazyayinevi.com",
      "https://x.com/turkuazyayinevi",
      "https://instagram.com/turkuazyayinevi"
    ]
  },
  {
    "Milli Piyango": [
      "https://www.millipiyangoonline.com",
      "https://x.com/MPiyangoOnline",
      "https://instagram.com/millipiyangoonline"
    ]
  },
  {
    "misli.com": [
      "https://www.misli.com",
      "https://x.com/mislicom",
      "https://instagram.com/mislicom"
    ]
  },
  {
    "iddia.com": [
      "https://www.iddaa.com",
      "https://x.com/iddaa",
      "https://instagram.com/iddaa"
    ]
  },
  {
    "ETS Tur": [
      "https://www.etstur.com",
      "https://x.com/etstur",
      "https://instagram.com/etstur"
    ]
  },
  {
    "DHA": [
      "https://www.dha.com.tr",
      "https://x.com/dha_com_tr",
      "https://instagram.com/dha_com_tr"
    ]
  },
  {
    "İHA": [
      "https://www.iha.com.tr",
      "https://x.com/ihacomtr",
      "https://instagram.com/ihacomtr"
    ]
  }
];

// Make the domains list available to other scripts
if (typeof module !== 'undefined') {
  module.exports = { domainsList };
} else {
  // For browser environment
  window.domainsList = domainsList;
}
