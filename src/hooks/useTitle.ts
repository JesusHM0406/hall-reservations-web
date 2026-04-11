import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | Hall Reservations Web`;
  }, [title]);
};