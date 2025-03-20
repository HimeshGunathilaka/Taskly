import { createContext, useContext } from "react";

export const PublicContext = createContext(undefined);

export const usePublicContext = () => {
  const context = useContext(PublicContext);

  if (context === undefined) {
    throw new Error(
      "usePublicContext must be used within a PublicContext.Provider"
    );
  }
  return context;
};
