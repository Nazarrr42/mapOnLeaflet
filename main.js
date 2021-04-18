let app = {
  data() {
    return {
      map: "your map",
      startcoord: [50.39217871839044, 30.533506440179803],
      tile:
        "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=DsJtfNTllftDtJOlO7M3",
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      zoom: 6,
      kiev: {
        coord: [50.45069257888955, 30.51617974411421],
        name: "Київ",
        icon: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
        shadow: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
        marker: "*marker*",
      },
      lviv: {
        coord: [49.83892423851466, 24.026898982565047],
        name: "Львів",
        icon: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
        shadow: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
        marker: "*marker*",
      },
      dnipro: {
        coord: [48.44490823474519, 35.06420619545976],
        name: "Дніпро",
        icon: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
        shadow: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
        marker: "*marker*",
      },
      doneck: {
        coord: [48.017138282656404, 37.808890723719294],
        name: "Донецьк",
        icon: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
        shadow: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
        marker: "*marker*",
      },
      odessa: {
        coord: [46.472183206240416, 30.73512482456444],
        name: "Одесса",
        icon: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
        shadow: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
        marker: "*marker*",
      },
      currentCity: "*current*",
    };
  },
  methods: {
    createMap() {
      this.map = L.map(this.$refs.map).setView(this.startcoord, this.zoom); // Інтегруємо карту за допомогою this.$refs
      L.tileLayer(this.tile, {
        attribution: this.attribution,
      }).addTo(this.map);
    },
    createAllMarkers(cityArray) {
      // Приймаємо необхідні міста масивом
      for (let i = 0; i < cityArray.length; i++) {
        // Йдемо по циклу опрацьовуючи кожне місто
        if (cityArray[i].icon) {
          // Перевіряємо маркер на наявність іконки
          let currentIcon = L.icon({
            iconUrl: cityArray[i].icon,
            shadowUrl: cityArray[i].shadow || null, // перевіряємо маркер на наявність тіні
            iconSize: [25, 82],
            iconAnchor: [15, 80],
            shadowSize: cityArray[i].shadow ? [35, 72] : null,
            shadowAnchor: cityArray[i].shadow ? [5, 68] : null,
          });
          cityArray[i].marker = L.marker(cityArray[i].coord, {
            // Створюємо маркер з поточною іконкою та вішаємо на нього event при якому буде змінюватись активне місто
            icon: currentIcon,
          })
            .on("click", () => (this.currentCity = cityArray[i].name))
            .addTo(this.map);
        } else {
          cityArray[i].marker = L.marker(cityArray[i].coord)
            .on("click", () => (this.currentCity = cityArray[i].name))
            .addTo(this.map);
        }
      }
    },
    fillAllMarkers(cityArray) {
      // Приймаємо необхідні міста масивом
      for (let i = 0; i < cityArray.length; i++) {
        cityArray[i].marker.bindPopup(
          `<b>Назва міста: </b><i>${cityArray[i].name}</i><br><b>Координаті міста: </b><i>${cityArray[i].coord}</i>`
        );
      }
    },
    addLogo(imgPath) {
      L.Control.Watermark = L.Control.extend({
        onAdd: function (map) {
          // Створюємо картинку логотипу задаючи їй необхідні параметри
          let img = L.DomUtil.create("img");
          img.src = imgPath;
          img.style.width = "150px";
          return img;
        },
        onRemove: function (map) {},
      });

      L.control.watermark = function (opts) {
        return new L.Control.Watermark(opts);
      };

      L.control.watermark().addTo(this.map);
    },
  },
  mounted() {
    this.createMap(); // Створюємо карту
    this.addLogo("./assets/Nazar Filippov.png"); // Додаємо власний логотип

    this.createAllMarkers([
      // Створюємо всі маркери з вказаними містами
      this.kiev,
      this.lviv,
      this.dnipro,
      this.doneck,
      this.odessa,
    ]);
    this.fillAllMarkers([
      // "Заповнюємо" макрери popup-ами
      this.kiev,
      this.lviv,
      this.dnipro,
      this.doneck,
      this.odessa,
    ]);
  },
};

Vue.createApp(app).mount("#app");
