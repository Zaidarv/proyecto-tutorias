import React from "react";
import { useCarreras } from "../context/CarreraContext";
import { useEffect } from "react";
// import { Link } from "react-router-dom";

function CarreraPage() {
  const { loadCarrera } = useCarreras();
  useEffect(() => {
    loadCarrera("IGE");
  }, []);

  return <div>CarreraPage</div>;
}

export default CarreraPage;
