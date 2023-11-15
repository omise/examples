import Omise from "@/@types/omise/omise";
import OmiseCard from "@/@types/omise/omiseCard";

declare global {
  // Omise types
  interface Window {
    Omise: Omise;
    OmiseCard: OmiseCard;
  }
  // Sample types
  declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_BASE_URL: string;
      NEXT_PUBLIC_OMISE_PUBLIC_KEY: string;
      OMISE_SECRET_KEY: string;
    }
  }
}
