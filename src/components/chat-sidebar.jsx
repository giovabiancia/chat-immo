import { Button } from "@/components/ui/button";
import { Building, Home, MapPin, PlusCircle } from "lucide-react";

const PROPERTY_TYPES = [
  { icon: Home, label: "Case" },
  { icon: Building, label: "Appartamenti" },
  { icon: MapPin, label: "Terreni" },
];

const EXAMPLE_QUERIES = [
  "Cerca appartamenti a Milano con 2 camere",
  "Case con giardino a Roma sotto 300.000€",
  "Affitto monolocale zona centro",
  "Ville con piscina in Toscana",
];

export function ChatSidebar() {
  return (
    <div className="flex h-full w-[300px] flex-col bg-gray-50">
      <div className="p-4 border-b bg-primary">
        <div className="flex justify-center mb-7">
          <img src="./logo.svg" alt="Immobiliare.it Logo" className="h-8" />
        </div>
        <Button className="w-full justify-start gap-2 bg-secondary text-white hover:bg-secondary/90 font-bold">
          <PlusCircle className="h-4 w-4" />
          Nuova chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div>
            <h2 className="mb-2 px-2 text-xs font-semibold text-primary">
              TIPO IMMOBILE
            </h2>
            <div className="space-y-1">
              {PROPERTY_TYPES.map((type) => (
                <Button
                  key={type.label}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-gray-700 hover:text-primary hover:bg-blue-50"
                >
                  <type.icon className="h-4 w-4" />
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-2 px-2 text-xs font-semibold text-primary">
              RICERCHE SUGGERITE
            </h2>
            <div className="space-y-1">
              {EXAMPLE_QUERIES.map((query) => (
                <Button
                  key={query}
                  variant="ghost"
                  className="w-full text-left justify-start text-sm font-normal text-gray-700 hover:text-primary hover:bg-blue-50 truncate line-clamp-2"
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
