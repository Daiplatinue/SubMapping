// Type definitions for Leaflet Draw
declare module "leaflet-draw" {
    global {
      namespace L {
        namespace Control {
          class CustomDraw extends L.Control {
            constructor(options?: DrawConstructorOptions)
          }
        }
  
        interface DrawConstructorOptions {
          position?: string
          draw?: {
            polyline?: boolean | any
            polygon?: boolean | any
            rectangle?: boolean | any
            circle?: boolean | any
            marker?: boolean | any
            circlemarker?: boolean | any
          }
          edit?: {
            featureGroup: L.FeatureGroup
            remove?: boolean
            edit?: boolean
          }
        }
      }
    }
  }
  
  