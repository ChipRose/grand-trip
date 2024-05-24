const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const destinations = [
  {
    "name": "Chamonix",
    "description": "Chamonix, middle-eastern paradise, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.39608709158100885",
        "description": "Chamonix park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7091163800891278",
        "description": "Chamonix kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8900894849363306",
        "description": "Chamonix kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.4536044626961575",
        "description": "Chamonix zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.3799764919322042",
        "description": "Chamonix park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.47951059362981696",
        "description": "Chamonix zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.4803212605247602",
        "description": "Chamonix city centre"
      }
    ]
  },
  {
    "name": "Geneva",
    "description": "Geneva, with crowded streets, with a beautiful old town, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.642651066085377",
        "description": "Geneva city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.11338552811025004",
        "description": "Geneva kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.08069475488695166",
        "description": "Geneva kindergarten"
      }
    ]
  },
  {
    "name": "Amsterdam",
    "description": "Amsterdam, is a beautiful city, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.13426814580606772",
        "description": "Amsterdam city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7079481568149795",
        "description": "Amsterdam street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.26776251310277277",
        "description": "Amsterdam street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9071467652760266",
        "description": "Amsterdam kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5805183532000018",
        "description": "Amsterdam embankment"
      }
    ]
  },
  {
    "name": "Helsinki",
    "description": "Helsinki, is a beautiful city, a true asian pearl, with crowded streets, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.7721237321134793",
        "description": "Helsinki park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.13098593008160875",
        "description": "Helsinki city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.4789729425328524",
        "description": "Helsinki street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9585131088887537",
        "description": "Helsinki central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6498375536173548",
        "description": "Helsinki biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6717040395509077",
        "description": "Helsinki embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.30319903586339714",
        "description": "Helsinki street market"
      }
    ]
  },
  {
    "name": "Oslo",
    "description": "Oslo, with a beautiful old town, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.5731119582203585",
        "description": "Oslo kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.28706947146996753",
        "description": "Oslo street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6058387629526676",
        "description": "Oslo zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8898799192509588",
        "description": "Oslo biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5248767826913572",
        "description": "Oslo kindergarten"
      }
    ]
  },
  {
    "name": "Kopenhagen",
    "description": "Kopenhagen, with a beautiful old town.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.6576996323790696",
        "description": "Kopenhagen park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7423822384804135",
        "description": "Kopenhagen embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.041540973817728144",
        "description": "Kopenhagen embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.10735671064791119",
        "description": "Kopenhagen kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.2011321415170757",
        "description": "Kopenhagen biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.1587423017044569",
        "description": "Kopenhagen central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.20001733032990576",
        "description": "Kopenhagen parliament building"
      }
    ]
  },
  {
    "name": "Den Haag",
    "description": "Den Haag, a true asian pearl, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.3889442649662722",
        "description": "Den Haag embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9465635740479006",
        "description": "Den Haag park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9244415065755742",
        "description": "Den Haag park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9854045643704379",
        "description": "Den Haag street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6642833236834909",
        "description": "Den Haag central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.1002281184191871",
        "description": "Den Haag street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.03651037630913723",
        "description": "Den Haag city centre"
      }
    ]
  },
  {
    "name": "Rotterdam",
    "description": "Rotterdam, with a beautiful old town, for those who value comfort and coziness.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.7784412985156237",
        "description": "Rotterdam street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.21920547891448572",
        "description": "Rotterdam street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8804748028488538",
        "description": "Rotterdam kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8526278351028072",
        "description": "Rotterdam biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9724851679294897",
        "description": "Rotterdam street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5878287639692048",
        "description": "Rotterdam embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6889126763106919",
        "description": "Rotterdam zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9242238547065424",
        "description": "Rotterdam street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6199064665661125",
        "description": "Rotterdam street market"
      }
    ]
  },
  {
    "name": "Saint Petersburg",
    "description": "Saint Petersburg, with crowded streets, middle-eastern paradise, for those who value comfort and coziness.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.8645144380726504",
        "description": "Saint Petersburg zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.1589776618269758",
        "description": "Saint Petersburg park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7693725128765254",
        "description": "Saint Petersburg city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.17463945080281218",
        "description": "Saint Petersburg zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.15561959001984005",
        "description": "Saint Petersburg zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7211055001872213",
        "description": "Saint Petersburg central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6064671273165407",
        "description": "Saint Petersburg parliament building"
      }
    ]
  },
  {
    "name": "Moscow",
    "description": "Moscow, with crowded streets, in a middle of Europe, a perfect place to stay with a family.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.05681866518473244",
        "description": "Moscow street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6288275264799017",
        "description": "Moscow central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.4507186647903654",
        "description": "Moscow street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.2905535825301486",
        "description": "Moscow zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6878632584341127",
        "description": "Moscow central station"
      }
    ]
  },
  {
    "name": "Sochi",
    "description": "Sochi, is a beautiful city, in a middle of Europe, middle-eastern paradise.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.7547219384268897",
        "description": "Sochi biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9882108875005617",
        "description": "Sochi central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.25299268773914685",
        "description": "Sochi biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5608176143680035",
        "description": "Sochi central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5728680881270094",
        "description": "Sochi central station"
      }
    ]
  },
  {
    "name": "Tokio",
    "description": "Tokio, a true asian pearl, with crowded streets, with a beautiful old town, for those who value comfort and coziness.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.022086991201238915",
        "description": "Tokio park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.4921257809702031",
        "description": "Tokio zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5310463013780988",
        "description": "Tokio city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.35029099686630927",
        "description": "Tokio city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9613744796770192",
        "description": "Tokio kindergarten"
      }
    ]
  },
  {
    "name": "Kioto",
    "description": "Kioto, is a beautiful city, with a beautiful old town.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.45356826904980707",
        "description": "Kioto zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.30950087461370046",
        "description": "Kioto park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.21958494380268734",
        "description": "Kioto park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6510449771799329",
        "description": "Kioto kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.14375127968220625",
        "description": "Kioto kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.05468520435213131",
        "description": "Kioto city centre"
      }
    ]
  },
  {
    "name": "Nagasaki",
    "description": "Nagasaki, a true asian pearl, with crowded streets, with a beautiful old town, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.2743792850772575",
        "description": "Nagasaki central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.032669331051435435",
        "description": "Nagasaki biggest supermarket"
      }
    ]
  },
  {
    "name": "Hiroshima",
    "description": "Hiroshima, with crowded streets, in a middle of Europe, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.14450471989208102",
        "description": "Hiroshima park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.38278660404600795",
        "description": "Hiroshima parliament building"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5227288626826054",
        "description": "Hiroshima zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.1667154333942693",
        "description": "Hiroshima kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.72791707650889",
        "description": "Hiroshima parliament building"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7067504381427532",
        "description": "Hiroshima embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5248816554824318",
        "description": "Hiroshima embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.11926491691037078",
        "description": "Hiroshima kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.08982867960605767",
        "description": "Hiroshima biggest supermarket"
      }
    ]
  },
  {
    "name": "Berlin",
    "description": "Berlin, with crowded streets, in a middle of Europe, with a beautiful old town, for those who value comfort and coziness, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.17110217771194614",
        "description": "Berlin city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5246506145759844",
        "description": "Berlin biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.012662580484326558",
        "description": "Berlin parliament building"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.4007175031621437",
        "description": "Berlin biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.20994921981356973",
        "description": "Berlin zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7795049316498668",
        "description": "Berlin city centre"
      }
    ]
  },
  {
    "name": "Munich",
    "description": "Munich, a perfect place to stay with a family.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.41659264038968735",
        "description": "Munich biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.019734337041155348",
        "description": "Munich central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.27076633240150305",
        "description": "Munich kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9397755963517651",
        "description": "Munich kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.24618868898472557",
        "description": "Munich central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9104005110590636",
        "description": "Munich kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8455452543387285",
        "description": "Munich parliament building"
      }
    ]
  },
  {
    "name": "Frankfurt",
    "description": "Frankfurt, for those who value comfort and coziness, a perfect place to stay with a family.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.9243188027483709",
        "description": "Frankfurt central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6155124594049839",
        "description": "Frankfurt embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.741055414807303",
        "description": "Frankfurt kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.4001937245319891",
        "description": "Frankfurt city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8506518246487442",
        "description": "Frankfurt park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7880584713069143",
        "description": "Frankfurt city centre"
      }
    ]
  },
  {
    "name": "Vien",
    "description": "Vien, a true asian pearl, full of of cozy canteens where you can try the best coffee in the Middle East.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.7476424549203682",
        "description": "Vien zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9973031277112567",
        "description": "Vien central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8263494730220677",
        "description": "Vien street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.955190778403415",
        "description": "Vien street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.723068760578772",
        "description": "Vien central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.4168306731847511",
        "description": "Vien street market"
      }
    ]
  },
  {
    "name": "Rome",
    "description": "Rome, in a middle of Europe, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.27204955158319244",
        "description": "Rome zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.619719043247646",
        "description": "Rome park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9262143445261108",
        "description": "Rome embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.08413109379856176",
        "description": "Rome park"
      }
    ]
  },
  {
    "name": "Naples",
    "description": "Naples, a true asian pearl, with a beautiful old town, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.9927490485433246",
        "description": "Naples city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6512060543970457",
        "description": "Naples city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.05552276369518072",
        "description": "Naples central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.33296365095134695",
        "description": "Naples street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.746157497463884",
        "description": "Naples embankment"
      }
    ]
  },
  {
    "name": "Venice",
    "description": "Venice, is a beautiful city, in a middle of Europe, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.2100878134423365",
        "description": "Venice zoo"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9956508154363823",
        "description": "Venice city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7441217043184007",
        "description": "Venice central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9740374760420973",
        "description": "Venice street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8109587632735002",
        "description": "Venice biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6938803919521086",
        "description": "Venice city centre"
      }
    ]
  },
  {
    "name": "Milan",
    "description": "Milan, middle-eastern paradise, for those who value comfort and coziness.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.7220021840174344",
        "description": "Milan central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6322864018783656",
        "description": "Milan embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8662581703124816",
        "description": "Milan park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7692987463298679",
        "description": "Milan biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.011321446077156683",
        "description": "Milan city centre"
      }
    ]
  },
  {
    "name": "Monaco",
    "description": "Monaco, a true asian pearl, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.35969488512501413",
        "description": "Monaco biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.30445420494703535",
        "description": "Monaco park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.07383026544168936",
        "description": "Monaco biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.19493124280393292",
        "description": "Monaco embankment"
      }
    ]
  },
  {
    "name": "Paris",
    "description": "Paris, with crowded streets, with a beautiful old town, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.32689024787997023",
        "description": "Paris street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.20031550737348036",
        "description": "Paris street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5292822832833808",
        "description": "Paris central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.10513609513960276",
        "description": "Paris park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.03191669135257391",
        "description": "Paris street market"
      }
    ]
  },
  {
    "name": "Barcelona",
    "description": "Barcelona, is a beautiful city.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.7439230766988782",
        "description": "Barcelona street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.42617831287277586",
        "description": "Barcelona city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.32128708205807666",
        "description": "Barcelona parliament building"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8504855509399531",
        "description": "Barcelona embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.6408852656166053",
        "description": "Barcelona kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8484306270804252",
        "description": "Barcelona city centre"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.21594536296919986",
        "description": "Barcelona park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.4408653700762948",
        "description": "Barcelona park"
      }
    ]
  },
  {
    "name": "Valencia",
    "description": "Valencia, is a beautiful city, with crowded streets, middle-eastern paradise, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.27523564947699763",
        "description": "Valencia parliament building"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5656218225923912",
        "description": "Valencia biggest supermarket"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.2957716205124368",
        "description": "Valencia kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.8059929721038717",
        "description": "Valencia park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.9315547194592733",
        "description": "Valencia embankment"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.7563875183265947",
        "description": "Valencia kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5972076386875818",
        "description": "Valencia city centre"
      }
    ]
  },
  {
    "name": "Madrid",
    "description": "Madrid, with crowded streets, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.",
    "pictures": [
      {
        "src": "http://picsum.photos/300/200?r=0.2110871494629396",
        "description": "Madrid central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.3964509591858707",
        "description": "Madrid street market"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.2212679883391353",
        "description": "Madrid central station"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.49499327470464416",
        "description": "Madrid kindergarten"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.3356307195139865",
        "description": "Madrid park"
      },
      {
        "src": "http://picsum.photos/300/200?r=0.5233473364822321",
        "description": "Madrid park"
      }
    ]
  }
]

