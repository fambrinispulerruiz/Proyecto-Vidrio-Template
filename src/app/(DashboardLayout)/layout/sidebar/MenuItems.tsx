import {
  IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Ordenes de Trabajo",
    icon: IconHome,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Empresas",
    icon: IconCircleDot,
    // href: "/ui-components/empresas/",
    href: "/ui-components/empresas.html",
  },
  {
    id: uniqueId(),
    title: "Modelos",
    icon: IconTable,
    // href: "/ui-components/modelos/",
    href: "/ui-components/modelos.html",
  },
  {
    id: uniqueId(),
    title: "Vidrios",
    icon: IconInfoCircle,
    // href: "/ui-components/vidrios/",
    href: "/ui-components/vidrios.html",
  }
];

export default Menuitems;
