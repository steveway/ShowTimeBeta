module.exports =
  [
  { 
    "type": "heading", 
    "defaultValue": "<center>ShowTime</center>" 
  }, 
  {
    "type": "section",
    "items": [
      {
        "type": "input",
        "messageKey": "twitch",
        "defaultValue": "ffstv",
        "label": "Twitch",
        "attributes": {
          "placeholder": "ffstv",
          "type": "text"
        }
      },
      {
        "type": "toggle",
        "messageKey": "subscribe",
        "label": "Subscribe",
        "defaultValue": false,
        "capabilities": ["NOT_PLATFORM_APLITE"]
      },

      {
        "type": "select",
        "messageKey": "timezone2",
        "defaultValue": "Canada Pacific",
        "label": "Timezones",
        "options":[
          {
            "value": "Africa Abidjan",
            "label": "Africa/Abidjan"
          },
          {
            "value": "Africa Accra",
            "label": "Africa/Accra"
          },
          {
            "value": "Africa Addis_Ababa",
            "label": "Africa/Addis_Ababa"
          },
          {
            "value": "Africa Algiers",
            "label": "Africa/Algiers"
          },
          {
            "value": "Africa Asmara",
            "label": "Africa/Asmara"
          },
          {
            "value": "Africa Bamako",
            "label": "Africa/Bamako"
          },
          {
            "value": "Africa Bangui",
            "label": "Africa/Bangui"
          },
          {
            "value": "Africa Banjul",
            "label": "Africa/Banjul"
          },
          {
            "value": "Africa Bissau",
            "label": "Africa/Bissau"
          },
          {
            "value": "Africa Blantyre",
            "label": "Africa/Blantyre"
          },
          {
            "value": "Africa Brazzaville",
            "label": "Africa/Brazzaville"
          },
          {
            "value": "Africa Bujumbura",
            "label": "Africa/Bujumbura"
          },
          {
            "value": "Africa Cairo",
            "label": "Africa/Cairo"
          },
          {
            "value": "Africa Casablanca",
            "label": "Africa/Casablanca"
          },
          {
            "value": "Africa Ceuta",
            "label": "Africa/Ceuta"
          },
          {
            "value": "Africa Conakry",
            "label": "Africa/Conakry"
          },
          {
            "value": "Africa Dakar",
            "label": "Africa/Dakar"
          },
          {
            "value": "Africa Dar_es_Salaam",
            "label": "Africa/Dar_es_Salaam"
          },
          {
            "value": "Africa Djibouti",
            "label": "Africa/Djibouti"
          },
          {
            "value": "Africa Douala",
            "label": "Africa/Douala"
          },
          {
            "value": "Africa El_Aaiun",
            "label": "Africa/El_Aaiun"
          },
          {
            "value": "Africa Freetown",
            "label": "Africa/Freetown"
          },
          {
            "value": "Africa Gaborone",
            "label": "Africa/Gaborone"
          },
          {
            "value": "Africa Harare",
            "label": "Africa/Harare"
          },
          {
            "value": "Africa Johannesburg",
            "label": "Africa/Johannesburg"
          },
          {
            "value": "Africa Juba",
            "label": "Africa/Juba"
          },
          {
            "value": "Africa Kampala",
            "label": "Africa/Kampala"
          },
          {
            "value": "Africa Khartoum",
            "label": "Africa/Khartoum"
          },
          {
            "value": "Africa Kigali",
            "label": "Africa/Kigali"
          },
          {
            "value": "Africa Kinshasa",
            "label": "Africa/Kinshasa"
          },
          {
            "value": "Africa Lagos",
            "label": "Africa/Lagos"
          },
          {
            "value": "Africa Libreville",
            "label": "Africa/Libreville"
          },
          {
            "value": "Africa Lome",
            "label": "Africa/Lome"
          },
          {
            "value": "Africa Luanda",
            "label": "Africa/Luanda"
          },
          {
            "value": "Africa Lubumbashi",
            "label": "Africa/Lubumbashi"
          },
          {
            "value": "Africa Lusaka",
            "label": "Africa/Lusaka"
          },
          {
            "value": "Africa Malabo",
            "label": "Africa/Malabo"
          },
          {
            "value": "Africa Maputo",
            "label": "Africa/Maputo"
          },
          {
            "value": "Africa Maseru",
            "label": "Africa/Maseru"
          },
          {
            "value": "Africa Mbabane",
            "label": "Africa/Mbabane"
          },
          {
            "value": "Africa Mogadishu",
            "label": "Africa/Mogadishu"
          },
          {
            "value": "Africa Monrovia",
            "label": "Africa/Monrovia"
          },
          {
            "value": "Africa Nairobi",
            "label": "Africa/Nairobi"
          },
          {
            "value": "Africa Ndjamena",
            "label": "Africa/Ndjamena"
          },
          {
            "value": "Africa Niamey",
            "label": "Africa/Niamey"
          },
          {
            "value": "Africa Nouakchott",
            "label": "Africa/Nouakchott"
          },
          {
            "value": "Africa Ouagadougou",
            "label": "Africa/Ouagadougou"
          },
          {
            "value": "Africa Porto-Novo",
            "label": "Africa/Porto-Novo"
          },
          {
            "value": "Africa Sao_Tome",
            "label": "Africa/Sao_Tome"
          },
          {
            "value": "Africa Tripoli",
            "label": "Africa/Tripoli"
          },
          {
            "value": "Africa Tunis",
            "label": "Africa/Tunis"
          },
          {
            "value": "Africa Windhoek",
            "label": "Africa/Windhoek"
          },
          {
            "value": "America Adak",
            "label": "America/Adak"
          },
          {
            "value": "America Anchorage",
            "label": "America/Anchorage"
          },
          {
            "value": "America Anguilla",
            "label": "America/Anguilla"
          },
          {
            "value": "America Antigua",
            "label": "America/Antigua"
          },
          {
            "value": "America Araguaina",
            "label": "America/Araguaina"
          },
          {
            "value": "America Argentina Buenos_Aires",
            "label": "America/Argentina/Buenos_Aires"
          },
          {
            "value": "America Argentina Catamarca",
            "label": "America/Argentina/Catamarca"
          },
          {
            "value": "America Argentina Cordoba",
            "label": "America/Argentina/Cordoba"
          },
          {
            "value": "America Argentina Jujuy",
            "label": "America/Argentina/Jujuy"
          },
          {
            "value": "America Argentina La_Rioja",
            "label": "America/Argentina/La_Rioja"
          },
          {
            "value": "America Argentina Mendoza",
            "label": "America/Argentina/Mendoza"
          },
          {
            "value": "America Argentina Rio_Gallegos",
            "label": "America/Argentina/Rio_Gallegos"
          },
          {
            "value": "America Argentina Salta",
            "label": "America/Argentina/Salta"
          },
          {
            "value": "America Argentina San_Juan",
            "label": "America/Argentina/San_Juan"
          },
          {
            "value": "America Argentina San_Luis",
            "label": "America/Argentina/San_Luis"
          },
          {
            "value": "America Argentina Tucuman",
            "label": "America/Argentina/Tucuman"
          },
          {
            "value": "America Argentina Ushuaia",
            "label": "America/Argentina/Ushuaia"
          },
          {
            "value": "America Aruba",
            "label": "America/Aruba"
          },
          {
            "value": "America Asuncion",
            "label": "America/Asuncion"
          },
          {
            "value": "America Atikokan",
            "label": "America/Atikokan"
          },
          {
            "value": "America Bahia",
            "label": "America/Bahia"
          },
          {
            "value": "America Bahia_Banderas",
            "label": "America/Bahia_Banderas"
          },
          {
            "value": "America Barbados",
            "label": "America/Barbados"
          },
          {
            "value": "America Belem",
            "label": "America/Belem"
          },
          {
            "value": "America Belize",
            "label": "America/Belize"
          },
          {
            "value": "America Blanc-Sablon",
            "label": "America/Blanc-Sablon"
          },
          {
            "value": "America Boa_Vista",
            "label": "America/Boa_Vista"
          },
          {
            "value": "America Bogota",
            "label": "America/Bogota"
          },
          {
            "value": "America Boise",
            "label": "America/Boise"
          },
          {
            "value": "America Cambridge_Bay",
            "label": "America/Cambridge_Bay"
          },
          {
            "value": "America Campo_Grande",
            "label": "America/Campo_Grande"
          },
          {
            "value": "America Cancun",
            "label": "America/Cancun"
          },
          {
            "value": "America Caracas",
            "label": "America/Caracas"
          },
          {
            "value": "America Cayenne",
            "label": "America/Cayenne"
          },
          {
            "value": "America Cayman",
            "label": "America/Cayman"
          },
          {
            "value": "America Chicago",
            "label": "America/Chicago"
          },
          {
            "value": "America Chihuahua",
            "label": "America/Chihuahua"
          },
          {
            "value": "America Costa_Rica",
            "label": "America/Costa_Rica"
          },
          {
            "value": "America Creston",
            "label": "America/Creston"
          },
          {
            "value": "America Cuiaba",
            "label": "America/Cuiaba"
          },
          {
            "value": "America Curacao",
            "label": "America/Curacao"
          },
          {
            "value": "America Danmarkshavn",
            "label": "America/Danmarkshavn"
          },
          {
            "value": "America Dawson",
            "label": "America/Dawson"
          },
          {
            "value": "America Dawson_Creek",
            "label": "America/Dawson_Creek"
          },
          {
            "value": "America Denver",
            "label": "America/Denver"
          },
          {
            "value": "America Detroit",
            "label": "America/Detroit"
          },
          {
            "value": "America Dominica",
            "label": "America/Dominica"
          },
          {
            "value": "America Edmonton",
            "label": "America/Edmonton"
          },
          {
            "value": "America Eirunepe",
            "label": "America/Eirunepe"
          },
          {
            "value": "America El_Salvador",
            "label": "America/El_Salvador"
          },
          {
            "value": "America Fortaleza",
            "label": "America/Fortaleza"
          },
          {
            "value": "America Glace_Bay",
            "label": "America/Glace_Bay"
          },
          {
            "value": "America Godthab",
            "label": "America/Godthab"
          },
          {
            "value": "America Goose_Bay",
            "label": "America/Goose_Bay"
          },
          {
            "value": "America Grand_Turk",
            "label": "America/Grand_Turk"
          },
          {
            "value": "America Grenada",
            "label": "America/Grenada"
          },
          {
            "value": "America Guadeloupe",
            "label": "America/Guadeloupe"
          },
          {
            "value": "America Guatemala",
            "label": "America/Guatemala"
          },
          {
            "value": "America Guayaquil",
            "label": "America/Guayaquil"
          },
          {
            "value": "America Guyana",
            "label": "America/Guyana"
          },
          {
            "value": "America Halifax",
            "label": "America/Halifax"
          },
          {
            "value": "America Havana",
            "label": "America/Havana"
          },
          {
            "value": "America Hermosillo",
            "label": "America/Hermosillo"
          },
          {
            "value": "America Indiana Indianapolis",
            "label": "America/Indiana/Indianapolis"
          },
          {
            "value": "America Indiana Knox",
            "label": "America/Indiana/Knox"
          },
          {
            "value": "America Indiana Marengo",
            "label": "America/Indiana/Marengo"
          },
          {
            "value": "America Indiana Petersburg",
            "label": "America/Indiana/Petersburg"
          },
          {
            "value": "America Indiana Tell_City",
            "label": "America/Indiana/Tell_City"
          },
          {
            "value": "America Indiana Vevay",
            "label": "America/Indiana/Vevay"
          },
          {
            "value": "America Indiana Vincennes",
            "label": "America/Indiana/Vincennes"
          },
          {
            "value": "America Indiana Winamac",
            "label": "America/Indiana/Winamac"
          },
          {
            "value": "America Inuvik",
            "label": "America/Inuvik"
          },
          {
            "value": "America Iqaluit",
            "label": "America/Iqaluit"
          },
          {
            "value": "America Jamaica",
            "label": "America/Jamaica"
          },
          {
            "value": "America Juneau",
            "label": "America/Juneau"
          },
          {
            "value": "America Kentucky Louisville",
            "label": "America/Kentucky/Louisville"
          },
          {
            "value": "America Kentucky Monticello",
            "label": "America/Kentucky/Monticello"
          },
          {
            "value": "America Kralendijk",
            "label": "America/Kralendijk"
          },
          {
            "value": "America La_Paz",
            "label": "America/La_Paz"
          },
          {
            "value": "America Lima",
            "label": "America/Lima"
          },
          {
            "value": "America Los_Angeles",
            "label": "America/Los_Angeles"
          },
          {
            "value": "America Lower_Princes",
            "label": "America/Lower_Princes"
          },
          {
            "value": "America Maceio",
            "label": "America/Maceio"
          },
          {
            "value": "America Managua",
            "label": "America/Managua"
          },
          {
            "value": "America Manaus",
            "label": "America/Manaus"
          },
          {
            "value": "America Marigot",
            "label": "America/Marigot"
          },
          {
            "value": "America Martinique",
            "label": "America/Martinique"
          },
          {
            "value": "America Matamoros",
            "label": "America/Matamoros"
          },
          {
            "value": "America Mazatlan",
            "label": "America/Mazatlan"
          },
          {
            "value": "America Menominee",
            "label": "America/Menominee"
          },
          {
            "value": "America Merida",
            "label": "America/Merida"
          },
          {
            "value": "America Metlakatla",
            "label": "America/Metlakatla"
          },
          {
            "value": "America Mexico_City",
            "label": "America/Mexico_City"
          },
          {
            "value": "America Miquelon",
            "label": "America/Miquelon"
          },
          {
            "value": "America Moncton",
            "label": "America/Moncton"
          },
          {
            "value": "America Monterrey",
            "label": "America/Monterrey"
          },
          {
            "value": "America Montevideo",
            "label": "America/Montevideo"
          },
          {
            "value": "America Montreal",
            "label": "America/Montreal"
          },
          {
            "value": "America Montserrat",
            "label": "America/Montserrat"
          },
          {
            "value": "America Nassau",
            "label": "America/Nassau"
          },
          {
            "value": "America New_York",
            "label": "America/New_York"
          },
          {
            "value": "America Nipigon",
            "label": "America/Nipigon"
          },
          {
            "value": "America Nome",
            "label": "America/Nome"
          },
          {
            "value": "America Noronha",
            "label": "America/Noronha"
          },
          {
            "value": "America North_Dakota Beulah",
            "label": "America/North_Dakota/Beulah"
          },
          {
            "value": "America North_Dakota Center",
            "label": "America/North_Dakota/Center"
          },
          {
            "value": "America North_Dakota New_Salem",
            "label": "America/North_Dakota/New_Salem"
          },
          {
            "value": "America Ojinaga",
            "label": "America/Ojinaga"
          },
          {
            "value": "America Panama",
            "label": "America/Panama"
          },
          {
            "value": "America Pangnirtung",
            "label": "America/Pangnirtung"
          },
          {
            "value": "America Paramaribo",
            "label": "America/Paramaribo"
          },
          {
            "value": "America Phoenix",
            "label": "America/Phoenix"
          },
          {
            "value": "America Port-au-Prince",
            "label": "America/Port-au-Prince"
          },
          {
            "value": "America Port_of_Spain",
            "label": "America/Port_of_Spain"
          },
          {
            "value": "America Porto_Velho",
            "label": "America/Porto_Velho"
          },
          {
            "value": "America Puerto_Rico",
            "label": "America/Puerto_Rico"
          },
          {
            "value": "America Rainy_River",
            "label": "America/Rainy_River"
          },
          {
            "value": "America Rankin_Inlet",
            "label": "America/Rankin_Inlet"
          },
          {
            "value": "America Recife",
            "label": "America/Recife"
          },
          {
            "value": "America Regina",
            "label": "America/Regina"
          },
          {
            "value": "America Resolute",
            "label": "America/Resolute"
          },
          {
            "value": "America Rio_Branco",
            "label": "America/Rio_Branco"
          },
          {
            "value": "America Santa_Isabel",
            "label": "America/Santa_Isabel"
          },
          {
            "value": "America Santarem",
            "label": "America/Santarem"
          },
          {
            "value": "America Santiago",
            "label": "America/Santiago"
          },
          {
            "value": "America Santo_Domingo",
            "label": "America/Santo_Domingo"
          },
          {
            "value": "America Sao_Paulo",
            "label": "America/Sao_Paulo"
          },
          {
            "value": "America Scoresbysund",
            "label": "America/Scoresbysund"
          },
          {
            "value": "America Sitka",
            "label": "America/Sitka"
          },
          {
            "value": "America St_Barthelemy",
            "label": "America/St_Barthelemy"
          },
          {
            "value": "America St_Johns",
            "label": "America/St_Johns"
          },
          {
            "value": "America St_Kitts",
            "label": "America/St_Kitts"
          },
          {
            "value": "America St_Lucia",
            "label": "America/St_Lucia"
          },
          {
            "value": "America St_Thomas",
            "label": "America/St_Thomas"
          },
          {
            "value": "America St_Vincent",
            "label": "America/St_Vincent"
          },
          {
            "value": "America Swift_Current",
            "label": "America/Swift_Current"
          },
          {
            "value": "America Tegucigalpa",
            "label": "America/Tegucigalpa"
          },
          {
            "value": "America Thule",
            "label": "America/Thule"
          },
          {
            "value": "America Thunder_Bay",
            "label": "America/Thunder_Bay"
          },
          {
            "value": "America Tijuana",
            "label": "America/Tijuana"
          },
          {
            "value": "America Toronto",
            "label": "America/Toronto"
          },
          {
            "value": "America Tortola",
            "label": "America/Tortola"
          },
          {
            "value": "America Vancouver",
            "label": "America/Vancouver"
          },
          {
            "value": "America Whitehorse",
            "label": "America/Whitehorse"
          },
          {
            "value": "America Winnipeg",
            "label": "America/Winnipeg"
          },
          {
            "value": "America Yakutat",
            "label": "America/Yakutat"
          },
          {
            "value": "America Yellowknife",
            "label": "America/Yellowknife"
          },
          {
            "value": "Antarctica Casey",
            "label": "Antarctica/Casey"
          },
          {
            "value": "Antarctica Davis",
            "label": "Antarctica/Davis"
          },
          {
            "value": "Antarctica DumontDUrville",
            "label": "Antarctica/DumontDUrville"
          },
          {
            "value": "Antarctica Macquarie",
            "label": "Antarctica/Macquarie"
          },
          {
            "value": "Antarctica Mawson",
            "label": "Antarctica/Mawson"
          },
          {
            "value": "Antarctica McMurdo",
            "label": "Antarctica/McMurdo"
          },
          {
            "value": "Antarctica Palmer",
            "label": "Antarctica/Palmer"
          },
          {
            "value": "Antarctica Rothera",
            "label": "Antarctica/Rothera"
          },
          {
            "value": "Antarctica Syowa",
            "label": "Antarctica/Syowa"
          },
          {
            "value": "Antarctica Troll",
            "label": "Antarctica/Troll"
          },
          {
            "value": "Antarctica Vostok",
            "label": "Antarctica/Vostok"
          },
          {
            "value": "Arctic Longyearbyen",
            "label": "Arctic/Longyearbyen"
          },
          {
            "value": "Asia Aden",
            "label": "Asia/Aden"
          },
          {
            "value": "Asia Almaty",
            "label": "Asia/Almaty"
          },
          {
            "value": "Asia Amman",
            "label": "Asia/Amman"
          },
          {
            "value": "Asia Anadyr",
            "label": "Asia/Anadyr"
          },
          {
            "value": "Asia Aqtau",
            "label": "Asia/Aqtau"
          },
          {
            "value": "Asia Aqtobe",
            "label": "Asia/Aqtobe"
          },
          {
            "value": "Asia Ashgabat",
            "label": "Asia/Ashgabat"
          },
          {
            "value": "Asia Baghdad",
            "label": "Asia/Baghdad"
          },
          {
            "value": "Asia Bahrain",
            "label": "Asia/Bahrain"
          },
          {
            "value": "Asia Baku",
            "label": "Asia/Baku"
          },
          {
            "value": "Asia Bangkok",
            "label": "Asia/Bangkok"
          },
          {
            "value": "Asia Beirut",
            "label": "Asia/Beirut"
          },
          {
            "value": "Asia Bishkek",
            "label": "Asia/Bishkek"
          },
          {
            "value": "Asia Brunei",
            "label": "Asia/Brunei"
          },
          {
            "value": "Asia Chita",
            "label": "Asia/Chita"
          },
          {
            "value": "Asia Choibalsan",
            "label": "Asia/Choibalsan"
          },
          {
            "value": "Asia Colombo",
            "label": "Asia/Colombo"
          },
          {
            "value": "Asia Damascus",
            "label": "Asia/Damascus"
          },
          {
            "value": "Asia Dhaka",
            "label": "Asia/Dhaka"
          },
          {
            "value": "Asia Dili",
            "label": "Asia/Dili"
          },
          {
            "value": "Asia Dubai",
            "label": "Asia/Dubai"
          },
          {
            "value": "Asia Dushanbe",
            "label": "Asia/Dushanbe"
          },
          {
            "value": "Asia Gaza",
            "label": "Asia/Gaza"
          },
          {
            "value": "Asia Hebron",
            "label": "Asia/Hebron"
          },
          {
            "value": "Asia Ho_Chi_Minh",
            "label": "Asia/Ho_Chi_Minh"
          },
          {
            "value": "Asia Hong_Kong",
            "label": "Asia/Hong_Kong"
          },
          {
            "value": "Asia Hovd",
            "label": "Asia/Hovd"
          },
          {
            "value": "Asia Irkutsk",
            "label": "Asia/Irkutsk"
          },
          {
            "value": "Asia Jakarta",
            "label": "Asia/Jakarta"
          },
          {
            "value": "Asia Jayapura",
            "label": "Asia/Jayapura"
          },
          {
            "value": "Asia Jerusalem",
            "label": "Asia/Jerusalem"
          },
          {
            "value": "Asia Kabul",
            "label": "Asia/Kabul"
          },
          {
            "value": "Asia Kamchatka",
            "label": "Asia/Kamchatka"
          },
          {
            "value": "Asia Karachi",
            "label": "Asia/Karachi"
          },
          {
            "value": "Asia Kathmandu",
            "label": "Asia/Kathmandu"
          },
          {
            "value": "Asia Khandyga",
            "label": "Asia/Khandyga"
          },
          {
            "value": "Asia Kolkata",
            "label": "Asia/Kolkata"
          },
          {
            "value": "Asia Krasnoyarsk",
            "label": "Asia/Krasnoyarsk"
          },
          {
            "value": "Asia Kuala_Lumpur",
            "label": "Asia/Kuala_Lumpur"
          },
          {
            "value": "Asia Kuching",
            "label": "Asia/Kuching"
          },
          {
            "value": "Asia Kuwait",
            "label": "Asia/Kuwait"
          },
          {
            "value": "Asia Macau",
            "label": "Asia/Macau"
          },
          {
            "value": "Asia Magadan",
            "label": "Asia/Magadan"
          },
          {
            "value": "Asia Makassar",
            "label": "Asia/Makassar"
          },
          {
            "value": "Asia Manila",
            "label": "Asia/Manila"
          },
          {
            "value": "Asia Muscat",
            "label": "Asia/Muscat"
          },
          {
            "value": "Asia Nicosia",
            "label": "Asia/Nicosia"
          },
          {
            "value": "Asia Novokuznetsk",
            "label": "Asia/Novokuznetsk"
          },
          {
            "value": "Asia Novosibirsk",
            "label": "Asia/Novosibirsk"
          },
          {
            "value": "Asia Omsk",
            "label": "Asia/Omsk"
          },
          {
            "value": "Asia Oral",
            "label": "Asia/Oral"
          },
          {
            "value": "Asia Phnom_Penh",
            "label": "Asia/Phnom_Penh"
          },
          {
            "value": "Asia Pontianak",
            "label": "Asia/Pontianak"
          },
          {
            "value": "Asia Pyongyang",
            "label": "Asia/Pyongyang"
          },
          {
            "value": "Asia Qatar",
            "label": "Asia/Qatar"
          },
          {
            "value": "Asia Qyzylorda",
            "label": "Asia/Qyzylorda"
          },
          {
            "value": "Asia Rangoon",
            "label": "Asia/Rangoon"
          },
          {
            "value": "Asia Riyadh",
            "label": "Asia/Riyadh"
          },
          {
            "value": "Asia Sakhalin",
            "label": "Asia/Sakhalin"
          },
          {
            "value": "Asia Samarkand",
            "label": "Asia/Samarkand"
          },
          {
            "value": "Asia Seoul",
            "label": "Asia/Seoul"
          },
          {
            "value": "Asia Shanghai",
            "label": "Asia/Shanghai"
          },
          {
            "value": "Asia Singapore",
            "label": "Asia/Singapore"
          },
          {
            "value": "Asia Srednekolymsk",
            "label": "Asia/Srednekolymsk"
          },
          {
            "value": "Asia Taipei",
            "label": "Asia/Taipei"
          },
          {
            "value": "Asia Tashkent",
            "label": "Asia/Tashkent"
          },
          {
            "value": "Asia Tbilisi",
            "label": "Asia/Tbilisi"
          },
          {
            "value": "Asia Tehran",
            "label": "Asia/Tehran"
          },
          {
            "value": "Asia Thimphu",
            "label": "Asia/Thimphu"
          },
          {
            "value": "Asia Tokyo",
            "label": "Asia/Tokyo"
          },
          {
            "value": "Asia Ulaanbaatar",
            "label": "Asia/Ulaanbaatar"
          },
          {
            "value": "Asia Urumqi",
            "label": "Asia/Urumqi"
          },
          {
            "value": "Asia Ust-Nera",
            "label": "Asia/Ust-Nera"
          },
          {
            "value": "Asia Vientiane",
            "label": "Asia/Vientiane"
          },
          {
            "value": "Asia Vladivostok",
            "label": "Asia/Vladivostok"
          },
          {
            "value": "Asia Yakutsk",
            "label": "Asia/Yakutsk"
          },
          {
            "value": "Asia Yekaterinburg",
            "label": "Asia/Yekaterinburg"
          },
          {
            "value": "Asia Yerevan",
            "label": "Asia/Yerevan"
          },
          {
            "value": "Atlantic Azores",
            "label": "Atlantic/Azores"
          },
          {
            "value": "Atlantic Bermuda",
            "label": "Atlantic/Bermuda"
          },
          {
            "value": "Atlantic Canary",
            "label": "Atlantic/Canary"
          },
          {
            "value": "Atlantic Cape_Verde",
            "label": "Atlantic/Cape_Verde"
          },
          {
            "value": "Atlantic Faroe",
            "label": "Atlantic/Faroe"
          },
          {
            "value": "Atlantic Madeira",
            "label": "Atlantic/Madeira"
          },
          {
            "value": "Atlantic Reykjavik",
            "label": "Atlantic/Reykjavik"
          },
          {
            "value": "Atlantic South_Georgia",
            "label": "Atlantic/South_Georgia"
          },
          {
            "value": "Atlantic St_Helena",
            "label": "Atlantic/St_Helena"
          },
          {
            "value": "Atlantic Stanley",
            "label": "Atlantic/Stanley"
          },
          {
            "value": "Australia Adelaide",
            "label": "Australia/Adelaide"
          },
          {
            "value": "Australia Brisbane",
            "label": "Australia/Brisbane"
          },
          {
            "value": "Australia Broken_Hill",
            "label": "Australia/Broken_Hill"
          },
          {
            "value": "Australia Currie",
            "label": "Australia/Currie"
          },
          {
            "value": "Australia Darwin",
            "label": "Australia/Darwin"
          },
          {
            "value": "Australia Eucla",
            "label": "Australia/Eucla"
          },
          {
            "value": "Australia Hobart",
            "label": "Australia/Hobart"
          },
          {
            "value": "Australia Lindeman",
            "label": "Australia/Lindeman"
          },
          {
            "value": "Australia Lord_Howe",
            "label": "Australia/Lord_Howe"
          },
          {
            "value": "Australia Melbourne",
            "label": "Australia/Melbourne"
          },
          {
            "value": "Australia Perth",
            "label": "Australia/Perth"
          },
          {
            "value": "Australia Sydney",
            "label": "Australia/Sydney"
          },
          {
            "value": "Canada Atlantic",
            "label": "Canada/Atlantic"
          },
          {
            "value": "Canada Central",
            "label": "Canada/Central"
          },
          {
            "value": "Canada Eastern",
            "label": "Canada/Eastern"
          },
          {
            "value": "Canada Mountain",
            "label": "Canada/Mountain"
          },
          {
            "value": "Canada Newfoundland",
            "label": "Canada/Newfoundland"
          },
          {
            "value": "Canada Pacific",
            "label": "Canada/Pacific"
          },
          {
            "value": "Europe Amsterdam",
            "label": "Europe/Amsterdam"
          },
          {
            "value": "Europe Andorra",
            "label": "Europe/Andorra"
          },
          {
            "value": "Europe Athens",
            "label": "Europe/Athens"
          },
          {
            "value": "Europe Belgrade",
            "label": "Europe/Belgrade"
          },
          {
            "value": "Europe Berlin",
            "label": "Europe/Berlin"
          },
          {
            "value": "Europe Bratislava",
            "label": "Europe/Bratislava"
          },
          {
            "value": "Europe Brussels",
            "label": "Europe/Brussels"
          },
          {
            "value": "Europe Bucharest",
            "label": "Europe/Bucharest"
          },
          {
            "value": "Europe Budapest",
            "label": "Europe/Budapest"
          },
          {
            "value": "Europe Busingen",
            "label": "Europe/Busingen"
          },
          {
            "value": "Europe Chisinau",
            "label": "Europe/Chisinau"
          },
          {
            "value": "Europe Copenhagen",
            "label": "Europe/Copenhagen"
          },
          {
            "value": "Europe Dublin",
            "label": "Europe/Dublin"
          },
          {
            "value": "Europe Gibraltar",
            "label": "Europe/Gibraltar"
          },
          {
            "value": "Europe Guernsey",
            "label": "Europe/Guernsey"
          },
          {
            "value": "Europe Helsinki",
            "label": "Europe/Helsinki"
          },
          {
            "value": "Europe Isle_of_Man",
            "label": "Europe/Isle_of_Man"
          },
          {
            "value": "Europe Istanbul",
            "label": "Europe/Istanbul"
          },
          {
            "value": "Europe Jersey",
            "label": "Europe/Jersey"
          },
          {
            "value": "Europe Kaliningrad",
            "label": "Europe/Kaliningrad"
          },
          {
            "value": "Europe Kiev",
            "label": "Europe/Kiev"
          },
          {
            "value": "Europe Lisbon",
            "label": "Europe/Lisbon"
          },
          {
            "value": "Europe Ljubljana",
            "label": "Europe/Ljubljana"
          },
          {
            "value": "Europe London",
            "label": "Europe/London"
          },
          {
            "value": "Europe Luxembourg",
            "label": "Europe/Luxembourg"
          },
          {
            "value": "Europe Madrid",
            "label": "Europe/Madrid"
          },
          {
            "value": "Europe Malta",
            "label": "Europe/Malta"
          },
          {
            "value": "Europe Mariehamn",
            "label": "Europe/Mariehamn"
          },
          {
            "value": "Europe Minsk",
            "label": "Europe/Minsk"
          },
          {
            "value": "Europe Monaco",
            "label": "Europe/Monaco"
          },
          {
            "value": "Europe Moscow",
            "label": "Europe/Moscow"
          },
          {
            "value": "Europe Oslo",
            "label": "Europe/Oslo"
          },
          {
            "value": "Europe Paris",
            "label": "Europe/Paris"
          },
          {
            "value": "Europe Podgorica",
            "label": "Europe/Podgorica"
          },
          {
            "value": "Europe Prague",
            "label": "Europe/Prague"
          },
          {
            "value": "Europe Riga",
            "label": "Europe/Riga"
          },
          {
            "value": "Europe Rome",
            "label": "Europe/Rome"
          },
          {
            "value": "Europe Samara",
            "label": "Europe/Samara"
          },
          {
            "value": "Europe San_Marino",
            "label": "Europe/San_Marino"
          },
          {
            "value": "Europe Sarajevo",
            "label": "Europe/Sarajevo"
          },
          {
            "value": "Europe Simferopol",
            "label": "Europe/Simferopol"
          },
          {
            "value": "Europe Skopje",
            "label": "Europe/Skopje"
          },
          {
            "value": "Europe Sofia",
            "label": "Europe/Sofia"
          },
          {
            "value": "Europe Stockholm",
            "label": "Europe/Stockholm"
          },
          {
            "value": "Europe Tallinn",
            "label": "Europe/Tallinn"
          },
          {
            "value": "Europe Tirane",
            "label": "Europe/Tirane"
          },
          {
            "value": "Europe Uzhgorod",
            "label": "Europe/Uzhgorod"
          },
          {
            "value": "Europe Vaduz",
            "label": "Europe/Vaduz"
          },
          {
            "value": "Europe Vatican",
            "label": "Europe/Vatican"
          },
          {
            "value": "Europe Vienna",
            "label": "Europe/Vienna"
          },
          {
            "value": "Europe Vilnius",
            "label": "Europe/Vilnius"
          },
          {
            "value": "Europe Volgograd",
            "label": "Europe/Volgograd"
          },
          {
            "value": "Europe Warsaw",
            "label": "Europe/Warsaw"
          },
          {
            "value": "Europe Zagreb",
            "label": "Europe/Zagreb"
          },
          {
            "value": "Europe Zaporozhye",
            "label": "Europe/Zaporozhye"
          },
          {
            "value": "Europe Zurich",
            "label": "Europe/Zurich"
          },
          {
            "value": "GMT",
            "label": "GMT"
          },
          {
            "value": "Indian Antananarivo",
            "label": "Indian/Antananarivo"
          },
          {
            "value": "Indian Chagos",
            "label": "Indian/Chagos"
          },
          {
            "value": "Indian Christmas",
            "label": "Indian/Christmas"
          },
          {
            "value": "Indian Cocos",
            "label": "Indian/Cocos"
          },
          {
            "value": "Indian Comoro",
            "label": "Indian/Comoro"
          },
          {
            "value": "Indian Kerguelen",
            "label": "Indian/Kerguelen"
          },
          {
            "value": "Indian Mahe",
            "label": "Indian/Mahe"
          },
          {
            "value": "Indian Maldives",
            "label": "Indian/Maldives"
          },
          {
            "value": "Indian Mauritius",
            "label": "Indian/Mauritius"
          },
          {
            "value": "Indian Mayotte",
            "label": "Indian/Mayotte"
          },
          {
            "value": "Indian Reunion",
            "label": "Indian/Reunion"
          },
          {
            "value": "Pacific Apia",
            "label": "Pacific/Apia"
          },
          {
            "value": "Pacific Auckland",
            "label": "Pacific/Auckland"
          },
          {
            "value": "Pacific Chatham",
            "label": "Pacific/Chatham"
          },
          {
            "value": "Pacific Chuuk",
            "label": "Pacific/Chuuk"
          },
          {
            "value": "Pacific Easter",
            "label": "Pacific/Easter"
          },
          {
            "value": "Pacific Efate",
            "label": "Pacific/Efate"
          },
          {
            "value": "Pacific Enderbury",
            "label": "Pacific/Enderbury"
          },
          {
            "value": "Pacific Fakaofo",
            "label": "Pacific/Fakaofo"
          },
          {
            "value": "Pacific Fiji",
            "label": "Pacific/Fiji"
          },
          {
            "value": "Pacific Funafuti",
            "label": "Pacific/Funafuti"
          },
          {
            "value": "Pacific Galapagos",
            "label": "Pacific/Galapagos"
          },
          {
            "value": "Pacific Gambier",
            "label": "Pacific/Gambier"
          },
          {
            "value": "Pacific Guadalcanal",
            "label": "Pacific/Guadalcanal"
          },
          {
            "value": "Pacific Guam",
            "label": "Pacific/Guam"
          },
          {
            "value": "Pacific Honolulu",
            "label": "Pacific/Honolulu"
          },
          {
            "value": "Pacific Johnston",
            "label": "Pacific/Johnston"
          },
          {
            "value": "Pacific Kiritimati",
            "label": "Pacific/Kiritimati"
          },
          {
            "value": "Pacific Kosrae",
            "label": "Pacific/Kosrae"
          },
          {
            "value": "Pacific Kwajalein",
            "label": "Pacific/Kwajalein"
          },
          {
            "value": "Pacific Majuro",
            "label": "Pacific/Majuro"
          },
          {
            "value": "Pacific Marquesas",
            "label": "Pacific/Marquesas"
          },
          {
            "value": "Pacific Midway",
            "label": "Pacific/Midway"
          },
          {
            "value": "Pacific Nauru",
            "label": "Pacific/Nauru"
          },
          {
            "value": "Pacific Niue",
            "label": "Pacific/Niue"
          },
          {
            "value": "Pacific Norfolk",
            "label": "Pacific/Norfolk"
          },
          {
            "value": "Pacific Noumea",
            "label": "Pacific/Noumea"
          },
          {
            "value": "Pacific Pago_Pago",
            "label": "Pacific/Pago_Pago"
          },
          {
            "value": "Pacific Palau",
            "label": "Pacific/Palau"
          },
          {
            "value": "Pacific Pitcairn",
            "label": "Pacific/Pitcairn"
          },
          {
            "value": "Pacific Pohnpei",
            "label": "Pacific/Pohnpei"
          },
          {
            "value": "Pacific Port_Moresby",
            "label": "Pacific/Port_Moresby"
          },
          {
            "value": "Pacific Rarotonga",
            "label": "Pacific/Rarotonga"
          },
          {
            "value": "Pacific Saipan",
            "label": "Pacific/Saipan"
          },
          {
            "value": "Pacific Tahiti",
            "label": "Pacific/Tahiti"
          },
          {
            "value": "Pacific Tarawa",
            "label": "Pacific/Tarawa"
          },
          {
            "value": "Pacific Tongatapu",
            "label": "Pacific/Tongatapu"
          },
          {
            "value": "Pacific Wake",
            "label": "Pacific/Wake"
          },
          {
            "value": "Pacific Wallis",
            "label": "Pacific/Wallis"
          },
          {
            "value": "US Alaska",
            "label": "US/Alaska"
          },
          {
            "value": "US Arizona",
            "label": "US/Arizona"
          },
          {
            "value": "US Central",
            "label": "US/Central"
          },
          {
            "value": "US Eastern",
            "label": "US/Eastern"
          },
          {
            "value": "US Hawaii",
            "label": "US/Hawaii"
          },
          {
            "value": "US Mountain",
            "label": "US/Mountain"
          },
          {
            "value": "US Pacific",
            "label": "US/Pacific"
          },
          {
            "value": "UTC",
            "label": "UTC"
          }
        ]

      }
    ]
  },
  {
    "type": "section",
    "items": [
      {
        "type": "input",
        "messageKey": "twitter",
        "defaultValue": "ffstv",
        "label": "Twitter",
        "attributes": {
          "placeholder": "ffstv",
          "type": "text"
        }
      },

      {
        "type": "slider",
        "messageKey": "updateinterval",
        "defaultValue": 60,
        "label": "Check Interval",
        "description": "Numbers are in minutes.",
        "min": 10,
        "max": 1440,
        "step": 5
      }
    ]},
  {
    "type": "section",
    "items": [
      {
        "type": "color",
        "messageKey": "color",
        "defaultValue": 0x000000,
        "label": "Background Color",
        "sunlight": false,
        "allowGray": false
      },
      {
        "type": "slider",
        "messageKey": "rotate",
        "label": "Rotate in 90 degree steps",
        "defaultValue": "0",
        "min": 0,
        "max": 270,
        "step": 90,
      }
    ]},
  {
    "type": "text",
    "defaultValue": "<center><form action=\"https://www.paypal.com/cgi-bin/webscr\" method=\"post\" target=\"_top\">\n<input type=\"hidden\" name=\"cmd\" value=\"_donations\">\n<input type=\"hidden\" name=\"business\" value=\"steveway1@googlemail.com\">\n<input type=\"hidden\" name=\"lc\" value=\"US\">\n<input type=\"hidden\" name=\"item_name\" value=\"Steveway\">\n<input type=\"hidden\" name=\"no_note\" value=\"0\">\n<input type=\"hidden\" name=\"currency_code\" value=\"EUR\">\n<input type=\"hidden\" name=\"bn\" value=\"PP-DonationsBF:btn_donate_SM.gif:NonHostedGuest\">\n<input type=\"image\" src=\"data:image/png;base64,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\" border=\"0\" name=\"submit\" alt=\"PayPal - The safer, easier way to pay online!\">\n</form></center>"
  },

  {
    "type": "submit",
    "defaultValue": "Save"
  }
]
;