const offersByType = [
  {
    "type": "taxi",
    "offers": [
      {
        "id": 1,
        "title": "Upgrade to a business class",
        "price": 190
      },
      {
        "id": 2,
        "title": "Choose the radio station",
        "price": 30
      },
      {
        "id": 3,
        "title": "Choose temperature",
        "price": 170
      },
      {
        "id": 4,
        "title": "Drive quickly, I'm in a hurry",
        "price": 100
      },
      {
        "id": 5,
        "title": "Drive slowly",
        "price": 110
      }
    ]
  },
  {
    "type": "bus",
    "offers": [
      {
        "id": 1,
        "title": "Infotainment system",
        "price": 50
      },
      {
        "id": 2,
        "title": "Order meal",
        "price": 100
      },
      {
        "id": 3,
        "title": "Choose seats",
        "price": 190
      }
    ]
  },
  {
    "type": "train",
    "offers": [
      {
        "id": 1,
        "title": "Book a taxi at the arrival point",
        "price": 110
      },
      {
        "id": 2,
        "title": "Order a breakfast",
        "price": 80
      },
      {
        "id": 3,
        "title": "Wake up at a certain time",
        "price": 140
      }
    ]
  },
  {
    "type": "flight",
    "offers": [
      {
        "id": 1,
        "title": "Choose meal",
        "price": 120
      },
      {
        "id": 2,
        "title": "Choose seats",
        "price": 90
      },
      {
        "id": 3,
        "title": "Upgrade to comfort class",
        "price": 120
      },
      {
        "id": 4,
        "title": "Upgrade to business class",
        "price": 120
      },
      {
        "id": 5,
        "title": "Add luggage",
        "price": 170
      },
      {
        "id": 6,
        "title": "Business lounge",
        "price": 160
      }
    ]
  },
  {
    "type": "check-in",
    "offers": [
      {
        "id": 1,
        "title": "Choose the time of check-in",
        "price": 70
      },
      {
        "id": 2,
        "title": "Choose the time of check-out",
        "price": 190
      },
      {
        "id": 3,
        "title": "Add breakfast",
        "price": 110
      },
      {
        "id": 4,
        "title": "Laundry",
        "price": 140
      },
      {
        "id": 5,
        "title": "Order a meal from the restaurant",
        "price": 30
      }
    ]
  },
  {
    "type": "sightseeing",
    "offers": []
  },
  {
    "type": "ship",
    "offers": [
      {
        "id": 1,
        "title": "Choose meal",
        "price": 130
      },
      {
        "id": 2,
        "title": "Choose seats",
        "price": 160
      },
      {
        "id": 3,
        "title": "Upgrade to comfort class",
        "price": 170
      },
      {
        "id": 4,
        "title": "Upgrade to business class",
        "price": 150
      },
      {
        "id": 5,
        "title": "Add luggage",
        "price": 100
      },
      {
        "id": 6,
        "title": "Business lounge",
        "price": 40
      }
    ]
  },
  {
    "type": "drive",
    "offers": [
      {
        "id": 1,
        "title": "With automatic transmission",
        "price": 110
      },
      {
        "id": 2,
        "title": "With air conditioning",
        "price": 180
      }
    ]
  },
  {
    "type": "restaurant",
    "offers": [
      {
        "id": 1,
        "title": "Choose live music",
        "price": 150
      },
      {
        "id": 2,
        "title": "Choose VIP area",
        "price": 70
      }
    ]
  }
];

export const getOffersByType = (offerType) => (offersByType.find(({ type }) => type === offerType).offers);

export const getPointGeneralInfo = (type) => {
  return ({
    types,
    destinations,
    offersAvailable: getOffersByType(type),
  })
}

export const getDestination = (name) => {

  const destination = destinations.find((item) => item.name === name);

  if (!destination) {
    return
  }

  return ({
    destination
  });
}
