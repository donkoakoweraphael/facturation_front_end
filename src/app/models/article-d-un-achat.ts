import { Article } from "./article"
import { LigneDAchat } from "./ligne-d-achat"

export interface ArticleDUnAchat {
    designation: string
    prixUnitaire: number
    quantite: number
    a: Article
    la: LigneDAchat
}