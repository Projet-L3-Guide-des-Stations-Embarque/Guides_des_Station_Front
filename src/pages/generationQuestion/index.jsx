import { Link } from "react-router-dom"
import { useState } from 'react'
import Famille from './uneFamille'
import { saveAs } from 'file-saver';

function Questions()
{


    const jsonrec = [        
        {
            "id" : "0",
            "question" : "Debut guide",
            "fin" : false,
            "idoui" : "0a",
            "idnon" : "0a"
        },
        {
            "id" : "0a",
            "question" : "• Nappe d'eau (bords de cours d'eau, marécage...) ou station à hautes herbes*. \n• Présence de plantes hygrophiles (GE.9) ou mésohygrophiles (GE.8)",
            "fin" : false,
            "idoui" : "1a",
            "idnon" : "0b"
        },
        {
            "id" : "0b",
            "question" : "• Pente forte (au moins 40%). \n• Matériaux non stabilisés : éboulis actifs*, colluvions*. \n• Dominance des essences pionnères ou post-pionnères(Tremble, érables, tilleuls, bouleaux, Frêne, Mélèze)",
            "fin" : false,
            "idoui" : "2a",
            "idnon" : "0c"
        },
        {
            "id" : "0c",
            "question" : "• Croupe ou haut de pente ou dalle ou blocs. \n• Sol peu évolué sur au moins 80% de la surface",
            "fin" : false,
            "idoui" : "3a",
            "idnon" : "8a"
        },
        {
            "id" : "1",
            "question" : "Stations humides",
            "fin" : false,
            "idoui" : "1a",
            "idnon" : "5"
        },
        {
            "id" : "2",
            "question" : "Stations de ravins et d'éboulis",
            "fin" : false,
            "idoui" : "2a",
            "idnon" : "5"
        },
        {
            "id" : "3",
            "question" : "Stations des sols peu évolués",
            "fin" : false,
            "idoui" : "3a",
            "idnon" : "5"
        },
        {
            "id" : "4",
            "question" : "Stations du Subalpin",
            "fin" : false,
            "idoui" : "4a",
            "idnon" : "5"
        },
        {
            "id" : "5",
            "question" : "Stations du Montagnard externe",
            "fin" : false,
            "idoui" : "5a",
            "idnon" : "6"
        },
        {
            "id" : "6",
            "question" : "Stations du Montagnard interne",
            "fin" : false,
            "idoui" : "6a",
            "idnon" : "7"
        },
        {
            "id" : "7",
            "question" : "Stations du collinéen",
            "fin" : false,
            "idoui" : "7a",
            "idnon" : "1"
        },
        {
            "id" : "1a",
            "question" : "• Etage  subalpin ou montagnard. \n• Combe à neige ou bas de pente concave (en creux). \n• Sol tassé, à taches rouilles et zones décolorées. \n• Formation basse à saule(s)",
            "fin" : false,
            "idoui" : "1-5",
            "idnon" : "1b"
        },
    
        {
            "id" : "1b",
            "question" : "• Zone tourbeuse ou marécageuse. \n• Présence de plantes hygrophiles (GE.9)",
            "fin" : false,
            "idoui" : "1c",
            "idnon" : "1e"
        },
    
        {
            "id" : "1c",
            "question" : "• Etage subalpin ou montagnard. \n• Sol organique (matières organiques ± humifiées). \n• Dominance de l'Epicéa, du Pin à crochets, du Pin cembro ou des bouleaux",
            "fin" : false,
            "idoui" : "1-3",
            "idnon" : "1d"
        },
    
        {
            "id" : "1d",
            "question" : "• Etage collinéen. \n• Dominance du Frêne ou de l'Aulne glutineux",
            "fin" : false,
            "idoui" : "1-1",
            "idnon" : "1-2"
        },
    
        {
            "id" : "1e",
            "question" : "• Proximité de cours d'eau (lit majeur inondable)",
            "fin" : false,
            "idoui" : "1f",
            "idnon" : "1h"
        },
    
        {
            "id" : "1f",
            "question" : "• Etage subalpin ou montagnard. \n• Formation basse à Aulne vert",
            "fin" : false,
            "idoui" : "1-7",
            "idnon" : "1g"
        }, 
    
        {
            "id" : "1g",
            "question" : "• Etage montagnard ou collinéen. \n• Forêt alluviale de vallée ou plaine",
            "fin" : false,
            "idoui" : "1-6",
            "idnon" : "1f"
        },
    
        {
            "id" : "1h",
            "question" : "• Pente forte (au moins 40%). \n• Matériaux non stabilisés ( éboulis actifs*, colluvions*) sur plus de 50 cm",
            "fin" : false,
            "idoui" : "2a",
            "idnon" : "1i"
        },
    
        {
            "id" : "1i",
            "question" : "• Dolines, ou mi- ou bas de pente concave (en creux)",
            "fin" : false,
            "idoui" : "1j",
            "idnon" : "1l"
        },
        {
            "id" : "1j",
            "question" : "• Etage subalpin ou montagnard. \n• Dominance de l'Erable sycomore. \n• Présence de plantes hygrosciaphiles (GE.10)",
            "fin" : false,
            "idoui" : "1-10",
            "idnon" : "1k"
        },
        {
            "id" : "1k",
            "question" : "• Etage collinéen ou montagnard. \n• Présence du Frêne",
            "fin" : false,
            "idoui" : "1-4",
            "idnon" : "1l"
        },
        {
            "id" : "1l",
            "question" : "• Etage subalpin",
            "fin" : false,
            "idoui" : "1-9",
            "idnon" : "1-8"
        },
            
        {
            "id":"2a",
            "question":"• Ubac (N, NE, NO ou E) et situation confinée. \n• Présence de plantes hygrosciaphiles (GE.10)",
            "fin":false,
            "idoui":"2b",
            "idnon":"2c"
        },
        {
            "id":"2b",
            "question" : "• Sol à taches rouilles et zones décolorées dès 30-40cm. \n• Présence de plantes hygrophiles (GE.9)",
            "fin":false,
            "idoui":"1i",
            "idnon":"2-4"
        },
        {
            "id":"2c",
            "question": "• Sol avec peu de terre fine*. \n• Présence de Tilleul à grandes feuilles ou d'Erable à feuilles d'obier. \n• Présence de plantes mésoxérophiles (GE.5) ou xérophiles (GE.4)",
            "fin":false,
            "idoui":"2-1",
            "idnon":"2d"
        },
        {
            "id" :"2d",
            "question":"• Sol aéré à structure grumeleuse sur 40-50cm. \n• Texture à dominante limoneuse ou argilo-limoneuse. \n• Présence de plantes mésohygroclines (GE.6) ou hygroclines (GE.7)",
            "fin":false,
            "idoui":"2-3",
            "idnon":"2-2"
        },
        {
            "id":"3a",
            "question":"• Etage subalpin ou station froide et humide de basse altitude (inférieure à 1400m)",
            "fin":false,
            "idoui":"3b",
            "idnon":"3c"
        },
        {
            "id":"3b",
            "question": "• Sol avec peu de limons et argiles. \n• Présence de plantes mésoxérophiles (GE.5) ou xérophiles (GE.4). \n• Peuplement de Pin à crochets",
            "fin":false,
            "idoui": "3-5",
            "idnon":"3-4"
        },
        {
            "id":"3c",
            "question":"• Pente forte (au moins 40%). \n• Matériaux non stabilisés (éboulis actifs*, colluvions*) sur plus de 50cm",
            "fin":false,
            "idoui":"2c",
            "idnon":"3d"
        },
        {
            "id":"3d",
            "question":"• Etage collinéen ou montagnard. \n• Plateau ou Adret (versant non confiné exposé S, SO, SE ou O). \n• Peuplement de chêne(s) ou de Hêtre",
            "fin":false,
            "idoui":"3-1",
            "idnon":"3e"
        },
        {
            "id":"3e",
            "question" : "• Sol superficiel* de 20-30cm, avec peu de limons et argiles. \n• Présence de plantes xérophiles (GE.5) ou mésoxérophiles (GE.4). \n• Peuplement de Pin sylvestre",
            "fin": false,
            "idoui":"3-2",
            "idnon":"3-3"
        },
        {
            "id" : "4a",
            "question" : "• Etage  subalpin. \n• Secteur externe. \n• Sommet de versant très venté. \n• Dominance de Hêtre au port modifié par le vent",
            "fin" : false,
            "idoui" : "4-7",
            "idnon" : "4b"
        },
        {
            "id" : "4b",
            "question" : "• Humus à l'horizon noir continu OH. \n• Sol à horizons nettement différenciés: gris en surface, ocre ou chocolat dessous. \n• Présence de plantes acidiphiles (GE.13) ou humus bruts (GE.12)",
            "fin" : false,
            "idoui" : "4c",
            "idnon" : "4d"
        },
        {
            "id" : "4c",
            "question" : "• Secteur interne ou intermédiaire. \n• Limite supérieure de la forêt : 'zone de combat'. \n• Présence du pin cembro",
            "fin" : false,
            "idoui" : "4-2",
            "idnon" : "4-3"
        },
        {
            "id" : "4d",
            "question" : "• Sol avec peu d'argiles. \n• Présence de plantes mésoxérophiles (GE.5) ou xérophiles (GE.4). \n• Dominance de pin à crochets",
            "fin" : false,
            "idoui" : "4-1",
            "idnon" : "4e"
        },
        {
            "id" : "4e",
            "question" : "• Secteur intermédiaire ou interne. \n• Limite supérieure de la forêt : 'zone de combat'. \n• Dominance de pin cembro ou de Mélèze",
            "fin" : false,
            "idoui" : "4-4",
            "idnon" : "4f"
        },
        {
            "id" : "4f",
            "question" : "• Sol à taches rouilles et zones décolorées dès 30-40 cm. \n• Présence de plantes hygrophiles (GE.9) ou mésohygrophiles (GE.8)",
            "fin" : false,
            "idoui" : "1i",
            "idnon" : "4g"
        },
        {
            "id" : "4g",
            "question" : "• Sol profond de 50-60cm, avec beaucoup de terre fine. \n• Texture à dominante limoneuse ou limono-argileuse. \n• Présence de plantes mésohygroclines (GE.6) ou hygroclines (GE.7)",
            "fin" : false,
            "idoui" : "4-6",
            "idnon" : "4h"
        },
        {
            "id" : "4h",
            "question" : "• Situation confinée. \n• Présence de plantes hygrosciaphiles (GE.10)",
            "fin" : false,
            "idoui" : "4-6",
            "idnon" : "4-5"
        },
        {
            "id" : "5a",
            "question" : "• Adret (versant non confiné exposé S,SO,SE ou O). \n• Sol avec peu de limons et argile. \n• Présence de plantes mésoxérophiles (GE.5) ou xérophiles (GE.4). \n• Dominance du Hêtre (dynamique à pins...)",
            "fin" : false,
            "idoui" : "5b",
            "idnon" : "5d"
        },
        {
            "id" : "5b",
            "question" : "• Sol peu évolué sur au moins 80% de la surface",
            "fin" : false,
            "idoui" : "3d",
            "idnon" : "5c"
        },
        {
            "id" : "5c",
            "question" : "• Matériau carbonaté",
            "fin" : false,
            "idoui" : "5-1",
            "idnon" : "5-2"
        },
        {
            "id" : "5d",
            "question" : "• Sol humifère de couleur sombre, avec beaucoup d'éléments grossiers. \n• Présence de plantes mésoxérophiles (GE.5)",
            "fin" : false,
            "idoui" : "5-3",
            "idnon" : "5e"
        },
        {
            "id" : "5e",
            "question" : "• Humus à horizon noir continu OH. \n• Présence de plantes acidiphiles (GE.13) ou des humus bruts (GE.12).",
            "fin" : false,
            "idoui" : "5-4",
            "idnon" : "5f"
        },
        {
            "id" : "5f",
            "question" : "• Bas de pente et micro-relief concave (en creux). \n• Sol à texture à dominante limoneuse, limono-argileuse ou argilo-limoneuse. \n• Présence de plantes mésohygroclines (GE.6), hygroclines (GE.7) ou hygrosciaphiles (GE.10)",
            "fin" : false,
            "idoui" : "5g",
            "idnon" : "5h"
        },
        {
            "id" : "5g",
            "question" : "• Sol à taches rouilles et zones décolorées dès 30-40cm. \n• Présence de plantes hygrophiles (GE.9) ou mésohygrophiles (GE.8)",
            "fin" : false,
            "idoui" : "1i",
            "idnon" : "5-8"
        },
        {
            "id" : "5h",
            "question" : "• Matériau argileux: calcaires marneux, marnes, moraines... \n• Sol tassé à faible porosité. \n• Présence de plantes des sols à régime hydrique contrasté (GE.11)",
            "fin" : false,
            "idoui" : "5i",
            "idnon" : "5j"
        },
        {
            "id" : "5i",
            "question" : "• Peuplement de Pin sylvestre. \n• Présence de la Molinie",
            "fin" : false,
            "idoui" : "7-3",
            "idnon" : "5-5"
        },
        {
            "id" : "5j",
            "question" : "• Sol à texture à dominante limoneuse ou limono-argileuse. \n• Horizon profond enrichi en argiles. \n• Présence de plantes acidiclines (GE.14) ou acidiphiles (GE.13)",
            "fin" : false,
            "idoui" : "5-7",
            "idnon" : "5-6"
        },
        {
            "id" : "6a",
            "question" : "• Sol peu évolué sur au moins 80% de la surface",
            "fin" : false,
            "idoui" : "3e",
            "idnon" : "6b"
        },
        {
            "id" : "6b",
            "question" : "• Croupe, haut de pente, mi-pente ou plateau. \n• Sol avec peu de terre fine. \n• Présence de plantes xérophiles (GE.4). \n• Peuplement de Pin sylvestre",
            "fin" : false,
            "idoui" : "6-1",
            "idnon" : "6c"
        },
        {
            "id" : "6c",
            "question" : "• Adret (S, SE, SO ou O, et situation non confinée). \n• Sol humifère de couleur sombre, avec beaucoup d'éléments grossiers. \n• Présence de plantes mésoxérophiles (GE.5) : Polygale petit-buis, épine-vinette ou valérianes",
            "fin" : false,
            "idoui" : "6-2",
            "idnon" : "6d"
        },
        {
            "id" : "6d",
            "question" : "• Bas de pente et micro-relief concave (en creux). \n• Sol à texture à dominante limoneuse, limono-argileuse ou argilo-limoneuse. \n• Présence de plantes mésohygroclines (GE.6) ou hygroclines (GE.7)",
            "fin" : false,
            "idoui" : "6e",
            "idnon" : "6-3"
        },
        {
            "id" : "6e",
            "question" : "• Sol à taches rouilles et zones décolorées dès 30-40 cm. \n• Présence de plantes hygrophiles (GE.9) ou mésohygrophiles (GE.8)",
            "fin" : false,
            "idoui" : "1i",
            "idnon" : "6-4"
        },
        {
            "id" : "7a",
            "question" : "• Sol peu évolué sur au moins 80% de la surface",
            "fin" : false,
            "idoui" : "3d",
            "idnon" : "7b"
        },
        {
            "id" : "7b",
            "question" : "• Adret (versant non confiné S, SE, SO, O). \n• Sol avec peu de limons et argiles. \n• Présence de plantes mésoxérophiles (GE.5) ou xérophiles (GE.4). \n• Peuplement de Chêne pubescent",
            "fin" : false,
            "idoui" : "7-1",
            "idnon" : "7c"
        },
        {
            "id" : "7c",
            "question" : "• Sol avec beaucoup d'éléments grossiers. \n• Présence de plantes mésoxérophiles (GE.5)",
            "fin" : false,
            "idoui" : "7-2",
            "idnon" : "7d"
        },
        {
            "id" : "7d",
            "question" : "• Matériau argileux : marnes, calcaires marneux, moraines... \n• Sol tassé à faible porosité. \n• Présence de plantes des sols à régime hydrique contrasté (GE.11)",
            "fin" : false,
            "idoui" : "7e",
            "idnon" : "7f"
        },
        
        {
            "id" : "7e",
            "question" : "• Présence de la Molinie. \n• Peuplement de Pin sylvestre",
            "fin" : false,
            "idoui" : "7-3",
            "idnon" : "7-2"
        },
        
        {
            "id" : "7f",
            "question" : "• Humus à horizon noir continu OH. \n• Présence de plantes acidiphiles (GE.13) ou des humus bruts (GE.12)",
            "fin" : false,
            "idoui" : "7-4",
            "idnon" : "7g"
        },
        
        {
            "id" : "7g",
            "question" : "• Bas de pente et micro-relief concave (en creux). \n• Sol à texture à dominante limoneuse, limono-argileuse ou argilo-limoneuse. \n• Présence de plantes mésohygroclines (GE.6), hygroclines (GE.7) ou hygrosciaphiles (GE.10)",
            "fin" : false,
            "idoui" : "7h",
            "idnon" : "7i"
        },
        
        {
            "id" : "7h",
            "question" : "• Sol à taches rouilles et zones décolorées dès 30-40cm. \n• Présence de plantes hygrophiles (GE.9) ou mésohygrophiles (GE.8)",
            "fin" : false,
            "idoui" : "1e",
            "idnon" : "7-7"
        },
        
        {
            "id" : "7i",
            "question" : "• Sol carbonaté avec beaucoup d'éléments calcaires. \n• Présence de plantes neutrocalcicoles (GE.16) ou calcaricoles (GE.17)",
            "fin" : false,
            "idoui" : "7-5",
            "idnon" : "7-6"
        },
    
        {
            "id" : "1-1",
            "question" : "Frênaies-aulnaies macrécageuses",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        
        {
            "id" : "1-2",
            "question" : "Forêts marécageuses du montagnard",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        
        {
            "id" : "1-3",
            "question" : "Forêts tourbeuses",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        
        {
            "id" : "1-4",
            "question" : "Frênaies des versants et terrains humides",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
            
        {
            "id" : "1-5",
            "question" : "Saulaies des combes et terrains humides",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        
        {
            "id" : "1-6",
            "question" : "Forêts alluviales",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        
        {
            "id" : "1-7",
            "question" : "Aulnaies vertes",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        
        {
            "id" : "1-8",
            "question" : "Forêts à hautes herbes du montagnard",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        
        {
            "id" : "1-9",
            "question" : "Forêts à hautes herbes du subalpin",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
            
        {
            "id" : "1-10",
            "question" : "Erablaies à hautes herbes",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id":"2-1",
            "question":"Tillaies des versants pentus secs",
            "fin":true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id":"2-2",
            "question":"Forêts des versants pentus drainés",
            "fin": true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id":"2-3",
            "question":"Forêts des versants pentus frais",
            "fin":true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "2-4",
            "question":"Forêts des versants pentus froids et humides",
            "fin":true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id":"3-1",
            "question":"Chênaies et hêtraies des sols peu évolués",
            "fin":true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id":"3-2",
            "question":"Pineraies sylvestres des sols peu évolués",
            "fin":true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id":"3-3",
            "question":"Sapinières des sols peu évolués",
            "fin":true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id":"3-4",
            "question":"Pessières des sols peu évolués",
            "fin": true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id":"3-5",
            "question": "Pineraies à crochets des sols peu évolués",
            "fin":true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "4-1",
            "question" : "Pineraies à crochets sèches",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "4-2",
            "question" : "Cembraies très acidiphiles",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "4-3",
            "question" : "Pessières très acidiphiles du subalpin",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "4-4",
            "question" : "Cembraies drainées à Mélèze",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "4-5",
            "question" : "Pressières drainées du subalpin",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "4-6",
            "question" : "Pressières peu humides du subalpin",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "4-7",
            "question" : "Hêtraies sommitales du subalpin",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "5-1",
            "question" : "Hêtraies sèches sur matériaux carbonatés",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "5-2",
            "question" : "Hêtraies sèches sur matériaux silicieux",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "5-3",
            "question" : "Hêtraies-sapinières sèches",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "5-4",
            "question" : "Hêtraies-sapinières très acidiphiles",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "5-5",
            "question" : "Hêtraies-sapinières sur sols argileux",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "5-6",
            "question" : "Hêtraies-sapinières drainées",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "5-7",
            "question" : "Hêtraies-sapinières un peu humides",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "5-8",
            "question" : "Hêtraies-sapinières assez humides",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "6-1",
            "question" : "Pineraies sylvestres sèches",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "6-2",
            "question" : "Pessières et sapinières sèches",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "6-3",
            "question" : "Sapinières-pessières drainées",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "6-4",
            "question" : "Sapinières-pessières un peu humides",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "7-1",
            "question" : "Chênaies pubescentes thermophiles sèches",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "7-2",
            "question" : "Hêtraies-chênaies sèches",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "7-3",
            "question" : "Pineraies sylvestres sur sols argileux",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "7-4",
            "question" : "Hêtraies-chênaies sèches",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "7-5",
            "question" : "Hêtraies-chênaies neutrocalcicoles",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "7-6",
            "question" : "Hêtraies-chênaies un peu humides",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "7-7",
            "question" : "Hêtraies-chênaies assez humides",
            "fin" : true,
            "idoui" : "",
            "idnon" : ""
        },
        {
            "id" : "8a",
            "question" : "Êtes vous sur le versant ubac ?",
            "fin" : false,
            "idoui" : "altUbac",
            "idnon" : "altAdret"
        },
        {
            "id" : "9a",
            "question" : "Confinement (humidité atmosphérique)",
            "fin" : false,
            "idoui" : "5a",
            "idnon" : "9b"
        },
        {
            "id" : "9b",
            "question" : "• Adret (S/SE/SO/O) \n• Présence des plantes des hêtraies-sapinières : Hêtre, Gaillet (Aspérule) odorant(e), Houx, Géranium noueux, Cardamine à sept folioles, Orge d'Europe, Mélique uniflore, Grande Fétuque.",
            "fin" : false,
            "idoui" : "5a",
            "idnon" : "6a"
        },
        {
            "id" : "altAdret",
            "question" : "Altitude Adret",
            "fin" : false,
            "idoui" : "10",
            "idnon" : "11"
        },
        {
            "id" : "altUbac",
            "question" : "Altitude Ubac",
            "fin" : false,
            "idoui" : "10",
            "idnon" : "11"
        }
    ]


    const [idSuivant, setIdSuivant] = useState(1)

    const [inputFamille, setFamille] = useState([
            {idparc:'0', idFamille:'0', nomFamille:'', question: [{ id:'a', question: '', fin:false, idoui: '', idnon: '' }]}
        ]);


    const [guideActuel, setGuideActuel] = useState("")
    const [guideLoaded, setGuideLoaded] = useState(false)
    const [nombreGuide, setNombreGuide] = useState(0)


    const ajouterFamille = () => {
        let newFamille = ( {idparc:String(idSuivant),idFamille:String(idSuivant), nomFamille:'', question: [{ id:'a', question: '', fin:false, idoui: '', idnon: '' }]})
        setIdSuivant(idSuivant + 1)
        setFamille([...inputFamille, newFamille])
    }
    
    const SupprimerFamille = (i) => {
        let data = [...inputFamille];
        let part1 = data.splice(0, i)
        data.splice(0, 1)
        let result = [...part1, ...data]
        setFamille(result)
    }

    const changeIemeElementIDF = (i, val) => {
        let data = [...inputFamille];
        data[i].idFamille = val;
        setFamille(data);
    }

    const changeIemeElementNomF = (i, val) => {
        let data = [...inputFamille];
        data[i].nomFamille = val;
        setFamille(data);
    }

    const createChangeIemeElementIDF = (i) => {
        return changeIemeElementIDF.bind(null, i)
    }

    const createChangeIemeElementNomF = (i) => {
        return changeIemeElementNomF.bind(null, i)
    }

    const changeIemeQuestionTab = (i, val) => {
        let data = [...inputFamille];
        data[i].question = val;
        setFamille(data);
    }

    const createChangeIemeQuestionTab = (i) => {
        return changeIemeQuestionTab.bind(null, i)
    }

    const getIemeElementOther = (e) => {
        let otherV = []
        const test = inputFamille
        let i = 0
        while (i < test.length){
            let q = 0
            while (q < test[i].question.length){
                if (test[i].question[q].id.length == 1){
                    otherV.push({idov: (test[i].idFamille + test[i].question[q].id)})
                } else {
                    otherV.push({idov: test[i].question[q].id})
                }
                const res = test[i].idFamille + test[i].question[q].id
                q = q + 1 
            }
            i = i + 1
        }
        return (
            <>
            {otherV.map((inputoV, indexoV) => {
                return (
                    <option value={inputoV.idov} key={indexoV}>{inputoV.idov}</option>
                )
            })}
            </>
        )
    }

    const getquest = (jsonQ) => { //GERE ADRET ET UBAC
        //let i = 0
        //console.log(jsonQ)
        let res = []
        for (let parcF =0; parcF<jsonQ.length; parcF++ ){
            //console.log("a")
            if(jsonQ[parcF].id.length == 1){
                const newelem = {idparc:jsonQ[parcF].id, idFamille:jsonQ[parcF].id, nomFamille:jsonQ[parcF].question, question: []}
                res = [...res,newelem]
                //console.log(res)
            }
        }
        for (let parcsetF=0; parcsetF<res.length; parcsetF++){
            const idsetF = res[parcsetF].idparc
            let quest = []
            for (let parcQ =0; parcQ<jsonQ.length; parcQ++ ){
                if(jsonQ[parcQ].id.length > 1 && jsonQ[parcQ].id.charAt(0)== idsetF){
                    //console.log("pour " + idsetF + " on a " + jsonQ[parcQ].id)
                    let newQuest = {}
                    if(jsonQ[parcQ].id.length == 2){
                        newQuest = { id:jsonQ[parcQ].id.charAt(1), question:jsonQ[parcQ].question, fin:jsonQ[parcQ].fin, idoui: jsonQ[parcQ].idoui, idnon: jsonQ[parcQ].idnon }
                    } else {
                        newQuest = { id:jsonQ[parcQ].id, question:jsonQ[parcQ].question, fin:jsonQ[parcQ].fin, idoui: jsonQ[parcQ].idoui, idnon: jsonQ[parcQ].idnon }
                    }
                   quest = [...quest,newQuest]
                    res[parcsetF].question = quest
                }
            }

        }
        //console.log(JSON.stringify(res))
        setIdSuivant(res.length)
        setFamille(res)
        /*while (i < jsonQ.length){
            if(jsonQ[i].id.length == 1) {
                //console.log(JSON.stringify(jsonQ[i]))
                setFamille(
                    [
                        {
                            idparc:jsonQ[i].id, 
                            idFamille:jsonQ[i].id, 
                            nomFamille:jsonQ[i].question, 
                            question: []
                        }
                    ])
                i = i + 1
                break
            }
            i = i + 1
        }*/
    }



    const submit = (e) => {
        let res = []
        //On vérifie qu'il y a des éléments à envoyer
        if(inputFamille.length > 0){

            //On fait le for => taille - 1 car on accède à l'id de la famille suivante en cas d'idnon
            for (let i = 0; i < inputFamille.length -1; i++){
                const famille = inputFamille[i]
                //On vérifie que la famille courante possède au moins une question
                if(famille.question.length > 0){

                    //Ajoute la famille au JSON ------------------------------
                    const idadd = famille.idFamille //id famille
                    const questionadd = famille.nomFamille //nom famille
                    const idouiadd = idadd + famille.question[0].id //idoui: Première question de la famille
                    const idnonadd = inputFamille[i+1].idFamille  // idnon: famille suivante
                    let add = ({id: idadd, question: questionadd, fin:false, idoui: idouiadd , idnon: idnonadd })
                    res.push(add)
                    //--------------------------------------------------------
                    
                    //Ajoute les questions de la famille au JSON--------------
                    for (const element in famille.question){
                        //console.log(element)
                        const quest = famille.question[element]
                        const idq = idadd + quest.id
                        let idouiq = ''
                        if (quest.idoui!= idouiq){
                            idouiq = quest.idoui
                        }
                        let idnonq = ''
                        if (quest.idnon!= idnonq){
                            idnonq = quest.idnon
                        }
                        let newq = ({id: idq, question: quest.question, fin: quest.fin, idoui: idouiq, idnon: idnonq })
                        res.push(newq)
                    }
                    //--------------------------------------------------------
                }
            }

            //Dernière famille on accède à l'id de la première famille en cas d'idnon
            const famille = inputFamille[inputFamille.length -1]
            if (famille.question.length > 0){
                const idadd = famille.idFamille
                const questionadd = famille.nomFamille
                const idouiadd = (famille.idFamille + famille.question[0].id)
                const idnonadd = inputFamille[0].idFamille
                let add = ({id: idadd, question: questionadd, fin:false, idoui: idouiadd, idnon: idnonadd })
                res.push(add)
                for (const element in famille.question){
                    const quest = famille.question[element]
                    const idq = idadd + quest.id
                    let idouiq = ""
                    if (quest.idoui != idouiq){
                        idouiq = quest.idoui
                    }
                    let idnonq = ""
                    if (quest.idnon!= idnonq){
                        idnonq = quest.idnon
                    }
                    let newq = ({id: idq, question: quest.question, fin: quest.fin, idoui: idouiq, idnon: idnonq })
                    res.push(newq)
                }
            }
        }
        //console.log(res)
        const fileData = JSON.stringify(res);
        const blob = new Blob([fileData], { type: "text/plain;charset=utf-8" });
        const formData = new FormData();
        formData.append("file", blob, "questions.json");
        if (guideActuel == "guide") {
            formData.append("dir", guideActuel + String(nombreGuide));
            formData.append("name", document.getElementById("guideName").value);
        } else {
            formData.append("dir", guideActuel);
        }
        fetch('api/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => alert(data))
            .catch(error => console.error(error));
 
    }

    /*const getGuideList = () => {
        if (!guideLoaded) {
            fetch('api/guidesList')
                .then(response => response.json())
                .then(data => {
                    let select = document.getElementById("guideList");
                    for (let i = 0; i < data.length; i++) {
                        let option = document.createElement("option");
                        option.value = data[i].url;
                        option.text = data[i].nom;
                        select.appendChild(option);
                    }
                    let option = document.createElement("option");
                    option.value = "guide";
                    option.text = "Nouveau Guide";
                    select.appendChild(option);
                    setGuideLoaded(true);
                    setNombreGuide(data.length+1);
                })
                .catch(error => console.error(error));
            }
    }*/

    //console.log('---------------' + JSON.stringify(inputFamille))
    return(
        <>
        <div className="choix-guide">
            <select name="guideList" id="guideList" onChange={event => setGuideActuel(event.target.value)}>
                <option value="">Choisir un guide</option>
                {/*getGuideList()*/}
            </select>
            {(guideActuel == "guide") ? <input type="text" id="guideName" placeholder="Nom du guide" /> : null}
        </div>
        <button onClick={event=> getquest(jsonrec)}>RecupServ</button>
        <h2 className="catchPhrase">Vous pouvez ici générer la clé de determination des stations à l'aide de questions.</h2>
        {inputFamille.map((entry,indexFamille) => {
                return(
                    <div key={entry.idparc} className='formulairedeLaGE'>
                        <Famille familleID={entry.idFamille} tabQuestion={entry.question} familleNom={entry.nomFamille}
                        onChangeIDF={createChangeIemeElementIDF(indexFamille)}
                        onChangeTabQuestion={createChangeIemeQuestionTab(indexFamille)}
                        onChangeNomF={createChangeIemeElementNomF(indexFamille)}
                        getotherVal ={getIemeElementOther}></Famille>
                        <button onClick={event => SupprimerFamille(indexFamille)}>Supprimer</button>
                    </div>
                )
        })}
        <div className='formulaireFin'>
            <button onClick={ajouterFamille}>Ajouter une nouvelle Famille de questions</button>
            <button onClick={submit}>Envoyer</button>
        </div>
        </>
    )
}
export default Questions;