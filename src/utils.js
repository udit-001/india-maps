import * as turf from '@turf/turf';

export const calculateCenter = (geoJson) => {
  return turf.center(geoJson).geometry.coordinates.reverse();
}

  export const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }


export const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, '');
    
    str = str.toLowerCase();
    
    const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    const to = "aaaaaeeeeeiiiiooooouuuunc------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    
    str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    
    return str;
}

export const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

export const generateRedShade = () => {

  const pastelPalette = [
    { hue: 0, saturation: 70, lightness: 85 }, // Pastel Red
    { hue: 120, saturation: 65, lightness: 90 }, // Pastel Orange
    { hue: 180, saturation: 60, lightness: 95 }, // Pastel Yellow
    { hue: 240, saturation: 55, lightness: 80 }, // Pastel Green
    { hue: 300, saturation: 50, lightness: 75 }, // Pastel Blue
    { hue: 360, saturation: 45, lightness: 70 }  // Pastel Purple
  ];

  var currentIndex = Math.floor(Math.random() * pastelPalette.length);

  const color = pastelPalette[currentIndex];

  currentIndex = (currentIndex + 1) % pastelPalette.length;

  return `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
}
