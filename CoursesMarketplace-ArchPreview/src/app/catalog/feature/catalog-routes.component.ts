import { CatalogService } from "../data-access/catalog.service";
import { CatalogComponent } from "./catalog.component";

export default [
  {
    path:'',
    providers:[CatalogService],
    children: [
      {
        path: ':primary_tag',
        component: CatalogComponent
      },
      {
        path: ':primary_tag/:secondary_tag',
        component: CatalogComponent
      },
      {
        path: 'search/find',
        component: CatalogComponent
      }
    ]
  }
]