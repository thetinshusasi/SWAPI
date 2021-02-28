import React, { ReactElement } from "react";
import { Card as BootstrapCard } from "react-bootstrap";
import { removeInvalidValues } from "../../helpers/utils";
import IFilm from "../../models/interfaces/IFilm";
import IHomePlanet from "../../models/interfaces/IHomePlanet";
import ISpecies from "../../models/interfaces/ISpecies";
import CardBack from "../cardBack";
import CardFront from "../cardFront";
import "./index.scss";

interface CardProps {
  name: string;
  height: string;

  mass: string;
  hair_color: string;
  skin_color: string;
  gender: string;
  birth_year: string;
  home_planet?: IHomePlanet;
  species?: ISpecies;
  films?: IFilm[];
  src?: string;
}

export default function Card({
  name,
  src,
  mass,
  height,
  hair_color,
  skin_color,
  gender,
  birth_year,
  home_planet,
  species,
  films,
}: CardProps): ReactElement {
  return (
    <div className="wrapper">
      <div className="card">
        <input type="checkbox" id="card1" className="more" aria-hidden="true" />
        <div className="content">
          <CardFront name={name} src={src} />
          <CardBack
            mass={mass}
            height={height}
            hair_color={hair_color}
            skin_color={skin_color}
            gender={gender}
            birth_year={birth_year}
            home_planet={home_planet}
            species={species}
            films={films}
          />
        </div>
      </div>
    </div>
  );
}
